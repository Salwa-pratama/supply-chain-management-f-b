import { apiClient } from "@/lib/api-client";
import { CreateSupplierItemPayload, SupplierData, SupplierItem } from "../types/suppliers.types";

export async function fetchSuppliers(): Promise<SupplierData[]> {
  const data = await apiClient<SupplierData[]>("/suppliers");
  return (data || []).map((s) => ({
    ...s,
    items: s.supplierItems || s.items || [],
  }));
}

export async function fetchMySupplierProfile(): Promise<SupplierData> {
  return apiClient<SupplierData>("/suppliers/my-profile");
}

export async function fetchMySupplierCatalog(): Promise<SupplierItem[]> {
  return apiClient<SupplierItem[]>("/suppliers/my-catalog");
}

export async function createSupplierItem(payload: CreateSupplierItemPayload): Promise<SupplierItem> {
  return apiClient<SupplierItem>("/suppliers/items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
