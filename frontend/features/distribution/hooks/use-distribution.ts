"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBranchTransfer,
  fetchBranchTransfers,
  updateBranchTransferStatus,
} from "../api/distribution-api";
import { BranchTransfer, CreateTransferPayload } from "../types/distribution.types";
import { ApiError } from "@/lib/api-client";

export function useBranchTransfers() {
  return useQuery<BranchTransfer[], ApiError>({
    queryKey: ["distribution", "transfers"],
    queryFn: fetchBranchTransfers,
    refetchInterval: 30 * 1000,
  });
}

export function useCreateBranchTransfer() {
  const queryClient = useQueryClient();

  return useMutation<BranchTransfer, ApiError, CreateTransferPayload>({
    mutationFn: createBranchTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["distribution", "transfers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "scm-pipeline"] });
    },
  });
}

export function useUpdateBranchTransferStatus() {
  const queryClient = useQueryClient();

  return useMutation<BranchTransfer, ApiError, { id: string; status: string }>({
    mutationFn: updateBranchTransferStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["distribution", "transfers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "scm-pipeline"] });
    },
  });
}
