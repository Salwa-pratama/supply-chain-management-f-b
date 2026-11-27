import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { AddMemberDto, CreateBranchDto } from "./dto/add-member.dto";
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
        branches: {
          where: { isActive: true },
          orderBy: [{ isMain: "desc" }, { createdAt: "asc" }],
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true, isActive: true },
            },
            branch: {
              select: { id: true, name: true, code: true, address: true, isMain: true },
            },
          },
        },
      },
    });

    if (!business) {
      throw new NotFoundException("Bisnis tidak ditemukan.");
    }

    const currentMembership =
      business.members.find((m) => m.userId === userId && m.isActive) ?? null;

    return {
      ...business,
      assignedBranch: currentMembership?.branch ?? null,
    };
  }

  async getBranches(userId: string) {
    const businessId = await this.getBusinessForUser(userId);
    return this.prisma.branch.findMany({
      where: { businessId, isActive: true },
      include: {
        _count: {
          select: { members: true },
        },
      },
      orderBy: [{ isMain: "desc" }, { createdAt: "asc" }],
    });
  }

  async createBranch(userId: string, dto: CreateBranchDto) {
    const businessId = await this.getBusinessForUser(userId);

    return this.prisma.$transaction(async (tx) => {
      if (dto.isMain) {
        await tx.branch.updateMany({
          where: { businessId },
          data: { isMain: false },
        });
      }

      return tx.branch.create({
        data: {
          businessId,
          name: dto.name.trim(),
          code: dto.code?.trim() || null,
          address: dto.address?.trim() || null,
          phone: dto.phone?.trim() || null,
          isMain: Boolean(dto.isMain),
          isActive: true,
        },
        include: {
          _count: {
            select: { members: true },
          },
        },
      });
    });
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
        branch: {
          select: {
            id: true,
            name: true,
            code: true,
            address: true,
            isMain: true,
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

    let resolvedBranchId: string | null = null;
    if (dto.branchId) {
      const targetBranch = await this.prisma.branch.findFirst({
        where: { id: dto.branchId, businessId, isActive: true },
      });
      if (!targetBranch) {
        throw new NotFoundException("Cabang penugasan tidak ditemukan di bisnis Anda.");
      }
      resolvedBranchId = targetBranch.id;
    } else {
      const defaultBranch = await this.prisma.branch.findFirst({
        where: { businessId, isActive: true },
        orderBy: [{ isMain: "desc" }, { createdAt: "asc" }],
      });
      resolvedBranchId = defaultBranch?.id ?? null;
    }

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
        branchId: resolvedBranchId,
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
        branch: {
          select: {
            id: true,
            name: true,
            code: true,
            address: true,
            isMain: true,
          },
        },
      },
    });
  }

  /**
   * Mengubah cabang tempat staf bertugas
   */
  async updateMemberBranch(userId: string, memberId: string, branchId?: string | null) {
    const businessId = await this.getBusinessForUser(userId);
    const member = await this.prisma.businessMember.findFirst({
      where: { id: memberId, businessId },
    });

    if (!member) {
      throw new NotFoundException("Data staf tidak ditemukan di bisnis Anda.");
    }

    let resolvedBranchId: string | null = null;
    if (branchId && branchId.trim()) {
      const branch = await this.prisma.branch.findFirst({
        where: { id: branchId.trim(), businessId, isActive: true },
      });
      if (!branch) {
        throw new NotFoundException("Cabang tujuan tidak ditemukan di bisnis Anda.");
      }
      resolvedBranchId = branch.id;
    }

    return this.prisma.businessMember.update({
      where: { id: memberId },
      data: { branchId: resolvedBranchId },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true, isActive: true },
        },
        branch: {
          select: { id: true, name: true, code: true, address: true, isMain: true },
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
        branch: {
          select: { id: true, name: true, code: true, address: true, isMain: true },
        },
      },
    });

    return updated;
  }
}
