"use client";

import { useState } from "react";
import { useOrders } from "@/features/orders/hooks/use-orders";

function formatWaktu(isoString: string) {
  try {
    const d = new Date(isoString);
    const p = (n: number) => String(n).padStart(2, "0");
    return `${p(d.getHours())}:${p(d.getMinutes())} WIB`;
  } catch {
    return "-";
  }
}

function rupiah(n: number | string) {
  return "Rp " + Math.round(Number(n) || 0).toLocaleString("id-ID");
}

export default function HistoryModal({ onClose }: { onClose: () => void }) {
  const { data: orders = [], isLoading } = useOrders();
  const [filter, setFilter] = useState<"all" | "cash" | "qris" | "edc">("all");
  const [search, setSearch] = useState("");

  const qrisCount = orders.filter((o) => o.paymentMethod === "qris").length;
  const cashCount = orders.filter((o) => o.paymentMethod === "cash").length;
  const edcCount = orders.filter((o) => o.paymentMethod === "edc").length;

  const filteredOrders = orders.filter((o) => {
    const matchFilter = filter === "all" || o.paymentMethod === filter;
    const matchSearch =
      !search.trim() ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.createdBy?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      o.orderItems.some((item) => (item.product?.name || "").toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Riwayat Transaksi"
      className="fixed inset-0 z-50 bg-[#172033]/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-surface-container-lowest rounded-3xl max-w-4xl w-full border border-outline-variant/60 shadow-[0_24px_48px_-8px_rgba(23,32,51,0.2)] overflow-hidden">
        <div className="p-5 border-b border-outline-variant/35 flex items-center justify-between bg-[#F5F8F6]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]" data-icon="history">
                history
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Riwayat Transaksi Hari Ini
              </h3>
              <p className="font-body-sm text-[12px] text-tertiary">
                Sistem Terpadu BAPER • {orders.length} Transaksi Tercatat di Database
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container text-tertiary flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]" data-icon="close">
              close
            </span>
          </button>
        </div>

        {/* Quick filters inside modal */}
        <div className="p-4 border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 bg-surface-bright">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-tertiary">Filter:</span>
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                filter === "all"
                  ? "bg-[#E8F3EC] text-primary border-primary/20"
                  : "bg-surface-container-lowest border-outline-variant text-tertiary hover:border-primary"
              }`}
            >
              Semua ({orders.length})
            </button>
            <button
              onClick={() => setFilter("qris")}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                filter === "qris"
                  ? "bg-[#E8F3EC] text-primary border-primary/20"
                  : "bg-surface-container-lowest border-outline-variant text-tertiary hover:border-primary"
              }`}
            >
              QRIS ({qrisCount})
            </button>
            <button
              onClick={() => setFilter("cash")}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                filter === "cash"
                  ? "bg-[#E8F3EC] text-primary border-primary/20"
                  : "bg-surface-container-lowest border-outline-variant text-tertiary hover:border-primary"
              }`}
            >
              Tunai ({cashCount})
            </button>
            <button
              onClick={() => setFilter("edc")}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                filter === "edc"
                  ? "bg-[#E8F3EC] text-primary border-primary/20"
                  : "bg-surface-container-lowest border-outline-variant text-tertiary hover:border-primary"
              }`}
            >
              EDC / Transfer ({edcCount})
            </button>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 px-3 text-body-sm bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:outline-none w-48"
            placeholder="Cari ID / Kasir / Menu..."
            type="text"
          />
        </div>

        {/* Table History */}
        <div className="overflow-x-auto p-4 max-h-[460px] overflow-y-auto">
          {isLoading ? (
            <div className="py-12 text-center text-tertiary">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
              <p className="mt-2 text-body-sm">Memuat riwayat transaksi dari database...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-tertiary">
              <span className="material-symbols-outlined text-4xl">receipt_long</span>
              <p className="mt-2 text-body-sm font-semibold">Belum ada riwayat transaksi yang cocok.</p>
            </div>
          ) : (
            <table className="w-full text-left text-body-sm border-collapse">
              <thead>
                <tr className="bg-[#F5F8F6] text-tertiary font-label-sm text-label-sm uppercase h-10 border-b border-outline-variant/30 sticky top-0">
                  <th className="px-3.5 py-2 rounded-l-xl">No. Transaksi</th>
                  <th className="px-3.5 py-2">Waktu</th>
                  <th className="px-3.5 py-2">Sumber & Kasir</th>
                  <th className="px-3.5 py-2">Items</th>
                  <th className="px-3.5 py-2">Metode Bayar</th>
                  <th className="px-3.5 py-2">Total Nilai</th>
                  <th className="px-3.5 py-2 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredOrders.map((order) => {
                  const itemsSummary = order.orderItems
                    .map((item) => `${item.quantity}x ${item.product?.name || "Item"}`)
                    .join(", ");
                  const method = order.paymentMethod || "cash";
                  const methodIcon =
                    method === "qris" ? "qr_code_2" : method === "edc" ? "credit_card" : "payments";
                  const methodLabel =
                    method === "qris" ? "QRIS" : method === "edc" ? "EDC" : "Tunai";

                  return (
                    <tr key={order.id} className="hover:bg-[#F9FBFA] transition-colors h-14">
                      <td className="px-3.5 py-2 font-mono font-bold text-primary">
                        #TRX-{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-3.5 py-2 text-tertiary">{formatWaktu(order.createdAt)}</td>
                      <td className="px-3.5 py-2">
                        <span className="font-semibold text-on-surface block">
                          {order.createdBy?.name || "Kasir Utama"}
                        </span>
                        <span className="text-tertiary text-[11px] block">
                          {order.source === "web" ? "Web Order" : order.orderType || "Dine-in"}
                        </span>
                      </td>
                      <td className="px-3.5 py-2 text-tertiary text-[12px] max-w-[200px] truncate" title={itemsSummary}>
                        {itemsSummary || "-"}
                      </td>
                      <td className="px-3.5 py-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-on-surface">
                          <span className="material-symbols-outlined text-[14px]">
                            {methodIcon}
                          </span>{" "}
                          {methodLabel}
                        </span>
                      </td>
                      <td className="px-3.5 py-2 font-bold text-on-surface">{rupiah(order.totalAmount)}</td>
                      <td className="px-3.5 py-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            order.status === "completed"
                              ? "bg-[#E8F3EC] text-[#137A48] border-[#137A48]/20"
                              : "bg-[#FFF4E5] text-[#B76E00] border-[#B76E00]/20"
                          }`}
                        >
                          {order.status === "completed" ? "Lunas" : order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t border-outline-variant/35 bg-[#F5F8F6] flex justify-end">
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-xl bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container"
          >
            Tutup Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}
