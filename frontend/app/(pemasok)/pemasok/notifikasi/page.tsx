"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import {
  AppNotificationCategory,
  NOTIFICATION_CATEGORY_META,
} from "@/lib/notifications";

const CATEGORY_TABS: {
  id: "all" | AppNotificationCategory;
  label: string;
}[] = [
  { id: "all", label: "Semua Notifikasi" },
  { id: "order", label: "Pesanan Masuk (PO)" },
  { id: "logistics", label: "Logistik & Armada" },
  { id: "payment", label: "Pembayaran & Keuangan" },
  { id: "warning", label: "Peringatan Stok" },
  { id: "rfq", label: "Tender & RFQ" },
];

const toneCard: Record<string, string> = {
  primary: "bg-[#E8F3EC] text-primary border-primary/20",
  warning: "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/30",
  blue: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
  neutral: "bg-[#F5F8F6] text-tertiary border-outline-variant/30",
};

const toneBadge: Record<string, string> = {
  primary: "bg-[#E8F3EC] text-primary",
  warning: "bg-[#FFF9E6] text-[#B7791F]",
  blue: "bg-[#EFF6FF] text-[#1D4ED8]",
  neutral: "bg-[#F5F8F6] text-tertiary",
};

export default function PemasokNotifikasiPage() {
  const { items, unreadCount, hydrated, markRead, markAllRead, remove } =
    useNotifications();
  const [activeTab, setActiveTab] =
    useState<(typeof CATEGORY_TABS)[number]["id"]>("all");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
    }
    return map;
  }, [items]);

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? items
        : items.filter((item) => item.category === activeTab),
    [items, activeTab]
  );

  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Pusat Aktivitas &amp; Notifikasi
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                {hydrated ? `${unreadCount} Notifikasi Belum Dibaca` : "Memuat..."}
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Notifikasi &amp; Pembaruan Operasional
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Pantau informasi PO terbaru, pergerakan pengiriman logistik, konfirmasi pembayaran, dan peringatan batas stok bahan baku.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              <span>Tandai Semua Sudah Dibaca</span>
            </button>
            <Link
              href="/pemasok/pengaturan"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span>Preferensi Notifikasi</span>
            </Link>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {CATEGORY_TABS.map((tab) => {
            const count =
              tab.id === "all" ? items.length : counts.get(tab.id) ?? 0;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                  active
                    ? "bg-primary text-white font-bold shadow-sm"
                    : "bg-white border border-outline-variant/35 text-tertiary hover:text-on-surface hover:bg-[#F5F8F6]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    active
                      ? "bg-white/20 text-white"
                      : tab.id === "warning" || tab.id === "order"
                        ? "bg-[#FDF2F2] text-[#B54747]"
                        : "bg-[#F5F8F6] text-tertiary"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="space-y-3">
          {!hydrated ? (
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
              <span className="material-symbols-outlined animate-spin text-3xl text-primary">
                progress_activity
              </span>
              <p className="mt-2 text-body-sm">Memuat notifikasi...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/35 text-center">
              <span className="material-symbols-outlined text-4xl text-tertiary/60">
                notifications_off
              </span>
              <p className="mt-2 text-body-md font-semibold text-on-surface">
                Tidak ada notifikasi di kategori ini.
              </p>
              <p className="text-body-sm text-tertiary">
                Notifikasi baru akan muncul otomatis di sini.
              </p>
            </div>
          ) : (
            filtered.map((n) => {
              const meta = NOTIFICATION_CATEGORY_META[n.category];
              const tone = toneCard[meta.tone];
              return (
                <div
                  key={n.id}
                  className={`p-5 rounded-2xl border transition-all hover:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    n.unread
                      ? "bg-white border-primary/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]"
                      : "bg-[#F9F9FF] border-outline-variant/25 opacity-85"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${tone}`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{n.icon}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-[#172033] text-body-md">{n.title}</h3>
                        {n.unread && (
                          <span
                            className="w-2 h-2 rounded-full bg-primary"
                            title="Belum dibaca"
                          />
                        )}
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            toneBadge[meta.tone]
                          }`}
                        >
                          {n.categoryLabel}
                        </span>
                      </div>

                      <p className="text-body-sm text-tertiary leading-relaxed max-w-3xl">
                        {n.message}
                      </p>

                      <div className="text-xs text-tertiary flex items-center gap-2 pt-0.5">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        <span>{n.timeLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {n.unread && (
                      <button
                        type="button"
                        onClick={() => markRead(n.id)}
                        className="h-10 w-10 rounded-xl border border-outline-variant/40 text-tertiary hover:bg-[#F5F8F6] flex items-center justify-center transition-colors"
                        title="Tandai sudah dibaca"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          mark_email_read
                        </span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => remove(n.id)}
                      className="h-10 w-10 rounded-xl border border-outline-variant/40 text-tertiary hover:bg-[#FDF2F2] hover:text-[#B54747] flex items-center justify-center transition-colors"
                      title="Hapus notifikasi"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                    {n.actionHref && (
                      <Link
                        href={n.actionHref}
                        onClick={() => markRead(n.id)}
                        className="h-10 px-4 rounded-xl border border-primary/30 text-primary hover:bg-[#E8F3EC] text-label-md font-label-md flex items-center gap-1.5 transition-colors font-bold whitespace-nowrap"
                      >
                        <span>{n.actionLabel ?? "Buka"}</span>
                        <span className="material-symbols-outlined text-[16px]">
                          chevron_right
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
