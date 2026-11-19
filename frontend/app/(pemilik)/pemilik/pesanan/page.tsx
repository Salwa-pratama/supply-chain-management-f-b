"use client";

import { useMemo, useState } from "react";
import { useOrders } from "@/features/orders/hooks/use-orders";

function formatRupiah(num: number | string) {
  return "Rp " + Math.round(Number(num) || 0).toLocaleString("id-ID");
}

export default function PemilikPesananPage() {
  const { data: dbOrders = [], isLoading } = useOrders();
  const [filterTab, setFilterTab] = useState("all");
  const [search, setSearch] = useState("");

  const totalOmzet = useMemo(() => {
    return dbOrders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
  }, [dbOrders]);

  const filteredOrders = useMemo(() => {
    return dbOrders.filter((ord) => {
      const matchSearch =
        ord.id.toLowerCase().includes(search.toLowerCase()) ||
        (ord.createdBy?.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (ord.orderType || "").toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;
      if (filterTab === "all") return true;
      if (filterTab === "paid") return ord.status === "paid";
      if (filterTab === "pending") return ord.status === "pending";
      return true;
    });
  }, [dbOrders, filterTab, search]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Arus Transaksi &amp; Antrean Order
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              {isLoading ? "Memuat..." : `${dbOrders.length} Pesanan Terdata di Database`}
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pesanan Masuk &amp; Antrean Bar
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau arus pesanan retail pelanggan dari Kasir POS fisik, web order store, dan pembayaran digital secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/kasir"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
            <span>Buka Kasir POS</span>
          </a>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Pesanan Tercatat</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {isLoading ? "..." : `${dbOrders.length} Order`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Database Terhubung
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Omzet Penjualan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">
            {isLoading ? "..." : formatRupiah(totalOmzet)}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Rata-rata {dbOrders.length ? formatRupiah(totalOmzet / dbOrders.length) : "Rp 0"} / Order
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Metode QRIS &amp; Digital</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {dbOrders.filter((o) => o.paymentMethod === "qris").length} Transaksi
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Settlement Otomatis
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Metode Tunai (Cash)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {dbOrders.filter((o) => o.paymentMethod === "cash").length} Transaksi
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kasir Fisik Gerai
          </span>
        </div>
      </div>

      {/* FILTER & TABS */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: `Semua Pesanan (${dbOrders.length})` },
            { id: "paid", label: `Lunas (${dbOrders.filter((o) => o.status === "paid").length})` },
            { id: "pending", label: `Pending (${dbOrders.filter((o) => o.status === "pending").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-[#F5F8F6] text-tertiary hover:bg-[#E8F3EC] hover:text-primary"
              }`}
            >
              {tab.label}
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
            placeholder="Cari ID pesanan, kasir, tipe..."
            className="w-full h-10 pl-9 pr-3 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">ID Transaksi &amp; Waktu</th>
                <th className="py-4 px-4">Kasir / Pembuat</th>
                <th className="py-4 px-4">Tipe &amp; Kanal</th>
                <th className="py-4 px-4">Rincian Menu Dipesan</th>
                <th className="py-4 px-4">Total &amp; Metode Bayar</th>
                <th className="py-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-tertiary">
                    <span className="material-symbols-outlined animate-spin text-2xl text-primary mb-1">
                      progress_activity
                    </span>
                    <p>Memuat data transaksi dari database...</p>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-tertiary">
                    Tidak ada transaksi yang cocok.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const itemsSummary = (ord.orderItems || [])
                    .map((item) => `${item.quantity}x ${item.product?.name || "Item"}`)
                    .join(", ");
                  return (
                    <tr key={ord.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold font-mono text-primary">
                          #TRX-{ord.id.slice(0, 8).toUpperCase()}
                        </div>
                        <span className="text-xs text-tertiary">
                          {new Date(ord.createdAt).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          WIB
                        </span>
                      </td>

                      <td className="py-4 px-4 font-semibold text-[#172033]">
                        {ord.createdBy?.name || "Kasir Gerai"}
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8F3EC] text-primary border border-primary/25 capitalize">
                          {ord.source === "web" ? "Web Order" : "Kasir POS"} • {ord.orderType || "Dine-in"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs text-on-surface max-w-xs truncate" title={itemsSummary}>
                        {itemsSummary || "Pesanan Menu"}
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-primary font-mono">{formatRupiah(ord.totalAmount)}</div>
                        <div className="text-[11px] text-tertiary uppercase font-mono">{ord.paymentMethod || "Cash"}</div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            ord.status === "paid"
                              ? "bg-[#E8F3EC] text-primary border border-primary/20"
                              : "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                          }`}
                        >
                          {ord.status === "paid" ? "Lunas" : "Pending"}
                        </span>
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
