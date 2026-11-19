"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAdminPlatformStatsApi,
  getOwnerOverviewApi,
  getScmPipelineApi,
} from "../api/dashboard-api";
import {
  AdminPlatformStatsData,
  OwnerOverviewData,
  ScmPipelineData,
} from "../types/dashboard.types";
import { ApiError } from "@/lib/api-client";

export function useOwnerOverview() {
  return useQuery<OwnerOverviewData, ApiError>({
    queryKey: ["dashboard", "owner-overview"],
    queryFn: getOwnerOverviewApi,
    refetchInterval: 30 * 1000,
  });
}

export function useScmPipeline() {
  return useQuery<ScmPipelineData, ApiError>({
    queryKey: ["dashboard", "scm-pipeline"],
    queryFn: getScmPipelineApi,
    refetchInterval: 15 * 1000,
  });
}

export function useAdminStats() {
  return useQuery<AdminPlatformStatsData, ApiError>({
    queryKey: ["dashboard", "admin-stats"],
    queryFn: getAdminPlatformStatsApi,
    staleTime: 60 * 1000,
  });
}
