"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthUser } from "../hooks/use-auth-user";
import {
  getStoredRole,
  getStoredToken,
  clearAuthSession,
} from "../utils/auth-storage";
import { getHomeRouteForRole } from "../utils/role-routes";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

// Nonaktifkan sementara proteksi role untuk tahap fiksasi & perancangan antarmuka
const BYPASS_ROLE_GUARD = true;

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  if (BYPASS_ROLE_GUARD) {
    return <>{children}</>;
  }

  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Normalisasi allowedRoles ke lowercase
  const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase().trim());

  // Verifikasi query profil terkini dari backend
  const { data: user, isError, isLoading: isUserLoading } = useAuthUser();

  useEffect(() => {
    const token = getStoredToken();
    const storedRole = getStoredRole();

    // 1. Jika tidak ada token sama sekali di storage
    if (!token) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    // 2. Jika ada token tapi role yang tersimpan tidak diizinkan
    if (storedRole && !normalizedAllowedRoles.includes(storedRole)) {
      const targetHome = getHomeRouteForRole(storedRole);
      router.replace(targetHome);
      return;
    }

    // 3. Jika token tersimpan & role sesuai, izinkan render awal
    if (storedRole && normalizedAllowedRoles.includes(storedRole)) {
      setIsAuthorized(true);
    }
  }, [pathname, router, normalizedAllowedRoles]);

  // Efek kedua: respon terhadap hasil validasi TanStack Query / backend API
  useEffect(() => {
    if (isError) {
      // Token tidak valid atau kedaluwarsa di backend
      clearAuthSession();
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (user) {
      const activeRole = (user.role || "").toLowerCase().trim();
      if (!normalizedAllowedRoles.includes(activeRole)) {
        setIsAuthorized(false);
        const targetHome = getHomeRouteForRole(activeRole);
        router.replace(targetHome);
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, isError, pathname, router, normalizedAllowedRoles]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-surface-container-lowest gap-3">
        <div className="w-10 h-10 border-4 border-[#137A48]/20 border-t-[#137A48] rounded-full animate-spin" />
        <p className="font-label-md text-label-md text-[#7B8794]">
          Memverifikasi hak akses...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

