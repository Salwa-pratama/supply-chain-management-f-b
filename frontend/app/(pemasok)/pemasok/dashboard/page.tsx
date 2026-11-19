"use client";

import { useMemo, useState } from "react";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { usePurchaseOrders, useUpdatePoStatus } from "@/features/purchase-orders/hooks/use-purchase-orders";
import { useMySupplierCatalog } from "@/features/suppliers/hooks/use-suppliers";
import Link from "next/link";

export default function PemasokDashboardPage() {
  const { data: dbPOs = [], isLoading: loadingPOs } = usePurchaseOrders();
  const { data: catalog = [], isLoading: loadingCatalog } = useMySupplierCatalog();
  const updatePoStatusMutation = useUpdatePoStatus();

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleUpdateStatus = (id: string, newStatus: string, label: string) => {
    updatePoStatusMutation.mutate(
      {
        id,
        status: newStatus,
        deliveryNote: newStatus === "shipped" ? `DO-${Date.now().toString().slice(-6)}` : undefined,
        driverInfo: newStatus === "shipped" ? "Armada Logistik Mitra (B 8821 QC)" : undefined,
      },
      {
        onSuccess: () => {
          showToast(`Berhasil mengubah status PO menjadi: ${label}`);
        },
        onError: (err) => {
          showToast(`Gagal: ${err.message}`);
        },
      }
    );
  };

  const totalPo = dbPOs.length;
  const waitingConfirm = dbPOs.filter((p) => p.status === "sent").length;
  const processing = dbPOs.filter((p) => p.status === "confirmed").length;
  const inTransit = dbPOs.filter((p) => p.status === "shipped").length;
  const completed = dbPOs.filter((p) => p.status === "received").length;
  const totalRevenue = dbPOs
    .filter((p) => p.status === "received" || p.status === "shipped")
    .reduce((sum, p) => sum + Number(p.totalAmount), 0);

  const activeOrders = useMemo(() => {
    return dbPOs.filter((p) => p.status !== "received").slice(0, 4);
  }, [dbPOs]);

  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {toast && (
          <div className="fixed top-5 right-5 z-50 bg-[#137A48] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>{toast}</span>
          </div>
        )}

        {/* HEADER BANNER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Portal Resmi Mitra Pemasok
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                PT Tani Makmur Sejahtera
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Portal Pasokan Bahan Baku F&amp;B
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Kelola permohonan PO mitra kedai kopi &amp; restoran, konfirmasi jadwal pengiriman, dan pantau ketersediaan stok bahan secara real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/pemasok/katalog"
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] hover:border-primary font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Kelola Katalog ({catalog.length} SKU)</span>
            </Link>
            <Link
              href="/pemasok/pesanan-po"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Buka Seluruh PO</span>
            </Link>
          </div>
        </div>

        {/* 1. RINGKASAN STATUS KPI */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <span>Ringkasan Status Pemenuhan Pasokan</span>
            </h2>
            <span className="text-label-md font-label-md text-tertiary">Live Database BAPER</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#7B8794]">Total PO Masuk</span>
                <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">inbox</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-[#172033]">
                  {totalPo} <span className="text-sm font-normal text-tertiary">Pesanan</span>
                </div>
                <div className="mt-2 text-[11px] text-tertiary">Akumulasi keseluruhan</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-[#B54747]/40 bg-gradient-to-br from-white to-[#FDF2F2]/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#B54747] font-bold">Menunggu Konfirmasi</span>
                <div className="w-8 h-8 rounded-lg bg-[#FDF2F2] flex items-center justify-center text-[#B54747]">
                  <span className="material-symbols-outlined text-[18px]">priority_high</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-[#B54747]">
                  {waitingConfirm} <span className="text-sm font-normal text-tertiary">Pesanan</span>
                </div>
                <div className="mt-2 text-[11px] font-bold text-[#B54747]">
                  {waitingConfirm > 0 ? "Perlu Tindakan Segera" : "Semua Dikonfirmasi"}
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#7B8794]">Sedang Dipersiapkan</span>
                <div className="w-8 h-8 rounded-lg bg-[#FFF9E6] flex items-center justify-center text-[#B7791F]">
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-[#172033]">
                  {processing} <span className="text-sm font-normal text-tertiary">Pesanan</span>
                </div>
                <div className="mt-2 text-[11px] text-[#B7791F] font-semibold">Tahap Pengepakan</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#7B8794]">Dalam Pengiriman</span>
                <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-[#172033]">
                  {inTransit} <span className="text-sm font-normal text-tertiary">Armada</span>
                </div>
                <div className="mt-2 text-[11px] text-primary font-semibold">Menuju Gudang Klien</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#7B8794]">Omzet Terselesaikan</span>
                <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-md font-headline-md font-bold text-primary font-mono">
                  Rp {totalRevenue.toLocaleString("id-ID")}
                </div>
                <div className="mt-2 text-[11px] text-tertiary">{completed} PO Lolos QC</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DAFTAR PERMINTAAN PO MASUK AKTIF */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assignment</span>
                <span>Permintaan Pesanan Pasokan (Perlu Penanganan)</span>
              </h2>
              <p className="text-body-sm font-body-sm text-tertiary">
                Konfirmasi ketersediaan bahan, jadwalkan armada ekspedisi, dan update status pengiriman
              </p>
            </div>
            <Link href="/pemasok/pesanan-po" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              Lihat Semua PO <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {loadingPOs ? (
            <div className="p-12 text-center text-tertiary bg-white rounded-2xl border border-outline-variant/30">
              Memuat data pesanan masuk...
            </div>
          ) : activeOrders.length === 0 ? (
            <div className="p-12 text-center text-tertiary bg-white rounded-2xl border border-outline-variant/30">
              Tidak ada pesanan aktif yang membutuhkan penanganan saat ini. Semua pesanan selesai!
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeOrders.map((po) => {
                const poNo = `#PO-${po.id.slice(0, 8).toUpperCase()}`;
                const isSent = po.status === "sent";
                const isConfirmed = po.status === "confirmed";
                const isShipped = po.status === "shipped";

                return (
                  <div
                    key={po.id}
                    className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden flex flex-col justify-between"
                  >
                    <div
                      className={`absolute top-0 left-0 h-1.5 w-full ${
                        isSent ? "bg-red-500" : isConfirmed ? "bg-amber-500" : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <div className="flex items-start justify-between gap-4 pb-4 border-b border-outline-variant/30">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                            <span className="material-symbols-outlined text-[24px]">storefront</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-headline-sm text-headline-sm text-[#172033]">
                                {po.business?.name || "BAPER Central Hub"}
                              </h3>
                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                  isSent
                                    ? "bg-[#FDF2F2] text-error"
                                    : isConfirmed
                                    ? "bg-[#FFF9E6] text-[#B7791F]"
                                    : "bg-blue-50 text-blue-700"
                                }`}
                              >
                                {isSent ? "PO Baru Masuk" : isConfirmed ? "Dikonfirmasi" : "Dalam Pengiriman"}
                              </span>
                            </div>
                            <p className="text-body-sm text-tertiary">
                              No. PO: <span className="font-semibold text-on-surface font-mono">{poNo}</span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-tertiary">Nilai Faktur:</span>
                          <div className="text-headline-sm font-headline-sm text-primary font-bold font-mono">
                            Rp {Number(po.totalAmount).toLocaleString("id-ID")}
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="py-4 space-y-2">
                        <span className="text-xs font-bold text-tertiary uppercase">Rincian Komoditas:</span>
                        {po.purchaseOrderItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#F5F8F6] p-3 rounded-xl flex items-center justify-between text-body-sm border border-outline-variant/30"
                          >
                            <span className="font-semibold text-on-surface">
                              {item.ingredient?.name || item.supplierItem?.name}
                            </span>
                            <span className="font-mono font-bold text-primary">
                              {Number(item.quantity).toLocaleString("id-ID")}{" "}
                              {item.ingredient?.unit || item.supplierItem?.unit || "Unit"}
                            </span>
                          </div>
                        ))}

                        <div className="text-xs text-tertiary pt-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px]">pin_drop</span>
                          <span>Alamat Tujuan: {po.business?.address || "Gudang Utama BAPER, Cilandak"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center gap-2">
                      {isSent && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(po.id, "confirmed", "Dikonfirmasi")}
                          className="flex-1 h-11 bg-primary text-white rounded-xl font-label-lg text-label-lg hover:bg-[#0D6038] flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                        >
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          <span>Konfirmasi &amp; Siapkan Barang</span>
                        </button>
                      )}
                      {isConfirmed && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(po.id, "shipped", "Dalam Pengiriman")}
                          className="flex-1 h-11 bg-[#1D4ED8] text-white rounded-xl font-label-lg text-label-lg hover:bg-blue-800 flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                        >
                          <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                          <span>Kirimkan via Armada Ekspedisi</span>
                        </button>
                      )}
                      {isShipped && (
                        <span className="flex-1 h-11 bg-[#E8F3EC] text-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-1.5 font-bold">
                          <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                          <span>Armada Sedang di Jalan</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 3. KATALOG KOMODITAS PASOKAN AKTIF */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory</span>
                <span>Katalog Bahan Baku &amp; Komoditas Pasokan ({catalog.length} SKU)</span>
              </h2>
              <p className="text-body-sm font-body-sm text-tertiary">
                Harga kontrak grosir dan saldo ketersediaan stok fisik gudang pemasok
              </p>
            </div>
            <Link
              href="/pemasok/katalog"
              className="h-10 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-md text-label-md flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Kelola &amp; Tambah SKU</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
            {loadingCatalog ? (
              <div className="p-8 text-center text-tertiary">Memuat katalog...</div>
            ) : catalog.length === 0 ? (
              <div className="p-8 text-center text-tertiary">Belum ada komoditas di katalog.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F5F8F6] border-b border-outline-variant/30 text-label-sm font-label-sm text-[#7B8794] uppercase tracking-wider">
                      <th className="py-3.5 px-6">Nama Komoditas</th>
                      <th className="py-3.5 px-6">Kategori</th>
                      <th className="py-3.5 px-6">Harga Grosir (Satuan)</th>
                      <th className="py-3.5 px-6">Sisa Stok Gudang</th>
                      <th className="py-3.5 px-6">Lead Time</th>
                      <th className="py-3.5 px-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 font-body-md text-body-md">
                    {catalog.map((item) => {
                      const st = Number(item.stock);
                      const isSafe = st > 20;
                      return (
                        <tr key={item.id} className="hover:bg-[#F9FBFA] transition-colors">
                          <td className="py-4 px-6 font-bold text-[#172033]">{item.name}</td>
                          <td className="py-4 px-6 text-tertiary capitalize">{item.category || "Bahan Baku"}</td>
                          <td className="py-4 px-6 font-mono font-bold text-primary">
                            Rp {Number(item.price).toLocaleString("id-ID")}{" "}
                            <span className="text-xs text-tertiary font-normal">/ {item.unit}</span>
                          </td>
                          <td className="py-4 px-6 font-mono font-bold text-[#172033]">
                            {st.toLocaleString("id-ID")} {item.unit}
                          </td>
                          <td className="py-4 px-6 text-tertiary">{item.leadTimeDays || 1} Hari</td>
                          <td className="py-4 px-6 text-right">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                isSafe ? "bg-[#E8F3EC] text-primary" : "bg-[#FFF9E6] text-[#B7791F]"
                              }`}
                            >
                              {isSafe ? "Tersedia" : "Menipis"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
