import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'owner@baperfnb.com',
    description: 'Email akun yang ingin direset kata sandinya',
  })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email!: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token reset kata sandi yang diterima dari email / halaman reset',
  })
  @IsString()
  @IsNotEmpty({ message: 'Token reset wajib diisi' })
  token!: string;

  @ApiProperty({
    example: 'RahasiaBaru#2025',
    description: 'Kata sandi baru minimal 8 karakter',
  })
  @IsString()
  @MinLength(8, { message: 'Kata sandi minimal 8 karakter' })
  password!: string;
}
