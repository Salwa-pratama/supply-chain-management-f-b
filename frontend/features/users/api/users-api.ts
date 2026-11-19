import { apiClient } from "@/lib/api-client";
import { UserItem } from "../types/users.types";

export async function fetchUsers(role?: string, search?: string): Promise<UserItem[]> {
  const params = new URLSearchParams();
  if (role && role !== "all") params.append("role", role);
  if (search && search.trim()) params.append("search", search.trim());
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiClient<UserItem[]>(`/users${query}`);
}

export async function toggleUserStatus(id: string): Promise<UserItem> {
  return apiClient<UserItem>(`/users/${id}/status`, {
    method: "PATCH",
  });
}
