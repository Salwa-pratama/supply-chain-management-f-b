import { apiClient } from "@/lib/api-client";
import { InventoryItem, StockMovementItem } from "../types/inventory.types";

export async function getInventoryApi(): Promise<InventoryItem[]> {
  return apiClient<InventoryItem[]>("/inventory");
}

export async function getMovementsApi(): Promise<StockMovementItem[]> {
  return apiClient<StockMovementItem[]>("/inventory/movements");
}

export async function stockOpnameApi(payload: {
  ingredientId: string;
  actualStock: number;
  notes?: string;
}): Promise<{ ingredient: InventoryItem; diff: number; message: string }> {
  return apiClient("/inventory/opname", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
