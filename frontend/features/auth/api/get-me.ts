import { apiClient } from "@/lib/api-client";
import { UserProfile } from "../types/auth.types";

export async function getMeApi(): Promise<UserProfile> {
  return apiClient<UserProfile>("/auth/me");
}
