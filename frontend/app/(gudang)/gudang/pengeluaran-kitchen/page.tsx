"use client";

import { useMemo, useState } from "react";
import {
  useDispatchKitchen,
  useInventory,
  useStockMovements,
} from "@/features/inventory/hooks/use-inventory";
import { StockMovementItem } from "@/features/inventory/types/inventory.types";

export default function GudangPengeluaranKitchenPage() {
  const { data: movements = [], isLoading } = useStockMovements();
  const { data: inventory = [] } = useInventory();
  const dispatchMutation = useDispatchKitchen();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<StockMovementItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [ingredientId, setIngredientId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [station, setStation] = useState("Bar Kopi & Minuman Utama");
  const [recipientName, setRecipientName] = useState("Fahmi Nugraha (Head Barista)");
  const [notes, setNotes] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filter outbound movements
  const outMovements = useMemo(() => {
    return movements.filter(
      (m) =>
        m.type === "out" ||
        m.referenceId?.toLowerCase().includes("kitchen") ||
        m.referenceId?.toLowerCase().includes("bar")
    );
  }, [movements]);

  // Statistics
  const totalDispatches = outMovements.length;
  const totalQtyIssued = outMovements.reduce((acc, m) => acc + Math.abs(Number(m.qty) || 0), 0);

  const handleOpenModal = () => {
    if (inventory.length > 0 && !ingredientId) {
      setIngredientId(inventory[0].id);
    }
    setModalOpen(true);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredientId || quantity <= 0) {
      showToast("Pilih bahan baku dan masukkan jumlah yang valid!");
      return;
    }

    const selectedIng = inventory.find((i) => i.id === ingredientId);
    if (selectedIng && Number(selectedIng.stock) < quantity) {
      showToast(`Stok ${selectedIng.name} tidak cukup (Tersedia: ${selectedIng.stock} ${selectedIng.unit})!`);
      return;
    }

    dispatchMutation.mutate(
      {
        ingredientId,
        quantity: Number(quantity),
        station,
        notes: `Diserahkan ke ${recipientName} (${station}). ${notes}`.trim(),
      },
      {
        onSuccess: (res) => {
          setModalOpen(false);
          setQuantity(1);
          setNotes("");
          showToast(`Berhasil menyerahkan ${quantity} unit bahan ke ${station}! Stok gudang otomatis terpotong.`);
        },
        onError: (err) => {
          showToast(`Gagal mengeluarkan bahan: ${err.message}`);
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
              Material Issuance &amp; Kitchen Requisitions
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Pengeluaran Bahan Baku ke Bar &amp; Kitchen
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pengeluaran Bahan ke Kitchen &amp; Bar
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Catat dan verifikasi serah terima bahan baku dari ruang gudang ke stasiun kerja barista dan dapur roti, saldo inventaris otomatis berkurang secara FIFO.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleOpenModal}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">output</span>
            <span>Input Pengeluaran Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Permintaan Selesai Tercatat</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{totalDispatches} Pengeluaran</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Stok Terpotong FIFO
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Bahan Baku Dikeluarkan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {totalQtyIssued.toLocaleString("id-ID")} Qty/Kg
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kopi, Susu, &amp; Pelengkap
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Waktu Tunggu Serah Terima</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">3.5 Menit</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Respons Cepat Gudang
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Kesesuaian Timbangan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">100%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Diverifikasi Barista Lead
          </span>
        </div>
      </div>

      {/* Dispatches List */}
      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
          <span className="material-symbols-outlined text-[36px] animate-spin text-primary mb-2">progress_activity</span>
          <p>Memuat catatan pengeluaran bahan dari database...</p>
        </div>
      ) : outMovements.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center space-y-3">
          <span className="material-symbols-outlined text-[48px] text-tertiary">output</span>
          <h3 className="text-headline-sm font-bold text-[#172033]">Belum Ada Pengeluaran Bahan ke Kitchen</h3>
          <p className="text-tertiary text-body-sm max-w-md mx-auto">
            Gunakan tombol di atas untuk mencatat serah terima bahan baku ke barista atau chef kitchen.
          </p>
          <button
            type="button"
            onClick={handleOpenModal}
            className="h-10 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Input Pengeluaran Sekarang</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {outMovements.map((dsp) => {
            const dateStr = dsp.createdAt
              ? new Date(dsp.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Hari Ini";

            return (
              <div
                key={dsp.id}
                className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-[#172033] font-mono text-body-lg">
                        DSP-{dsp.id.slice(0, 8).toUpperCase()}
                      </h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-primary">
                        Telah Diserahkan &amp; Stok Terpotong
                      </span>
                    </div>
                    <p className="text-body-sm font-semibold text-on-surface mt-1">
                      Komoditas: {dsp.ingredient?.name || "Bahan Baku"} •{" "}
                      <span className="text-primary font-bold">
                        {Math.abs(Number(dsp.qty))} {dsp.ingredient?.unit || "unit"}
                      </span>
                    </p>
                    <div className="text-xs text-tertiary mt-0.5">
                      Waktu Transaksi: {dateStr}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedMovement(dsp)}
                      className="h-10 px-4 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">print</span>
                      <span>Cetak Bukti Pengeluaran Barang</span>
                    </button>
                  </div>
                </div>

                <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="font-bold text-on-surface">Keterangan / Tujuan:</span>{" "}
                  {dsp.referenceId || "Pengeluaran bahan ke stasiun kitchen"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: Input Pengeluaran Baru */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/30 p-6 sm:p-8 animate-fade-in space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">output</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-bold text-[#172033]">Serah Terima Bahan ke Kitchen</h3>
                  <p className="text-xs text-tertiary">Pencatatan pengeluaran stok fisik gudang ke stasiun kerja</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-tertiary hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleDispatch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Pilih Bahan Baku (Dari Inventaris) *
                </label>
                <select
                  required
                  value={ingredientId}
                  onChange={(e) => setIngredientId(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033] bg-white"
                >
                  {inventory.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} (Tersedia: {i.stock} {i.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Jumlah Dikeluarkan *
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="any"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Stasiun Kitchen Tujuan
                  </label>
                  <select
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033] bg-white"
                  >
                    <option value="Bar Kopi & Minuman Utama">Bar Kopi &amp; Minuman</option>
                    <option value="Pastry & Bakery Station">Pastry &amp; Bakery</option>
                    <option value="Central Kitchen Prep">Central Kitchen Prep</option>
                    <option value="Cold Prep & Packaging">Packaging &amp; Cold Prep</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Nama Penerima (Barista / Chef Lead)
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">
                  Catatan Tambahan
                </label>
                <textarea
                  rows={2}
                  placeholder="Kebutuhan restock shift pagi, persiapan event, dll..."
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
                  disabled={dispatchMutation.isPending}
                  className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>{dispatchMutation.isPending ? "Memproses..." : "Konfirmasi Pengeluaran"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PRINT BUKTI SERAH TERIMA */}
      {selectedMovement && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-outline-variant/30 p-6 sm:p-8 animate-fade-in space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="text-headline-sm font-bold text-[#172033]">Bukti Pengeluaran Barang</h3>
              <button
                type="button"
                onClick={() => setSelectedMovement(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-tertiary hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAF9] border border-outline-variant/30 space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">BAPER SCM - GUDANG LOGISTIK</span>
                <span className="text-primary font-bold">DSP-{selectedMovement.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="space-y-1 text-tertiary">
                <div>Waktu: <span className="text-on-surface font-sans">{new Date(selectedMovement.createdAt).toLocaleString("id-ID")}</span></div>
                <div>Komoditas: <span className="text-on-surface font-sans font-bold">{selectedMovement.ingredient?.name}</span></div>
                <div>Jumlah: <span className="text-primary font-bold">{Math.abs(Number(selectedMovement.qty))} {selectedMovement.ingredient?.unit}</span></div>
                <div>Keterangan: <span className="text-on-surface font-sans">{selectedMovement.referenceId}</span></div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 text-center border-t text-[11px] text-tertiary">
                <div>
                  <p>Petugas Gudang</p>
                  <div className="h-10" />
                  <p className="font-bold text-on-surface">( .................... )</p>
                </div>
                <div>
                  <p>Penerima Kitchen</p>
                  <div className="h-10" />
                  <p className="font-bold text-on-surface">( .................... )</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedMovement(null)}
                className="h-10 px-4 rounded-xl border border-outline-variant/50 text-tertiary hover:bg-[#F5F8F6] text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Cetak Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
