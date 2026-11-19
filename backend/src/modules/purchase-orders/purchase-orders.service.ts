import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";
import { CreatePurchaseOrderDto, QcReceiveDto, UpdatePoStatusDto } from "./dto/create-po.dto";

@Injectable()
export class PurchaseOrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly businessService: BusinessService
  ) {}

  async findAll(userId: string, role: string) {
    if (role === "pemasok") {
      const supplier = await this.prisma.supplier.findUnique({
        where: { userId },
      });

      if (!supplier) {
        throw new NotFoundException("Profil pemasok tidak ditemukan.");
      }

      return this.prisma.purchaseOrder.findMany({
        where: { supplierId: supplier.id },
        include: {
          business: true,
          purchaseOrderItems: {
            include: { supplierItem: true, ingredient: true },
          },
          createdBy: { select: { id: true, name: true, role: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    // Role pemilik / gudang / admin
    const businessId = await this.businessService.getBusinessForUser(userId);

    return this.prisma.purchaseOrder.findMany({
      where: { businessId },
      include: {
        supplier: true,
        purchaseOrderItems: {
          include: { supplierItem: true, ingredient: true },
        },
        createdBy: { select: { id: true, name: true, role: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        business: true,
        supplier: true,
        purchaseOrderItems: {
          include: { supplierItem: true, ingredient: true },
        },
        createdBy: { select: { id: true, name: true, role: true } },
      },
    });

    if (!po) {
      throw new NotFoundException(`PO ${id} tidak ditemukan.`);
    }

    return po;
  }

  async create(dto: CreatePurchaseOrderDto, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    return this.prisma.purchaseOrder.create({
      data: {
        businessId,
        supplierId: dto.supplierId,
        createdById: userId,
        status: "sent",
        totalAmount: dto.totalAmount,
        purchaseOrderItems: {
          create: dto.items.map((item) => ({
            supplierItemId: item.supplierItemId,
            ingredientId: item.ingredientId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        supplier: true,
        purchaseOrderItems: true,
      },
    });
  }

  /**
   * Pemasok mengonfirmasi atau mengirim PO (status: confirmed / shipped)
   */
  async updateStatusBySupplier(id: string, dto: UpdatePoStatusDto) {
    const po = await this.findOne(id);

    return this.prisma.purchaseOrder.update({
      where: { id: po.id },
      data: {
        status: dto.status,
        deliveryNote: dto.deliveryNote || po.deliveryNote,
        driverInfo: dto.driverInfo || po.driverInfo,
      },
      include: {
        business: true,
        supplier: true,
        purchaseOrderItems: true,
      },
    });
  }

  /**
   * Gudang / Pemilik memverifikasi QC dan menerima barang
   * SCM Automation: Tambahkan stok bahan baku di gudang secara otomatis!
   */
  async verifyQcAndReceive(id: string, dto: QcReceiveDto, userId: string) {
    const po = await this.findOne(id);

    if (po.status === "received") {
      throw new BadRequestException("PO ini sudah pernah diterima dan diverifikasi sebelumnya.");
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Update status PO
      const updatedPo = await tx.purchaseOrder.update({
        where: { id: po.id },
        data: {
          status: "received",
          qcStatus: dto.qcStatus || "passed",
          qcNotes: dto.qcNotes || "QC Lolos",
          receivedAt: new Date(),
        },
      });

      // 2. Jika QC lolos atau parsial, tambah stok bahan baku di gudang
      if (dto.qcStatus === "passed" || dto.qcStatus === "partial") {
        for (const item of po.purchaseOrderItems) {
          if (item.ingredientId) {
            // Tambah stok bahan baku
            await tx.ingredient.update({
              where: { id: item.ingredientId },
              data: {
                stock: {
                  increment: item.quantity,
                },
              },
            });

            // Catat log mutasi stok masuk (in)
            await tx.stockMovement.create({
              data: {
                ingredientId: item.ingredientId,
                createdById: userId,
                type: "in",
                qty: item.quantity,
                referenceId: `PO_RECEIVE: ${po.id.slice(0, 8)} (${po.deliveryNote || "SJ"})`,
              },
            });
          }
        }
      }

      return updatedPo;
    });
  }
}
