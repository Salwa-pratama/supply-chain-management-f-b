import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getHomeRouteForRole,
  isAuthRoute,
  isProtectedRoute,
  isRouteAllowedForRole,
} from "./features/auth/utils/role-routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("baper_access_token")?.value;
  const role = request.cookies.get("baper_role")?.value;

  // 1. Jika pengguna sudah login dan mencoba membuka halaman /login atau /daftar
  if (token && role && isAuthRoute(pathname)) {
    const targetHome = getHomeRouteForRole(role);
    return NextResponse.redirect(new URL(targetHome, request.url));
  }

  // 2. Jika mengakses rute terproteksi (dashboard/portal operasional)
  if (isProtectedRoute(pathname)) {
    // 2a. Belum login -> redirect ke /login dengan callbackUrl
    if (!token || !role) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2b. Sudah login tetapi role tidak memiliki hak akses ke halaman ini
    if (!isRouteAllowedForRole(pathname, role)) {
      const targetHome = getHomeRouteForRole(role);
      return NextResponse.redirect(new URL(targetHome, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/pemilik/:path*",
    "/gudang/:path*",
    "/pemasok/:path*",
    "/kasir/:path*",
    "/login",
    "/daftar",
  ],
};

