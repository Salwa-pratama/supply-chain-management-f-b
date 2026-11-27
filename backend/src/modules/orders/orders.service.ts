import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderStatus } from "./dto/update-order-status.dto";

/**
 * Transisi status yang diizinkan agar antrean kitchen tetap konsisten.
 * paid -> preparing -> completed, dengan pembatalan dari status aktif.
 */
const ALLOWED_TRANSITIONS: Record<string, OrderStatus[]> = {
  pending: ["paid", "cancelled"],
  paid: ["preparing", "completed", "cancelled"],
  preparing: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

const ORDER_INCLUDE = {
  orderItems: {
    include: {
      product: {
        include: {
          productIngredients: {
            include: { ingredient: true },
          },
        },
      },
    },
  },
  createdBy: {
    select: { id: true, name: true, role: true },
  },
};

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly businessService: BusinessService
  ) {}

  async findAll(userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    return this.prisma.order.findMany({
      where: { businessId },
      include: ORDER_INCLUDE,
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const order = await this.prisma.order.findFirst({
      where: { id, businessId },
      include: ORDER_INCLUDE,
    });

    if (!order) {
      throw new NotFoundException(`Pesanan ${id} tidak ditemukan.`);
    }

    return order;
  }

  /**
   * Memindahkan status pesanan (contoh: kirim ke Kitchen & Barista).
   * Dipakai dashboard pemilik untuk alur paid -> preparing -> completed.
   */
  async updateStatus(id: string, status: OrderStatus, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const order = await this.prisma.order.findFirst({
      where: { id, businessId },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Pesanan ${id} tidak ditemukan.`);
    }

    if (order.status === status) {
      return this.findOne(id, userId);
    }

    const allowed = ALLOWED_TRANSITIONS[order.status] ?? [];
    if (!allowed.includes(status)) {
      throw new BadRequestException(
        `Status pesanan tidak dapat diubah dari "${order.status}" ke "${status}".`
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Jika berpindah dari pending -> paid/completed: potong bahan baku
      if (order.status === "pending" && (status === "paid" || status === "completed")) {
        const usageMap = new Map<
          string,
          { ingredientName: string; unit: string; currentStock: number; usage: number }
        >();

        for (const item of order.orderItems) {
          const recipes = await tx.productIngredient.findMany({
            where: { productId: item.productId, product: { businessId } },
            include: { ingredient: true },
          });

          for (const recipe of recipes) {
            const usage = Number(recipe.qtyPerUnit) * item.quantity;
            if (usage <= 0) continue;

            const existing = usageMap.get(recipe.ingredientId);
            if (existing) {
              existing.usage += usage;
            } else {
              usageMap.set(recipe.ingredientId, {
                ingredientName: recipe.ingredient.name,
                unit: recipe.ingredient.unit,
                currentStock: Number(recipe.ingredient.stock),
                usage,
              });
            }
          }
        }

        for (const [ingredientId, entry] of usageMap.entries()) {
          if (entry.currentStock < entry.usage) {
            throw new BadRequestException(
              `Stok bahan baku "${entry.ingredientName}" tidak mencukupi (tersedia ${entry.currentStock} ${entry.unit}, dibutuhkan ${entry.usage} ${entry.unit}).`
            );
          }

          await tx.ingredient.update({
            where: { id: ingredientId },
            data: {
              stock: {
                decrement: entry.usage,
              },
            },
          });

          await tx.stockMovement.create({
            data: {
              ingredientId,
              createdById: userId,
              type: "out",
              qty: entry.usage,
              referenceId: `ORDER: ${order.id.slice(0, 8)}`,
            },
          });
        }
      }

      // 2. Jika dibatalkan dari status paid/preparing: kembalikan stok bahan baku
      if ((order.status === "paid" || order.status === "preparing") && status === "cancelled") {
        for (const item of order.orderItems) {
          const recipes = await tx.productIngredient.findMany({
            where: { productId: item.productId, product: { businessId } },
            include: { ingredient: true },
          });

          for (const recipe of recipes) {
            const usage = Number(recipe.qtyPerUnit) * item.quantity;
            if (usage <= 0) continue;

            await tx.ingredient.update({
              where: { id: recipe.ingredientId },
              data: {
                stock: {
                  increment: usage,
                },
              },
            });

            await tx.stockMovement.create({
              data: {
                ingredientId: recipe.ingredientId,
                createdById: userId,
                type: "in",
                qty: usage,
                referenceId: `CANCEL_ORDER: ${order.id.slice(0, 8)}`,
              },
            });
          }
        }
      }

      await tx.order.update({
        where: { id: order.id },
        data: { status },
      });

      return tx.order.findUnique({
        where: { id: order.id },
        include: ORDER_INCLUDE,
      });
    });
  }

  /**
   * Membuat transaksi penjualan kasir (POS)
   * Dilengkapi algoritma SCM: Pemotongan otomatis stok bahan baku di gudang
   * berdasarkan resep (BOM) produk yang dibeli saat status 'paid'.
   */
  async create(dto: CreateOrderDto, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException("Keranjang belanja tidak boleh kosong.");
    }

    const orderStatus = dto.status === "completed" ? "paid" : (dto.status || "paid");

    return this.prisma.$transaction(async (tx) => {
      // 1. Simpan Header Order
      const order = await tx.order.create({
        data: {
          businessId,
          createdById: userId,
          source: "kasir",
          orderType: dto.orderType || "dine-in",
          totalAmount: dto.totalAmount,
          discountAmount: dto.discountAmount || 0,
          taxAmount: dto.taxAmount || 0,
          paymentMethod: dto.paymentMethod || "cash",
          paidAmount: dto.paidAmount || dto.totalAmount,
          changeAmount: dto.changeAmount || 0,
          status: orderStatus,
        },
      });

      // 2. Simpan Item Pesanan
      await tx.orderItem.createMany({
        data: dto.items.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      // 3. JIKA STATUS 'PAID': Jalankan Validasi & Pemotongan Bahan Baku Otomatis berdasarkan BOM
      if (orderStatus === "paid" || orderStatus === "completed") {
        const usageMap = new Map<
          string,
          { ingredientName: string; unit: string; currentStock: number; usage: number }
        >();

        for (const item of dto.items) {
          const recipes = await tx.productIngredient.findMany({
            where: { productId: item.productId, product: { businessId } },
            include: { ingredient: true },
          });

          for (const recipe of recipes) {
            const usage = Number(recipe.qtyPerUnit) * item.quantity;
            if (usage <= 0) continue;

            const existing = usageMap.get(recipe.ingredientId);
            if (existing) {
              existing.usage += usage;
            } else {
              usageMap.set(recipe.ingredientId, {
                ingredientName: recipe.ingredient.name,
                unit: recipe.ingredient.unit,
                currentStock: Number(recipe.ingredient.stock),
                usage,
              });
            }
          }
        }

        for (const [ingredientId, entry] of usageMap.entries()) {
          if (entry.currentStock < entry.usage) {
            throw new BadRequestException(
              `Stok bahan baku "${entry.ingredientName}" tidak mencukupi (tersedia ${entry.currentStock} ${entry.unit}, dibutuhkan ${entry.usage} ${entry.unit}).`
            );
          }

          await tx.ingredient.update({
            where: { id: ingredientId },
            data: {
              stock: {
                decrement: entry.usage,
              },
            },
          });

          await tx.stockMovement.create({
            data: {
              ingredientId,
              createdById: userId,
              type: "out",
              qty: entry.usage,
              referenceId: `ORDER: ${order.id.slice(0, 8)}`,
            },
          });
        }
      }

      // Return order lengkap dengan item dan resep BOM
      return tx.order.findUnique({
        where: { id: order.id },
        include: ORDER_INCLUDE,
      });
    });
  }

  /**
   * Ringkasan KPI Kasir Hari Ini
   */
  async getTodayStats(userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const orders = await this.prisma.order.findMany({
      where: {
        businessId,
        status: "paid",
        createdAt: { gte: startOfDay },
      },
    });

    const totalSales = orders.reduce((acc, curr) => acc + Number(curr.totalAmount), 0);
    const transactionCount = orders.length;
    const avgTicket = transactionCount > 0 ? Math.round(totalSales / transactionCount) : 0;

    const qrisCount = orders.filter((o) => o.paymentMethod === "qris").length;
    const cashCount = orders.filter((o) => o.paymentMethod === "cash").length;
    const edcCount = orders.filter((o) => o.paymentMethod === "edc").length;

    return {
      totalSales,
      transactionCount,
      avgTicket,
      paymentSplit: {
        qris: qrisCount,
        cash: cashCount,
        edc: edcCount,
      },
    };
  }
}
