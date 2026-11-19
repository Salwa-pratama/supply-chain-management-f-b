import { apiClient } from "@/lib/api-client";
import { CreateBatchPayload, KitchenBatch, UpdateBatchStatusPayload } from "../types/production.types";

export async function fetchKitchenBatches(): Promise<KitchenBatch[]> {
  return apiClient<KitchenBatch[]>("/production/batches");
}

export async function createKitchenBatch(payload: CreateBatchPayload): Promise<KitchenBatch> {
  return apiClient<KitchenBatch>("/production/batches", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateKitchenBatchStatus(payload: UpdateBatchStatusPayload): Promise<KitchenBatch> {
  const { id, ...body } = payload;
  return apiClient<KitchenBatch>(`/production/batches/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
