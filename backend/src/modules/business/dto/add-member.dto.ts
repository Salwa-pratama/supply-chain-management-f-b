import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

  @ApiPropertyOptional({ description: "ID cabang tempat staf bertugas" })
  @IsOptional()
  @IsString()
  branchId?: string;
}

export class UpdateMemberBranchDto {
  @ApiPropertyOptional({ description: "ID cabang tujuan penugasan staf (atau null untuk melepas penugasan cabang)" })
  @IsOptional()
  @IsString()
  branchId?: string | null;
}

export class CreateBranchDto {
  @ApiProperty({ example: "Kopi Kenangan Menteng #12", description: "Nama cabang" })
  @IsNotEmpty({ message: "Nama cabang wajib diisi" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: "Cabang #12", description: "Kode atau label cabang" })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ example: "Jl. Menteng Raya No. 10, Jakarta Pusat", description: "Alamat cabang" })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: "081234567899", description: "Nomor telepon cabang" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: false, description: "Apakah cabang utama" })
  @IsOptional()
  @IsBoolean()
  isMain?: boolean;
}
