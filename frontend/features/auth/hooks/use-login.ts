"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../api/login";
import { AuthResponseData, LoginPayload } from "../types/auth.types";
import { ApiError } from "@/lib/api-client";
import { saveAuthSession } from "../utils/auth-storage";

interface UseLoginOptions {
  onSuccess?: (data: AuthResponseData) => void;
  onError?: (error: ApiError) => void;
}

export function useLogin(options?: UseLoginOptions) {
  const queryClient = useQueryClient();

  return useMutation<AuthResponseData, ApiError, LoginPayload>({
    mutationFn: (payload) => loginApi(payload),
    onSuccess: (data) => {
      // Simpan JWT access token dan session role di browser (localStorage + cookies)
      if (typeof window !== "undefined" && data.accessToken) {
        saveAuthSession(data.accessToken, data.user);
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
