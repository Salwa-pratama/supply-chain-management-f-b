import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";
import { CreateIngredientDto, StockOpnameDto } from "./dto/create-ingredient.dto";

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly businessService: BusinessService
  ) {}

  async findAll(userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const ingredients = await this.prisma.ingredient.findMany({
      where: { businessId },
      include: {
        preferredSupplier: {
          select: { id: true, name: true, phone: true },
        },
      },
      orderBy: { name: "asc" },
    });

    // Berikan status ketersediaan (Aman, Menipis, Kritis)
    return ingredients.map((item) => {
      const stockNum = Number(item.stock);
      const minStockNum = Number(item.minStock);
      let status = "aman";

      if (stockNum <= minStockNum * 0.5) {
        status = "kritis";
      } else if (stockNum <= minStockNum) {
        status = "menipis";
      }

      return {
        ...item,
        status,
      };
    });
  }

  async create(dto: CreateIngredientDto, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const ingredient = await this.prisma.ingredient.create({
      data: {
        businessId,
        name: dto.name,
        unit: dto.unit,
        stock: dto.stock,
        minStock: dto.minStock,
        category: dto.category || "general",
        preferredSupplierId: dto.preferredSupplierId,
        locationRack: dto.locationRack,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
      },
      include: { preferredSupplier: true },
    });

    // Catat mutasi awal (in) jika stok > 0
    if (dto.stock > 0) {
      await this.prisma.stockMovement.create({
        data: {
          ingredientId: ingredient.id,
          createdById: userId,
          type: "in",
          qty: dto.stock,
          referenceId: "INITIAL_STOCK",
        },
      });
    }

    return ingredient;
  }

  async stockOpname(dto: StockOpnameDto, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const ingredient = await this.prisma.ingredient.findFirst({
      where: { id: dto.ingredientId, businessId },
    });

    if (!ingredient) {
      throw new NotFoundException("Bahan baku tidak ditemukan.");
    }

    const currentStock = Number(ingredient.stock);
    const diff = dto.actualStock - currentStock;

    return this.prisma.$transaction(async (tx) => {
      // 1. Update stok bahan
      const updated = await tx.ingredient.update({
        where: { id: ingredient.id },
        data: { stock: dto.actualStock },
      });

      // 2. Catat log mutasi penyesuaian (adjust)
      await tx.stockMovement.create({
        data: {
          ingredientId: ingredient.id,
          createdById: userId,
          type: "adjust",
          qty: Math.abs(diff),
          referenceId: `OPNAME: ${diff >= 0 ? "+" : ""}${diff} (${dto.notes || "Koreksi Fisik"})`,
        },
      });

      return {
        ingredient: updated,
        diff,
        message: `Stok fisik berhasil direkonsiliasi. Selisih ${diff >= 0 ? "+" : ""}${diff} ${ingredient.unit}.`,
      };
    });
  }

  async dispatchToKitchen(
    dto: { ingredientId: string; quantity: number; station?: string; notes?: string },
    userId: string
  ) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const ingredient = await this.prisma.ingredient.findFirst({
      where: { id: dto.ingredientId, businessId },
    });

    if (!ingredient) {
      throw new NotFoundException("Bahan baku tidak ditemukan.");
    }

    const currentStock = Number(ingredient.stock);
    const newStock = Math.max(0, currentStock - dto.quantity);

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.ingredient.update({
        where: { id: ingredient.id },
        data: { stock: newStock },
      });

      const movement = await tx.stockMovement.create({
        data: {
          ingredientId: ingredient.id,
          createdById: userId,
          type: "out",
          qty: dto.quantity,
          referenceId: `KITCHEN: ${dto.station || "Bar & Kitchen"} (${dto.notes || "Serah Terima Bahan"})`,
        },
      });

      return {
        ingredient: updated,
        movement,
        message: `Serah terima ${dto.quantity} ${ingredient.unit} ${ingredient.name} ke ${dto.station || "Kitchen"} berhasil!`,
      };
    });
  }

  async getMovements(userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    return this.prisma.stockMovement.findMany({
      where: {
        ingredient: { businessId },
      },
      include: {
        ingredient: { select: { id: true, name: true, unit: true } },
        createdBy: { select: { id: true, name: true, role: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
}
