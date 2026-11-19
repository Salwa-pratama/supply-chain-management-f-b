import { IsBoolean, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateSupplierItemDto {
  @IsString()
  name!: string;

  @IsString()
  unit!: string; // kg, liter, pcs, pack

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stockQty?: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
