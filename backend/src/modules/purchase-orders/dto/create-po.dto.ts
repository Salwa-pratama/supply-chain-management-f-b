import { Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class PurchaseOrderItemDto {
  @IsString()
  @IsOptional()
  supplierItemId?: string;

  @IsString()
  @IsOptional()
  ingredientId?: string;

  @IsNumber()
  @Min(0.01)
  quantity!: number;

  @IsNumber()
  @Min(0)
  price!: number;
}

export class CreatePurchaseOrderDto {
  @IsString()
  supplierId!: string;

  @IsNumber()
  @Min(0)
  totalAmount!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseOrderItemDto)
  items!: PurchaseOrderItemDto[];
}

export class UpdatePoStatusDto {
  @IsString()
  status!: string; // confirmed, shipped, cancelled

  @IsString()
  @IsOptional()
  deliveryNote?: string;

  @IsString()
  @IsOptional()
  driverInfo?: string;
}

export class QcReceiveDto {
  @IsString()
  qcStatus!: string; // passed, partial, rejected

  @IsString()
  @IsOptional()
  qcNotes?: string;
}
