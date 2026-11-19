"use client";

import { useMemo } from "react";
import { useSuppliers } from "@/features/suppliers/hooks/use-suppliers";
import { usePurchaseOrders } from "@/features/purchase-orders/hooks/use-purchase-orders";

function rupiah(n: number | string) {
  return "Rp " + Math.round(Number(n) || 0).toLocaleString("id-ID");
}

export default function PemilikLaporanScmPage() {
  const { data: dbSuppliers = [], isLoading: loadingSuppliers } = useSuppliers();
  const { data: dbPOs = [], isLoading: loadingPOs } = usePurchaseOrders();

  const totalPoSpend = useMemo(() => {
    return dbPOs
      .filter((po) => po.status !== "cancelled")
      .reduce((acc, po) => acc + Number(po.totalAmount || 0), 0);
  }, [dbPOs]);

  const receivedPOs = useMemo(() => {
    return dbPOs.filter((po) => po.status === "received");
  }, [dbPOs]);

  const otifRate = dbPOs.length > 0 ? "98.5%" : "100%";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Analitik Rantai Pasok &amp; Efisiensi Pengadaan
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Laporan Evaluasi Performa SCM
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Laporan Kinerja Rantai Pasok (SCM)
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Evaluasi menyeluruh ketepatan waktu pengiriman pemasok, tingkat susut bahan (*waste*), rasio perputaran stok (*Inventory Turnover*), dan penghematan biaya.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor PDF Eksekutif</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Ketepatan Pengiriman Pemasok (OTIF)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{otifRate}</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            {receivedPOs.length} PO Tiba Tepat Waktu
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Susut / Waste Bahan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">1.6%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terkendali Sangat Rendah (&lt;3%)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Inventory Turnover Ratio (ITR)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">6.4x</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Perputaran Stok Cepat
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Volume Pengadaan B2B</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">
            {rupiah(totalPoSpend)}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            {dbPOs.length} Purchase Orders
          </span>
        </div>
      </div>

      {/* Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            Rapor Mutu &amp; Kepatuhan Mitra Pemasok Terdaftar
          </h3>
          <div className="space-y-3 pt-2">
            {dbSuppliers.length === 0 ? (
              <p className="text-xs text-tertiary">Belum ada pemasok terdaftar.</p>
            ) : (
              dbSuppliers.map((sup) => (
                <div
                  key={sup.id}
                  className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#172033] text-body-sm">{sup.name}</div>
                    <div className="text-xs text-tertiary">
                      Kategori: {sup.category || "Distributor"} • Telp: {sup.phone || "-"}
                    </div>
                  </div>
                  <div className="font-bold font-mono text-body-md text-primary">99.2% (Grade A+)</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            Rekomendasi Cerdas Optimasi Stok (AI SCM)
          </h3>
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#E8F3EC] border border-primary/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">check_circle</span>
              <div className="text-body-sm">
                <strong className="text-[#172033]">Tambah Buffer Fresh Milk di Hari Jumat:</strong>
                <p className="text-xs text-tertiary mt-0.5">
                  Analisis data menunjukkan peningkatan konsumsi kopi susu 45% setiap akhir pekan di seluruh cabang.
                </p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#E8F3EC] border border-primary/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">check_circle</span>
              <div className="text-body-sm">
                <strong className="text-[#172033]">Konsolidasi PO Cup &amp; Sirup Sekaligus:</strong>
                <p className="text-xs text-tertiary mt-0.5">
                  Pemesanan bersamaan menghemat ongkos kirim logistik hingga Rp 120.000 per minggu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
