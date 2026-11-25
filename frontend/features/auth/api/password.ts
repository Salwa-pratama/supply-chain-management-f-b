import { apiClient } from "@/lib/api-client";

export interface ForgotPasswordResult {
  email: string;
  resetUrl: string | null;
  expiresAt: string | null;
  message: string;
}

export interface ResetPasswordResult {
  email: string;
  message: string;
}

export async function forgotPasswordApi(
  email: string
): Promise<ForgotPasswordResult> {
  return apiClient<ForgotPasswordResult>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPasswordApi(
  token: string,
  password: string
): Promise<ResetPasswordResult> {
  return apiClient<ResetPasswordResult>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
}
