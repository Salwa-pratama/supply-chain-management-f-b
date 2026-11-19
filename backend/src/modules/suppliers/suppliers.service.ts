import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { CreateSupplierItemDto } from "./dto/create-supplier-item.dto";

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Ambil supplier profile untuk user pemasok yang sedang login
   */
  async getMySupplierProfile(userId: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { userId },
      include: {
        supplierItems: true,
        businessSuppliers: {
          include: { business: true },
        },
      },
    });

    if (!supplier) {
      throw new NotFoundException("Profil pemasok tidak ditemukan untuk akun ini.");
    }

    return supplier;
  }

  /**
   * Ambil seluruh mitra pemasok (untuk pemilik bisnis/gudang)
   */
  async findAll() {
    return this.prisma.supplier.findMany({
      where: { isActive: true },
      include: {
        supplierItems: {
          where: { isAvailable: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        supplierItems: true,
      },
    });

    if (!supplier) {
      throw new NotFoundException(`Pemasok ${id} tidak ditemukan.`);
    }

    return supplier;
  }

  async addSupplierItem(dto: CreateSupplierItemDto, userId: string) {
    const supplier = await this.getMySupplierProfile(userId);

    return this.prisma.supplierItem.create({
      data: {
        supplierId: supplier.id,
        name: dto.name,
        unit: dto.unit,
        price: dto.price,
        stockQty: dto.stockQty || 0,
        isAvailable: dto.isAvailable ?? true,
      },
    });
  }
}
