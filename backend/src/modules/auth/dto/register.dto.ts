import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'owner@baperfnb.com',
    description: 'Email pengguna',
  })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email!: string;

  @ApiProperty({
    example: 'Rahasia123!',
    description: 'Password minimal 6 karakter',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password!: string;

  @ApiProperty({
    example: 'Budi Pratama',
    description: 'Nama lengkap pengguna / penanggung jawab',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name!: string;

  @ApiPropertyOptional({
    example: 'owner',
    description: 'Role akun (default: owner). Pilihan: owner, pemasok, kasir, manajer_gudang',
    enum: ['owner', 'pemasok', 'kasir', 'manajer_gudang'],
    default: 'owner',
  })
  @IsOptional()
  @IsIn(['owner', 'pemasok', 'kasir', 'manajer_gudang'], {
    message: 'Role yang diizinkan untuk registrasi publik hanya: owner, pemasok, kasir, manajer_gudang',
  })
  role?: string = 'owner';

  @ApiPropertyOptional({
    example: 'Kopi Cerita Jiwa / PT Pangan Makmur Abadi',
    description: 'Nama usaha atau nama PT pemasok',
  })
  @IsOptional()
  @IsString()
  businessName?: string;

  @ApiPropertyOptional({
    example: 'coffee',
    description: 'Kategori usaha F&B atau kategori pemasok',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    example: '08123456789',
    description: 'Nomor WhatsApp atau telepon operasional usaha',
  })
  @IsOptional()
  @IsString()
  whatsapp?: string;
}
