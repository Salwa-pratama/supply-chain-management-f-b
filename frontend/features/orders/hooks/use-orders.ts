"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrderApi, getOrdersApi, getTodayKasirStatsApi, updateOrderStatusApi } from "../api/orders-api";
import { CreateOrderPayload, KasirTodayStats, OrderItemData, OrderStatus } from "../types/orders.types";
import { ApiError } from "@/lib/api-client";

export function useOrders() {
  return useQuery<OrderItemData[], ApiError>({
    queryKey: ["orders"],
    queryFn: getOrdersApi,
    staleTime: 30 * 1000,
  });
}

export function useKasirStats() {
  return useQuery<KasirTodayStats, ApiError>({
    queryKey: ["orders", "stats", "today"],
    queryFn: getTodayKasirStatsApi,
    refetchInterval: 15 * 1000,
  });
}

export function useCreateOrder(options?: {
  onSuccess?: (data: OrderItemData) => void;
  onError?: (err: ApiError) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<OrderItemData, ApiError, CreateOrderPayload>({
    mutationFn: (payload) => createOrderApi(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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

export function useUpdateOrderStatus(options?: {
  onSuccess?: (data: OrderItemData) => void;
  onError?: (err: ApiError) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<
    OrderItemData,
    ApiError,
    { id: string; status: OrderStatus }
  >({
    mutationFn: ({ id, status }) => updateOrderStatusApi(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options?.onSuccess) options.onSuccess(data);
    },
    onError: (err) => {
      if (options?.onError) options.onError(err);
    },
  });
}
