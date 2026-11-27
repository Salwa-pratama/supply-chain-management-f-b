import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";
import { CreateBatchDto } from "./dto/create-batch.dto";

const BATCH_INCLUDE = {
  items: true,
  product: {
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
    },
  },
  createdBy: {
    select: { id: true, name: true, role: true },
  },
};

@Injectable()
export class ProductionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly businessService: BusinessService,
  ) {}

  async findAll(userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    return this.prisma.kitchenBatch.findMany({
      where: { businessId },
      include: BATCH_INCLUDE,
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const batch = await this.prisma.kitchenBatch.findFirst({
      where: { id, businessId },
      include: BATCH_INCLUDE,
    });

    if (!batch) {
      throw new NotFoundException(`Batch produksi ${id} tidak ditemukan.`);
    }

    return batch;
  }

  async create(userId: string, dto: CreateBatchDto) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    let resolvedProductId: string | null = null;
    if (dto.productId) {
      const product = await this.prisma.product.findFirst({
        where: { id: dto.productId, businessId },
      });
      if (!product) {
        throw new NotFoundException("Produk menu kasir tidak ditemukan pada bisnis ini.");
      }
      resolvedProductId = product.id;
    }

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const countToday = await this.prisma.kitchenBatch.count({
      where: {
        businessId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    const batchNumber = `BATCH-${todayStr}-${String(countToday + 1).padStart(2, "0")}`;

    return this.prisma.$transaction(async (tx) => {
      if (dto.deductIngredients && dto.items && dto.items.length > 0) {
        const usageMap = new Map<string, number>();
        for (const item of dto.items) {
          if (!item.ingredientId || item.quantity <= 0) continue;
          usageMap.set(
            item.ingredientId,
            (usageMap.get(item.ingredientId) ?? 0) + Number(item.quantity),
          );
        }

        for (const [ingredientId, qty] of usageMap.entries()) {
          const ingredient = await tx.ingredient.findFirst({
            where: { id: ingredientId, businessId },
          });
          if (!ingredient) {
            throw new NotFoundException("Bahan baku batch tidak ditemukan di gudang.");
          }
          if (Number(ingredient.stock) < qty) {
            throw new BadRequestException(
              `Stok "${ingredient.name}" tidak cukup untuk batch (tersedia ${Number(ingredient.stock)} ${ingredient.unit}, butuh ${qty} ${ingredient.unit}).`,
            );
          }

          await tx.ingredient.update({
            where: { id: ingredientId },
            data: { stock: { decrement: qty } },
          });

          await tx.stockMovement.create({
            data: {
              ingredientId,
              createdById: userId,
              type: "out",
              qty,
              referenceId: `PRODUCTION: ${batchNumber}`,
            },
          });
        }
      }

      return tx.kitchenBatch.create({
        data: {
          businessId,
          productId: resolvedProductId,
          createdById: userId,
          batchNumber,
          recipeName: dto.recipeName,
          station: dto.station || "Central Bar & Kitchen",
          operator: dto.operator || "Lead Barista",
          targetQty: dto.targetQty ?? null,
          plannedYield: dto.plannedYield || "Standar Porsi",
          progress: 10,
          status: "in_progress",
          notes: dto.notes,
          items: {
            create: (dto.items || []).map((i) => ({
              name: i.name,
              quantity: i.quantity,
              unit: i.unit,
              ingredientId: i.ingredientId || null,
            })),
          },
        },
        include: BATCH_INCLUDE,
      });
    });
  }

  async updateStatus(
    id: string,
    dto: { status: string; progress?: number; actualYield?: string; notes?: string },
    userId: string,
  ) {
    const batch = await this.findOne(id, userId);

    return this.prisma.kitchenBatch.update({
      where: { id: batch.id },
      data: {
        status: dto.status,
        progress:
          dto.progress !== undefined
            ? dto.progress
            : dto.status === "completed"
              ? 100
              : batch.progress,
        actualYield: dto.actualYield ?? batch.actualYield,
        notes: dto.notes ?? batch.notes,
        completedAt: dto.status === "completed" ? new Date() : batch.completedAt,
      },
      include: BATCH_INCLUDE,
    });
  }
}
