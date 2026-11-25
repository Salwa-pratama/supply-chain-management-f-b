"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import {
  runProgressTask,
  useProgressToast,
} from "@/components/ui/ProgressToast";
import NotificationBell from "@/components/notifications/NotificationBell";

interface AdminPlatformStats {
  totalBusinesses: number;
  totalSuppliers: number;
  totalUsers: number;
  platformGmv: number;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AdminTopbar() {
  const progress = useProgressToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);

    try {
      await runProgressTask<AdminPlatformStats | null>(progress, {
        title: "Sinkronisasi Database",
        icon: "sync",
        steps: [
          {
            message: "Membuka koneksi aman ke database...",
            run: async () => {
              await wait(420);
              return null;
            },
          },
          {
            message: "Menarik data pengguna, bisnis & pemasok...",
            run: () =>
              apiClient<AdminPlatformStats>("/dashboard/admin-stats", {
                cache: "no-store",
              }),
          },
          {
            message: "Menyegarkan cache & tampilan dashboard...",
            run: async () => {
              await queryClient.invalidateQueries();
              router.refresh();
              await wait(420);
              return null;
            },
          },
        ],
        successTitle: "Sinkronisasi selesai",
        successMessage: (results) => {
          const stats = results[1];
          if (!stats) {
            return "Data terbaru berhasil dimuat dari database.";
          }

          return `${stats.totalUsers.toLocaleString("id-ID")} pengguna · ${stats.totalBusinesses.toLocaleString("id-ID")} bisnis · ${stats.totalSuppliers.toLocaleString("id-ID")} pemasok tersinkronkan.`;
        },
        errorTitle: "Sinkronisasi gagal",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <header className="sticky top-0 right-0 w-full px-8 h-16 flex items-center justify-between z-30 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
      {/* Server Status Indicator & Search */}

      {/* Trailing Actions & Profile */}
      <div className="flex ml-auto gap-3.5">
        {/* Quick Refresh / Health Trigger */}
        <button
          type="button"
          onClick={handleSync}
          disabled={isSyncing}
          aria-busy={isSyncing}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:cursor-wait disabled:opacity-70"
          title={
            isSyncing
              ? "Sinkronisasi sedang berjalan..."
              : "Sinkronisasi Data Realtime"
          }
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isSyncing ? "animate-spin [animation-duration:1.4s]" : ""
            }`}
          >
            sync
          </span>
        </button>
        {/* Notification Bell */}
        <NotificationBell
          title="Notifikasi Sistem"
          buttonClassName="relative w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
        />
        {/* Divider */}
        <div className="h-6 w-px bg-outline-variant/40 mx-1" />
        {/* Super Admin Profile Anchor */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-surface-container-lowest font-bold text-sm shadow-sm ring-2 ring-secondary-container">
            AP
          </div>
          <div className="flex flex-col text-left">
            <span className="font-label-lg text-label-lg text-on-surface leading-tight">
              Super Admin Utama
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              Aditya P. (ID: #SA-01)
            </span>
          </div>
          <button className="text-tertiary hover:text-on-surface">
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
      </div>
    </header>
  );
}
