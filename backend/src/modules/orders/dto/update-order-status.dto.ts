import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "preparing",
  "completed",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export class UpdateOrderStatusDto {
  @ApiProperty({
    enum: ORDER_STATUSES,
    example: "preparing",
    description:
      "Status baru pesanan. Alur kitchen: paid -> preparing -> completed.",
  })
  @IsIn(ORDER_STATUSES, {
    message: `Status harus salah satu dari: ${ORDER_STATUSES.join(", ")}`,
  })
  status!: OrderStatus;
}
