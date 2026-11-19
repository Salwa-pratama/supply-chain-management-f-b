"use client";

import { useMemo, useState } from "react";
import { useProducts } from "@/features/products/hooks/use-products";

function rupiah(n: number | string) {
  return "Rp " + Math.round(Number(n) || 0).toLocaleString("id-ID");
}

export default function PemilikProdukPage() {
  const { data: dbProducts = [], isLoading } = useProducts();
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (filterCategory === "all") return dbProducts;
    return dbProducts.filter((p) => (p.category || "").toLowerCase() === filterCategory.toLowerCase());
  }, [dbProducts, filterCategory]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Manajemen Menu &amp; Resep Masakan (BOM)
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Kopi Kenangan Senopati #04
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Katalog Produk &amp; Menu Outlet
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Atur harga jual kasir POS, rincian bahan baku resep (Bill of Materials), dan integrasi otomatis pengurangan stok real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Ekspor Menu</span>
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambah Menu Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Menu Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {isLoading ? "..." : `${dbProducts.length} Menu`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tersinkronisasi Database
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Margin Profit</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">64.5%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Target HPP Tercapai
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Menu Terlaris</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {dbProducts[0]?.name || "Aren Latte"}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Top Performer
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Menu Non-Aktif / Habis</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {isLoading ? "..." : `${dbProducts.filter((p) => !p.isAvailable).length} Menu`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kesiapan Stok 100%
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-label-sm text-tertiary">Filter Kategori:</span>
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-3 py-1 rounded-full text-label-sm font-semibold transition-colors ${
                filterCategory === "all"
                  ? "bg-[#E8F3EC] text-primary border border-primary/20"
                  : "bg-surface-container-low text-tertiary hover:text-on-surface"
              }`}
            >
              Semua ({dbProducts.length})
            </button>
            <button
              onClick={() => setFilterCategory("minuman")}
              className={`px-3 py-1 rounded-full text-label-sm font-semibold transition-colors ${
                filterCategory === "minuman"
                  ? "bg-[#E8F3EC] text-primary border border-primary/20"
                  : "bg-surface-container-low text-tertiary hover:text-on-surface"
              }`}
            >
              Minuman ({dbProducts.filter((p) => p.category === "minuman").length})
            </button>
            <button
              onClick={() => setFilterCategory("snack")}
              className={`px-3 py-1 rounded-full text-label-sm font-semibold transition-colors ${
                filterCategory === "snack"
                  ? "bg-[#E8F3EC] text-primary border border-primary/20"
                  : "bg-surface-container-low text-tertiary hover:text-on-surface"
              }`}
            >
              Snack & Roti ({dbProducts.filter((p) => p.category === "snack").length})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center text-tertiary">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
              <p className="mt-2 text-body-sm">Memuat katalog menu & resep BOM...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">Nama Menu &amp; Kode SKU</th>
                  <th className="py-4 px-4">Kategori</th>
                  <th className="py-4 px-4">Harga Jual (POS)</th>
                  <th className="py-4 px-4">Resep BOM (Bahan Baku)</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {filteredProducts.map((prd) => {
                  const ingredientsText = prd.productIngredients
                    ?.map((pi) => `${pi.ingredient?.name || "Bahan"} (${pi.qtyPerUnit} ${pi.ingredient?.unit || "satuan"})`)
                    .join(", ") || "Belum ada resep";

                  return (
                    <tr key={prd.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#172033] hover:text-primary cursor-pointer">
                          {prd.name}
                        </div>
                        <span className="text-xs font-mono text-tertiary">
                          PRD-{prd.id.slice(0, 8).toUpperCase()}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-tertiary font-medium capitalize">
                        {prd.category || "Menu"}
                      </td>

                      <td className="py-4 px-4 font-bold text-primary font-mono">{rupiah(prd.price)}</td>

                      <td className="py-4 px-4 text-tertiary max-w-[280px] truncate" title={ingredientsText}>
                        <span className="inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-primary">menu_book</span>
                          <span>{ingredientsText}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            prd.isAvailable
                              ? "bg-[#E8F3EC] text-primary border border-primary/20"
                              : "bg-[#FDF2F2] text-error border border-error/30"
                          }`}
                        >
                          {prd.isAvailable ? "Tersedia di Kasir" : "Habis"}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                            title="Edit Menu & Resep"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
