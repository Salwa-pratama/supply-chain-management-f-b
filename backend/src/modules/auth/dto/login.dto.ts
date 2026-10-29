import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'owner@baperfnb.com',
    description: 'Email pengguna',
  })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email!: string;

  @ApiProperty({
    example: 'Rahasia123!',
    description: 'Password pengguna',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  password!: string;
}
