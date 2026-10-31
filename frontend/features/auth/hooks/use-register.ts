"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerApi } from "../api/register";
import { AuthResponseData, RegisterPayload } from "../types/auth.types";
import { ApiError } from "@/lib/api-client";

interface UseRegisterOptions {
  onSuccess?: (data: AuthResponseData) => void;
  onError?: (error: ApiError) => void;
}

export function useRegister(options?: UseRegisterOptions) {
  const queryClient = useQueryClient();

  return useMutation<AuthResponseData, ApiError, RegisterPayload>({
    mutationFn: (payload) => registerApi(payload),
    onSuccess: (data) => {
      // Simpan JWT access token jika otomatis login setelah register
      if (typeof window !== "undefined" && data.accessToken) {
        localStorage.setItem("baper_access_token", data.accessToken);
        localStorage.setItem("baper_user", JSON.stringify(data.user));
      }

      queryClient.setQueryData(["auth", "me"], data.user);

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
}
