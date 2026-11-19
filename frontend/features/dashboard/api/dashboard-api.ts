import { apiClient } from "@/lib/api-client";
import { AdminPlatformStatsData, OwnerOverviewData, ScmPipelineData } from "../types/dashboard.types";

export async function getOwnerOverviewApi(): Promise<OwnerOverviewData> {
  return apiClient<OwnerOverviewData>("/dashboard/owner-overview");
}

export async function getScmPipelineApi(): Promise<ScmPipelineData> {
  return apiClient<ScmPipelineData>("/dashboard/scm-pipeline");
}

export async function getAdminPlatformStatsApi(): Promise<AdminPlatformStatsData> {
  return apiClient<AdminPlatformStatsData>("/dashboard/admin-stats");
}
