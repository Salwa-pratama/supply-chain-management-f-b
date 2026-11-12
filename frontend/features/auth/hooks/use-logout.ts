"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { clearAuthSession } from "../utils/auth-storage";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    // 1. Bersihkan token & session
    clearAuthSession();

    // 2. Bersihkan TanStack cache profil
    queryClient.removeQueries({ queryKey: ["auth"] });

    // 3. Alihkan ke halaman login
    router.replace("/login");
  };

  return { logout };
}

