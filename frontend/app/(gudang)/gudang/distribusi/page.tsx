"use client";

import { useMemo, useState } from "react";
import {
  useBranchTransfers,
  useCreateBranchTransfer,
  useUpdateBranchTransferStatus,
} from "@/features/distribution/hooks/use-distribution";
import { useInventory } from "@/features/inventory/hooks/use-inventory";
import { BranchTransfer } from "@/features/distribution/types/distribution.types";

interface TransferItemRow {
  ingredientId?: string;
  name: string;
  quantity: number;
  unit: string;
}

export default function GudangDistribusiPage() {
  const { data: transfers = [], isLoading } = useBranchTransfers();
  const { data: inventory = [] } = useInventory();
  const createTransferMutation = useCreateBranchTransfer();
  const updateStatusMutation = useUpdateBranchTransferStatus();

  const [filterTab, setFilterTab] = useState<"all" | "shipping" | "received">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDo, setSelectedDo] = useState<BranchTransfer | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [destination, setDestination] = useState("Cabang SCBD Lot 8");
  const [origin, setOrigin] = useState("Central Warehouse Hub (Dapur Induk)");
  const [driver, setDriver] = useState("Rudi Hartono (Driver Hub)");
  const [vehicleInfo, setVehicleInfo] = useState("Gran Max Blind Van (B 9811 KLC)");
  const [departureTime, setDepartureTime] = useState("08:00 WIB");
  const [eta, setEta] = useState("08:45 WIB");
  const [notes, setNotes] = useState("");
  const [rows, setRows] = useState<TransferItemRow[]>([
    { ingredientId: "", name: "", quantity: 15, unit: "kg" },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredTransfers = useMemo(() => {
    if (filterTab === "all") return transfers;
    return transfers.filter((t) => t.status === filterTab);
  }, [transfers, filterTab]);

  const totalTransfers = transfers.length;
  const inTransitCount = transfers.filter((t) => t.status === "shipping" || t.status === "preparing").length;
  const receivedCount = transfers.filter((t) => t.status === "received").length;
  const uniqueBranches = new Set(transfers.map((t) => t.destination)).size;

  const handleAddRow = () => {
    setRows((prev) => [...prev, { ingredientId: "", name: "", quantity: 1, unit: "kg" }]);
  };

  const handleRemoveRow = (index: number) => {
    setRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleRowChange = (index: number, field: keyof TransferItemRow, value: any) => {
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

  const handleCreateDO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      showToast("Tujuan gerai cabang wajib diisi!");
      return;
    }

    const items = rows
      .filter((r) => r.name.trim() || r.ingredientId)
      .map((r) => ({
        name: r.name || "Komoditas",
        quantity: Number(r.quantity) || 1,
        unit: r.unit || "unit",
        ingredientId: r.ingredientId || undefined,
      }));

    createTransferMutation.mutate(
      {
        origin: origin.trim(),
        destination: destination.trim(),
        driver: driver.trim() || undefined,
        vehicleInfo: vehicleInfo.trim() || undefined,
        departureTime: departureTime.trim() || undefined,
        eta: eta.trim() || undefined,
        notes: notes.trim() || undefined,
        items,
      },
      {
        onSuccess: (res) => {
          setModalOpen(false);
          setRows([{ ingredientId: "", name: "", quantity: 15, unit: "kg" }]);
          setNotes("");
          showToast(`Surat Jalan ${res.transferNumber} berhasil diterbitkan & siap dimuat!`);
        },
        onError: (err) => {
          showToast(`Gagal: ${err.message}`);
        },
      }
    );
  };

  const handleUpdateStatus = (t: BranchTransfer, newStatus: string, label: string) => {
    updateStatusMutation.mutate(
      { id: t.id, status: newStatus },
      {
        onSuccess: () => {
          showToast(`Status transfer ${t.transferNumber} diperbarui: ${label}`);
        },
        onError: (err) => {
          showToast(`Gagal: ${err.message}`);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
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
              Outbound Logistics &amp; Outlet Delivery
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Distribusi Central Hub ke Gerai Cabang
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Distribusi Bahan Baku ke Outlet
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pengelolaan surat jalan (*Delivery Order* / DO), penyiapan muatan palet, rute kurir logistik internal, dan konfirmasi penerimaan fisik di gerai cabang.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">rv_hookup</span>
            <span>Buat Surat Jalan DO Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Pengiriman Terjadwal</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{totalTransfers} DO</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Database Real-Time
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Outlet Cabang Terlayani</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{uniqueBranches || 0} Cabang</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Jaringan Gerai Satelit
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Dalam Pengiriman (OTW)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">{inTransitCount} DO</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full">
            Muatan Aktif di Armada
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Selesai Diterima Cabang</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{receivedCount} Selesai</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            POD Valid &amp; Diverifikasi
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-outline-variant/30">
        {[
          { key: "all", label: `Semua DO (${transfers.length})` },
          { key: "shipping", label: `Dalam Perjalanan (${inTransitCount})` },
          { key: "received", label: `Selesai Diterima (${receivedCount})` },
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

      {/* Transfers List */}
      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
          <span className="material-symbols-outlined text-[36px] animate-spin text-primary mb-2">progress_activity</span>
          <p>Memuat surat jalan DO cabang dari database...</p>
        </div>
      ) : filteredTransfers.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center space-y-3">
          <span className="material-symbols-outlined text-[48px] text-tertiary">local_shipping</span>
          <h3 className="text-headline-sm font-bold text-[#172033]">Belum Ada Surat Jalan DO</h3>
          <p className="text-tertiary text-body-sm max-w-md mx-auto">
            Buat DO baru saat menyiapkan muatan van atau kurir logistik ke gerai-gerai cabang.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Buat Surat Jalan DO</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTransfers.map((d) => {
            const isDone = d.status === "received";
            const itemsSummary =
              d.items && d.items.length > 0
                ? d.items.map((it) => `${it.quantity} ${it.unit} ${it.name}`).join(" + ")
                : d.notes || "Muatan standar cabang";

            return (
              <div
                key={d.id}
                className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-[#172033] font-mono text-body-lg">{d.transferNumber}</h3>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isDone
                            ? "bg-[#E8F3EC] text-primary"
                            : "bg-[#FFF9E6] text-[#B7791F]"
                        }`}
                      >
                        {isDone ? "Diterima Outlet (POD Selesai)" : "Dalam Perjalanan Antar Cabang"}
                      </span>
                    </div>
                    <p className="text-body-sm font-semibold text-primary mt-1">
                      Gerai Tujuan: {d.destination} (Dari: {d.origin})
                    </p>
                    <div className="text-xs text-tertiary mt-0.5">
                      Armada &amp; Driver: {d.driver || "Kurir"} ({d.vehicleInfo || "Van Hub"}) • Berangkat: {d.departureTime || "-"} • ETA: {d.eta || "-"}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedDo(d)}
                      className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">print</span>
                      <span>Cetak Surat Jalan (DO)</span>
                    </button>
                  </div>
                </div>

                <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="font-bold text-on-surface">Daftar Bahan Muatan:</span> {itemsSummary}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                  {!isDone && (
                    <>
                      {d.status !== "shipping" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(d, "shipping", "Berangkat / OTW")}
                          disabled={updateStatusMutation.isPending}
                          className="h-9 px-3.5 rounded-xl border border-outline-variant/50 hover:bg-[#F5F8F6] text-on-surface text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                          <span>Tandai OTW</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(d, "received", "Diterima Gerai Cabang")}
                        disabled={updateStatusMutation.isPending}
                        className="h-9 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Konfirmasi Penerimaan Cabang</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: Buat Surat Jalan DO Baru */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/30 p-6 sm:p-8 animate-fade-in space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">rv_hookup</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-bold text-[#172033]">Buat Surat Jalan DO Outlet</h3>
                  <p className="text-xs text-tertiary">Penerbitan dokumen resmi pengiriman muatan ke gerai satelit</p>
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

            <form onSubmit={handleCreateDO} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Gudang Pengirim (Origin) *
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Gerai Cabang Tujuan *
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033] bg-white"
                  >
                    <option value="Kopi Kenangan SCBD Lot 8">Kopi Kenangan SCBD Lot 8</option>
                    <option value="Kopi Kenangan Kemang Raya">Kopi Kenangan Kemang Raya</option>
                    <option value="Kopi Kenangan Senopati #04 (Flagship)">Kopi Kenangan Senopati #04 (Flagship)</option>
                    <option value="Kopi Kenangan Bintaro Plaza">Kopi Kenangan Bintaro Plaza</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Nama Driver / Kurir
                  </label>
                  <input
                    type="text"
                    value={driver}
                    onChange={(e) => setDriver(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Armada Kendaraan &amp; Plat Nomor
                  </label>
                  <input
                    type="text"
                    value={vehicleInfo}
                    onChange={(e) => setVehicleInfo(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Jam Keberangkatan
                  </label>
                  <input
                    type="text"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">
                    Estimasi Waktu Tiba (ETA)
                  </label>
                  <input
                    type="text"
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                  />
                </div>
              </div>

              {/* Dynamic Items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#172033]">
                    Daftar Muatan Bahan Baku
                  </label>
                  <button
                    type="button"
                    onClick={handleAddRow}
                    className="text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Tambah Muatan</span>
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
                            {inv.name} (Stok: {inv.stock} {inv.unit})
                          </option>
                        ))}
                      </select>

                      {!row.ingredientId && (
                        <input
                          type="text"
                          placeholder="Nama Barang Manual"
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
                          onClick={() => handleRemoveRow(idx)}
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
                  Catatan Handling / Segel
                </label>
                <textarea
                  rows={2}
                  placeholder="Catatan segel keamanan van, handling suhu dingin, dll..."
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
                  disabled={createTransferMutation.isPending}
                  className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span>{createTransferMutation.isPending ? "Menerbitkan..." : "Terbitkan DO Cabang"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PRINT DO */}
      {selectedDo && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant/30 p-6 sm:p-8 animate-fade-in space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">description</span>
                <h3 className="text-headline-sm font-bold text-[#172033]">Delivery Order (DO) Cabang</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDo(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-tertiary hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-outline-variant/30 space-y-4 text-xs font-mono">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">BAPER SCM - SURAT JALAN RESMI</span>
                <span className="text-primary font-bold">{selectedDo.transferNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-tertiary">
                <div>Gudang Asal: <span className="text-on-surface font-sans font-bold">{selectedDo.origin}</span></div>
                <div>Outlet Tujuan: <span className="text-on-surface font-sans font-bold">{selectedDo.destination}</span></div>
                <div>Driver: <span className="text-on-surface font-sans">{selectedDo.driver || "-"}</span></div>
                <div>Armada: <span className="text-on-surface font-sans">{selectedDo.vehicleInfo || "-"}</span></div>
                <div>Berangkat: <span className="text-on-surface font-sans">{selectedDo.departureTime || "-"}</span></div>
                <div>Status: <span className="text-primary font-sans font-bold uppercase">{selectedDo.status}</span></div>
              </div>

              <div className="pt-2 border-t">
                <div className="font-bold mb-2">RINCIAN MUATAN:</div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-tertiary">
                      <th className="py-1">Nama Barang</th>
                      <th className="py-1 text-right">Qty</th>
                      <th className="py-1 text-right">Satuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDo.items?.map((it, idx) => (
                      <tr key={idx} className="border-b border-outline-variant/20">
                        <td className="py-1.5 font-sans font-semibold text-on-surface">{it.name}</td>
                        <td className="py-1.5 text-right font-mono">{it.quantity}</td>
                        <td className="py-1.5 text-right text-tertiary">{it.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 text-center border-t text-[11px] text-tertiary">
                <div>
                  <p>Petugas Gudang Hub</p>
                  <div className="h-12" />
                  <p className="font-bold text-on-surface">( ........................ )</p>
                </div>
                <div>
                  <p>Petugas Gerai Cabang</p>
                  <div className="h-12" />
                  <p className="font-bold text-on-surface">( ........................ )</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedDo(null)}
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
                <span>Cetak Thermal / PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
