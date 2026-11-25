"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import NotificationBell from "@/components/notifications/NotificationBell";

const BRANCHES = [
  {
    id: "senopati",
    name: "Kopi Kenangan Senopati",
    meta: "Cabang Utama #04",
  },
  { id: "scbd", name: "Kopi Kenangan SCBD", meta: "Cabang #07" },
  { id: "kemang", name: "Kopi Kenangan Kemang", meta: "Cabang #11" },
  { id: "all", name: "Semua Cabang", meta: "Konsolidasi Laporan" },
];

const BRANCH_STORAGE_KEY = "baper.branch.v1";

const HELP_STEPS = [
  {
    icon: "inventory_2",
    title: "1. Cek stok & bahan kritis",
    description:
      "Pantau stok bahan baku di menu Stok & Inventaris. Bahan di bawah minimum otomatis ditandai merah.",
  },
  {
    icon: "shopping_bag",
    title: "2. Buat pesanan pasokan",
    description:
      "Gunakan tombol Pesan Bahan Baku atau menu Pembelian Bahan untuk menerbitkan PO ke pemasok mitra.",
  },
  {
    icon: "local_shipping",
    title: "3. Awasi pengiriman & QC",
    description:
      "Pemasok mengonfirmasi PO, lalu gudang melakukan penerimaan dan QC sebelum stok masuk.",
  },
  {
    icon: "point_of_sale",
    title: "4. Jual & tutup shift",
    description:
      "Transaksi kasir otomatis memotong stok sesuai resep (BOM). Rekap penjualan tersedia di Laporan SCM.",
  },
];

