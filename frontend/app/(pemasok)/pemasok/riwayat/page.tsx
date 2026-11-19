"use client";

import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { usePurchaseOrders } from "@/features/purchase-orders/hooks/use-purchase-orders";

export default function PemasokRiwayatPage() {
  const { data: dbPOs = [], isLoading } = usePurchaseOrders();

  const completedOrders = dbPOs.filter((po) => po.status === "received");
  const totalOmzet = completedOrders.reduce((sum, po) => sum + Number(po.totalAmount), 0);

  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Financial Audit &amp; Settlement
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                PT Tani Makmur Sejahtera
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Riwayat Transaksi &amp; Invoice PO
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Catatan seluruh pesanan pasokan yang telah selesai, diverifikasi QC oleh gudang, dan siap penagihan faktur.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">PO Selesai (Lolos QC)</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              {completedOrders.length} <span className="text-sm font-normal text-tertiary">Pesanan</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Selesai &amp; Diterima
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Total Nilai Transaksi</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">
              Rp {totalOmzet.toLocaleString("id-ID")}
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Live Database BAPER
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Kepatuhan QC</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">100%</div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Mutu Sangat Baik
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Total Semua PO</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{dbPOs.length} PO</div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Semua Status
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-tertiary">Memuat riwayat transaksi...</div>
          ) : dbPOs.length === 0 ? (
            <div className="p-12 text-center text-tertiary">Belum ada riwayat pesanan.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                    <th className="py-4 px-5">Nomor PO &amp; Tanggal</th>
                    <th className="py-4 px-4">Nama Pemesan (Klien)</th>
                    <th className="py-4 px-4">Komoditas Bahan</th>
                    <th className="py-4 px-4 font-mono">Nilai Transaksi</th>
                    <th className="py-4 px-4">Status Pengiriman</th>
                    <th className="py-4 px-5 text-right">Status QC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                  {dbPOs.map((po) => {
                    const poNo = `#PO-${po.id.slice(0, 8).toUpperCase()}`;
                    const isPassed = po.qcStatus === "passed";

                    return (
                      <tr key={po.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                        <td className="py-4 px-5">
                          <span className="font-mono font-bold text-primary">{poNo}</span>
                          <div className="text-xs text-tertiary">
                            {new Date(po.createdAt).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        </td>

                        <td className="py-4 px-4 font-semibold text-on-surface">
                          {po.business?.name || "BAPER Central Hub"}
                        </td>

                        <td className="py-4 px-4 text-xs text-tertiary">
                          {po.purchaseOrderItems
                            .map((i) => `${i.ingredient?.name || i.supplierItem?.name} (${i.quantity})`)
                            .join(", ")}
                        </td>

                        <td className="py-4 px-4 font-mono font-bold text-primary">
                          Rp {Number(po.totalAmount).toLocaleString("id-ID")}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              po.status === "received"
                                ? "bg-[#E8F3EC] text-primary"
                                : po.status === "shipped"
                                ? "bg-[#EFF6FF] text-[#1D4ED8]"
                                : po.status === "confirmed"
                                ? "bg-[#FFF9E6] text-[#B7791F]"
                                : "bg-[#F5F8F6] text-tertiary"
                            }`}
                          >
                            {po.status === "received"
                              ? "Diterima Klien"
                              : po.status === "shipped"
                              ? "Dalam Pengiriman"
                              : po.status === "confirmed"
                              ? "Dikonfirmasi"
                              : "Baru"}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              isPassed
                                ? "bg-[#E8F3EC] text-primary"
                                : po.qcStatus === "failed"
                                ? "bg-[#FDF2F2] text-error"
                                : "bg-[#FFF9E6] text-[#B7791F]"
                            }`}
                          >
                            {isPassed ? "Lolos QC" : po.qcStatus === "failed" ? "Gagal QC" : "Menunggu QC"}
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
      </main>
    </>
  );
}
