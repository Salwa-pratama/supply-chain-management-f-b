import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { BusinessService } from "../business/business.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly businessService: BusinessService
  ) {}

  async findAll(userId: string, category?: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    return this.prisma.product.findMany({
      where: {
        businessId,
        ...(category ? { category } : {}),
      },
      include: {
        productIngredients: {
          include: {
            ingredient: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  async findOne(id: string, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    const product = await this.prisma.product.findFirst({
      where: { id, businessId },
      include: {
        productIngredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan.`);
    }

    return product;
  }

  async create(dto: CreateProductDto, userId: string) {
    const businessId = await this.businessService.getBusinessForUser(userId);

    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          businessId,
          name: dto.name,
          description: dto.description,
          price: dto.price,
          category: dto.category || "minuman",
          isAvailable: dto.isAvailable ?? true,
        },
      });

      if (dto.ingredients && dto.ingredients.length > 0) {
        await tx.productIngredient.createMany({
          data: dto.ingredients.map((ing) => ({
            productId: product.id,
            ingredientId: ing.ingredientId,
            qtyPerUnit: ing.qtyPerUnit,
          })),
        });
      }

      return tx.product.findUnique({
        where: { id: product.id },
        include: {
          productIngredients: {
            include: { ingredient: true },
          },
        },
      });
    });
  }

  async remove(id: string, userId: string) {
    const product = await this.findOne(id, userId);
    await this.prisma.product.delete({
      where: { id: product.id },
    });
    return { success: true, message: `Produk ${product.name} berhasil dihapus.` };
  }
}
