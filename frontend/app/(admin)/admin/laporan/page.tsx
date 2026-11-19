"use client";

import { useAdminStats } from "@/features/dashboard/hooks/use-dashboard";
import { useOrders } from "@/features/orders/hooks/use-orders";

export default function AdminLaporanPage() {
  const { data: stats } = useAdminStats();
  const { data: orders = [] } = useOrders();

  const totalBisnis = stats?.totalBusinesses ?? 1;
  const totalPemasok = stats?.totalSuppliers ?? 1;
  const totalGmv = stats?.platformGmv ?? 0;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Analitik Bisnis &amp; Pertumbuhan Platform
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live Gateway BAPER Platform
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Laporan &amp; Statistik Ekosistem
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Data agregasi pertumbuhan tenant F&amp;B, komisi platform, efisiensi rantai pasok, dan metrik kesehatan operasional.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total GMV Platform</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">
            Rp {Math.round(totalGmv).toLocaleString("id-ID")}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Settlement Akurat
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tenant F&amp;B Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{totalBisnis} Brand</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Database Terdaftar
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Mitra Pemasok Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{totalPemasok} Mitra</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terverifikasi Grade A
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Transaksi Selesai</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{orders.length} Transaksi</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kanal POS
          </span>
        </div>
      </div>
    </>
  );
}
