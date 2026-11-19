import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
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
  @ApiProperty({ example: "Cold Brew Extraction Concentrate (30L)" })
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

  @ApiPropertyOptional({ example: "120 Porsi Cold Brew" })
  @IsOptional()
  @IsString()
  plannedYield?: string;

  @ApiPropertyOptional({ example: "Steeping 14 Jam pada suhu 4°C" })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ type: [BatchItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BatchItemDto)
  items?: BatchItemDto[];
}
