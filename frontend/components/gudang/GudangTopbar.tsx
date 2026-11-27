"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { getNameInitials, useActiveUserProfile } from "@/features/auth/hooks/use-auth-user";
import { useMyBusiness } from "@/features/business/hooks/use-business";
import { useToast } from "@/components/ui/Toast";

const GUDANG_BRANCH_STORAGE_KEY = "baper.gudang.branch.v1";

function subscribeBranchStorage(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSavedGudangBranchId(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(GUDANG_BRANCH_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function getShortName(name?: string | null): string {
  if (!name) return "Petugas Gudang";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return parts[0] || "Petugas Gudang";
  return `${parts[0]} ${parts[1][0]}.`;
}

function getRoleLabel(role?: string | null): string {
  switch ((role || "").toLowerCase()) {
    case "manajer_gudang":
      return "Manajer Gudang";
    case "owner":
    case "pemilik":
      return "Pemilik Bisnis";
    case "super_admin":
      return "Super Admin";
    case "kasir":
      return "Kasir Outlet";
    default:
      return "Staf Logistik";
  }
}

export default function GudangTopbar() {
  const toast = useToast();
  const activeUser = useActiveUserProfile();
  const { data: business, isLoading: isBusinessLoading } = useMyBusiness();

  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const selectorRef = useRef<HTMLDivElement>(null);

  const branches = useMemo(() => business?.branches ?? [], [business?.branches]);
  const assignedBranch =
    business?.assignedBranch ??
    activeUser?.businessMembers?.find((m) => m.branch)?.branch ??
    null;

  const isEmployeePinned = Boolean(assignedBranch);
  const savedBranchId = useSyncExternalStore(
    subscribeBranchStorage,
    getSavedGudangBranchId,
    () => ""
  );

  const resolvedBranchId = selectedBranchId || savedBranchId;

  useEffect(() => {
    if (!selectorOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [selectorOpen]);

  const activeBranch =
    assignedBranch ??
    branches.find((b) => b.id === resolvedBranchId) ??
    branches.find((b) => b.isMain) ??
    branches[0] ??
    null;

  const activeBranchName = isBusinessLoading
    ? "Memuat cabang..."
    : activeBranch?.name || business?.name || "Belum Ada Cabang";

  const handleSelectBranch = (branchId: string) => {
    const chosen = branches.find((b) => b.id === branchId);
    if (!chosen) return;

    setSelectedBranchId(branchId);
    setSelectorOpen(false);
    try {
      window.localStorage.setItem(GUDANG_BRANCH_STORAGE_KEY, branchId);
    } catch {
      // Abaikan
    }
    toast.info(`Tampilan gudang dialihkan ke ${chosen.name}.`, "Cabang Aktif Diperbarui");
  };

  const displayName = getShortName(activeUser?.name);
  const initials = getNameInitials(activeUser?.name, "GD");
  const roleLabel = getRoleLabel(activeUser?.role);

  return (
    <header className="sticky top-0 right-0 w-full px-8 h-16 flex items-center justify-between z-30 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
      {/* Search and Warehouse Navigation */}
      <div className="flex items-center gap-6" />

      {/* Trailing Actions */}
      <div className="flex items-center gap-3.5">
        {/* Warehouse / Branch Selector */}
        <div className="relative hidden sm:block" ref={selectorRef}>
          <button
            type="button"
            onClick={() => setSelectorOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={selectorOpen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#94B9A9]/60 bg-[#F5F8F6] hover:bg-[#E8F3EC]/70 text-body-sm font-label-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">warehouse</span>
            <span className="font-semibold text-on-surface">{activeBranchName}</span>
            <span
              className={`material-symbols-outlined text-[14px] text-tertiary transition-transform ${
                selectorOpen ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>

          {selectorOpen && (
            <div
              role="listbox"
              aria-label="Informasi cabang gudang"
              className="absolute right-0 top-full mt-2 w-80 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0_18px_45px_-14px_rgba(23,32,51,0.35)] z-[70] overflow-hidden py-1"
            >
              <div className="px-4 py-2.5 border-b border-outline-variant/25">
                <p className="text-label-md font-label-md font-bold text-on-surface">
                  {isEmployeePinned ? "Cabang Penugasan Karyawan" : "Pilih Cabang Gudang"}
                </p>
                <p className="text-[11px] text-tertiary">
                  {isEmployeePinned
                    ? "Lokasi cabang diatur oleh Pemilik di menu Kelola Karyawan."
                    : "Pilih cabang untuk melihat konteks operasional gudang."}
                </p>
              </div>

              {isEmployeePinned && activeBranch ? (
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-secondary-container/60 border border-primary/20">
                    <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">storefront</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-label-md font-bold text-on-surface truncate">
                          {activeBranch.name}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F3EC] text-primary shrink-0">
                          Aktif
                        </span>
                      </div>
                      {activeBranch.code && (
                        <p className="text-[11px] font-medium text-primary mt-0.5">
                          {activeBranch.code}
                        </p>
                      )}
                      {activeBranch.address && (
                        <p className="text-[11px] text-tertiary mt-0.5 leading-snug">
                          {activeBranch.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : branches.length === 0 ? (
                <div className="px-4 py-3 text-xs text-tertiary">
                  Belum ada cabang terdaftar untuk bisnis ini.
                </div>
              ) : (
                <div className="py-1">
                  {branches.map((branch) => {
                    const isActive = branch.id === activeBranch?.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleSelectBranch(branch.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          isActive ? "bg-secondary-container/60" : "hover:bg-[#F5F8F6]"
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive ? "bg-primary text-white" : "bg-[#F5F8F6] text-tertiary"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">store</span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-label-md font-semibold text-on-surface truncate">
                            {branch.name}
                          </span>
                          <span className="block text-[11px] text-tertiary truncate">
                            {branch.code || (branch.isMain ? "Cabang Utama" : "Cabang Outlet")}
                          </span>
                        </span>
                        {isActive && (
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            check
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notification Icon Button */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-tertiary hover:bg-surface-container-low transition-colors"
          title="Notifikasi Stok & PO"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-white" />
        </button>

        {/* Profile Tag */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-outline-variant/35">
          <div className="w-9 h-9 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-xs shadow-sm">
            {initials}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-label-sm font-bold text-on-surface leading-tight">
              {displayName}
            </span>
            <span className="text-[10px] text-tertiary leading-tight">
              {roleLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
