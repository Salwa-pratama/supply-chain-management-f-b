import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddMemberDto {
  @ApiProperty({ example: "Kasir Baru", description: "Nama lengkap staf" })
  @IsNotEmpty({ message: "Nama staf wajib diisi" })
  @IsString()
  name: string;

  @ApiProperty({ example: "kasir2@baperfnb.com", description: "Email akun staf" })
  @IsNotEmpty({ message: "Email staf wajib diisi" })
  @IsEmail({}, { message: "Format email tidak valid" })
  email: string;

  @ApiPropertyOptional({ example: "Staf#2025", description: "Password awal login staf" })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: "kasir", description: "Role staf: 'kasir' atau 'manajer_gudang'" })
  @IsNotEmpty({ message: "Role staf wajib diisi" })
  @IsString()
  role: string;
}
