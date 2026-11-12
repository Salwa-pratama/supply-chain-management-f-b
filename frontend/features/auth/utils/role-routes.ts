/**
 * Mapping halaman utama (dashboard) untuk masing-masing peran pengguna.
 */
export const ROLE_HOME_MAP: Record<string, string> = {
  super_admin: "/admin/dashboard",
  owner: "/pemilik/dashboard",
  pemilik: "/pemilik/dashboard",
  manajer_gudang: "/gudang/dashboard",
  pemasok: "/pemasok/dashboard",
  kasir: "/kasir",
};

export const DEFAULT_REDIRECT = "/pemilik/dashboard";

/**
 * Mendapatkan route dashboard utama berdasarkan role pengguna.
 */
export function getHomeRouteForRole(role?: string | null): string {
  if (!role) return "/login";
  const normalizedRole = role.toLowerCase().trim();
  return ROLE_HOME_MAP[normalizedRole] ?? DEFAULT_REDIRECT;
}

/**
 * Daftar aturan izin akses rute per prefix URL.
 * super_admin memiliki akses supervisi ke seluruh portal operasional.
 */
export const ROUTE_PERMISSIONS: { prefix: string; allowedRoles: string[] }[] = [
  {
    prefix: "/admin",
    allowedRoles: ["super_admin"],
  },
  {
    prefix: "/pemilik",
    allowedRoles: ["owner", "pemilik", "super_admin"],
  },
  {
    prefix: "/gudang",
    allowedRoles: ["manajer_gudang", "owner", "pemilik", "super_admin"],
  },
  {
    prefix: "/pemasok",
    allowedRoles: ["pemasok", "super_admin"],
  },
  {
    prefix: "/kasir",
    allowedRoles: ["kasir", "owner", "pemilik", "super_admin"],
  },
];

/**
 * Validasi apakah role tertentu memiliki izin untuk mengakses pathname yang diminta.
 */
export function isRouteAllowedForRole(pathname: string, role?: string | null): boolean {
  if (!role) return false;
  const normalizedRole = role.toLowerCase().trim();

  // Cari rule yang cocok dengan prefix URL (misal /pemilik, /admin, dst)
  const matchedRule = ROUTE_PERMISSIONS.find((rule) =>
    pathname === rule.prefix || pathname.startsWith(rule.prefix + "/")
  );

  // Jika URL tidak termasuk dalam rute berizin khusus, anggap publik
  if (!matchedRule) {
    return true;
  }

  return matchedRule.allowedRoles.includes(normalizedRole);
}

/**
 * Cek apakah URL termasuk area terproteksi yang wajib login.
 */
export function isProtectedRoute(pathname: string): boolean {
  return ROUTE_PERMISSIONS.some(
    (rule) => pathname === rule.prefix || pathname.startsWith(rule.prefix + "/")
  );
}

/**
 * Cek apakah URL merupakan halaman autentikasi (login atau daftar).
 */
export function isAuthRoute(pathname: string): boolean {
  return pathname === "/login" || pathname === "/daftar";
}

