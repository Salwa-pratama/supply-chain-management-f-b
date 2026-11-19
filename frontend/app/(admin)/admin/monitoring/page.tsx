"use client";

import { usePurchaseOrders } from "@/features/purchase-orders/hooks/use-purchase-orders";

export default function AdminMonitoringPage() {
  const { data: purchaseOrders = [], isLoading } = usePurchaseOrders();

  const inTransitCount = purchaseOrders.filter((po) => po.status === "shipped").length;
  const completedCount = purchaseOrders.filter((po) => po.status === "received").length;
  const qcPassedCount = purchaseOrders.filter((po) => po.qcStatus === "passed").length;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Control Tower &amp; Inbound Dock Surveillance
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live Gateway BAPER Platform
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Monitoring Rantai Pasok Nasional
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pemantauan end-to-end distribusi bahan baku F&amp;B dari gudang distributor utama, armada cold-chain, hingga proses QC di dock penerimaan outlet.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Armada Logistik OTW</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{inTransitCount} Armada</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            On-Delivery
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Diterima Lengkap</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{completedCount} PO</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tiba di Gudang Outlet
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Kepatuhan QC Dock</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {purchaseOrders.length > 0 ? `${Math.round((qcPassedCount / purchaseOrders.length) * 100)}%` : "100%"}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Standar HACCP Terjaga
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total PO Terpantau</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{purchaseOrders.length} Alur</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Live Stream
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary bg-white rounded-2xl border border-outline-variant/30">
            Memuat pemantauan armada pasokan...
          </div>
        ) : purchaseOrders.length === 0 ? (
          <div className="p-12 text-center text-tertiary bg-white rounded-2xl border border-outline-variant/30">
            Belum ada pergerakan rantai pasok tercatat.
          </div>
        ) : (
          purchaseOrders.map((po) => {
            const isDelivered = po.status === "received";
            const poNo = `#PO-${po.id.slice(0, 8).toUpperCase()}`;

            return (
              <div
                key={po.id}
                className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-primary text-body-md">{poNo}</span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isDelivered
                            ? "bg-[#E8F3EC] text-primary"
                            : po.status === "shipped"
                            ? "bg-[#EFF6FF] text-[#1D4ED8]"
                            : "bg-[#FFF9E6] text-[#B7791F]"
                        }`}
                      >
                        {isDelivered
                          ? "Selesai Diterima (Lolos QC)"
                          : po.status === "shipped"
                          ? "Dalam Perjalanan"
                          : "Dikonfirmasi Pemasok"}
                      </span>
                    </div>
                    <div className="font-semibold text-on-surface text-sm mt-1">
                      Asal: {po.supplier?.name || "Mitra Pemasok"} ➔ Tujuan: {po.business?.name || "Gudang BAPER"}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-tertiary">Total Nilai Muatan:</span>
                    <div className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                      Rp {Number(po.totalAmount).toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-body-sm">
                  <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                    <span className="text-xs text-tertiary font-bold uppercase">Armada Ekspedisi:</span>
                    <div className="font-semibold text-on-surface text-xs mt-0.5">
                      {po.driverInfo || "Truk Chiller Termal (B 8821 QC)"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                    <span className="text-xs text-tertiary font-bold uppercase">Catatan Dokumen:</span>
                    <div className="font-semibold text-on-surface text-xs mt-0.5 font-mono">
                      {po.deliveryNote || `DO-${po.id.slice(0, 6).toUpperCase()}`}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                    <span className="text-xs text-tertiary font-bold uppercase">Hasil Verifikasi QC:</span>
                    <div className="font-semibold text-primary text-xs mt-0.5">
                      {po.qcStatus === "passed" ? "Lolos Standar HACCP" : "Pemeriksaan Fisik"}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-tertiary uppercase">Item Pasokan:</span>
                  <div className="flex flex-wrap gap-2">
                    {po.purchaseOrderItems.map((item) => (
                      <span
                        key={item.id}
                        className="px-3 py-1 rounded-lg bg-[#F5F8F6] border border-outline-variant/30 text-xs text-on-surface font-medium"
                      >
                        {item.ingredient?.name || item.supplierItem?.name} ({item.quantity}{" "}
                        {item.ingredient?.unit || item.supplierItem?.unit || "Unit"})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
