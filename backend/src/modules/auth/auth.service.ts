import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
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

        const contactPhone = dto.phone || dto.whatsapp || null;

        // 2. Jika Owner F&B: Otomatis buat entitas Business & Cabang Utama
        if (assignedRole === 'owner') {
          businessData = await tx.business.create({
            data: {
              userId: user.id,
              name: businessTitle,
              category: dto.category || null,
              phoneBusiness: contactPhone,
            },
          });

          await tx.branch.create({
            data: {
              businessId: businessData.id,
              name: businessTitle,
              code: 'Cabang Utama #01',
              phone: contactPhone,
              isMain: true,
              isActive: true,
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
              phone: contactPhone,
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

  /**
   * Membuat token reset kata sandi yang berlaku 1 jam.
   * Respons selalu generik agar email terdaftar/tidak tidak bisa ditebak.
   */
  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        email,
        resetUrl: null,
        expiresAt: null,
        message:
          'Jika email terdaftar, tautan reset kata sandi telah dibuat. Periksa kotak masuk Anda.',
      };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

    await this.prisma.authToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    const appUrl = (
      process.env.FRONTEND_URL ||
      process.env.APP_URL ||
      'http://localhost:3000'
    ).replace(/\/$/, '');

    return {
      email: user.email,
      resetUrl: `${appUrl}/reset-password?token=${token}`,
      expiresAt,
      message:
        'Tautan reset kata sandi berhasil dibuat. Di environment development, tautan ditampilkan langsung.',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const authToken = await this.prisma.authToken.findFirst({
      where: { token: dto.token },
      include: { user: true },
    });

    if (!authToken) {
      throw new UnauthorizedException(
        'Tautan reset tidak valid atau sudah pernah digunakan.',
      );
    }

    if (authToken.expiresAt.getTime() < Date.now()) {
      await this.prisma.authToken.delete({ where: { id: authToken.id } });
      throw new UnauthorizedException(
        'Tautan reset sudah kedaluwarsa. Silakan minta tautan baru.',
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: authToken.userId },
        data: { passwordHash },
      }),
      this.prisma.authToken.delete({ where: { id: authToken.id } }),
      // Cabut token reset lain milik pengguna yang sama.
      this.prisma.authToken.deleteMany({
        where: {
          userId: authToken.userId,
          token: { not: authToken.token },
          expiresAt: { lt: new Date() },
        },
      }),
    ]);

    return {
      email: authToken.user.email,
      message:
        'Kata sandi berhasil diperbarui. Silakan masuk dengan kata sandi baru Anda.',
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
        businessMembers: {
          where: { isActive: true },
          select: {
            id: true,
            businessId: true,
            branchId: true,
            role: true,
            business: { select: { id: true, name: true } },
            branch: { select: { id: true, name: true, code: true, address: true } },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Data pengguna tidak ditemukan');
    }

    return user;
  }
}
