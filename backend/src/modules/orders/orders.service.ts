import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";
import { CreateOrderDto } from "./dto/create-order.dto";

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
      include: {
        orderItems: {
          include: { product: true },
        },
        createdBy: {
          select: { id: true, name: true, role: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const order = await this.prisma.order.findFirst({
      where: { id, businessId },
      include: {
        orderItems: {
          include: { product: true },
        },
        createdBy: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Pesanan ${id} tidak ditemukan.`);
    }

    return order;
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

      // 3. JIKA STATUS 'PAID': Jalankan Pemotongan Bahan Baku Otomatis
      if (orderStatus === "paid" || orderStatus === "completed") {
        for (const item of dto.items) {
          // Ambil resep produk ini
          const recipes = await tx.productIngredient.findMany({
            where: { productId: item.productId },
            include: { ingredient: true },
          });

          for (const recipe of recipes) {
            const usage = Number(recipe.qtyPerUnit) * item.quantity;

            // Kurangi stok bahan di gudang
            await tx.ingredient.update({
              where: { id: recipe.ingredientId },
              data: {
                stock: {
                  decrement: usage,
                },
              },
            });

            // Catat riwayat pergerakan stok (out)
            await tx.stockMovement.create({
              data: {
                ingredientId: recipe.ingredientId,
                createdById: userId,
                type: "out",
                qty: usage,
                referenceId: `ORDER: ${order.id.slice(0, 8)}`,
              },
            });
          }
        }
      }

      // Return order lengkap dengan item
      return tx.order.findUnique({
        where: { id: order.id },
        include: {
          orderItems: {
            include: { product: true },
          },
          createdBy: {
            select: { id: true, name: true },
          },
        },
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
