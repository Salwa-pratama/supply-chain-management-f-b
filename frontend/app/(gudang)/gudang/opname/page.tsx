"use client";

import { useState } from "react";
import { useInventory, useStockOpname } from "@/features/inventory/hooks/use-inventory";
import { useActiveUserProfile } from "@/features/auth/hooks/use-auth-user";

export default function GudangOpnamePage() {
  const { data: items = [], isLoading } = useInventory();
  const activeUser = useActiveUserProfile();
  const auditorName = activeUser?.name || "Petugas Gudang";
  const stockOpnameMutation = useStockOpname();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState("");
  const [actualStock, setActualStock] = useState("");
  const [notes, setNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.id === selectedIngredientId);
  const sysStockNum = selectedItem ? Number(selectedItem.stock) : 0;
  const actStockNum = Number(actualStock) || 0;
  const diff = actualStock !== "" ? actStockNum - sysStockNum : 0;

  function handleOpenModal(ingredientId?: string) {
    if (ingredientId) {
      setSelectedIngredientId(ingredientId);
      const it = items.find((i) => i.id === ingredientId);
      setActualStock(it ? String(it.stock) : "0");
    } else if (items.length > 0) {
      setSelectedIngredientId(items[0].id);
      setActualStock(String(items[0].stock));
    }
    setNotes("Audit rutin opname fisik rak");
    setModalOpen(true);
  }

  function handleSubmitOpname(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedIngredientId || actualStock === "") return;

    stockOpnameMutation.mutate(
      {
        ingredientId: selectedIngredientId,
        actualStock: Number(actualStock),
        notes: notes || "Audit stok opname fisik",
      },
      {
        onSuccess: (res) => {
          setModalOpen(false);
          setToast(`Opname berhasil disimpan! Selisih: ${res.diff >= 0 ? "+" : ""}${res.diff}. Saldo stok disinkronkan.`);
          setTimeout(() => setToast(null), 4000);
        },
        onError: (err) => {
          alert(`Gagal opname: ${err.message}`);
        },
      }
    );
  }

  return (
    <>
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#137A48] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Stock Reconciliation &amp; Audit Trail
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live Database Inventaris Gudang
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Stok Opname &amp; Audit Persediaan
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Bandingkan saldo catatan kartu stok sistem dengan hasil hitung fisik di rak, catat selisih beserta alasannya, dan sinkronkan pembukuan secara akuntabel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Input Hasil Hitung Fisik</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total SKU Terdaftar</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{items.length} SKU</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Siap Diaudit
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Stok Kritis / Menipis</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">
            {items.filter((i) => i.status !== "aman").length} SKU
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-full">
            Perlu Verifikasi Fisik
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Akurasi Sistem</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">100%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tersinkron Database
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Petugas Audit</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{auditorName}</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Manager Gudang
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat data persediaan...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-tertiary">Belum ada bahan baku di inventaris.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">Kode SKU &amp; Nama Bahan</th>
                  <th className="py-4 px-4">Lokasi Rak</th>
                  <th className="py-4 px-4">Stok Tercatat di Sistem</th>
                  <th className="py-4 px-4">Buffer Min</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-5 text-right">Aksi Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#172033]">{item.name}</div>
                      <span className="text-[11px] font-mono font-bold text-primary">
                        SKU-BPR-{String(idx + 1).padStart(3, "0")}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-tertiary">
                      {item.locationRack || "Gudang Utama"}
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-primary">
                      {Number(item.stock).toLocaleString("id-ID")} {item.unit}
                    </td>

                    <td className="py-4 px-4 text-tertiary font-mono">
                      {Number(item.minStock).toLocaleString("id-ID")} {item.unit}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.status === "aman"
                            ? "bg-[#E8F3EC] text-primary"
                            : item.status === "menipis"
                            ? "bg-[#FFF9E6] text-[#B7791F]"
                            : "bg-[#FDF2F2] text-error"
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-[#0D6038] text-xs font-bold shadow-sm transition-all"
                      >
                        Koreksi Opname
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Input Hasil Hitung Fisik */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#172033]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-outline-variant/60 shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">tune</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg">Input Hasil Stok Opname</h3>
                  <p className="text-xs text-tertiary">Sinkronisasi saldo fisik dengan database</p>
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

            <form onSubmit={handleSubmitOpname} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                  Pilih Bahan Baku
                </label>
                <select
                  value={selectedIngredientId}
                  onChange={(e) => {
                    setSelectedIngredientId(e.target.value);
                    const it = items.find((i) => i.id === e.target.value);
                    if (it) setActualStock(String(it.stock));
                  }}
                  className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                >
                  {items.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} (Stok Sistem: {i.stock} {i.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <span className="text-xs text-tertiary">Stok Sistem Saat Ini:</span>
                  <div className="text-base font-bold text-on-surface font-mono mt-0.5">
                    {sysStockNum} {selectedItem?.unit || ""}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Hitung Fisik Aktual
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={actualStock}
                    onChange={(e) => setActualStock(e.target.value)}
                    className="w-full text-base font-bold font-mono p-2.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {actualStock !== "" && (
                <div
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                    diff === 0
                      ? "bg-[#E8F3EC] text-[#137A48] border-primary/20"
                      : diff > 0
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-[#FDF2F2] text-error border-error/30"
                  }`}
                >
                  <span>Selisih (Variance):</span>
                  <span className="font-mono text-sm font-bold">
                    {diff > 0 ? `+${diff}` : diff} {selectedItem?.unit || ""}
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                  Alasan Penyesuaian / Catatan
                </label>
                <input
                  type="text"
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Susut kalibrasi grinder, spill, salah hitung sebelumnya..."
                  className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                />
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
                  disabled={stockOpnameMutation.isPending}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-[#0D6038] text-white text-sm font-bold shadow-sm transition-all"
                >
                  {stockOpnameMutation.isPending ? "Menyimpan..." : "Simpan Koreksi Opname"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
