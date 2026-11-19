"use client";

import { useMemo, useState } from "react";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { usePurchaseOrders, useUpdatePoStatus } from "@/features/purchase-orders/hooks/use-purchase-orders";

function rupiah(n: number | string) {
  return "Rp " + Math.round(Number(n) || 0).toLocaleString("id-ID");
}

function waktuRelative(iso: string) {
  try {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (diff < 1) return "Baru saja";
    if (diff < 60) return `${diff} Menit lalu`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} Jam lalu`;
    return `${Math.floor(hours / 24)} Hari lalu`;
  } catch {
    return "Hari ini";
  }
}

export default function PemasokPesananPoPage() {
  const { data: dbPOs = [], isLoading } = usePurchaseOrders();
  const updatePoStatusMutation = useUpdatePoStatus();
  const [filterTab, setFilterTab] = useState<"all" | "sent" | "confirmed" | "shipped">("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdateStatus = (id: string, newStatus: string, label: string) => {
    updatePoStatusMutation.mutate(
      {
        id,
        status: newStatus,
        deliveryNote: newStatus === "shipped" ? `DO-${Date.now().toString().slice(-6)}` : undefined,
        driverInfo: newStatus === "shipped" ? "Armada Logistik BAPER (B 4210 SCM)" : undefined,
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

  const filteredOrders = useMemo(() => {
    if (filterTab === "all") return dbPOs;
    return dbPOs.filter((po) => po.status === filterTab);
  }, [dbPOs, filterTab]);

  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Supply Chain &amp; Order Fulfillment
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                PT Tani Makmur Sejahtera (Pemasok Resmi)
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Pesanan Pasokan (Purchase Orders)
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Daftar PO yang diterbitkan oleh pemilik gerai F&B. Konfirmasi ketersediaan pasokan dan terbitkan Surat Jalan (DO).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Ekspor Rekap PO</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-outline-variant/30">
          <button
            onClick={() => setFilterTab("all")}
            className={`px-4 py-2 rounded-xl text-label-md font-bold transition-colors ${
              filterTab === "all"
                ? "bg-primary text-white shadow-sm"
                : "text-tertiary hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            Semua PO ({dbPOs.length})
          </button>
          <button
            onClick={() => setFilterTab("sent")}
            className={`px-4 py-2 rounded-xl text-label-md font-bold transition-colors ${
              filterTab === "sent"
                ? "bg-primary text-white shadow-sm"
                : "text-tertiary hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            Perlu Konfirmasi ({dbPOs.filter((p) => p.status === "sent" || p.status === "draft").length})
          </button>
          <button
            onClick={() => setFilterTab("confirmed")}
            className={`px-4 py-2 rounded-xl text-label-md font-bold transition-colors ${
              filterTab === "confirmed"
                ? "bg-primary text-white shadow-sm"
                : "text-tertiary hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            Sedang Diproses ({dbPOs.filter((p) => p.status === "confirmed").length})
          </button>
          <button
            onClick={() => setFilterTab("shipped")}
            className={`px-4 py-2 rounded-xl text-label-md font-bold transition-colors ${
              filterTab === "shipped"
                ? "bg-primary text-white shadow-sm"
                : "text-tertiary hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            Dalam Pengiriman ({dbPOs.filter((p) => p.status === "shipped").length})
          </button>
        </div>

        {/* PO LIST CARDS */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="py-16 text-center text-tertiary bg-white rounded-2xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
              <p className="mt-2 text-body-sm font-semibold">Memuat daftar PO dari database...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 text-center text-tertiary bg-white rounded-2xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl">inventory_2</span>
              <p className="mt-2 text-body-sm font-semibold">Tidak ada pesanan pasokan pada kategori ini.</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isPending = order.status === "sent" || order.status === "draft";
              const isConfirmed = order.status === "confirmed";
              const isShipped = order.status === "shipped";
              const isReceived = order.status === "received";

              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-2xl border p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden transition-all hover:shadow-md ${
                    isPending
                      ? "border-[#B54747]/30 hover:border-error"
                      : "border-outline-variant/40 hover:border-primary/40"
                  }`}
                >
                  {isPending && <div className="absolute top-0 left-0 h-1.5 w-full bg-[#B54747]" />}
                  {isConfirmed && <div className="absolute top-0 left-0 h-1.5 w-full bg-[#B7791F]" />}
                  {(isShipped || isReceived) && <div className="absolute top-0 left-0 h-1.5 w-full bg-primary" />}

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-outline-variant/30">
                    {/* Info Utama PO */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                          isPending
                            ? "bg-[#FDF2F2] text-[#B54747] border-[#B54747]/20"
                            : isConfirmed
                            ? "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/20"
                            : "bg-[#E8F3EC] text-primary border-primary/20"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[24px]">
                          {isPending ? "priority_high" : isConfirmed ? "fact_check" : "local_shipping"}
                        </span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-headline-sm text-headline-sm text-[#172033]">
                            {order.business?.name || "Kopi Kenangan Senopati #04"}
                          </h3>
                          <span className="bg-[#E8F3EC] text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                            Mitra Gerai
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-tertiary mt-1">
                          <span>
                            No. PO:{" "}
                            <strong className="text-on-surface font-mono">
                              #PO-{order.id.slice(0, 8).toUpperCase()}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>Dibuat: {waktuRelative(order.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-tertiary mt-2">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">
                            pin_drop
                          </span>
                          <span>{order.business?.address || "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Total Nilai */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                          isPending
                            ? "bg-[#FDF2F2] text-[#B54747] border border-[#B54747]/30"
                            : isConfirmed
                            ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/20"
                            : "bg-[#E8F3EC] text-primary border border-primary/20"
                        }`}
                      >
                        {isPending
                          ? "Menunggu Konfirmasi Pemasok"
                          : isConfirmed
                          ? "Terkonfirmasi (Sedang Disiapkan)"
                          : isShipped
                          ? "Dalam Pengiriman (DO Terbit)"
                          : "Selesai Diterima Gudang (QC Passed)"}
                      </span>
                      <div className="text-right">
                        <span className="text-xs text-tertiary">Total Nilai Pasokan</span>
                        <div className="text-headline-sm font-headline-sm font-bold text-primary">
                          {rupiah(order.totalAmount)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rincian Komoditas Bahan Baku */}
                  <div className="py-4">
                    <div className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2">
                      Komoditas Bahan Baku Dipesan:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {(order.purchaseOrderItems || []).map((item, idx) => {
                        const namaBahan = item.supplierItem?.name || item.ingredient?.name || "Bahan Baku";
                        const satuan = item.supplierItem?.unit || item.ingredient?.unit || "Unit";
                        const subtotalVal = Number(item.price) * Number(item.quantity);

                        return (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex flex-col justify-between"
                          >
                            <div>
                              <div className="font-semibold text-[#172033] text-body-sm line-clamp-1">
                                {namaBahan}
                              </div>
                              <div className="text-xs text-tertiary mt-0.5">
                                Jumlah: <strong className="text-on-surface">{item.quantity} {satuan}</strong>
                              </div>
                            </div>
                            <div className="text-xs font-bold text-primary mt-2">{rupiah(subtotalVal)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons Cluster */}
                  <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => showToast(`Dokumen PO #${order.id.slice(0, 8)} telah diunduh.`)}
                        className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">receipt</span>
                        <span>Lihat Dokumen PO</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {isPending && (
                        <button
                          type="button"
                          disabled={updatePoStatusMutation.isPending}
                          onClick={() => handleUpdateStatus(order.id, "confirmed", "Terkonfirmasi")}
                          className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                        >
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          <span>Konfirmasi &amp; Alokasikan Stok</span>
                        </button>
                      )}

                      {isConfirmed && (
                        <button
                          type="button"
                          disabled={updatePoStatusMutation.isPending}
                          onClick={() => handleUpdateStatus(order.id, "shipped", "Dalam Pengiriman")}
                          className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                        >
                          <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                          <span>Terbitkan Surat Jalan (DO) &amp; Kirim</span>
                        </button>
                      )}

                      {isShipped && (
                        <div className="flex items-center gap-2">
                          <span className="text-body-sm text-[#137A48] font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">navigation</span>
                            <span>Kurir Menuju Gerai ({order.driverInfo || "B 4210 SCM"})</span>
                          </span>
                        </div>
                      )}

                      {isReceived && (
                        <span className="text-body-sm text-primary font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                          <span>Selesai &amp; Lolos QC</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {toastMsg && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#172033] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-body-sm font-semibold">
            <span className="material-symbols-outlined text-secondary-container text-[20px]">check_circle</span>
            <span>{toastMsg}</span>
          </div>
        )}
      </main>
    </>
  );
}
