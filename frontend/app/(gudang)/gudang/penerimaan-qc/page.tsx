"use client";

import { useState } from "react";
import { usePurchaseOrders, useVerifyQc } from "@/features/purchase-orders/hooks/use-purchase-orders";
import { PurchaseOrderItemData } from "@/features/purchase-orders/types/purchase-orders.types";

export default function GudangPenerimaanQcPage() {
  const { data: purchaseOrders = [], isLoading } = usePurchaseOrders();
  const verifyQcMutation = useVerifyQc();

  const [selectedPo, setSelectedPo] = useState<PurchaseOrderItemData | null>(null);
  const [qcStatus, setQcStatus] = useState<"passed" | "failed">("passed");
  const [qcNotes, setQcNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const poTibaCount = purchaseOrders.filter((po) => po.status === "shipped" || po.status === "received").length;
  const qcPassedCount = purchaseOrders.filter((po) => po.qcStatus === "passed").length;
  const qcPendingCount = purchaseOrders.filter(
    (po) => po.status === "shipped" || (po.status === "received" && po.qcStatus !== "passed")
  ).length;

  function handleOpenQc(po: PurchaseOrderItemData) {
    setSelectedPo(po);
    setQcStatus("passed");
    setQcNotes(po.qcNotes || "Suhu armada sesuai standar, kemasan utuh ber-valve, segel aman.");
  }

  function handleCloseModal() {
    setSelectedPo(null);
  }

  function handleSubmitQc(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPo) return;

    verifyQcMutation.mutate(
      {
        id: selectedPo.id,
        qcStatus,
        qcNotes,
      },
      {
        onSuccess: () => {
          setSelectedPo(null);
          setToast(`Hasil QC untuk #${selectedPo.id.slice(0, 8).toUpperCase()} berhasil diverifikasi! Stok telah bertambah.`);
          setTimeout(() => setToast(null), 4000);
        },
        onError: (err) => {
          alert(`Gagal verifikasi QC: ${err.message}`);
        },
      }
    );
  }

  return (
    <>
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#137A48] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Inbound Receiving &amp; Quality Control (QC)
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Standar HACCP &amp; Rantai Pasok Dingin
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Penerimaan Barang &amp; Verifikasi QC
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Validasi fisik barang kiriman dari mitra pemasok: periksa kesesuaian faktur PO, kondisi kemasan, suhu armada chiller, dan terbitkan Berita Acara Penerimaan (BAP).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Tiba / Masuk</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{poTibaCount} Pengiriman</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            {qcPassedCount} Lolos QC • {qcPendingCount} Menunggu
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Kelulusan QC</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {purchaseOrders.length > 0
              ? `${Math.round((qcPassedCount / purchaseOrders.length) * 100)}%`
              : "100%"}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Standar Mutu Terjaga
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Menunggu Pemeriksaan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">{qcPendingCount} PO</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full">
            Siap Verifikasi Fisik
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total PO Tercatat</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{purchaseOrders.length} Order</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Live Database BAPER
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat data PO masuk...</div>
        ) : purchaseOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
            Belum ada Purchase Order (PO) yang masuk.
          </div>
        ) : (
          purchaseOrders.map((po) => {
            const isQcPassed = po.qcStatus === "passed";
            const isShipped = po.status === "shipped";
            const canDoQc = isShipped || (po.status === "received" && !isQcPassed);
            const poNo = `#PO-${po.id.slice(0, 8).toUpperCase()}`;

            return (
              <div
                key={po.id}
                className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-[#172033] font-mono text-body-lg">{poNo}</h3>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isQcPassed
                            ? "bg-[#E8F3EC] text-primary"
                            : isShipped
                            ? "bg-[#EFF6FF] text-[#1D4ED8]"
                            : po.status === "confirmed"
                            ? "bg-[#FFF9E6] text-[#B7791F]"
                            : "bg-[#F5F8F6] text-tertiary"
                        }`}
                      >
                        {isQcPassed
                          ? "Lolos QC (Diterima Penuh)"
                          : isShipped
                          ? "Tiba di Dock (Menunggu QC)"
                          : po.status === "confirmed"
                          ? "Dikonfirmasi Pemasok"
                          : po.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-body-sm font-semibold text-on-surface mt-1">
                      Pemasok: {po.supplier?.name || "Mitra Pemasok"}
                    </p>
                    <div className="text-xs text-tertiary mt-0.5">
                      Catatan Pengiriman: {po.deliveryNote || "Pengiriman standar logistik"} • Driver: {po.driverInfo || "Armada Pemasok"}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-tertiary">Total Nilai Faktur:</span>
                    <div className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                      Rp {Number(po.totalAmount).toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>

                {/* Items Detail */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-tertiary uppercase">Rincian Komoditas Fisik:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {po.purchaseOrderItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/25 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-on-surface text-sm">
                            {item.ingredient?.name || item.supplierItem?.name || "Bahan Baku"}
                          </div>
                          <div className="text-xs text-tertiary font-mono">
                            Harga: Rp {Number(item.price).toLocaleString("id-ID")}
                          </div>
                        </div>
                        <div className="font-bold text-primary font-mono text-sm">
                          {Number(item.quantity).toLocaleString("id-ID")}{" "}
                          {item.ingredient?.unit || item.supplierItem?.unit || "Unit"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {po.qcNotes && (
                  <div className="p-3.5 rounded-xl bg-[#E8F3EC]/50 border border-primary/20 text-xs">
                    <span className="font-bold text-primary">Catatan QC: </span>
                    <span className="text-on-surface">{po.qcNotes}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-end gap-3">
                  {canDoQc ? (
                    <button
                      type="button"
                      onClick={() => handleOpenQc(po)}
                      className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 font-bold shadow-sm transition-all active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[18px]">fact_check</span>
                      <span>Verifikasi &amp; Terima Barang (QC)</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-[#E8F3EC] px-3.5 py-2 rounded-xl">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Sudah Lolos QC &amp; Masuk Saldo</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* QC Verification Modal */}
      {selectedPo && (
        <div className="fixed inset-0 z-50 bg-[#172033]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-outline-variant/60 shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">fact_check</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg">Pemeriksaan Kualitas (QC)</h3>
                  <p className="text-xs text-tertiary font-mono">
                    #PO-{selectedPo.id.slice(0, 8).toUpperCase()} • {selectedPo.supplier?.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-tertiary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmitQc} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-2">
                  Hasil Uji Fisik &amp; Kelaikan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setQcStatus("passed")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                      qcStatus === "passed"
                        ? "bg-[#E8F3EC] border-primary text-primary shadow-sm"
                        : "bg-surface-container-low border-outline-variant/50 text-tertiary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Lolos QC (Diterima)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQcStatus("failed")}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                      qcStatus === "failed"
                        ? "bg-[#FDF2F2] border-error text-error shadow-sm"
                        : "bg-surface-container-low border-outline-variant/50 text-tertiary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                    <span>Gagal QC (Tolak/Retur)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                  Catatan Pemeriksaan / Berita Acara
                </label>
                <textarea
                  required
                  rows={3}
                  value={qcNotes}
                  onChange={(e) => setQcNotes(e.target.value)}
                  placeholder="Contoh: Suhu chiller 3.5°C, kemasan vacuum utuh, kadaluwarsa 2027..."
                  className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-tertiary hover:bg-surface-container"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={verifyQcMutation.isPending}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-[#0D6038] text-white text-sm font-bold shadow-sm transition-all"
                >
                  {verifyQcMutation.isPending ? "Menyimpan..." : "Konfirmasi & Tambah Saldo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
