import { apiClient } from "@/lib/api-client";
import { AuthResponseData, RegisterPayload } from "../types/auth.types";

export async function registerApi(payload: RegisterPayload): Promise<AuthResponseData> {
  return apiClient<AuthResponseData>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role || "owner",
      businessName: payload.businessName,
      category: payload.category,
      whatsapp: payload.whatsapp,
    }),
  });
}
