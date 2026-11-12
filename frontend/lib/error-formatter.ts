import { ApiError } from "./api-client";

export interface ParsedError {
  title: string;
  message: string;
}

/**
 * Menerjemahkan error teknis sistem / API backend menjadi pesan ramah pengguna (human-readable)
 * dan mencegah kebocoran informasi teknis internal (seperti Prisma/SQL/stack trace) ke UI.
 */
export function formatErrorMessage(
  error: unknown,
  context: "login" | "register" | "general" = "general"
): ParsedError {
  let rawMessage = "";
  let statusCode = 500;

  if (error instanceof ApiError) {
    rawMessage = error.message || "";
    statusCode = error.statusCode;
  } else if (error instanceof Error) {
    rawMessage = error.message || "";
  } else if (typeof error === "string") {
    rawMessage = error;
  }

  const lower = rawMessage.toLowerCase();

  // 1. Deteksi Error Sistem / Prisma / SQL / Koneksi Database
  const isSystemError =
    lower.includes("prisma") ||
    lower.includes("findunique") ||
    lower.includes("database") ||
    lower.includes("connection") ||
    lower.includes("pool") ||
    lower.includes("failed to fetch") ||
    lower.includes("econnrefused") ||
    lower.includes("network") ||
    lower.includes("syntaxerror") ||
    lower.includes("internal server") ||
    statusCode >= 500;

  // 2. Deteksi Email Duplikat (Conflict)
  const isEmailTaken =
    statusCode === 409 ||
    lower.includes("sudah terdaftar") ||
    lower.includes("sudah digunakan") ||
    lower.includes("already exist") ||
    lower.includes("p2002") ||
    lower.includes("unique constraint");

  // 3. Deteksi Kredensial Salah (Unauthorized)
  const isUnauthorized =
    statusCode === 401 ||
    lower.includes("tidak cocok") ||
    lower.includes("salah") ||
    lower.includes("unauthorized") ||
    lower.includes("kredensial") ||
    lower.includes("password salah");

  // Kasus: Email sudah digunakan
  if (isEmailTaken) {
    return {
      title: "Email Sudah Digunakan",
      message: "Email sudah digunakan. Silakan gunakan email lain atau masuk ke akun Anda.",
    };
  }

  // Kasus: Kredensial salah saat login
  if (isUnauthorized || (context === "login" && (statusCode === 400 || lower.includes("not found")))) {
    return {
      title: "Gagal Masuk",
      message: "Terjadi kesalahan, cek ulang password maupun email Anda.",
    };
  }

  // Kasus: Konfirmasi password tidak cocok
  if (lower.includes("konfirmasi kata sandi") || lower.includes("confirm password")) {
    return {
      title: "Kata Sandi Tidak Cocok",
      message: "Konfirmasi kata sandi tidak cocok. Harap periksa kembali.",
    };
  }

  // Kasus: Error Teknis Sistem / Database
  if (isSystemError) {
    return {
      title: "Terjadi Kesalahan",
      message: "Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.",
    };
  }

  // Kasus: Pesan validasi spesifik yang sudah aman & ramah pengguna
  if (rawMessage && rawMessage.length < 150 && !lower.includes("{") && !lower.includes("stack")) {
    return {
      title: context === "register" ? "Pendaftaran Gagal" : "Gagal Memproses",
      message: rawMessage,
    };
  }

  // Default fallback
  return {
    title: "Terjadi Kesalahan",
    message: "Terjadi kesalahan saat memproses permintaan. Silakan periksa kembali data Anda.",
  };
}

