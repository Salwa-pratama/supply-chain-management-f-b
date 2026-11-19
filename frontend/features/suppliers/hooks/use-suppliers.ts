import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSupplierItem,
  fetchMySupplierCatalog,
  fetchMySupplierProfile,
  fetchSuppliers,
  updateMySupplierProfile,
} from "../api/suppliers-api";
import { CreateSupplierItemPayload, SupplierData, SupplierItem } from "../types/suppliers.types";
import { ApiError } from "@/lib/api-client";

export function useSuppliers() {
  return useQuery<SupplierData[], ApiError>({
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
  });
}

export function useMySupplierProfile() {
  return useQuery<SupplierData, ApiError>({
    queryKey: ["supplier", "my-profile"],
    queryFn: fetchMySupplierProfile,
  });
}

export function useMySupplierCatalog() {
  return useQuery<SupplierItem[], ApiError>({
    queryKey: ["supplier", "my-catalog"],
    queryFn: fetchMySupplierCatalog,
  });
}

export function useCreateSupplierItem() {
  const queryClient = useQueryClient();
  return useMutation<SupplierItem, ApiError, CreateSupplierItemPayload>({
    mutationFn: (payload) => createSupplierItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier", "my-catalog"] });
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}

export function useUpdateSupplierProfile() {
  const queryClient = useQueryClient();
  return useMutation<SupplierData, ApiError, { name?: string; phone?: string; address?: string; category?: string }>({
    mutationFn: (payload) => updateMySupplierProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier", "my-profile"] });
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}
