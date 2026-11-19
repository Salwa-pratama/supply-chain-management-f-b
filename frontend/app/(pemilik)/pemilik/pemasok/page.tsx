"use client";

import { useSuppliers } from "@/features/suppliers/hooks/use-suppliers";

export default function PemilikPemasokPage() {
  const { data: suppliers = [], isLoading, isError } = useSuppliers();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Jaringan Mitra Pengadaan Gerai
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              {isLoading ? "Memuat mitra..." : `${suppliers.length} Pemasok Resmi Terhubung Database`}
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pemasok &amp; Rekanan Bahan Baku
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Daftar distributor resmi bahan baku gerai, item komoditas yang disuplai, kontak resmi, dan status kontrak aktif.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/pemilik/pembelian"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Buat Pesanan PO Bahan</span>
          </a>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/35 text-tertiary">
          <span className="material-symbols-outlined animate-spin text-3xl mb-2 text-primary">progress_activity</span>
          <p>Menghubungkan ke database mitra pemasok...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200">
          Gagal memuat data pemasok dari server. Pastikan Anda telah login.
        </div>
      ) : suppliers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant/35 text-tertiary">
          <span className="material-symbols-outlined text-4xl mb-2">storefront</span>
          <p className="font-semibold text-on-surface">Belum ada mitra pemasok yang terdaftar.</p>
          <p className="text-sm mt-1">Mitra pemasok yang mendaftar akan otomatis terhubung di sini.</p>
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
                        {v.isActive ? "Pemasok Aktif Terverifikasi" : "Tidak Aktif"}
                      </span>
                    </div>
                    <p className="text-body-sm text-tertiary mt-0.5">
                      Kategori: {v.category || "Distributor Bahan Baku F&B"}
                    </p>
                    <div className="text-xs text-primary font-semibold mt-1">
                      Kontak PIC: {v.phone || "Tidak ada no telepon"}
                    </div>
                    {v.address && (
                      <div className="text-xs text-tertiary mt-0.5">
                        Alamat Gudang: {v.address}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-tertiary">Katalog Tersedia</span>
                  <div className="text-headline-sm font-headline-sm font-bold text-primary">
                    {v.supplierItems?.length || 0} Komoditas
                  </div>
                </div>
              </div>

              {/* Daftar Komoditas Bahan Baku yang Disediakan Pemasok Ini */}
              {v.supplierItems && v.supplierItems.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2">
                    Katalog Pasokan Siap Dipesan:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {v.supplierItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between text-body-sm"
                      >
                        <div>
                          <span className="font-semibold text-on-surface block">{item.name}</span>
                          <span className="text-xs text-tertiary">Satuan: {item.unit}</span>
                        </div>
                        <span className="font-bold text-primary font-mono">
                          Rp {Number(item.price).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-body-sm pt-2">
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                  <span className="text-xs font-bold text-tertiary uppercase">Waktu Pengiriman (SLA):</span>
                  <div className="font-semibold text-on-surface mt-0.5">1 Hari (Same Day / Subuh)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                  <span className="text-xs font-bold text-tertiary uppercase">Metode Pembayaran:</span>
                  <div className="font-semibold text-on-surface mt-0.5">Transfer B2B &amp; Invoice TOP 14</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                  <span className="text-xs font-bold text-tertiary uppercase">Status Integrasi Sistem:</span>
                  <div className="font-semibold text-primary mt-0.5">Auto-Dispatch PO Aktif</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <a
                  href="/pemilik/pembelian"
                  className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 font-bold shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>Buat PO ke Pemasok Ini</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
