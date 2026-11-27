"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/get-me";
import { UserProfile } from "../types/auth.types";
import { USER_KEY } from "../utils/auth-storage";
import { ApiError } from "@/lib/api-client";

function subscribeStorage(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getRawStoredUserSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(USER_KEY);
  } catch {
    return null;
  }
}

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

/**
 * Mengembalikan profil user aktif secara hydration-safe:
 * memprioritaskan hasil query /auth/me, lalu fallback ke localStorage setelah mount.
 */
export function useActiveUserProfile(): UserProfile | null {
  const { data: authUser } = useAuthUser();
  const rawStored = useSyncExternalStore(
    subscribeStorage,
    getRawStoredUserSnapshot,
    () => null
  );

  const storedUser = useMemo<UserProfile | null>(() => {
    if (!rawStored) return null;
    try {
      return JSON.parse(rawStored) as UserProfile;
    } catch {
      return null;
    }
  }, [rawStored]);

  return authUser ?? storedUser;
}

export function getNameInitials(name?: string | null, fallback = "BP"): string {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return fallback;
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
