import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar di sistem');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);
    const assignedRole = dto.role || 'owner';
    const businessTitle = dto.businessName?.trim() || `${dto.name} Bisnis`;

    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. Buat akun pengguna
        const user = await tx.user.create({
          data: {
            email,
            passwordHash,
            name: dto.name,
            role: assignedRole,
            isActive: true,
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        });

        let businessData = null;
        let supplierData = null;

        // 2. Jika Owner F&B: Otomatis buat entitas Business
        if (assignedRole === 'owner') {
          businessData = await tx.business.create({
            data: {
              userId: user.id,
              name: businessTitle,
              category: dto.category || null,
              phoneBusiness: dto.whatsapp || null,
            },
          });
        }

        // 3. Jika Pemasok: Otomatis buat entitas Supplier
        if (assignedRole === 'pemasok') {
          supplierData = await tx.supplier.create({
            data: {
              userId: user.id,
              name: businessTitle,
              category: dto.category || null,
              phone: dto.whatsapp || null,
              isActive: true,
            },
          });
        }

        // 4. Generate JWT token akses
        const tokenPayload: JwtPayload = {
          sub: user.id,
          email: user.email,
          role: user.role,
        };

        const accessToken = this.jwtService.sign(tokenPayload);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 1);

        await tx.authToken.create({
          data: {
            userId: user.id,
            token: accessToken,
            expiresAt,
          },
        });

        return {
          user,
          business: businessData,
          supplier: supplierData,
          accessToken,
        };
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Gagal membuat akun',
      );
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Akun Anda dinonaktifkan, silakan hubungi administrator');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const tokenPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(tokenPayload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    await this.prisma.authToken.create({
      data: {
        userId: user.id,
        token: accessToken,
        expiresAt,
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
      accessToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Data pengguna tidak ditemukan');
    }

    return user;
  }
}
