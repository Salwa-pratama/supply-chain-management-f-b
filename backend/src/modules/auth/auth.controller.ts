import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ServiceResponse } from '../../common/models/service_response';
import { AuthService } from './auth.service';
import { AuthResponseDataDto, UserProfileDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrasi Akun Baru',
    description: 'Mendaftarkan akun baru ke sistem SCM. Role default adalah `owner`. Role yang diizinkan publik: `owner`, `pemasok`, `kasir`, `manajer_gudang`.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registrasi berhasil dan token akses langsung diberikan.',
    type: AuthResponseDataDto,
  })
  @ApiConflictResponse({ description: 'Email sudah terdaftar.' })
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto);
    return ServiceResponse.success(
      'Registrasi berhasil dilakukan',
      result,
      StatusCodes.CREATED,
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login Pengguna',
    description: 'Masuk ke sistem menggunakan email dan password untuk mendapatkan JWT Bearer token.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login berhasil, token JWT dikembalikan.',
    type: AuthResponseDataDto,
  })
  @ApiUnauthorizedResponse({ description: 'Email atau password salah / akun tidak aktif.' })
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return ServiceResponse.success(
      'Login berhasil',
      result,
      StatusCodes.OK,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Cek Profil Pengguna (Me)',
    description: 'Mengambil data profil pengguna yang sedang login berdasarkan Authorization Bearer Token.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data profil berhasil diambil.',
    type: UserProfileDto,
  })
  @ApiUnauthorizedResponse({ description: 'Token tidak valid, kedaluwarsa, atau tidak dikirim.' })
  async getProfile(@CurrentUser('id') userId: string) {
    const result = await this.authService.getProfile(userId);
    return ServiceResponse.success(
      'Profil berhasil dimuat',
      result,
      StatusCodes.OK,
    );
  }
}
