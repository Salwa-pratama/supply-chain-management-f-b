"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../api/login";
import { AuthResponseData, LoginPayload } from "../types/auth.types";
import { ApiError } from "@/lib/api-client";

interface UseLoginOptions {
  onSuccess?: (data: AuthResponseData) => void;
  onError?: (error: ApiError) => void;
}

export function useLogin(options?: UseLoginOptions) {
  const queryClient = useQueryClient();

  return useMutation<AuthResponseData, ApiError, LoginPayload>({
    mutationFn: (payload) => loginApi(payload),
    onSuccess: (data) => {
      // Simpan JWT access token di browser
      if (typeof window !== "undefined" && data.accessToken) {
        localStorage.setItem("baper_access_token", data.accessToken);
        localStorage.setItem("baper_user", JSON.stringify(data.user));
      }

      // Update cache user profile
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
