import { apiClient } from "@/lib/api-client";
import { CreatePoPayload, PurchaseOrderItemData } from "../types/purchase-orders.types";

export async function getPurchaseOrdersApi(): Promise<PurchaseOrderItemData[]> {
  return apiClient<PurchaseOrderItemData[]>("/purchase-orders");
}

export async function getPurchaseOrderByIdApi(id: string): Promise<PurchaseOrderItemData> {
  return apiClient<PurchaseOrderItemData>(`/purchase-orders/${id}`);
}

export async function createPurchaseOrderApi(payload: CreatePoPayload): Promise<PurchaseOrderItemData> {
  return apiClient<PurchaseOrderItemData>("/purchase-orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updatePoStatusBySupplierApi(
  id: string,
  payload: { status: string; deliveryNote?: string; driverInfo?: string }
): Promise<PurchaseOrderItemData> {
  return apiClient<PurchaseOrderItemData>(`/purchase-orders/${id}/supplier-status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function verifyQcAndReceiveApi(
  id: string,
  payload: { qcStatus: string; qcNotes?: string }
): Promise<PurchaseOrderItemData> {
  return apiClient<PurchaseOrderItemData>(`/purchase-orders/${id}/qc-receive`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
