import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Mengambil business ID untuk user (baik pemilik/owner maupun member staf seperti kasir/gudang)
   */
  async getBusinessForUser(userId: string): Promise<string> {
    // 1. Cek apakah user adalah owner dari suatu bisnis
    const ownedBusiness = await this.prisma.business.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (ownedBusiness) {
      return ownedBusiness.id;
    }

    // 2. Cek apakah user adalah anggota (kasir / manajer gudang)
    const membership = await this.prisma.businessMember.findFirst({
      where: { userId, isActive: true },
      select: { businessId: true },
    });

    if (membership) {
      return membership.businessId;
    }

    // 3. Fallback jika super admin atau bisnis pertama
    const defaultBusiness = await this.prisma.business.findFirst({
      select: { id: true },
    });

    if (defaultBusiness) {
      return defaultBusiness.id;
    }

    throw new NotFoundException("Profil bisnis tidak ditemukan untuk pengguna ini.");
  }

  async getMyBusiness(userId: string) {
    const businessId = await this.getBusinessForUser(userId);

    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true },
            },
          },
        },
        bot: true,
      },
    });

    if (!business) {
      throw new NotFoundException("Bisnis tidak ditemukan.");
    }

    return business;
  }

  async getAllBusinesses() {
    return this.prisma.business.findMany({
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: {
            products: true,
            ingredients: true,
            orders: true,
            members: true,
          },
        },
      },
    });
  }
}
