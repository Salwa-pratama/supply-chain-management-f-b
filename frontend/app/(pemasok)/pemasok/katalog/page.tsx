"use client";

import { useMemo, useState } from "react";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { useMySupplierCatalog, useCreateSupplierItem } from "@/features/suppliers/hooks/use-suppliers";

export default function PemasokKatalogPage() {
  const { data: catalog = [], isLoading } = useMySupplierCatalog();
  const createItemMutation = useCreateSupplierItem();

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("kg");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("100");
  const [minOrder, setMinOrder] = useState("5");
  const [leadTimeDays, setLeadTimeDays] = useState("1");
  const [category, setCategory] = useState("Bahan Baku");

  const filteredItems = useMemo(() => {
    return catalog.filter((item) => {
      const matchSearch =
        !search.trim() ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.category || "").toLowerCase().includes(search.toLowerCase());
      const matchCat =
        selectedCat === "all" || (item.category || "").toLowerCase() === selectedCat.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [catalog, search, selectedCat]);

  const totalSku = catalog.length;
  const stockAman = catalog.filter((i) => Number(i.stock) > 20).length;
  const stockMenipis = catalog.filter((i) => Number(i.stock) > 0 && Number(i.stock) <= 20).length;
  const stockHabis = catalog.filter((i) => Number(i.stock) <= 0).length;

  function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !price) return;

    createItemMutation.mutate(
      {
        name,
        unit,
        price: Number(price),
        stock: Number(stock) || 0,
        minOrder: Number(minOrder) || 1,
        leadTimeDays: Number(leadTimeDays) || 1,
        category,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setName("");
          setPrice("");
          setStock("100");
          setToast("Komoditas berhasil ditambahkan ke katalog resmi!");
          setTimeout(() => setToast(null), 4000);
        },
        onError: (err) => {
          alert(`Gagal menambah komoditas: ${err.message}`);
        },
      }
    );
  }

  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {toast && (
          <div className="fixed top-5 right-5 z-50 bg-[#137A48] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>{toast}</span>
          </div>
        )}

        {/* HEADER & QUICK ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Manajemen Komoditas B2B
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                Total {totalSku} Komoditas Aktif
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Katalog Bahan Baku &amp; Barang Pasokan
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Atur harga kontrak B2B, batas minimal pemesanan (MOQ), dan pantau jumlah ketersediaan stok fisik gudang pasokan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Tambah Bahan Baku</span>
            </button>
          </div>
        </div>

        {/* 4 SUMMARY STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Total SKU Aktif</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              {totalSku} <span className="text-sm font-normal text-tertiary">Komoditas</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Tersinkron Database
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Stok Aman (Tersedia)</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              {stockAman} <span className="text-sm font-normal text-tertiary">Item</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Siap Kirim
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Stok Menipis</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">
              {stockMenipis} <span className="text-sm font-normal text-tertiary">Item</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full border border-[#B7791F]/20">
              Perlu Produksi
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Stok Habis</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#B54747]">
              {stockHabis} <span className="text-sm font-normal text-tertiary">Item</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/30">
              Status Pre-Order
            </span>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-tertiary">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama komoditas atau kategori..."
              className="w-full h-11 pl-10 pr-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary transition-all placeholder:text-[#7B8794]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary"
            >
              <option value="all">Semua Kategori</option>
              <option value="biji kopi">Biji Kopi</option>
              <option value="dairy & susu">Dairy &amp; Susu</option>
              <option value="sirup & pemanis">Sirup &amp; Pemanis</option>
              <option value="kemasan & packaging">Kemasan Food Grade</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-tertiary">Memuat katalog pemasok...</div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center text-tertiary">Belum ada komoditas di katalog.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                    <th className="py-4 px-5">Nama Komoditas</th>
                    <th className="py-4 px-4">Kategori</th>
                    <th className="py-4 px-4">Harga Kontrak B2B</th>
                    <th className="py-4 px-4">Stok Tersedia</th>
                    <th className="py-4 px-4">Minimal Order (MOQ)</th>
                    <th className="py-4 px-4">Lead Time</th>
                    <th className="py-4 px-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                  {filteredItems.map((item, idx) => {
                    const st = Number(item.stock);
                    const isSafe = st > 20;
                    const isLow = st > 0 && st <= 20;

                    return (
                      <tr key={item.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-bold text-[#172033]">{item.name}</div>
                          <span className="text-[11px] font-mono font-bold text-primary">
                            SKU-SUP-{String(idx + 1).padStart(3, "0")}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-tertiary capitalize">
                          {item.category || "Bahan Baku"}
                        </td>

                        <td className="py-4 px-4 font-mono font-bold text-primary">
                          Rp {Number(item.price).toLocaleString("id-ID")}{" "}
                          <span className="text-xs text-tertiary font-normal">/ {item.unit}</span>
                        </td>

                        <td className="py-4 px-4 font-mono font-bold text-[#172033]">
                          {st.toLocaleString("id-ID")} {item.unit}
                        </td>

                        <td className="py-4 px-4 text-tertiary font-mono">
                          {item.minOrder ? `${item.minOrder} ${item.unit}` : `1 ${item.unit}`}
                        </td>

                        <td className="py-4 px-4 text-tertiary">
                          {item.leadTimeDays ? `${item.leadTimeDays} Hari` : "1 Hari"}
                        </td>

                        <td className="py-4 px-5 text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              isSafe
                                ? "bg-[#E8F3EC] text-primary"
                                : isLow
                                ? "bg-[#FFF9E6] text-[#B7791F]"
                                : "bg-[#FDF2F2] text-error"
                            }`}
                          >
                            {isSafe ? "Tersedia" : isLow ? "Menipis" : "Habis"}
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

      {/* Modal Tambah Komoditas */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#172033]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-outline-variant/60 shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">add_box</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg">Tambah Komoditas Baru</h3>
                  <p className="text-xs text-tertiary">Daftarkan bahan baku ke katalog resmi pemasok</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-tertiary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                  Nama Komoditas / Bahan
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Biji Kopi Arabika Lintong"
                  className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                  >
                    <option value="Biji Kopi">Biji Kopi</option>
                    <option value="Dairy & Susu">Dairy &amp; Susu</option>
                    <option value="Sirup & Pemanis">Sirup &amp; Pemanis</option>
                    <option value="Kemasan & Packaging">Kemasan &amp; Packaging</option>
                    <option value="Bahan Baku">Bahan Baku Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Satuan (Unit)
                  </label>
                  <input
                    type="text"
                    required
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="kg, liter, jeriken, dus..."
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Harga Kontrak B2B (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="185000"
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Stok Tersedia
                  </label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Minimal Order (MOQ)
                  </label>
                  <input
                    type="number"
                    required
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Lead Time (Hari)
                  </label>
                  <input
                    type="number"
                    required
                    value={leadTimeDays}
                    onChange={(e) => setLeadTimeDays(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-semibold text-tertiary hover:bg-surface-container"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createItemMutation.isPending}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-[#0D6038] text-white text-sm font-bold shadow-sm transition-all"
                >
                  {createItemMutation.isPending ? "Menyimpan..." : "Simpan ke Katalog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
