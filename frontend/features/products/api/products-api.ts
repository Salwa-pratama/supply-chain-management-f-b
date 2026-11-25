import { apiClient } from "@/lib/api-client";
import { ProductItem } from "../types/products.types";

export async function getProductsApi(category?: string): Promise<ProductItem[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiClient<ProductItem[]>(`/products${query}`);
}

export async function createProductApi(payload: {
  name: string;
  description?: string;
  price: number;
  category?: string;
  isAvailable?: boolean;
  ingredients?: { ingredientId: string; qtyPerUnit: number }[];
}): Promise<ProductItem> {
  return apiClient<ProductItem>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateProductApi(params: {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  isAvailable?: boolean;
  ingredients?: { ingredientId: string; qtyPerUnit: number }[];
}): Promise<ProductItem> {
  const { id, ...body } = params;
  return apiClient<ProductItem>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteProductApi(id: string): Promise<{
  success: boolean;
  softDeleted?: boolean;
  message?: string;
}> {
  return apiClient<{
    success: boolean;
    softDeleted?: boolean;
    message?: string;
  }>(`/products/${id}`, {
    method: "DELETE",
  });
}
