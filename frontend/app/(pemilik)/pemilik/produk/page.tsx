"use client";

import { useMemo, useState } from "react";
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from "@/features/products/hooks/use-products";
import { useInventory } from "@/features/inventory/hooks/use-inventory";
import { ProductItem } from "@/features/products/types/products.types";

function rupiah(n: number | string) {
  return "Rp " + Math.round(Number(n) || 0).toLocaleString("id-ID");
}

export default function PemilikProdukPage() {
  const { data: dbProducts = [], isLoading } = useProducts();
  const { data: dbIngredients = [] } = useInventory();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [filterCategory, setFilterCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("minuman");
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredientId: string; qtyPerUnit: number }[]
  >([]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const getPortionCapacity = (prd: ProductItem) => {
    if (!prd.isAvailable) return { capacity: 0, label: "Nonaktif / Habis", isAvailable: false };
    const bom = prd.productIngredients || [];
    if (bom.length === 0) return { capacity: 50, label: "Siap (Tanpa BOM)", isAvailable: true };

    const limits = bom.map((pi) => {
      const req = Number(pi.qtyPerUnit) || 0;
      const inv = dbIngredients.find((i) => i.id === pi.ingredientId);
      const stock = inv ? Number(inv.stock) : Number(pi.ingredient?.stock || 0);
      return req > 0 ? Math.floor(stock / req) : 0;
    });

    const capacity = Math.max(0, Math.min(...limits));
    if (capacity <= 0) return { capacity: 0, label: "Bahan Baku Habis", isAvailable: false };
    if (capacity < 15) return { capacity, label: `Menipis (${capacity} Porsi)`, isAvailable: true };
    return { capacity, label: `${capacity} Porsi Siap`, isAvailable: true };
  };

  const filteredProducts = useMemo(() => {
    if (filterCategory === "all") return dbProducts;
    return dbProducts.filter((p) => (p.category || "").toLowerCase() === filterCategory.toLowerCase());
  }, [dbProducts, filterCategory]);

  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("minuman");
    setIsAvailable(true);
    setSelectedIngredients([]);
    setModalOpen(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingProduct(p);
    setName(p.name);
    setDescription(p.description || "");
    setPrice(String(p.price));
    setCategory(p.category || "minuman");
    setIsAvailable(p.isAvailable);
    setSelectedIngredients(
      (p.productIngredients || []).map((pi) => ({
        ingredientId: pi.ingredientId,
        qtyPerUnit: Number(pi.qtyPerUnit),
      }))
    );
    setModalOpen(true);
  };

  const handleAddIngredientRow = (ingId: string) => {
    if (!ingId) return;
    if (selectedIngredients.some((i) => i.ingredientId === ingId)) return;
    setSelectedIngredients([...selectedIngredients, { ingredientId: ingId, qtyPerUnit: 10 }]);
  };

  const handleUpdateQty = (ingId: string, qty: number) => {
    setSelectedIngredients(
      selectedIngredients.map((i) => (i.ingredientId === ingId ? { ...i, qtyPerUnit: qty } : i))
    );
  };

  const handleRemoveIngredientRow = (ingId: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i.ingredientId !== ingId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Nama menu dan harga jual wajib diisi!");
      return;
    }

    if (editingProduct) {
      updateProductMutation.mutate(
        {
          id: editingProduct.id,
          name,
          description,
          price: Number(price),
          category,
          isAvailable,
          ingredients: selectedIngredients,
        },
        {
          onSuccess: () => {
            setModalOpen(false);
            showToast(`Menu "${name}" berhasil diperbarui!`);
          },
          onError: (err) => alert(`Gagal memperbarui menu: ${err.message}`),
        }
      );
    } else {
      createProductMutation.mutate(
        {
          name,
          description,
          price: Number(price),
          category,
          isAvailable,
          ingredients: selectedIngredients,
        },
        {
          onSuccess: () => {
            setModalOpen(false);
            showToast(`Menu baru "${name}" berhasil ditambahkan dan siap dijual di Kasir!`);
          },
          onError: (err) => alert(`Gagal menambah menu: ${err.message}`),
        }
      );
    }
  };

  const handleDelete = (p: ProductItem) => {
    if (!confirm(`Hapus menu "${p.name}" dari katalog toko?`)) return;
    deleteProductMutation.mutate(p.id, {
      onSuccess: (result) => {
        showToast(
          result?.message ||
            (result?.softDeleted
              ? `Menu "${p.name}" diarsipkan dan dinonaktifkan dari katalog.`
              : `Menu "${p.name}" berhasil dihapus.`)
        );
      },
      onError: (err) => {
        const message = err?.message || "Terjadi kesalahan pada server.";
        showToast(`Gagal menghapus: ${message}`);
        alert(`Gagal menghapus: ${message}`);
      },
    });
  };

  const handleExportCsv = () => {
    const headers = ["Nama Menu,Kategori,Harga Jual,Ketersediaan,Resep Bahan (BOM)"];
    const rows = dbProducts.map((p) => {
      const bom = (p.productIngredients || [])
        .map((b) => `${b.ingredient?.name || "Bahan"} (${b.qtyPerUnit} ${b.ingredient?.unit || ""})`)
        .join(" + ");
      return `"${p.name}","${p.category || "-"}","${p.price}","${p.isAvailable ? "Tersedia" : "Habis"}","${bom || "Tanpa BOM"}"`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `katalog_menu_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("File CSV katalog menu berhasil diunduh!");
  };

  return (
    <>
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#137A48] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* HEADER SECTION */}
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
            onClick={handleExportCsv}
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Ekspor Menu (CSV)</span>
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambah Menu Baru</span>
          </button>
        </div>
      </div>

      {/* 4 STATS CARDS */}
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
          <span className="text-label-md font-label-md text-tertiary">Menu Unggulan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] truncate">
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

      {/* FILTER & TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-label-sm text-tertiary">Filter Kategori:</span>
            {["all", "minuman", "snack", "paket"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-label-sm font-semibold transition-colors capitalize ${
                  filterCategory === cat
                    ? "bg-[#E8F3EC] text-primary border border-primary/20"
                    : "bg-surface-container-low text-tertiary hover:text-on-surface"
                }`}
              >
                {cat === "all" ? `Semua (${dbProducts.length})` : `${cat} (${dbProducts.filter((p) => (p.category || "").toLowerCase() === cat).length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center text-tertiary">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
              <p className="mt-2 text-body-sm">Memuat katalog menu & resep BOM...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-tertiary">
              <p>Belum ada menu produk dalam kategori ini.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">Nama Menu &amp; Deskripsi</th>
                  <th className="py-4 px-4">Kategori</th>
                  <th className="py-4 px-4">Harga Jual Kasir</th>
                  <th className="py-4 px-4">Komposisi Resep (BOM)</th>
                  <th className="py-4 px-4">Status Kasir</th>
                  <th className="py-4 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {filteredProducts.map((prd) => {
                  const ingredients = prd.productIngredients || [];

                  return (
                    <tr key={prd.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#172033]">{prd.name}</div>
                        <div className="text-xs text-tertiary mt-0.5 line-clamp-1">
                          {prd.description || "Tidak ada deskripsi"}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="capitalize text-xs font-medium bg-[#F5F8F6] px-2.5 py-0.5 rounded text-tertiary border border-outline-variant/30">
                          {prd.category || "General"}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-primary">
                        {rupiah(prd.price)}
                      </td>

                      <td className="py-4 px-4">
                        {ingredients.length === 0 ? (
                          <span className="text-xs text-tertiary italic">Tanpa Resep Bahan</span>
                        ) : (
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {ingredients.map((ing) => (
                              <span
                                key={ing.id}
                                className="inline-block text-[10px] bg-[#E8F3EC] text-primary px-2 py-0.5 rounded-md border border-primary/20"
                              >
                                {ing.ingredient?.name || "Bahan"} ({Number(ing.qtyPerUnit)} {ing.ingredient?.unit || "unit"})
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        {(() => {
                          const cap = getPortionCapacity(prd);
                          return (
                            <div>
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                  !cap.isAvailable
                                    ? "bg-[#FDF2F2] text-error border border-error/30"
                                    : cap.capacity < 15
                                    ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                                    : "bg-[#E8F3EC] text-primary border border-primary/20"
                                }`}
                              >
                                {cap.label}
                              </span>
                              <div className="text-[11px] text-tertiary mt-0.5">
                                Terpotong otomatis saat dibeli di Kasir
                              </div>
                            </div>
                          );
                        })()}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openEditModal(prd)}
                            className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                            title="Edit Menu & Resep"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(prd)}
                            className="w-8 h-8 rounded-lg hover:bg-[#FDF2F2] text-tertiary hover:text-error flex items-center justify-center transition-colors cursor-pointer"
                            title="Hapus Menu"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
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

      {/* MODAL TAMBAH / EDIT PRODUK & BOM */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl border border-outline-variant/30 space-y-5 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[22px]">restaurant_menu</span>
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-on-surface">
                    {editingProduct ? "Edit Menu & Resep" : "Tambah Menu Produk Baru"}
                  </h3>
                  <p className="text-body-sm text-tertiary">
                    {editingProduct ? `Perbarui data untuk ${editingProduct.name}` : "Tambahkan menu ke kasir POS"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-xl text-tertiary hover:bg-surface-container flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                  Nama Menu *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kopi Kenangan Mantan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Harga Jual Kasir (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    placeholder="22000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Kategori *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                  >
                    <option value="minuman">Minuman</option>
                    <option value="snack">Snack & Makanan</option>
                    <option value="paket">Paket Hemat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                  Deskripsi Menu
                </label>
                <textarea
                  rows={2}
                  placeholder="Perpaduan espresso arabika, fresh milk, dan gula aren pilihan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                />
              </div>

              {/* Bill of Materials (BOM) Section */}
              <div className="pt-2 border-t border-outline-variant/30">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-tertiary uppercase">
                    Komposisi Bahan Baku (BOM / Resep):
                  </label>
                  <span className="text-[11px] text-primary font-semibold">
                    Stok otomatis berkurang per penjualan kasir
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  {selectedIngredients.map((item) => {
                    const ing = dbIngredients.find((i) => i.id === item.ingredientId);
                    return (
                      <div
                        key={item.ingredientId}
                        className="flex items-center gap-2 bg-[#F5F8F6] p-2.5 rounded-xl border border-outline-variant/30"
                      >
                        <span className="font-semibold text-xs text-on-surface flex-1">
                          {ing?.name || "Bahan Baku"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="1"
                            value={item.qtyPerUnit}
                            onChange={(e) => handleUpdateQty(item.ingredientId, Number(e.target.value))}
                            className="w-20 text-xs p-1.5 rounded-lg border border-outline-variant/50 bg-white font-mono text-center"
                          />
                          <span className="text-xs text-tertiary font-mono w-10">{ing?.unit || "unit"}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveIngredientRow(item.ingredientId)}
                            className="text-tertiary hover:text-error p-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add ingredient picker */}
                <select
                  defaultValue=""
                  onChange={(e) => {
                    handleAddIngredientRow(e.target.value);
                    e.target.value = "";
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-dashed border-[#94B9A9] bg-[#E8F3EC]/40 text-primary font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="" disabled>
                    + Tambahkan Komponen Resep Bahan dari Gudang...
                  </option>
                  {dbIngredients.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} (Satuan: {ing.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="avail"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <label htmlFor="avail" className="text-xs font-semibold text-on-surface cursor-pointer">
                  Menu langsung aktif dan tampil di mesin Kasir POS
                </label>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant/40 hover:bg-surface-container-low text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  {createProductMutation.isPending || updateProductMutation.isPending
                    ? "Menyimpan..."
                    : editingProduct
                    ? "Simpan Perubahan"
                    : "Terbitkan Menu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
