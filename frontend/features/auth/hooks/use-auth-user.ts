"use client";

import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/get-me";
import { UserProfile } from "../types/auth.types";
import { ApiError } from "@/lib/api-client";

export function useAuthUser() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("baper_access_token")
      : null;

  return useQuery<UserProfile, ApiError>({
    queryKey: ["auth", "me"],
    queryFn: getMeApi,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}
