"use client";

import { useSuppliers } from "@/features/suppliers/hooks/use-suppliers";
import { SupplierItem } from "@/features/suppliers/types/suppliers.types";
import Link from "next/link";

export default function GudangPemasokPage() {
  const { data: suppliers = [], isLoading } = useSuppliers();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Vendor Logistics &amp; Inbound Dock Directory
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Database Mitra Pemasok Terverifikasi
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Data Pemasok &amp; Rekanan Gudang
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Informasi kontak PIC operasional logistik, katalog komoditas bahan baku, dan riwayat pesanan pasokan terdaftar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/gudang/permintaan-bahan"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Buat PO Permintaan Bahan</span>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-tertiary">Memuat data rekanan pemasok...</div>
      ) : suppliers.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
          Belum ada pemasok aktif yang terhubung.
        </div>
      ) : (
        <div className="space-y-4">
          {suppliers.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center font-bold text-xl shrink-0">
                    <span className="material-symbols-outlined text-[26px]">local_shipping</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-[#172033]">{v.name}</h3>
                      <span className="bg-[#E8F3EC] text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-primary/20">
                        {v.isVerified ? "Mitra Terverifikasi" : "Mitra Aktif"}
                      </span>
                    </div>
                    <p className="text-body-sm text-tertiary mt-0.5">
                      {v.address || "Sentra Suplai F&B"}
                    </p>
                    <div className="text-xs text-primary font-semibold mt-1">
                      Kontak PIC: {v.phone || "-"} • Email: {v.email || "-"}
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-tertiary">Rating Kualitas Pasokan</span>
                  <div className="text-headline-sm font-headline-sm font-bold text-primary flex items-center sm:justify-end gap-1">
                    <span className="material-symbols-outlined text-[20px] text-amber-500 fill-current">star</span>
                    <span>{v.rating || "5.0"}</span>
                  </div>
                </div>
              </div>

              {/* Komoditas Katalog yang Disediakan */}
              <div>
                <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                  Katalog Komoditas Tersedia ({v.items?.length || 0} SKU):
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {v.items && v.items.length > 0 ? (
                    v.items.map((item: SupplierItem) => (
                      <span
                        key={item.id}
                        className="px-3 py-1 rounded-lg bg-[#F5F8F6] border border-outline-variant/40 text-xs font-medium text-on-surface flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                        <span>{item.name}</span>
                        <span className="text-tertiary font-mono">
                          (Rp {Number(item.price).toLocaleString("id-ID")}/{item.unit})
                        </span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-tertiary italic">Belum ada item katalog terdaftar</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-body-sm pt-2">
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                  <span className="text-xs font-bold text-tertiary uppercase">Jadwal Pengiriman:</span>
                  <div className="font-semibold text-on-surface mt-0.5 text-xs">Senin - Sabtu (07:00 - 15:00 WIB)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                  <span className="text-xs font-bold text-tertiary uppercase">Standar Armada:</span>
                  <div className="font-semibold text-on-surface mt-0.5 text-xs">Truk Thermo Chiller &amp; Dry Box</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                  <span className="text-xs font-bold text-tertiary uppercase">Lead Time Pemesanan:</span>
                  <div className="font-semibold text-on-surface mt-0.5 text-xs">1 x 24 Jam Kerja</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Link
                  href="/gudang/permintaan-bahan"
                  className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 font-bold shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  <span>Pesan PO ke Vendor Ini</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
