"use client";

import { useEffect, useMemo, useState } from "react";
import { useOrders, useUpdateOrderStatus } from "@/features/orders/hooks/use-orders";
import { OrderItemData, OrderStatus } from "@/features/orders/types/orders.types";
import { useToast } from "@/components/ui/Toast";

function formatRupiah(num: number | string) {
  return "Rp " + Math.round(Number(num) || 0).toLocaleString("id-ID");
}

const STATUS_META: Record<
  string,
  { label: string; className: string; icon: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/30",
    icon: "schedule",
  },
  paid: {
    label: "Lunas / Siap Kitchen",
    className: "bg-[#E8F3EC] text-primary border-primary/20",
    icon: "check",
  },
  preparing: {
    label: "Diproses Kitchen",
    className: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
    icon: "soup_kitchen",
  },
  completed: {
    label: "Selesai",
    className: "bg-[#E8F3EC] text-primary border-primary/20",
    icon: "done_all",
  },
  cancelled: {
    label: "Dibatalkan",
    className: "bg-[#FDF2F2] text-[#B54747] border-[#B54747]/30",
    icon: "cancel",
  },
};

function itemsText(order: OrderItemData) {
  return (order.orderItems || [])
    .map((item) => `${item.quantity}x ${item.product?.name || "Item"}`)
    .join(", ");
}

