import { apiClient } from "@/lib/api-client";
import { AddMemberPayload, BusinessData, BusinessMember } from "../types/business.types";

export async function fetchMyBusiness(): Promise<BusinessData> {
  return apiClient<BusinessData>("/business/my");
}

export async function fetchAllBusinesses(): Promise<BusinessData[]> {
  return apiClient<BusinessData[]>("/business/all");
}

export async function fetchBusinessMembers(): Promise<BusinessMember[]> {
  return apiClient<BusinessMember[]>("/business/members");
}

export async function addBusinessMember(payload: AddMemberPayload): Promise<BusinessMember> {
  return apiClient<BusinessMember>("/business/members", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function toggleMemberStatus(memberId: string): Promise<BusinessMember> {
  return apiClient<BusinessMember>(`/business/members/${memberId}/toggle`, {
    method: "PATCH",
  });
}

export async function updateMyBusiness(payload: {
  name?: string;
  address?: string;
  phoneBusiness?: string;
  description?: string;
  category?: string;
}): Promise<BusinessData> {
  return apiClient<BusinessData>("/business/my", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
