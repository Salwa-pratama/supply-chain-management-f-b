import { apiClient } from "@/lib/api-client";
import { AuthResponseData, LoginPayload } from "../types/auth.types";

export async function loginApi(payload: LoginPayload): Promise<AuthResponseData> {
  return apiClient<AuthResponseData>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });
}
