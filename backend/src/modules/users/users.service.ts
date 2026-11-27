import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(role?: string, search?: string) {
    const where: any = {};
    if (role && role !== "all") {
      where.role = role;
    }
    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search.trim() } },
        { email: { contains: search.trim() } },
      ];
    }

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        businesses: {
          select: { id: true, name: true },
        },
        businessMembers: {
          select: {
            role: true,
            business: { select: { id: true, name: true } },
            branch: { select: { id: true, name: true, code: true } },
          },
        },
        supplier: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async toggleStatus(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("Pengguna tidak ditemukan.");
    }

    return this.prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
  }
}
