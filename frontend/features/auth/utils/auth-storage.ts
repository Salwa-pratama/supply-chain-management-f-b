import { UserProfile } from "../types/auth.types";

export const TOKEN_KEY = "baper_access_token";
export const USER_KEY = "baper_user";
export const ROLE_KEY = "baper_role";

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

/**
 * Menyimpan sesi login (token, data user, dan role) ke localStorage dan Cookie
 * agar dapat dibaca baik oleh browser (client) maupun Next.js Middleware (Edge/SSR).
 */
export function saveAuthSession(accessToken: string, user: UserProfile) {
  if (typeof window === "undefined") return;

  const role = (user.role || "").toLowerCase().trim();

  // Simpan di LocalStorage
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(ROLE_KEY, role);

  // Simpan di Cookie untuk Next.js Middleware
  setCookie(TOKEN_KEY, accessToken);
  setCookie(ROLE_KEY, role);
  setCookie(USER_KEY, JSON.stringify(user));
}

/**
 * Menghapus seluruh sesi autentikasi dari localStorage dan Cookie.
 */
export function clearAuthSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);

  deleteCookie(TOKEN_KEY);
  deleteCookie(ROLE_KEY);
  deleteCookie(USER_KEY);
}

/**
 * Mengambil profil user yang tersimpan di LocalStorage.
 */
export function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

/**
 * Mengambil role user yang tersimpan.
 */
export function getStoredRole(): string | null {
  if (typeof window === "undefined") return null;
  const directRole = localStorage.getItem(ROLE_KEY);
  if (directRole) return directRole.toLowerCase().trim();

  const user = getStoredUser();
  return user?.role ? String(user.role).toLowerCase().trim() : null;
}

/**
 * Mengambil JWT access token.
 */
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

