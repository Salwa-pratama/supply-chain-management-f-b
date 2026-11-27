"use client";

import AppSidebar from "@/components/layout/AppSidebar";
import { getNameInitials, useActiveUserProfile } from "@/features/auth/hooks/use-auth-user";
import { useMyBusiness } from "@/features/business/hooks/use-business";

export default function GudangSidebar() {
  const activeUser = useActiveUserProfile();
  const { data: business } = useMyBusiness();

  const assignedBranch =
    business?.assignedBranch ??
    activeUser?.businessMembers?.find((m) => m.branch)?.branch ??
    business?.branches?.find((b) => b.isMain) ??
    business?.branches?.[0] ??
    null;

  const name = activeUser?.name || "Petugas Gudang";
  const title =
    activeUser?.role === "owner" || activeUser?.role === "pemilik"
      ? "Pemilik Bisnis (Mode Gudang)"
      : "Manager Gudang & Logistik";
  const location = assignedBranch?.name || business?.name || "Memuat lokasi cabang...";

  return (
    <AppSidebar
      role="gudang"
      userProfile={{
        name,
        title,
        initials: getNameInitials(name, "GD"),
        location,
      }}
    />
  );
}
