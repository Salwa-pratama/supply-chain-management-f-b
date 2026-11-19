"use client";

import { useMemo, useState } from "react";
import { usePurchaseOrders } from "@/features/purchase-orders/hooks/use-purchase-orders";
import { useOrders } from "@/features/orders/hooks/use-orders";

type StatusAlur =
  | "Menunggu Konfirmasi"
  | "Sedang Diproses"
  | "Dalam Pengiriman"
  | "Selesai";

type Aktivitas = {
  id: string;
  entitas: string;
  keterangan: string;
  item: string;
  nilai: string;
  lunas?: boolean;
  status: StatusAlur;
  waktu: string;
  aksi: string;
};

const STATUS_STYLE: Record<StatusAlur, string> = {
  "Menunggu Konfirmasi": "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/20",
  "Sedang Diproses": "bg-[#E8F3EC] text-primary border border-primary/20",
  "Dalam Pengiriman": "bg-blue-50 text-blue-700 border border-blue-200",
  Selesai: "bg-[#E8F3EC] text-[#137A48] border border-primary/20",
};

const SEMUA = "Semua Status Alur SCM";

export default function ActivityTable() {
  const { data: purchaseOrders = [] } = usePurchaseOrders();
  const { data: orders = [] } = useOrders();
  const [filter, setFilter] = useState<string>(SEMUA);

  const allActivities: Aktivitas[] = useMemo(() => {
    const list: Aktivitas[] = [];

    // Map POs
    purchaseOrders.forEach((po) => {
      let st: StatusAlur = "Menunggu Konfirmasi";
      if (po.qcStatus === "passed" || po.status === "received") st = "Selesai";
      else if (po.status === "shipped") st = "Dalam Pengiriman";
      else if (po.status === "confirmed") st = "Sedang Diproses";

      list.push({
        id: `#PO-${po.id.slice(0, 8).toUpperCase()}`,
        entitas: po.supplier?.name || "Mitra Pemasok",
        keterangan: "Pemasok Bahan Baku",
        item: po.purchaseOrderItems.map((i) => `${i.quantity} ${i.ingredient?.name || i.supplierItem?.name || "Bahan"}`).join(", "),
        nilai: `Rp ${Number(po.totalAmount).toLocaleString("id-ID")}`,
        status: st,
        waktu: new Date(po.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
        aksi: "Detail PO",
      });
    });

    // Map POS Orders
    orders.forEach((o) => {
      list.push({
        id: `#TRX-${o.id.slice(0, 8).toUpperCase()}`,
        entitas: o.createdBy?.name || "Kasir Outlet",
        keterangan: `Pesanan ${o.orderType || "Dine-in"} POS`,
        item: o.orderItems.map((i) => `${i.quantity}x ${i.product?.name || "Menu"}`).join(", "),
        nilai: `Rp ${Number(o.totalAmount).toLocaleString("id-ID")}`,
        lunas: true,
        status: "Selesai",
        waktu: new Date(o.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
        aksi: "Lihat Struk",
      });
    });

    return list;
  }, [purchaseOrders, orders]);

  const baris = filter === SEMUA ? allActivities : allActivities.filter((a) => a.status === filter);

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">
            Aktivitas Alur SCM Real-time Hari Ini
          </h2>
          <p className="text-body-sm font-body-sm text-tertiary">
            Rekap menyeluruh pergerakan bahan masuk, tahapan pengiriman, dan transaksi kasir live database.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter status alur"
              className="appearance-none bg-[#F5F8F6] border border-outline-variant/50 rounded-xl pl-3 pr-8 py-2 text-label-md font-label-md text-on-surface focus:outline-none focus:border-primary"
            >
              <option>{SEMUA}</option>
              {(Object.keys(STATUS_STYLE) as StatusAlur[]).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[18px] text-tertiary pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-outline-variant/30 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F8F6] text-label-sm font-label-sm text-tertiary uppercase tracking-wider border-b border-outline-variant/30 h-11">
              <th className="py-3 px-4">ID Transaksi / Alur</th>
              <th className="py-3 px-4">Entitas Terkait</th>
              <th className="py-3 px-4">Item &amp; Kuantitas</th>
              <th className="py-3 px-4">Nilai / Estimasi</th>
              <th className="py-3 px-4">Status Tahapan</th>
              <th className="py-3 px-4">Waktu Pembaruan</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-body-sm font-body-sm">
            {baris.map((a) => (
              <tr key={a.id} className="hover:bg-[#F9FBFA] transition-colors">
                <td className="py-3.5 px-4 font-bold text-on-surface font-mono">{a.id}</td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">{a.entitas}</div>
                  <div className="text-[11px] text-tertiary">{a.keterangan}</div>
                </td>
                <td className="py-3.5 px-4 text-xs max-w-xs truncate">{a.item}</td>
                <td
                  className={`py-3.5 px-4 font-mono ${a.lunas ? "font-bold text-primary" : "font-semibold text-on-surface"}`}
                >
                  {a.nilai}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm font-bold ${STATUS_STYLE[a.status]}`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-tertiary">{a.waktu}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    className="text-primary hover:text-primary-container font-label-sm font-bold text-[12px] underline"
                  >
                    {a.aksi}
                  </button>
                </td>
              </tr>
            ))}
            {baris.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 px-4 text-center text-tertiary">
                  Belum ada aktivitas tercatat di alur ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-body-sm font-body-sm text-tertiary pt-2">
        <span>Menampilkan {baris.length} alur rantai pasok aktif live database</span>
      </div>
    </section>
  );
}
