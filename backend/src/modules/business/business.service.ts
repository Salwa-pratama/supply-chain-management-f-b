import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { AddMemberDto } from "./dto/add-member.dto";
import * as bcrypt from "bcrypt";

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
      },
    });

    if (!business) {
      throw new NotFoundException("Bisnis tidak ditemukan.");
    }

    return business;
  }

  async updateMyBusiness(
    userId: string,
    dto: { name?: string; address?: string; phoneBusiness?: string; description?: string; category?: string }
  ) {
    const businessId = await this.getBusinessForUser(userId);

    return this.prisma.business.update({
      where: { id: businessId },
      data: {
        name: dto.name,
        address: dto.address,
        phoneBusiness: dto.phoneBusiness,
        description: dto.description,
        category: dto.category,
      },
    });
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

  /**
   * Mengambil daftar staf anggota (kasir & gudang) untuk bisnis user
   */
  async getMembers(userId: string) {
    const businessId = await this.getBusinessForUser(userId);
    return this.prisma.businessMember.findMany({
      where: { businessId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Menambahkan staf baru (kasir / manajer_gudang) ke bisnis owner
   */
  async addMember(userId: string, dto: AddMemberDto) {
    const businessId = await this.getBusinessForUser(userId);
    const normalizedEmail = dto.email.trim().toLowerCase();

    // 1. Cek apakah user sudah terdaftar di database
    let user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      const password = dto.password || "Staf#2025";
      const passwordHash = await bcrypt.hash(password, 10);
      user = await this.prisma.user.create({
        data: {
          email: normalizedEmail,
          name: dto.name.trim(),
          passwordHash,
          role: dto.role,
          isActive: true,
        },
      });
    }

    // 2. Cek apakah sudah terdaftar di businessMember untuk bisnis ini
    const existingMember = await this.prisma.businessMember.findUnique({
      where: {
        businessId_userId: {
          businessId,
          userId: user.id,
        },
      },
    });

    if (existingMember) {
      throw new ConflictException("Pengguna ini sudah terdaftar sebagai anggota bisnis Anda.");
    }

    // 3. Daftarkan sebagai anggota bisnis
    return this.prisma.businessMember.create({
      data: {
        businessId,
        userId: user.id,
        role: dto.role,
        isActive: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
      },
    });
  }

  /**
   * Mengubah status aktif/nonaktif staf
   */
  async toggleMemberStatus(userId: string, memberId: string) {
    const businessId = await this.getBusinessForUser(userId);
    const member = await this.prisma.businessMember.findFirst({
      where: { id: memberId, businessId },
    });

    if (!member) {
      throw new NotFoundException("Data staf tidak ditemukan di bisnis Anda.");
    }

    const updated = await this.prisma.businessMember.update({
      where: { id: memberId },
      data: { isActive: !member.isActive },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true, isActive: true },
        },
      },
    });

    return updated;
  }
}
