import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";
import { CreateTransferDto } from "./dto/create-transfer.dto";

@Injectable()
export class DistributionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly businessService: BusinessService,
  ) {}

  async findAll(userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    return this.prisma.branchTransfer.findMany({
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

    const transfer = await this.prisma.branchTransfer.findFirst({
      where: { id, businessId },
      include: {
        items: true,
        createdBy: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    if (!transfer) {
      throw new NotFoundException(`Surat transfer ${id} tidak ditemukan.`);
    }

    return transfer;
  }

  async create(userId: string, dto: CreateTransferDto) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const todayStr = new Date().toISOString().slice(0, 7).replace(/-/g, "");
    const count = await this.prisma.branchTransfer.count({
      where: { businessId },
    });
    const transferNumber = `TRF-OUT-${todayStr}-${String(count + 1).padStart(2, "0")}`;

    return this.prisma.branchTransfer.create({
      data: {
        businessId,
        createdById: userId,
        transferNumber,
        origin: dto.origin,
        destination: dto.destination,
        driver: dto.driver || "Kurir Pengiriman Hub",
        vehicleInfo: dto.vehicleInfo || "Blind Van Pengantar",
        departureTime: dto.departureTime || new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
        eta: dto.eta || "30-45 Menit",
        status: "shipping",
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

  async updateStatus(id: string, status: string, userId: string) {
    const transfer = await this.findOne(id, userId);

    return this.prisma.branchTransfer.update({
      where: { id: transfer.id },
      data: {
        status,
        receivedAt: status === "received" ? new Date() : transfer.receivedAt,
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
