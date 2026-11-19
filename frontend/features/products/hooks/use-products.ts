"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/products-api";
import { ProductItem } from "../types/products.types";
import { ApiError } from "@/lib/api-client";

export function useProducts(category?: string) {
  return useQuery<ProductItem[], ApiError>({
    queryKey: ["products", category || "all"],
    queryFn: () => getProductsApi(category),
    staleTime: 60 * 1000,
  });
}
