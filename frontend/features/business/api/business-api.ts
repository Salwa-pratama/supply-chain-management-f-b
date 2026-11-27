import { apiClient } from "@/lib/api-client";
import {
  AddMemberPayload,
  BranchData,
  BusinessData,
  BusinessMember,
  CreateBranchPayload,
} from "../types/business.types";

export async function fetchMyBusiness(): Promise<BusinessData> {
  return apiClient<BusinessData>("/business/my");
}

export async function fetchAllBusinesses(): Promise<BusinessData[]> {
  return apiClient<BusinessData[]>("/business/all");
}

export async function fetchBusinessBranches(): Promise<BranchData[]> {
  return apiClient<BranchData[]>("/business/branches");
}

export async function createBusinessBranch(payload: CreateBranchPayload): Promise<BranchData> {
  return apiClient<BranchData>("/business/branches", {
    method: "POST",
    body: JSON.stringify(payload),
  });
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

export async function updateMemberBranch(
  memberId: string,
  branchId: string | null
): Promise<BusinessMember> {
  return apiClient<BusinessMember>(`/business/members/${memberId}/branch`, {
    method: "PATCH",
    body: JSON.stringify({ branchId }),
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
