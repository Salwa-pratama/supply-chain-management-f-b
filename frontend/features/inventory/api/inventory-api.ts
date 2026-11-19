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

export async function createIngredientApi(payload: {
  name: string;
  unit: string;
  stock?: number;
  minStock?: number;
  category?: string;
  locationRack?: string;
  preferredSupplierId?: string;
}): Promise<InventoryItem> {
  return apiClient<InventoryItem>("/inventory", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function dispatchKitchenApi(payload: {
  ingredientId: string;
  quantity: number;
  station?: string;
  notes?: string;
}): Promise<{ ingredient: InventoryItem; message: string }> {
  return apiClient<{ ingredient: InventoryItem; message: string }>("/inventory/dispatch-kitchen", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