export default function PemilikPesananPage() {
  const { data: dbOrders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const toast = useToast();
  const [filterTab, setFilterTab] = useState("all");
  const [search, setSearch] = useState("");
  const [detailOrder, setDetailOrder] = useState<OrderItemData | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    if (!detailOrder) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailOrder(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [detailOrder]);

  const totalOmzet = useMemo(() => {
    return dbOrders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
  }, [dbOrders]);

  const filteredOrders = useMemo(() => {
    return dbOrders.filter((ord) => {
      const matchSearch =
        ord.id.toLowerCase().includes(search.toLowerCase()) ||
        (ord.createdBy?.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (ord.orderType || "").toLowerCase().includes(search.toLowerCase()) ||
        (ord.paymentMethod || "").toLowerCase().includes(search.toLowerCase()) ||
        itemsText(ord).toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;
      if (filterTab === "all") return true;
      return ord.status === filterTab;
    });
  }, [dbOrders, filterTab, search]);

  const handleTransition = (order: OrderItemData, status: OrderStatus) => {
    setPendingId(order.id);
    updateStatus.mutate(
      { id: order.id, status },
      {
        onSuccess: () => {
          toast.success(
            status === "preparing"
              ? `Pesanan #TRX-${order.id.slice(0, 8).toUpperCase()} dikirim ke Kitchen & Barista.`
              : `Pesanan #TRX-${order.id.slice(0, 8).toUpperCase()} ditandai selesai.`,
            "Status Diperbarui"
          );
          setDetailOrder((current) =>
            current && current.id === order.id ? { ...current, status } : current
          );
        },
        onError: (error) => toast.error(error.message, "Gagal Memperbarui Status"),
        onSettled: () => setPendingId(null),
      }
    );
  };

  const tabs = [
    { id: "all", label: `Semua Pesanan (${dbOrders.length})` },
    { id: "paid", label: `Lunas (${dbOrders.filter((o) => o.status === "paid").length})` },
    { id: "preparing", label: `Kitchen (${dbOrders.filter((o) => o.status === "preparing").length})` },
    { id: "completed", label: `Selesai (${dbOrders.filter((o) => o.status === "completed").length})` },
    { id: "pending", label: `Pending (${dbOrders.filter((o) => o.status === "pending").length})` },
  ];

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
          <span className="text-label-md font-label-md text-tertiary">Antrean Kitchen</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {dbOrders.filter((o) => o.status === "preparing").length} Pesanan
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Diproses Barista
          </span>
        </div>
      </div>

      {/* FILTER & TABS */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
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
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-tertiary">
                    <span className="material-symbols-outlined animate-spin text-2xl text-primary mb-1">
                      progress_activity
                    </span>
                    <p>Memuat data transaksi dari database...</p>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-tertiary">
                    Tidak ada transaksi yang cocok.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const itemsSummary = itemsText(ord);
                  const meta = STATUS_META[ord.status] ?? STATUS_META.pending;
                  const isPending = pendingId === ord.id;
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
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${meta.className}`}
                        >
                          <span className="material-symbols-outlined text-[14px]">{meta.icon}</span>
                          {meta.label}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setDetailOrder(ord)}
                            className="p-1.5 rounded-lg text-tertiary hover:text-primary hover:bg-surface-container-low"
                            title="Detail Pesanan"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          {ord.status === "paid" && (
                            <button
                              type="button"
                              onClick={() => handleTransition(ord, "preparing")}
                              disabled={isPending}
                              className="px-2.5 py-1.5 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary-container disabled:opacity-60 disabled:cursor-wait flex items-center gap-1 whitespace-nowrap"
                              title="Kirim ke Kitchen & Barista"
                            >
                              <span className="material-symbols-outlined text-[14px]">soup_kitchen</span>
                              Kitchen
                            </button>
                          )}
                          {ord.status === "preparing" && (
                            <button
                              type="button"
                              onClick={() => handleTransition(ord, "completed")}
                              disabled={isPending}
                              className="px-2.5 py-1.5 rounded-lg border border-primary/30 text-primary text-[11px] font-bold hover:bg-[#E8F3EC] disabled:opacity-60 disabled:cursor-wait flex items-center gap-1 whitespace-nowrap"
                              title="Tandai selesai"
                            >
                              <span className="material-symbols-outlined text-[14px]">done_all</span>
                              Selesai
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {detailOrder && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-inverse-surface/45 backdrop-blur-sm"
          role="presentation"
          onClick={() => setDetailOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pesanan-detail-title"
            className="w-full max-w-lg bg-white rounded-2xl border border-outline-variant/40 shadow-[0_24px_60px_-20px_rgba(23,32,51,0.45)] overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-outline-variant/30">
              <div>
                <h2 id="pesanan-detail-title" className="text-headline-sm font-headline-sm text-[#172033] font-bold font-mono">
                  #TRX-{detailOrder.id.slice(0, 8).toUpperCase()}
                </h2>
                <p className="text-body-sm text-tertiary mt-0.5">
                  {new Date(detailOrder.createdAt).toLocaleString("id-ID")} WIB •{" "}
                  {detailOrder.orderType || "Dine-in"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDetailOrder(null)}
                className="p-1.5 rounded-lg text-tertiary hover:bg-surface-container hover:text-on-surface transition-colors"
                aria-label="Tutup detail"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/25">
                  <span className="text-[11px] font-bold uppercase text-tertiary">Kasir</span>
                  <p className="text-body-sm font-semibold text-on-surface">
                    {detailOrder.createdBy?.name || "Kasir Gerai"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/25">
                  <span className="text-[11px] font-bold uppercase text-tertiary">Pembayaran</span>
                  <p className="text-body-sm font-semibold text-on-surface uppercase">
                    {detailOrder.paymentMethod || "cash"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-label-md font-label-md font-bold text-on-surface mb-2">
                  Rincian Menu
                </h3>
                <div className="rounded-xl border border-outline-variant/30 overflow-hidden">
                  {(detailOrder.orderItems || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 border-b border-outline-variant/20 last:border-b-0"
                    >
                      <div className="min-w-0">
                        <p className="text-body-sm font-semibold text-on-surface truncate">
                          {item.product?.name || "Item"}
                        </p>
                        <p className="text-[11px] text-tertiary">
                          {item.quantity} x {formatRupiah(item.price)}
                        </p>
                      </div>
                      <span className="text-body-sm font-bold text-on-surface font-mono">
                        {formatRupiah(Number(item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                  {(!detailOrder.orderItems || detailOrder.orderItems.length === 0) && (
                    <p className="px-3 py-4 text-body-sm text-tertiary">
                      Tidak ada rincian item.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#E8F3EC] border border-primary/20">
                <span className="text-label-md font-label-md font-bold text-primary">
                  Total Pembayaran
                </span>
                <span className="text-headline-sm font-headline-sm font-bold text-primary font-mono">
                  {formatRupiah(detailOrder.totalAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-tertiary">Status Saat Ini</span>
                <span
                  className={`inline-flex items-center gap-1.5 text-label-sm font-label-sm font-bold px-2.5 py-1 rounded-full border ${
                    (STATUS_META[detailOrder.status] ?? STATUS_META.pending).className
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {(STATUS_META[detailOrder.status] ?? STATUS_META.pending).icon}
                  </span>
                  {(STATUS_META[detailOrder.status] ?? STATUS_META.pending).label}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 px-6 py-4 bg-[#F9F9FF] border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => setDetailOrder(null)}
                className="h-10 px-4 rounded-xl border border-outline-variant/50 bg-white text-on-surface text-label-md font-label-md hover:bg-[#F5F8F6] transition-colors"
              >
                Tutup
              </button>
              {detailOrder.status === "paid" && (
                <button
                  type="button"
                  onClick={() => handleTransition(detailOrder, "preparing")}
                  disabled={pendingId === detailOrder.id}
                  className="h-10 px-4 rounded-xl bg-primary text-white text-label-md font-label-md font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-wait"
                >
                  <span className="material-symbols-outlined text-[18px]">soup_kitchen</span>
                  Kirim ke Kitchen & Barista
                </button>
              )}
              {detailOrder.status === "preparing" && (
                <button
                  type="button"
                  onClick={() => handleTransition(detailOrder, "completed")}
                  disabled={pendingId === detailOrder.id}
                  className="h-10 px-4 rounded-xl bg-primary text-white text-label-md font-label-md font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-wait"
                >
                  <span className="material-symbols-outlined text-[18px]">done_all</span>
                  Tandai Selesai
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
