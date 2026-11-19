"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPurchaseOrderApi,
  getPurchaseOrdersApi,
  updatePoStatusBySupplierApi,
  verifyQcAndReceiveApi,
} from "../api/purchase-orders-api";
import { CreatePoPayload, PurchaseOrderItemData } from "../types/purchase-orders.types";
import { ApiError } from "@/lib/api-client";

export function usePurchaseOrders() {
  return useQuery<PurchaseOrderItemData[], ApiError>({
    queryKey: ["purchase-orders"],
    queryFn: getPurchaseOrdersApi,
    staleTime: 30 * 1000,
  });
}

export function useCreatePurchaseOrder(options?: {
  onSuccess?: (data: PurchaseOrderItemData) => void;
  onError?: (err: ApiError) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<PurchaseOrderItemData, ApiError, CreatePoPayload>({
    mutationFn: (payload) => createPurchaseOrderApi(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (err) => {
      if (options?.onError) {
        options.onError(err);
      }
    },
  });
}

export function useUpdatePoStatus(options?: {
  onSuccess?: (data: PurchaseOrderItemData) => void;
  onError?: (err: ApiError) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<
    PurchaseOrderItemData,
    ApiError,
    { id: string; status: string; deliveryNote?: string; driverInfo?: string }
  >({
    mutationFn: ({ id, ...payload }) => updatePoStatusBySupplierApi(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (err) => {
      if (options?.onError) {
        options.onError(err);
      }
    },
  });
}

export function useVerifyQc(options?: {
  onSuccess?: (data: PurchaseOrderItemData) => void;
  onError?: (err: ApiError) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<
    PurchaseOrderItemData,
    ApiError,
    { id: string; qcStatus: string; qcNotes?: string }
  >({
    mutationFn: ({ id, ...payload }) => verifyQcAndReceiveApi(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (err) => {
      if (options?.onError) {
        options.onError(err);
      }
    },
  });
}
