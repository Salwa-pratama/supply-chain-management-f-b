import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class TransferItemDto {
  @ApiProperty({ example: "Cold Brew Concentrate" })
  @IsString()
  name!: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  quantity!: number;

  @ApiProperty({ example: "liter" })
  @IsString()
  unit!: string;

  @ApiPropertyOptional({ example: "ingredient-uuid" })
  @IsOptional()
  @IsString()
  ingredientId?: string;
}

export class CreateTransferDto {
  @ApiProperty({ example: "Central Kitchen Senopati (Hub)" })
  @IsString()
  origin!: string;

  @ApiProperty({ example: "Cabang Kopi Kenangan SCBD Lot 8" })
  @IsString()
  destination!: string;

  @ApiPropertyOptional({ example: "Wahyu Hidayat (Kurir)" })
  @IsOptional()
  @IsString()
  driver?: string;

  @ApiPropertyOptional({ example: "Gran Max Blind Van (B 9811 KLC)" })
  @IsOptional()
  @IsString()
  vehicleInfo?: string;

  @ApiPropertyOptional({ example: "10:30 WIB" })
  @IsOptional()
  @IsString()
  departureTime?: string;

  @ApiPropertyOptional({ example: "11:00 WIB" })
  @IsOptional()
  @IsString()
  eta?: string;

  @ApiPropertyOptional({ example: "Surat jalan pengiriman bahan dingin" })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ type: [TransferItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransferItemDto)
  items?: TransferItemDto[];
}
