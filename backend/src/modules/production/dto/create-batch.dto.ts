import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class BatchItemDto {
  @ApiProperty({ example: "Biji Kopi Arabika Lintong" })
  @IsString()
  name!: string;

  @ApiProperty({ example: 3.5 })
  @IsNumber()
  quantity!: number;

  @ApiProperty({ example: "kg" })
  @IsString()
  unit!: string;

  @ApiPropertyOptional({ example: "ingredient-uuid" })
  @IsOptional()
  @IsString()
  ingredientId?: string;
}

export class CreateBatchDto {
  @ApiPropertyOptional({ example: "product-uuid", description: "ID produk menu kasir yang diproduksi" })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional({ example: 30, description: "Target jumlah porsi produk" })
  @IsOptional()
  @IsInt()
  @Min(1)
  targetQty?: number;

  @ApiProperty({ example: "Produksi Kopi Kenangan Mantan (Aren Latte)" })
  @IsString()
  recipeName!: string;

  @ApiPropertyOptional({ example: "Central Bar Extraction" })
  @IsOptional()
  @IsString()
  station?: string;

  @ApiPropertyOptional({ example: "Fahmi Nugraha (Barista Lead)" })
  @IsOptional()
  @IsString()
  operator?: string;

  @ApiPropertyOptional({ example: "60 Porsi Aren Latte" })
  @IsOptional()
  @IsString()
  plannedYield?: string;

  @ApiPropertyOptional({ example: "Steeping 14 Jam pada suhu 4°C" })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    example: false,
    description: "Jika true, stok bahan baku gudang langsung dipotong saat batch dibuat",
  })
  @IsOptional()
  @IsBoolean()
  deductIngredients?: boolean;

  @ApiPropertyOptional({ type: [BatchItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BatchItemDto)
  items?: BatchItemDto[];
}
