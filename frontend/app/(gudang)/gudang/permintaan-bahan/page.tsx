"use client";

import { useState } from "react";
import { usePurchaseOrders, useCreatePurchaseOrder } from "@/features/purchase-orders/hooks/use-purchase-orders";
import { useSuppliers } from "@/features/suppliers/hooks/use-suppliers";
import { SupplierItem } from "@/features/suppliers/types/suppliers.types";
import { useInventory } from "@/features/inventory/hooks/use-inventory";

export default function GudangPermintaanBahanPage() {
  const { data: purchaseOrders = [], isLoading } = usePurchaseOrders();
  const { data: suppliers = [] } = useSuppliers();
  const { data: inventory = [] } = useInventory();
  const createPoMutation = useCreatePurchaseOrder();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [selectedSupplierItemId, setSelectedSupplierItemId] = useState("");
  const [quantity, setQuantity] = useState("10");
  const [toast, setToast] = useState<string | null>(null);

  const selectedSupplier = suppliers.find((s) => s.id === selectedSupplierId) || suppliers[0];
  const catalog: SupplierItem[] = selectedSupplier?.items || [];
  const selectedItem = catalog.find((i: SupplierItem) => i.id === selectedSupplierItemId) || catalog[0];

  const totalCost = selectedItem ? Number(selectedItem.price) * (Number(quantity) || 0) : 0;

  function handleOpenCreate() {
    if (suppliers.length > 0) {
      const sup = suppliers[0];
      setSelectedSupplierId(sup.id);
      if (sup.items && sup.items.length > 0) {
        setSelectedSupplierItemId(sup.items[0].id);
      }
    }
    setQuantity("10");
    setModalOpen(true);
  }

  function handleSupplierChange(supId: string) {
    setSelectedSupplierId(supId);
    const sup = suppliers.find((s) => s.id === supId);
    if (sup?.items && sup.items.length > 0) {
      setSelectedSupplierItemId(sup.items[0].id);
    } else {
      setSelectedSupplierItemId("");
    }
  }

  function handleCreatePo(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSupplier || !selectedItem || Number(quantity) <= 0) return;

    // Match with local ingredient if available
    const matchedIngredient = inventory.find(
      (ing) => ing.name.toLowerCase().includes(selectedItem.name.toLowerCase()) ||
               selectedItem.name.toLowerCase().includes(ing.name.toLowerCase())
    );

    createPoMutation.mutate(
      {
        supplierId: selectedSupplier.id,
        totalAmount: totalCost,
        items: [
          {
            supplierItemId: selectedItem.id,
            ingredientId: matchedIngredient ? matchedIngredient.id : undefined,
            quantity: Number(quantity),
            price: Number(selectedItem.price),
          },
        ],
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setToast("Permintaan PO pengadaan berhasil diterbitkan ke Pemasok!");
          setTimeout(() => setToast(null), 4000);
        },
        onError: (err) => {
          alert(`Gagal membuat PO: ${err.message}`);
        },
      }
    );
  }

  const waitingCount = purchaseOrders.filter((po) => po.status === "sent" || po.status === "confirmed").length;
  const totalVal = purchaseOrders.reduce((sum, po) => sum + Number(po.totalAmount), 0);

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
              Purchase Requisition &amp; Restock Approval
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live Purchase Orders BAPER
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Permintaan Bahan Baku (PO Requisition)
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Ajukan permohonan pengadaan bahan baku ke pemilik bisnis dan terbitkan lembar PO resmi kepada mitra pemasok otomatis saat stok mendekati batas minimum.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Buat Permintaan PO Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Aktif Berjalan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{waitingCount} Pengajuan</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terkirim &amp; Dikonfirmasi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Nilai Permintaan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">
            Rp {totalVal.toLocaleString("id-ID")}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terkendali Sesuai Budget
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Mitra Pemasok Terhubung</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{suppliers.length} Vendor</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Mitra Resmi Terdaftar
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Transaksi PO</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{purchaseOrders.length} PO</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Riwayat Lengkap
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat riwayat PO...</div>
        ) : purchaseOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
            Belum ada permintaan PO yang dibuat.
          </div>
        ) : (
          purchaseOrders.map((po) => {
            const isCompleted = po.status === "received" && po.qcStatus === "passed";
            const poNo = `#PO-${po.id.slice(0, 8).toUpperCase()}`;

            return (
              <div
                key={po.id}
                className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-primary text-body-md">{poNo}</span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isCompleted
                            ? "bg-[#E8F3EC] text-primary"
                            : po.status === "shipped"
                            ? "bg-[#EFF6FF] text-[#1D4ED8]"
                            : po.status === "confirmed"
                            ? "bg-[#FFF9E6] text-[#B7791F]"
                            : "bg-[#F5F8F6] text-tertiary"
                        }`}
                      >
                        {isCompleted
                          ? "Pesanan Selesai Diterima"
                          : po.status === "shipped"
                          ? "Dalam Pengiriman"
                          : po.status === "confirmed"
                          ? "Dikonfirmasi Mitra"
                          : "Menunggu Konfirmasi"}
                      </span>
                    </div>
                    <div className="font-semibold text-on-surface text-sm mt-1">
                      Pemasok: {po.supplier?.name || "Mitra Pemasok"}
                    </div>
                    <div className="text-xs text-tertiary mt-0.5">
                      Dibuat oleh: {po.createdBy?.name || "Manager Gudang"}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-tertiary">Estimasi Biaya Pengadaan:</span>
                    <div className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                      Rp {Number(po.totalAmount).toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-tertiary uppercase">Item Komoditas:</span>
                  <div className="flex flex-wrap gap-2">
                    {po.purchaseOrderItems.map((item) => (
                      <span
                        key={item.id}
                        className="px-3 py-1.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 text-xs text-on-surface font-medium flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[14px] text-primary">inventory_2</span>
                        <span>{item.ingredient?.name || item.supplierItem?.name}</span>
                        <span className="font-mono font-bold text-primary">
                          ({Number(item.quantity).toLocaleString("id-ID")}{" "}
                          {item.ingredient?.unit || item.supplierItem?.unit || "Unit"})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Buat Permintaan PO */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#172033]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-outline-variant/60 shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg">Buat Permintaan PO Baru</h3>
                  <p className="text-xs text-tertiary">Pemesanan komoditas ke mitra pemasok resmi</p>
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

            <form onSubmit={handleCreatePo} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                  Pilih Mitra Pemasok
                </label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => handleSupplierChange(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.items?.length || 0} Komoditas)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                  Pilih Komoditas Bahan
                </label>
                {catalog.length === 0 ? (
                  <div className="text-xs text-tertiary italic p-3 bg-surface-container-low rounded-xl">
                    Pemasok ini belum memiliki item katalog.
                  </div>
                ) : (
                  <select
                    value={selectedSupplierItemId}
                    onChange={(e) => setSelectedSupplierItemId(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                  >
                    {catalog.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name} - Rp {Number(i.price).toLocaleString("id-ID")} / {i.unit} (Stok: {i.stock})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-tertiary uppercase mb-1">
                    Jumlah Pesanan ({selectedItem?.unit || "Unit"})
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full text-base font-bold font-mono p-2.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-center">
                  <span className="text-xs text-tertiary">Total Biaya PO:</span>
                  <div className="text-base font-bold text-primary font-mono mt-0.5">
                    Rp {totalCost.toLocaleString("id-ID")}
                  </div>
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
                  disabled={createPoMutation.isPending || catalog.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-[#0D6038] text-white text-sm font-bold shadow-sm transition-all"
                >
                  {createPoMutation.isPending ? "Mengirim PO..." : "Terbitkan PO Sekarang"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
