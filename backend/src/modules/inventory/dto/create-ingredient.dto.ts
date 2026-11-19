import { IsDateString, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateIngredientDto {
  @IsString()
  name!: string;

  @IsString()
  unit!: string; // gram, ml, pcs, kg, liter

  @IsNumber()
  @Min(0)
  stock!: number;

  @IsNumber()
  @Min(0)
  minStock!: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  preferredSupplierId?: string;

  @IsString()
  @IsOptional()
  locationRack?: string;

  @IsDateString()
  @IsOptional()
  expiryDate?: string;
}

export class StockOpnameDto {
  @IsString()
  ingredientId!: string;

  @IsNumber()
  actualStock!: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
