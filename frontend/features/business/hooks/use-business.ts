import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addBusinessMember,
  fetchAllBusinesses,
  fetchBusinessMembers,
  fetchMyBusiness,
  toggleMemberStatus,
  updateMyBusiness,
} from "../api/business-api";
import { AddMemberPayload, BusinessData, BusinessMember } from "../types/business.types";
import { ApiError } from "@/lib/api-client";

export function useMyBusiness() {
  return useQuery<BusinessData, ApiError>({
    queryKey: ["business", "my"],
    queryFn: fetchMyBusiness,
  });
}

export function useAllBusinesses() {
  return useQuery<BusinessData[], ApiError>({
    queryKey: ["business", "all"],
    queryFn: fetchAllBusinesses,
  });
}

export function useBusinessMembers() {
  return useQuery<BusinessMember[], ApiError>({
    queryKey: ["business", "members"],
    queryFn: fetchBusinessMembers,
  });
}

export function useAddBusinessMember() {
  const queryClient = useQueryClient();
  return useMutation<BusinessMember, ApiError, AddMemberPayload>({
    mutationFn: (payload) => addBusinessMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", "members"] });
      queryClient.invalidateQueries({ queryKey: ["business", "my"] });
    },
  });
}

export function useToggleMemberStatus() {
  const queryClient = useQueryClient();
  return useMutation<BusinessMember, ApiError, string>({
    mutationFn: (memberId) => toggleMemberStatus(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", "members"] });
      queryClient.invalidateQueries({ queryKey: ["business", "my"] });
    },
  });
}

export function useUpdateBusiness() {
  const queryClient = useQueryClient();
  return useMutation<BusinessData, ApiError, { name?: string; address?: string; phoneBusiness?: string; description?: string; category?: string }>({
    mutationFn: (payload) => updateMyBusiness(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", "my"] });
      queryClient.invalidateQueries({ queryKey: ["business", "all"] });
    },
  });
}
