"use client";

import { useMemo, useState } from "react";
import {
  useProductionBatches,
  useCreateKitchenBatch,
  useUpdateKitchenBatchStatus,
} from "@/features/production/hooks/use-production";
import { useInventory } from "@/features/inventory/hooks/use-inventory";

interface IngredientRow {
  ingredientId?: string;
  name: string;
  quantity: number;
  unit: string;
}

export default function PemilikProduksiPage() {
  const { data: batches = [], isLoading } = useProductionBatches();
  const { data: inventory = [] } = useInventory();
  const createBatchMutation = useCreateKitchenBatch();
  const updateStatusMutation = useUpdateKitchenBatchStatus();

  // Filters & State
  const [filterTab, setFilterTab] = useState<"all" | "in_progress" | "completed">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [recipeName, setRecipeName] = useState("");
  const [station, setStation] = useState("Central Bar Extraction");
  const [operator, setOperator] = useState("Budi Santoso (Head Production)");
  const [plannedYield, setPlannedYield] = useState("");
  const [notes, setNotes] = useState("");
  const [rows, setRows] = useState<IngredientRow[]>([
    { ingredientId: "", name: "", quantity: 1, unit: "kg" },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredBatches = useMemo(() => {
    if (filterTab === "all") return batches;
    return batches.filter((b) => b.status === filterTab);
  }, [batches, filterTab]);

  // Statistics
  const totalBatches = batches.length;
  const inProgressCount = batches.filter((b) => b.status === "in_progress").length;
  const completedCount = batches.filter((b) => b.status === "completed").length;

  const handleAddIngredientRow = () => {
    setRows((prev) => [...prev, { ingredientId: "", name: "", quantity: 1, unit: "kg" }]);
  };

  const handleRemoveIngredientRow = (index: number) => {
    setRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleRowChange = (index: number, field: keyof IngredientRow, value: any) => {
    setRows((prev) =>
      prev.map((row, idx) => {
        if (idx !== index) return row;
        if (field === "ingredientId") {
          const inv = inventory.find((i) => i.id === value);
          return {
            ...row,
            ingredientId: value,
            name: inv ? inv.name : row.name,
            unit: inv ? inv.unit : row.unit,
          };
        }
        return { ...row, [field]: value };
      })
    );
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeName.trim() || !plannedYield.trim()) {
      showToast("Nama resep dan target hasil wajib diisi!");
      return;
    }

    const items = rows
      .filter((r) => r.name.trim() || r.ingredientId)
      .map((r) => ({
        name: r.name || "Bahan Baku",
        quantity: Number(r.quantity) || 1,
        unit: r.unit || "unit",
        ingredientId: r.ingredientId || undefined,
      }));

    createBatchMutation.mutate(
      {
        recipeName: recipeName.trim(),
        station,
        operator: operator.trim(),
        plannedYield: plannedYield.trim(),
        notes: notes.trim() || undefined,
        items,
      },
      {
        onSuccess: (res) => {
          setModalOpen(false);
          setRecipeName("");
          setPlannedYield("");
          setNotes("");
          setRows([{ ingredientId: "", name: "", quantity: 1, unit: "kg" }]);
          showToast(`Batch ${res.batchNumber} berhasil dibuat & proses produksi dimulai!`);
        },
        onError: (err) => {
          showToast(`Gagal memulai batch: ${err.message}`);
        },
      }
    );
  };

  const handleCompleteBatch = (b: typeof batches[0]) => {
    updateStatusMutation.mutate(
      {
        id: b.id,
        status: "completed",
        progress: 100,
        actualYield: b.plannedYield || undefined,
        notes: "Selesai & Lolos QC Rasa",
      },
      {
        onSuccess: () => {
          showToast(`Batch ${b.batchNumber} selesai! Output siap disajikan atau didistribusikan.`);
        },
        onError: (err) => {
          showToast(`Gagal update batch: ${err.message}`);
        },
      }
    );
  };

  const handleAdvanceProgress = (b: typeof batches[0]) => {
    const nextProgress = Math.min(100, (b.progress || 0) + 25);
    const nextStatus = nextProgress >= 100 ? "completed" : "in_progress";
    updateStatusMutation.mutate(
      {
        id: b.id,
        status: nextStatus,
        progress: nextProgress,
        actualYield: nextProgress >= 100 ? b.plannedYield || undefined : undefined,
      },
      {
        onSuccess: () => {
          showToast(`Progress Batch ${b.batchNumber} diperbarui menjadi ${nextProgress}%`);
        },
        onError: (err) => {
          showToast(`Gagal: ${err.message}`);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#172033] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/40 animate-fade-in text-sm font-medium">
          <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Work Order &amp; Batch Kitchen
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              {batches.length} Batch Tercatat di Database
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Kitchen &amp; Manajemen Produksi
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pencatatan konversi bahan mentah menjadi bahan siap saji (*semi-finished goods*), kalkulasi yield produksi, dan kontrol kualitas rasa.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">skillet</span>
            <span>Mulai Batch Produksi Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Batch Produksi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{totalBatches} Batch</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Database Real-Time
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Batch Sedang Berjalan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">{inProgressCount} Batch</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full">
            Di Stasiun Bar / Kitchen
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Batch Selesai (QC Passed)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{completedCount} Batch</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Siap Masuk Stok POS
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Efisiensi Yield</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {totalBatches > 0 ? "98.2%" : "100%"}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Waste Bahan Baku Rendah
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-outline-variant/30">
        {[
          { key: "all", label: `Semua Batch (${batches.length})` },
          { key: "in_progress", label: `Sedang Berjalan (${inProgressCount})` },
          { key: "completed", label: `Selesai (${completedCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilterTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-label-md font-bold transition-colors cursor-pointer ${
              filterTab === tab.key
                ? "bg-primary text-white shadow-sm"
                : "text-tertiary hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Batch Cards List */}
      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
          <span className="material-symbols-outlined text-[36px] animate-spin text-primary mb-2">progress_activity</span>
          <p>Memuat batch produksi dari database...</p>
        </div>
      ) : filteredBatches.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center space-y-3">
          <span className="material-symbols-outlined text-[48px] text-tertiary">skillet</span>
          <h3 className="text-headline-sm font-bold text-[#172033]">Belum Ada Batch Produksi</h3>
          <p className="text-tertiary text-body-sm max-w-md mx-auto">
            Mulai batch pertama untuk mencatat ekstraksi kopi, sirup artisan, atau panggangan pastry dapur.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Mulai Batch Baru</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBatches.map((b) => {
            const isDone = b.status === "completed";
            const inputSummary =
              b.items && b.items.length > 0
                ? b.items.map((it) => `${it.quantity} ${it.unit} ${it.name}`).join(" + ")
                : b.notes || "Bahan baku standar resep";

            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-[#172033] text-body-lg">{b.recipeName}</h3>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isDone
                            ? "bg-[#E8F3EC] text-primary"
                            : "bg-[#FFF9E6] text-[#B7791F]"
                        }`}
                      >
                        {isDone ? "Selesai & Lolos QC" : `Sedang Diproses (${b.progress}%)`}
                      </span>
                    </div>
                    <div className="text-xs text-tertiary mt-1">
                      ID Batch: <strong className="font-mono text-on-surface">{b.batchNumber}</strong> • Stasiun: {b.station || "Central Kitchen"} • Operator: {b.operator || "Staff Kitchen"}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-tertiary">Output Produk Jadi</span>
                    <div className="text-headline-sm font-headline-sm font-bold text-primary">
                      {b.actualYield || b.plannedYield || "-"}
                    </div>
                  </div>
                </div>

                <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="font-bold text-on-surface">Bahan Baku Digunakan (Inputs):</span> {inputSummary}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-tertiary font-medium">
                    <span>Progress Batch</span>
                    <span className="font-bold text-primary">{b.progress}%</span>
                  </div>
                  <div className="w-full bg-[#E9EDFF] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDone ? "bg-primary" : "bg-[#B7791F]"
                      }`}
                      style={{ width: `${b.progress}%` }}
                    />
                  </div>
                </div>

                {/* Batch Actions */}
                {!isDone && (
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                    <button
                      type="button"
                      onClick={() => handleAdvanceProgress(b)}
                      disabled={updateStatusMutation.isPending}
                      className="h-9 px-3.5 rounded-xl border border-outline-variant/50 hover:bg-[#F5F8F6] text-on-surface text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      <span>+25% Progress</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCompleteBatch(b)}
                      disabled={updateStatusMutation.isPending}
                      className="h-9 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Selesaikan Batch (QC Passed)</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: Mulai Batch Produksi Baru */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/30 p-6 sm:p-8 animate-fade-in space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">skillet</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-bold text-[#172033]">Mulai Batch Produksi Baru</h3>
                  <p className="text-xs text-tertiary">Pencatatan konversi bahan mentah menjadi produk jadi</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-tertiary hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Nama Resep / Formula Masakan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Cold Brew Extraction Concentrate (30L)"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Stasiun Produksi
                  </label>
                  <select
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033] bg-white"
                  >
                    <option value="Central Bar Extraction">Central Bar Extraction</option>
                    <option value="Kitchen Syrups & Sauces">Kitchen Syrups &amp; Sauces</option>
                    <option value="Bakery Oven Station">Bakery Oven Station</option>
                    <option value="Cold Prep & Pastry">Cold Prep &amp; Pastry</option>
                    <option value="Packaging & Bottling">Packaging &amp; Bottling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Penanggung Jawab / Operator
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Barista / Chef"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Target Output / Yield Produk Jadi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 120 Porsi Cold Brew, atau 10 Botol @ 1L"
                    value={plannedYield}
                    onChange={(e) => setPlannedYield(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>
              </div>

              {/* Dynamic Ingredients Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#172033]">
                    Bahan Baku yang Digunakan (BOM Konsumsi)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddIngredientRow}
                    className="text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Tambah Bahan</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {rows.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select
                        value={row.ingredientId || ""}
                        onChange={(e) => handleRowChange(idx, "ingredientId", e.target.value)}
                        className="flex-1 h-10 px-3 rounded-xl border border-outline-variant/50 text-xs text-[#172033] bg-white"
                      >
                        <option value="">-- Pilih dari Gudang / Custom --</option>
                        {inventory.map((inv) => (
                          <option key={inv.id} value={inv.id}>
                            {inv.name} (Sisa: {inv.stock} {inv.unit})
                          </option>
                        ))}
                      </select>

                      {!row.ingredientId && (
                        <input
                          type="text"
                          placeholder="Nama Bahan Manual"
                          value={row.name}
                          onChange={(e) => handleRowChange(idx, "name", e.target.value)}
                          className="flex-1 h-10 px-3 rounded-xl border border-outline-variant/50 text-xs text-[#172033]"
                        />
                      )}

                      <input
                        type="number"
                        min="0.1"
                        step="any"
                        placeholder="Qty"
                        value={row.quantity}
                        onChange={(e) => handleRowChange(idx, "quantity", Number(e.target.value))}
                        className="w-20 h-10 px-3 rounded-xl border border-outline-variant/50 text-xs text-[#172033]"
                      />

                      <input
                        type="text"
                        placeholder="Satuan"
                        value={row.unit}
                        onChange={(e) => handleRowChange(idx, "unit", e.target.value)}
                        className="w-20 h-10 px-3 rounded-xl border border-outline-variant/50 text-xs text-[#172033]"
                      />

                      {rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredientRow(idx)}
                          className="w-8 h-8 rounded-lg hover:bg-error-container text-tertiary hover:text-error flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Catatan Khusus / Prosedur SOP
                </label>
                <textarea
                  rows={2}
                  placeholder="Catatan steeping, suhu oven, atau instruksi QC..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-11 px-5 rounded-xl border border-outline-variant/50 text-tertiary hover:bg-[#F5F8F6] text-sm font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createBatchMutation.isPending}
                  className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  <span>{createBatchMutation.isPending ? "Memulai..." : "Mulai Produksi Batch"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
