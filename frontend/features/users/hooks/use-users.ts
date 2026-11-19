import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, toggleUserStatus } from "../api/users-api";
import { UserItem } from "../types/users.types";
import { ApiError } from "@/lib/api-client";

export function useUsers(role?: string, search?: string) {
  return useQuery<UserItem[], ApiError>({
    queryKey: ["users", role, search],
    queryFn: () => fetchUsers(role, search),
  });
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient();
  return useMutation<UserItem, ApiError, string>({
    mutationFn: (id) => toggleUserStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
