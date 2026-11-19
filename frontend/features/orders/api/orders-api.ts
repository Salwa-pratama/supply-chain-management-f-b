import { apiClient } from "@/lib/api-client";
import { CreateOrderPayload, KasirTodayStats, OrderItemData } from "../types/orders.types";

export async function getOrdersApi(): Promise<OrderItemData[]> {
  return apiClient<OrderItemData[]>("/orders");
}

export async function getTodayKasirStatsApi(): Promise<KasirTodayStats> {
  return apiClient<KasirTodayStats>("/orders/stats/today");
}

export async function createOrderApi(payload: CreateOrderPayload): Promise<OrderItemData> {
  return apiClient<OrderItemData>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