export default function PemilikTopbar() {
  const toast = useToast();
  const [branchId, setBranchId] = useState(BRANCHES[0].id);
  const [branchOpen, setBranchOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const branchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(BRANCH_STORAGE_KEY);
      if (saved && BRANCHES.some((branch) => branch.id === saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBranchId(saved);
      }
    } catch {
      // localStorage bisa diblokir; gunakan default.
    }
  }, []);

  useEffect(() => {
    if (!branchOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        branchRef.current &&
        !branchRef.current.contains(event.target as Node)
      ) {
        setBranchOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [branchOpen]);

  useEffect(() => {
    if (!helpOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHelpOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [helpOpen]);

  const activeBranch =
    BRANCHES.find((branch) => branch.id === branchId) ?? BRANCHES[0];

  const handleSelectBranch = (nextId: string) => {
    const next = BRANCHES.find((branch) => branch.id === nextId);
    if (!next) return;

    setBranchId(nextId);
    setBranchOpen(false);

    try {
      window.localStorage.setItem(BRANCH_STORAGE_KEY, nextId);
    } catch {
      // abaikan
    }

    toast.info(
      next.id === "all"
        ? "Tampilan data dialihkan ke konsolidasi seluruh cabang."
        : `Cabang aktif diubah ke ${next.name}.`,
      "Cabang Diperbarui"
    );
  };

  return (
    <>
      <header className="sticky top-0 right-0 w-full px-8 h-16 flex items-center justify-between z-30 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        {/* Switcher, Actions, Profile */}
        <div className="flex ml-auto gap-4">
          {/* Switcher Cabang */}
          <div className="relative" ref={branchRef}>
            <button
              type="button"
              onClick={() => setBranchOpen((value) => !value)}
              aria-haspopup="listbox"
              aria-expanded={branchOpen}
              className="flex items-center gap-2 bg-[#E8F3EC] border border-outline-variant/40 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-secondary-container/50 transition-colors"
            >
              <span
                className="material-symbols-outlined text-[20px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                storefront
              </span>
              <div className="flex flex-col text-left">
                <span className="text-label-sm font-label-sm text-primary font-bold">
                  {activeBranch.name}
                </span>
                <span className="text-[10px] text-tertiary leading-none">
                  {activeBranch.meta}
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[18px] text-primary transition-transform ${
                  branchOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {branchOpen && (
              <div
                role="listbox"
                aria-label="Pilih cabang"
                className="absolute right-0 top-full mt-2 w-72 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0_18px_45px_-14px_rgba(23,32,51,0.35)] z-[70] overflow-hidden py-1"
              >
                <div className="px-4 py-2.5 border-b border-outline-variant/25">
                  <p className="text-label-md font-label-md font-bold text-on-surface">
                    Pilih Cabang Toko
                  </p>
                  <p className="text-[11px] text-tertiary">
                    Data dashboard mengikuti cabang yang dipilih.
                  </p>
                </div>
                {BRANCHES.map((branch) => {
                  const active = branch.id === branchId;
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => handleSelectBranch(branch.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        active
                          ? "bg-secondary-container/60"
                          : "hover:bg-[#F5F8F6]"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          active
                            ? "bg-primary text-white"
                            : "bg-[#F5F8F6] text-tertiary"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {branch.id === "all" ? "hub" : "store"}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-label-md font-label-md font-semibold text-on-surface truncate">
                          {branch.name}
                        </span>
                        <span className="block text-[11px] text-tertiary">
                          {branch.meta}
                        </span>
                      </span>
                      {active && (
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

          {/* Action Button Quick PO */}
          <Link
            href="/pemilik/pembelian"
            className="flex items-center gap-1.5 bg-primary text-surface-container-lowest text-label-md font-label-md px-3.5 py-2 rounded-xl hover:bg-primary-container transition-all shadow-sm active:scale-[0.98]"
            title="Buat pesanan bahan baku ke pemasok"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_shopping_cart
            </span>
            <span>Pesan Bahan Baku</span>
          </Link>

          {/* Trailing Icons */}
          <div className="flex items-center gap-1">
            <NotificationBell
              title="Notifikasi Rantai Pasok"
              buttonClassName="relative p-2 rounded-xl text-tertiary hover:text-on-surface hover:bg-[#F5F8F6] transition-colors"
              iconClassName="text-[22px]"
            />
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              className="p-2 rounded-xl text-tertiary hover:text-on-surface hover:bg-[#F5F8F6] transition-colors"
              title="Bantuan Alur SCM"
              aria-haspopup="dialog"
            >
              <span className="material-symbols-outlined text-[22px]">
                help_outline
              </span>
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/40">
            <div className="w-9 h-9 rounded-full bg-secondary-container border border-primary/20 flex items-center justify-center text-primary font-bold text-label-md">
              KK
            </div>
            <div className="flex flex-col text-left">
              <span className="text-label-md font-label-md text-on-surface leading-tight">
                Budi Hartono
              </span>
              <span className="text-label-sm font-label-sm text-tertiary leading-tight">
                Store Manager
              </span>
            </div>
          </div>
        </div>
      </header>

      {helpOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm"
          role="presentation"
          onClick={() => setHelpOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pemilik-help-title"
            className="w-full max-w-lg bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0_24px_60px_-20px_rgba(23,32,51,0.45)] overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-outline-variant/30">
              <div>
                <h2
                  id="pemilik-help-title"
                  className="text-headline-sm font-headline-sm text-on-surface font-bold"
                >
                  Bantuan Alur SCM
                </h2>
                <p className="text-body-sm text-tertiary mt-0.5">
                  Panduan singkat operasional rantai pasok harian.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="p-1.5 rounded-lg text-tertiary hover:bg-surface-container hover:text-on-surface transition-colors"
                aria-label="Tutup bantuan"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {HELP_STEPS.map((step) => (
                <div key={step.title} className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      {step.icon}
                    </span>
                  </span>
                  <div>
                    <p className="text-label-md font-label-md font-bold text-on-surface">
                      {step.title}
                    </p>
                    <p className="text-body-sm text-tertiary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#F9F9FF] border-t border-outline-variant/30">
              <a
                href="mailto:support@baper.id"
                className="h-10 px-4 rounded-xl border border-outline-variant/50 bg-white text-on-surface text-label-md font-label-md flex items-center gap-1.5 hover:bg-[#F5F8F6] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  support_agent
                </span>
                Hubungi Support
              </a>
              <Link
                href="/pemilik/monitoring"
                onClick={() => setHelpOpen(false)}
                className="h-10 px-4 rounded-xl bg-primary text-white text-label-md font-label-md flex items-center gap-1.5 hover:bg-primary-container transition-colors font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">
                  schema
                </span>
                Buka Monitoring
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
