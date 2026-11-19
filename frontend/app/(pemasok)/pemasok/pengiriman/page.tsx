"use client";

import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { usePurchaseOrders } from "@/features/purchase-orders/hooks/use-purchase-orders";

export default function PemasokPengirimanPage() {
  const { data: dbPOs = [], isLoading } = usePurchaseOrders();

  const shippedOrders = dbPOs.filter((po) => po.status === "shipped");
  const receivedOrders = dbPOs.filter((po) => po.status === "received");

  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Manajemen Logistik &amp; Armada Distribusi
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                PT Tani Makmur Sejahtera
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Pengiriman &amp; Logistik Terintegrasi
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Pemantauan pengiriman pesanan bahan baku real-time, kontrol armada pengiriman, dan tanda terima berita acara serah terima.
            </p>
          </div>
        </div>

        {/* 4 KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Dalam Pengiriman</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              {shippedOrders.length} <span className="text-sm font-normal text-tertiary">PO</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Armada di Jalan
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Selesai Terkirim</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              {receivedOrders.length} <span className="text-sm font-normal text-tertiary">PO</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Diterima Gudang Klien
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Ketepatan Waktu</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">100%</div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Sesuai Jadwal PO
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Total Nilai Terkirim</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">
              Rp {receivedOrders.reduce((sum, p) => sum + Number(p.totalAmount), 0).toLocaleString("id-ID")}
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Faktur Selesai
            </span>
          </div>
        </div>

        {/* SHIPMENT CARDS */}
        <div className="space-y-4">
          <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">local_shipping</span>
            <span>Daftar Pengiriman Bahan Baku</span>
          </h2>

          {isLoading ? (
            <div className="p-12 text-center text-tertiary bg-white rounded-2xl border border-outline-variant/30">
              Memuat data logistik...
            </div>
          ) : shippedOrders.length === 0 && receivedOrders.length === 0 ? (
            <div className="p-12 text-center text-tertiary bg-white rounded-2xl border border-outline-variant/30">
              Belum ada riwayat pengiriman armada tercatat.
            </div>
          ) : (
            <div className="space-y-4">
              {[...shippedOrders, ...receivedOrders].map((po) => {
                const poNo = `#PO-${po.id.slice(0, 8).toUpperCase()}`;
                const isDelivered = po.status === "received";

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
                              isDelivered
                                ? "bg-[#E8F3EC] text-primary"
                                : "bg-[#EFF6FF] text-[#1D4ED8]"
                            }`}
                          >
                            {isDelivered ? "Selesai Diterima Gudang (Lolos QC)" : "Dalam Perjalanan"}
                          </span>
                        </div>
                        <p className="text-body-sm font-semibold text-on-surface mt-1">
                          Tujuan: {po.business?.name || "BAPER Central Hub"}
                        </p>
                        <div className="text-xs text-tertiary mt-0.5">
                          Alamat: {po.business?.address || "Gudang Utama BAPER, Cilandak"}
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-tertiary">Total Nilai Faktur:</span>
                        <div className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                          Rp {Number(po.totalAmount).toLocaleString("id-ID")}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-body-sm">
                      <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                        <span className="text-xs text-tertiary font-bold uppercase">Armada &amp; Driver:</span>
                        <div className="font-semibold text-on-surface text-xs mt-0.5">
                          {po.driverInfo || "Armada Pemasok (B 8821 QC)"}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                        <span className="text-xs text-tertiary font-bold uppercase">Nomor Surat Jalan:</span>
                        <div className="font-semibold text-on-surface text-xs mt-0.5 font-mono">
                          {po.deliveryNote || `DO-${po.id.slice(0, 6).toUpperCase()}`}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                        <span className="text-xs text-tertiary font-bold uppercase">Status Kualitas (QC):</span>
                        <div className="font-semibold text-primary text-xs mt-0.5">
                          {po.qcStatus === "passed" ? "Lolos QC (BAP Terbit)" : "Menunggu Pemeriksaan Fisik"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold text-tertiary uppercase">Muatan Bahan Baku:</span>
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
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
