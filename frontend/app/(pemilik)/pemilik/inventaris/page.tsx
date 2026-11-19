"use client";

import { useMemo, useState } from "react";
import { useInventory } from "@/features/inventory/hooks/use-inventory";

export default function PemilikInventarisPage() {
  const { data: dbIngredients = [], isLoading } = useInventory();
  const [filterCategory, setFilterCategory] = useState("all");
  const [search, setSearch] = useState("");

  const criticalItems = useMemo(() => {
    return dbIngredients.filter((item) => item.status === "kritis" || item.status === "menipis");
  }, [dbIngredients]);

  const filteredItems = useMemo(() => {
    return dbIngredients.filter((item) => {
      const matchCat = filterCategory === "all" || (item.category || "").toLowerCase() === filterCategory.toLowerCase();
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.locationRack || "").toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [dbIngredients, filterCategory, search]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Kontrol Persediaan Fisik Gerai
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              {isLoading ? "Memuat..." : `${criticalItems.length} Bahan Mendekati Batas Kritis`}
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Stok &amp; Inventaris Bahan Baku
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau ketersediaan bahan mentah di bar dan chiller gerai langsung dari database gudang real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/pemilik/pembelian"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Pesan Pasokan ke Pemasok</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Bahan Baku Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {isLoading ? "..." : `${dbIngredients.length} Komoditas`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tersimpan di Database
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#B54747]/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] bg-gradient-to-br from-white to-[#FDF2F2]/30">
          <span className="text-label-md font-label-md text-[#B54747] font-bold">Stok Perlu Perhatian</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B54747]">
            {isLoading ? "..." : `${criticalItems.length} Item`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/20">
            Perlu Buat Purchase Order
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Kondisi Stok Aman</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {isLoading ? "..." : `${dbIngredients.filter((i) => i.status === "aman").length} Item`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Di Atas Minimum Safety Stock
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Mitra Pemasok Terhubung</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">1 Mitra Aktif</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            PT Tani Makmur Sejahtera
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {["all", "coffee", "dairy", "flavor", "packaging"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                filterCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-[#F5F8F6] text-tertiary hover:bg-[#E8F3EC] hover:text-primary"
              }`}
            >
              {cat === "all" ? "Semua Kategori" : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama bahan, rak simpan..."
            className="w-full h-10 pl-9 pr-3 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Nama Bahan &amp; Rak</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4">Stok Saat Ini</th>
                <th className="py-4 px-4">Batas Minimum</th>
                <th className="py-4 px-4">Mitra Pemasok Utama</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-tertiary">
                    <span className="material-symbols-outlined animate-spin text-2xl text-primary mb-1">
                      progress_activity
                    </span>
                    <p>Memuat data stok dari database...</p>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-tertiary">
                    Tidak ada bahan baku yang cocok.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isLow = item.status === "kritis" || item.status === "menipis";
                  return (
                    <tr key={item.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#172033]">{item.name}</div>
                        <span className="text-xs text-tertiary">Lokasi: {item.locationRack || "Gudang Utama"}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="capitalize text-xs font-medium bg-[#F5F8F6] px-2 py-0.5 rounded text-tertiary">
                          {item.category || "Bahan"}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`font-mono font-bold ${isLow ? "text-error" : "text-primary"}`}>
                          {Number(item.stock).toLocaleString("id-ID")} {item.unit}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs font-mono text-tertiary">
                        {Number(item.minStock).toLocaleString("id-ID")} {item.unit}
                      </td>

                      <td className="py-4 px-4 text-xs font-medium text-on-surface">
                        {item.preferredSupplier?.name || "PT Tani Makmur Sejahtera"}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.status === "aman"
                              ? "bg-[#E8F3EC] text-primary border border-primary/20"
                              : "bg-[#FDF2F2] text-error border border-error/30"
                          }`}
                        >
                          {item.status === "aman" ? "Stok Aman" : "Stok Menipis"}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <a
                          href="/pemilik/pembelian"
                          className="px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-[#0D6038] font-label-sm text-xs font-bold transition-all inline-block"
                        >
                          Pesan PO
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
