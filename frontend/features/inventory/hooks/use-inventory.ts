"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInventoryApi, getMovementsApi, stockOpnameApi } from "../api/inventory-api";
import { InventoryItem, StockMovementItem } from "../types/inventory.types";
import { ApiError } from "@/lib/api-client";

export function useInventory() {
  return useQuery<InventoryItem[], ApiError>({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
    staleTime: 30 * 1000,
  });
}

export function useStockMovements() {
  return useQuery<StockMovementItem[], ApiError>({
    queryKey: ["inventory", "movements"],
    queryFn: getMovementsApi,
    staleTime: 30 * 1000,
  });
}

export function useStockOpname(options?: {
  onSuccess?: (res: { diff: number; message: string }) => void;
  onError?: (err: ApiError) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stockOpnameApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (err: ApiError) => {
      if (options?.onError) {
        options.onError(err);
      }
    },
  });
}
