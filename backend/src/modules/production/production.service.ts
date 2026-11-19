import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";
import { CreateBatchDto } from "./dto/create-batch.dto";

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
      include: {
        items: true,
        createdBy: {
          select: { id: true, name: true, role: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const batch = await this.prisma.kitchenBatch.findFirst({
      where: { id, businessId },
      include: {
        items: true,
        createdBy: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    if (!batch) {
      throw new NotFoundException(`Batch produksi ${id} tidak ditemukan.`);
    }

    return batch;
  }

  async create(userId: string, dto: CreateBatchDto) {
    const businessId = await this.businessService.getBusinessForUser(userId);

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

    return this.prisma.kitchenBatch.create({
      data: {
        businessId,
        createdById: userId,
        batchNumber,
        recipeName: dto.recipeName,
        station: dto.station || "Central Bar & Kitchen",
        operator: dto.operator || "Lead Barista",
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
      include: {
        items: true,
        createdBy: {
          select: { id: true, name: true, role: true },
        },
      },
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
        progress: dto.progress !== undefined ? dto.progress : (dto.status === "completed" ? 100 : batch.progress),
        actualYield: dto.actualYield ?? batch.actualYield,
        notes: dto.notes ?? batch.notes,
        completedAt: dto.status === "completed" ? new Date() : batch.completedAt,
      },
      include: {
        items: true,
        createdBy: {
          select: { id: true, name: true, role: true },
        },
      },
    });
  }
}
