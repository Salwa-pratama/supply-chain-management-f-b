import { apiClient } from "@/lib/api-client";
import { BranchTransfer, CreateTransferPayload } from "../types/distribution.types";

export async function fetchBranchTransfers(): Promise<BranchTransfer[]> {
  return apiClient<BranchTransfer[]>("/distribution/transfers");
}

export async function createBranchTransfer(payload: CreateTransferPayload): Promise<BranchTransfer> {
  return apiClient<BranchTransfer>("/distribution/transfers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateBranchTransferStatus(params: { id: string; status: string }): Promise<BranchTransfer> {
  return apiClient<BranchTransfer>(`/distribution/transfers/${params.id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: params.status }),
  });
}
