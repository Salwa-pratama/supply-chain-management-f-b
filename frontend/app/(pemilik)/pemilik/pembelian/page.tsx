"use client";

import { useMemo, useState } from "react";
import { usePurchaseOrders } from "@/features/purchase-orders/hooks/use-purchase-orders";

function formatRupiah(num: number | string) {
  return "Rp " + Math.round(Number(num) || 0).toLocaleString("id-ID");
}

export default function PemilikPembelianPage() {
  const { data: dbPOs = [], isLoading } = usePurchaseOrders();
  const [filterStatus, setFilterStatus] = useState("all");

  const totalPengeluaran = useMemo(() => {
    return dbPOs.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
  }, [dbPOs]);

  const filteredPOs = useMemo(() => {
    if (filterStatus === "all") return dbPOs;
    return dbPOs.filter((po) => po.status === filterStatus);
  }, [dbPOs, filterStatus]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Pengadaan &amp; Purchase Order (PO)
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              {isLoading ? "Memuat..." : `${dbPOs.length} Surat Pesanan Tercatat`}
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pembelian Bahan Baku &amp; Restock
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Terbitkan surat Purchase Order resmi kepada mitra pemasok, pantau alur verifikasi, dan kedatangan armada logistik ke gerai.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/pemilik/pemasok"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Buat PO Baru</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Nilai Pembelian PO</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">
            {isLoading ? "..." : formatRupiah(totalPengeluaran)}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Realistis dari Database
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Diterima &amp; QC Lolos</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {dbPOs.filter((po) => po.status === "received").length} PO
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Stok Masuk Gudang
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Dalam Pengiriman</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {dbPOs.filter((po) => po.status === "shipped").length} PO
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Armada Menuju Gerai
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Menunggu Konfirmasi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {dbPOs.filter((po) => po.status === "sent" || po.status === "confirmed").length} PO
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Verifikasi Supplier
          </span>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: `Semua PO (${dbPOs.length})` },
          { id: "sent", label: `Terkirim (${dbPOs.filter((p) => p.status === "sent").length})` },
          { id: "confirmed", label: `Dikonfirmasi (${dbPOs.filter((p) => p.status === "confirmed").length})` },
          { id: "shipped", label: `Dikirim (${dbPOs.filter((p) => p.status === "shipped").length})` },
          { id: "received", label: `Selesai (${dbPOs.filter((p) => p.status === "received").length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === tab.id
                ? "bg-primary text-white shadow-sm"
                : "bg-white border border-outline-variant/40 text-tertiary hover:bg-[#E8F3EC] hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PO LIST CARDS */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/35 text-tertiary">
            <span className="material-symbols-outlined animate-spin text-3xl mb-2 text-primary">progress_activity</span>
            <p>Memuat daftar Purchase Order dari database...</p>
          </div>
        ) : filteredPOs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/35 text-tertiary">
            <span className="material-symbols-outlined text-4xl mb-2">receipt_long</span>
            <p className="font-semibold text-on-surface">Tidak ada Purchase Order dengan status ini.</p>
          </div>
        ) : (
          filteredPOs.map((po) => {
            const itemsSummary = (po.purchaseOrderItems || [])
              .map((it) => `${Number(it.quantity)} ${it.supplierItem?.unit || "unit"} ${it.supplierItem?.name || "Bahan"}`)
              .join(" + ");

            return (
              <div
                key={po.id}
                className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center font-bold text-xl shrink-0">
                      <span className="material-symbols-outlined text-[26px]">description</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm font-mono text-[#172033]">
                          #PO-{po.id.slice(0, 8).toUpperCase()}
                        </h3>
                        <span className="bg-[#E8F3EC] text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-primary/20 capitalize">
                          Status: {po.status}
                        </span>
                      </div>
                      <p className="text-body-sm text-tertiary mt-0.5">
                        Mitra: {po.supplier?.name || "PT Tani Makmur Sejahtera"} • Dibuat oleh: {po.createdBy?.name || "Pemilik"}
                      </p>
                      {po.deliveryNote && (
                        <div className="text-xs text-primary font-semibold mt-1">
                          Surat Jalan: {po.deliveryNote} {po.driverInfo ? `(${po.driverInfo})` : ""}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-tertiary">Total Nilai Faktur</span>
                    <div className="text-headline-sm font-headline-sm font-bold text-primary font-mono">
                      {formatRupiah(po.totalAmount)}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 text-body-sm">
                  <span className="text-xs font-bold text-tertiary uppercase">Item Komoditas Dipesan:</span>
                  <div className="font-semibold text-on-surface mt-1">{itemsSummary || "Pesanan Bahan Baku"}</div>
                </div>

                {po.qcNotes && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <strong>Catatan QC Masuk Gudang:</strong> {po.qcNotes}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
