import type { Metadata } from "next";
import { INVENTARIS } from "@/lib/gudang-data";

export const metadata: Metadata = {
  title: "Stok & Inventaris Bahan Gudang | BAPER SCM Gudang",
};

export default function GudangInventarisPage() {
  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Central Hub Inventory Control
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Cold &amp; Dry Storage Cilandak
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Stok &amp; Inventaris Bahan Baku
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Daftar seluruh SKU bahan mentah, lokasi bin rak gudang, ambang batas buffer minimum, dan status ketersediaan pasokan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/gudang/opname"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-on-surface hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Audit Opname</span>
          </a>
          <a
            href="/gudang/permintaan-bahan"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
            <span>Permintaan PO Pemasok</span>
          </a>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total SKU Terdaftar</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {INVENTARIS.length} <span className="text-sm font-normal text-tertiary">Bahan</span>
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kopi, Susu, Sirup &amp; Kemasan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#B54747]/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] bg-gradient-to-br from-white to-[#FDF2F2]/30">
          <span className="text-label-md font-label-md text-[#B54747] font-bold">Stok Kritis / Habis</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B54747]">
            2 <span className="text-sm font-normal text-tertiary">SKU</span>
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/20">
            Perlu Reorder Darurat
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Kapasitas Gudang Terisi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">76.4%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Cold Storage 84% • Dry Rack 68%
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Akurasi Saldo Fisik</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">99.4%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Audit Harian Terverifikasi
          </span>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Cari SKU, nama bahan, atau lokasi rak..."
            className="w-full h-10 pl-9 pr-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-10 px-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
            <option>Semua Kategori</option>
            <option>Minuman (Biji Kopi, Susu, Sirup)</option>
            <option>Makanan &amp; Pastry</option>
            <option>Kemasan &amp; Cup</option>
          </select>
          <select className="h-10 px-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
            <option>Semua Lokasi Rak</option>
            <option>Cold Storage (Chiller)</option>
            <option>Dry Storage Rak A</option>
            <option>Dry Storage Rak B</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Kode SKU &amp; Nama Bahan</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4">Lokasi Rak / Bin</th>
                <th className="py-4 px-4">Stok Fisik Saat Ini</th>
                <th className="py-4 px-4">Batas Buffer Min</th>
                <th className="py-4 px-4">Pemasok Utama</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {INVENTARIS.map((item) => (
                <tr key={item.sku} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033]">{item.name}</div>
                    <div className="text-xs text-tertiary">{item.sub}</div>
                    <span className="text-[11px] font-mono font-bold text-primary">{item.sku}</span>
                  </td>

                  <td className="py-4 px-4 text-tertiary">{item.kategoriLabel}</td>

                  <td className="py-4 px-4">
                    <div className="inline-flex items-center gap-1.5 text-xs text-on-surface font-medium bg-[#F5F8F6] px-2.5 py-1 rounded-lg border border-outline-variant/25">
                      <span className={item.lokIconCls}>{item.lokIcon}</span>
                      <span>{item.lokasi}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-bold text-[#172033]">{item.stok}</td>

                  <td className="py-4 px-4 text-tertiary">{item.min}</td>

                  <td className="py-4 px-4 text-xs font-medium text-on-surface">{item.vendor}</td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        item.status === "safe"
                          ? "bg-[#E8F3EC] text-primary border border-primary/20"
                          : item.status === "warning"
                          ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                          : "bg-[#FDF2F2] text-error border border-error/30"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "safe"
                            ? "bg-primary"
                            : item.status === "warning"
                            ? "bg-[#B7791F]"
                            : "bg-error"
                        }`}
                      />
                      {item.status === "safe" ? "Aman" : item.status === "warning" ? "Menipis" : "Habis"}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <a
                      href="/gudang/opname"
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-label-sm text-xs font-bold transition-all"
                    >
                      Opname
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
