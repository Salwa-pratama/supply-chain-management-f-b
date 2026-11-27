"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createKitchenBatch,
  fetchKitchenBatches,
  updateKitchenBatchStatus,
} from "../api/production-api";
import { CreateBatchPayload, KitchenBatch, UpdateBatchStatusPayload } from "../types/production.types";
import { ApiError } from "@/lib/api-client";

export function useProductionBatches() {
  return useQuery<KitchenBatch[], ApiError>({
    queryKey: ["production", "batches"],
    queryFn: fetchKitchenBatches,
    refetchInterval: 30 * 1000,
  });
}

export function useCreateKitchenBatch() {
  const queryClient = useQueryClient();

  return useMutation<KitchenBatch, ApiError, CreateBatchPayload>({
    mutationFn: createKitchenBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["production", "batches"] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", "movements"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "owner-overview"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "scm-pipeline"] });
    },
  });
}

export function useUpdateKitchenBatchStatus() {
  const queryClient = useQueryClient();

  return useMutation<KitchenBatch, ApiError, UpdateBatchStatusPayload>({
    mutationFn: updateKitchenBatchStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["production", "batches"] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", "movements"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "owner-overview"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "scm-pipeline"] });
    },
  });
}
