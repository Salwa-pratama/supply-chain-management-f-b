"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProductApi, deleteProductApi, getProductsApi, updateProductApi } from "../api/products-api";
import { ProductItem } from "../types/products.types";
import { ApiError } from "@/lib/api-client";

export function useProducts(category?: string) {
  return useQuery<ProductItem[], ApiError>({
    queryKey: ["products", category || "all"],
    queryFn: () => getProductsApi(category),
    staleTime: 60 * 1000,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
