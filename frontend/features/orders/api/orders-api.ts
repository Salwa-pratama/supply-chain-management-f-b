import { apiClient } from "@/lib/api-client";
import { CreateOrderPayload, KasirTodayStats, OrderItemData, OrderStatus } from "../types/orders.types";

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

export async function updateOrderStatusApi(
  id: string,
  status: OrderStatus
): Promise<OrderItemData> {
  return apiClient<OrderItemData>(`/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
