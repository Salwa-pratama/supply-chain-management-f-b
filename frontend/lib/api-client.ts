export class ApiError extends Error {
  statusCode: number;
  errors?: unknown;

  constructor(message: string, statusCode: number, errors?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

function getBaseUrl(): string {
  let url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").trim().replace(/\/$/, "");
  // Pastikan selalu menuju prefix /api/v1 dari NestJS
  if (!url.endsWith("/api/v1") && !url.includes("/api/")) {
    url += "/api/v1";
  }
  return url;
}

interface RequestOptions extends RequestInit {
  token?: string;
}

/**
 * Universal API Client Fetcher
 * Terintegrasi dengan format ServiceResponse dari backend NestJS:
 * { statusCode: 200, status: 'success' | 'error', message: '...', data: T }
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, ...restOptions } = options;

  const baseUrl = getBaseUrl();
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}/${endpoint.replace(/^\//, "")}`;

  // Ambil token dari parameter atau localStorage jika di browser
  const activeToken =
    token ||
    (typeof window !== "undefined"
      ? localStorage.getItem("baper_access_token")
      : null);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
    ...customHeaders,
  };

  try {
    const res = await fetch(url, {
      ...restOptions,
      headers,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage =
        json?.message ||
        json?.error ||
        (Array.isArray(json?.errors) ? json.errors.join(", ") : null) ||
        `Permintaan gagal dengan status ${res.status}`;

      throw new ApiError(errorMessage, res.status, json?.errors);
    }

    // Backend NestJS membungkus respons dalam ServiceResponse: { data: T, message: string }
    // Jika formatnya punya .data, kembalikan json.data, jika tidak kembalikan json utuh
    return (json?.data !== undefined ? json.data : json) as T;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    const message =
      err instanceof Error ? err.message : "Terjadi kesalahan pada jaringan";
    throw new ApiError(message, 500);
  }
}
