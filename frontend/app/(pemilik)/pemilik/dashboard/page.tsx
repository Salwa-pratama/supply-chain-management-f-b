"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useOwnerOverview } from "@/features/dashboard/hooks/use-dashboard";
import { useOrders, useUpdateOrderStatus } from "@/features/orders/hooks/use-orders";
import { OrderItemData, OrderStatus } from "@/features/orders/types/orders.types";
import { useToast } from "@/components/ui/Toast";

function rupiah(val: number) {
  return "Rp " + Math.round(val || 0).toLocaleString("id-ID");
}

type ChartPeriod = "today" | "7d" | "month";
type TableTab = "orders" | "kitchen";

const CHART_PERIODS: { id: ChartPeriod; label: string }[] = [
  { id: "today", label: "Hari Ini" },
  { id: "7d", label: "7 Hari" },
  { id: "month", label: "Bulan Ini" },
];

const STATUS_META: Record<
  string,
  { label: string; className: string; icon: string }
> = {
  pending: {
    label: "Menunggu Bayar",
    className: "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/30",
    icon: "schedule",
  },
  paid: {
    label: "Terbayar / Siap Kitchen",
    className: "bg-[#E8F3EC] text-[#137A48] border-[#137A48]/20",
    icon: "check",
  },
  preparing: {
    label: "Diproses Kitchen",
    className: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
    icon: "soup_kitchen",
  },
  completed: {
    label: "Selesai",
    className: "bg-[#E8F3EC] text-[#137A48] border-[#137A48]/20",
    icon: "done_all",
  },
  cancelled: {
    label: "Dibatalkan",
    className: "bg-[#FDF2F2] text-[#B54747] border-[#B54747]/30",
    icon: "cancel",
  },
};

const REVENUE_STATUSES = ["paid", "preparing", "completed"];

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function getRange(period: ChartPeriod, now: Date) {
  if (period === "today") {
    const start = startOfDay(now);
    return { start, end: new Date(start.getTime() + 24 * 60 * 60 * 1000) };
  }
  if (period === "7d") {
    const start = startOfDay(new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000));
    const end = startOfDay(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    return { start, end };
  }
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { start, end };
}

function getBucketLabels(period: ChartPeriod) {
  if (period === "today") {
    return ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"];
  }
  if (period === "7d") {
    return ["H-6", "H-5", "H-4", "H-3", "H-2", "H-1", "Hari ini", ""];
  }
  return ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5", "", "", ""];
}

function aggregateSeries(
  orders: OrderItemData[],
  start: Date,
  end: Date,
  buckets = 8
) {
  const span = end.getTime() - start.getTime();
  const step = span / buckets;
  const values = new Array(buckets).fill(0);

  for (const order of orders) {
    if (!REVENUE_STATUSES.includes(order.status)) continue;
    const time = new Date(order.createdAt).getTime();
    if (time < start.getTime() || time >= end.getTime()) continue;

    let index = Math.floor((time - start.getTime()) / step);
    if (index < 0) index = 0;
    if (index >= buckets) index = buckets - 1;
    values[index] += Number(order.totalAmount) || 0;
  }

  return values;
}

function buildLinePath(values: number[], max: number) {
  return values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * 700;
      const y = 180 - (value / max) * 140;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function orderItemsText(order: OrderItemData) {
  return (
    order.orderItems
      ?.map((item) => `${item.quantity}x ${item.product?.name || "Item"}`)
      .join(", ") || "-"
  );
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PemilikDashboardPage() {
  const { data: overview, isLoading } = useOwnerOverview();
  const { data: dbOrders = [] } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const toast = useToast();

  const [period, setPeriod] = useState<ChartPeriod>("today");
  const [activeTab, setActiveTab] = useState<TableTab>("orders");
  const [search, setSearch] = useState("");
  const [detailOrder, setDetailOrder] = useState<OrderItemData | null>(null);
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

  // Waktu "sekarang" hanya boleh dibaca setelah mount agar prerender
  // Next.js tidak memakai nilai waktu yang tidak stabil.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
  }, []);

  // Tutup modal detail dengan tombol Escape.
  useEffect(() => {
    if (!detailOrder) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailOrder(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [detailOrder]);

  const chart = useMemo(() => {
    const labels = getBucketLabels(period);

    if (!now) {
      const empty = new Array(8).fill(0);
      return {
        current: empty,
        previous: empty,
        labels,
        currentPath: "",
        previousPath: "",
        currentArea: "",
        previousArea: "",
        peakValue: 0,
        peakX: 0,
        peakY: 0,
        total: 0,
        previousTotal: 0,
      };
    }

    const { start, end } = getRange(period, now);
    const span = end.getTime() - start.getTime();
    const previousStart = new Date(start.getTime() - span);
    const current = aggregateSeries(dbOrders, start, end);
    const previous = aggregateSeries(dbOrders, previousStart, start);
    const max = Math.max(...current, ...previous, 1);
    const peakIndex = current.reduce(
      (best, value, index) => (value > current[best] ? index : best),
      0
    );

    const currentPath = buildLinePath(current, max);
    const previousPath = buildLinePath(previous, max);
    const currentArea = `${currentPath} L700,180 L0,180 Z`;
    const previousArea = `${previousPath} L700,180 L0,180 Z`;
    const peakValue = current[peakIndex] ?? 0;
    const peakX = (peakIndex / Math.max(1, current.length - 1)) * 700;
    const peakY = 180 - (peakValue / max) * 140;

    return {
      current,
      previous,
      labels,
      currentPath,
      previousPath,
      currentArea,
      previousArea,
      peakValue,
      peakX,
      peakY,
      total: sum(current),
      previousTotal: sum(previous),
    };
  }, [dbOrders, period, now]);

  const periodOrders = useMemo(() => {
    if (!now) return [];
    const { start, end } = getRange(period, now);
    return dbOrders.filter((order) => {
      const time = new Date(order.createdAt).getTime();
      return (
        time >= start.getTime() &&
        time < end.getTime() &&
        REVENUE_STATUSES.includes(order.status)
      );
    });
  }, [dbOrders, period, now]);

  const aov = periodOrders.length
    ? chart.total / periodOrders.length
    : 0;

  const paidCount = periodOrders.filter((order) => order.status === "paid").length;
  const conversion = periodOrders.length
    ? (paidCount / periodOrders.length) * 100
    : 0;

  const counts = useMemo(() => {
    return {
      orders: dbOrders.filter(
        (order) => order.status === "pending" || order.status === "paid"
      ).length,
      kitchen: dbOrders.filter(
        (order) => order.status === "preparing" || order.status === "completed"
      ).length,
      preparing: dbOrders.filter((order) => order.status === "preparing").length,
    };
  }, [dbOrders]);

  const tableOrders = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return dbOrders.filter((order) => {
      const inTab =
        activeTab === "orders"
          ? order.status === "pending" || order.status === "paid"
          : order.status === "preparing" || order.status === "completed";
      if (!inTab) return false;
      if (!keyword) return true;

      return (
        order.id.toLowerCase().includes(keyword) ||
        (order.createdBy?.name || "").toLowerCase().includes(keyword) ||
        (order.orderType || "").toLowerCase().includes(keyword) ||
        (order.paymentMethod || "").toLowerCase().includes(keyword) ||
        orderItemsText(order).toLowerCase().includes(keyword)
      );
    });
  }, [dbOrders, activeTab, search]);

  const handlePeriodChange = (nextPeriod: ChartPeriod) => {
    setPeriod(nextPeriod);
    const label =
      CHART_PERIODS.find((item) => item.id === nextPeriod)?.label ?? "Hari Ini";
    toast.info(`Grafik penjualan ditampilkan untuk periode ${label}.`, "Filter Grafik");
  };

  const handleExportCsv = () => {
    const rows = periodOrders.map((order) => {
      const payment = (order.paymentMethod || "cash").toUpperCase();
      const status = STATUS_META[order.status]?.label ?? order.status;
      return [
        `#TRX-${order.id.slice(0, 8).toUpperCase()}`,
        new Date(order.createdAt).toLocaleString("id-ID"),
        order.createdBy?.name || "Kasir",
        order.orderType || "dine-in",
        orderItemsText(order).replace(/"/g, "'"),
        Number(order.totalAmount),
        payment,
        status,
      ]
        .map((value) =>
          typeof value === "string" && value.includes(",") ? `"${value}"` : value
        )
        .join(",");
    });

    const header =
      "ID Transaksi,Waktu,Kasir,Tipe Order,Item,Total,Pembayaran,Status";
    const csv = `${header}\n${rows.join("\n")}`;
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tren_penjualan_${period}_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(
      `${periodOrders.length} transaksi berhasil diekspor ke CSV.`,
      "Ekspor Selesai"
    );
  };

  const handleTransition = (order: OrderItemData, status: OrderStatus) => {
    setPendingActionId(order.id);
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
            current && current.id === order.id
              ? { ...current, status }
              : current
          );
        },
        onError: (error) => {
          toast.error(error.message, "Gagal Memperbarui Status");
        },
        onSettled: () => setPendingActionId(null),
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. KARTU SAMBUTAN & STATUS OPERASIONAL TOKO */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 flex items-center justify-center text-primary-container shrink-0">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Halo, Budi! Operasional Siap Hari Ini.</h1>
              <span className="px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-primary font-bold">
                LIVE
              </span>
            </div>
            <p className="font-body-md text-body-md text-tertiary mt-0.5">Senopati Outlet • Rekap SCM terhubung otomatis ke Gemini AI & Akuntansi.</p>
          </div>
        </div>
        {/* Live Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/35">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            <span className="font-label-md text-label-md text-on-surface">Toko Buka (07:00 - 22:00)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/35">
            <span className="material-symbols-outlined text-[16px] text-primary-container">point_of_sale</span>
            <span className="font-label-md text-label-md text-on-surface">POS Kasir Siap</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/35">
            <span className="material-symbols-outlined text-[16px] text-primary-container">sync</span>
            <span className="font-label-md text-label-md text-on-surface">Sync Stok: Aktif</span>
          </div>
        </div>
      </div>

      {/* 2. GRID KARTU STATISTIK UTAMA (4 BENTO METRIC CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Pendapatan */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-tertiary">Total Pendapatan Bulan Ini</span>
            <div className="p-2 rounded-xl bg-secondary-container/50 text-primary">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              {isLoading ? "Memuat..." : rupiah(overview?.revenueThisMonth || 0)}
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-0.5 text-label-sm font-label-sm text-primary bg-secondary-container px-2 py-0.5 rounded-full font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {" "}
                Real-time
              </span>
              <span className="font-body-sm text-body-sm text-tertiary">Database Live</span>
            </div>
          </div>
        </div>
        {/* Card 2: Pesanan Baru Hari Ini */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-tertiary">Pesanan Bulan Ini</span>
            <div className="p-2 rounded-xl bg-secondary-container/50 text-primary">
              <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              {isLoading ? "..." : (overview?.transactionsThisMonth || 0)}
              {" "}
              <span className="font-headline-sm text-headline-sm font-normal text-tertiary">Pesanan</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-label-sm text-label-sm text-primary bg-secondary-container/60 px-2 py-0.5 rounded-md font-semibold">
                Tersinkronisasi POS
              </span>
            </div>
          </div>
        </div>
        {/* Card 3: Stok Kritis */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-tertiary">Stok Kritis / Restock</span>
            <div className="p-2 rounded-xl bg-error-container text-error">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-headline-lg text-headline-lg text-error font-bold tracking-tight">
              {isLoading ? "..." : (overview?.criticalStockCount || 0)}
              {" "}
              <span className="font-headline-sm text-headline-sm font-normal text-tertiary">Bahan Baku</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-[11px] font-label-sm text-error bg-error-container/60 px-2 py-0.5 rounded-full font-semibold">
                Perlu PO Baru ke Pemasok
              </span>
            </div>
          </div>
        </div>
        {/* Card 4: Permintaan PO Berjalan */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-tertiary">Permintaan PO Berjalan</span>
            <div className="p-2 rounded-xl bg-secondary-container/50 text-primary">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              {isLoading ? "..." : (overview?.activePoCount || 0)}
              {" "}
              <span className="font-headline-sm text-headline-sm font-normal text-tertiary">PO Aktif</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="font-label-sm text-label-sm text-primary bg-secondary-container px-2 py-0.5 rounded-full font-semibold">
                Diproses Mitra Pemasok
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BAGIAN TENGAH (2 KOLOM: 65% GRAFIK + 35% ANTRIAN DAPUR & POS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Tren Penjualan Harian & Arus Kas Transaksi */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          {/* Toolbar Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-outline-variant/25">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Tren Penjualan & Arus Kas Transaksi</h2>
              <p className="font-body-sm text-body-sm text-tertiary">Monitoring real-time per jam operasional kasir & penjualan web</p>
            </div>
            {/* Quick Filters & Export */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#E8F3EC] p-1 rounded-xl h-10 border border-primary-container/20">
                {CHART_PERIODS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePeriodChange(item.id)}
                    className={`px-3 py-1 rounded-lg text-label-md font-label-md transition-all ${
                      period === item.id
                        ? "bg-surface-container-lowest text-primary shadow-sm font-bold"
                        : "text-tertiary hover:text-on-surface"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-label-md font-label-md bg-surface border border-outline-variant/50 text-on-surface hover:bg-surface-container-low transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Ekspor CSV</span>
              </button>
            </div>
          </div>

          {/* Metric Sub-values in Chart Header */}
          <div className="grid grid-cols-3 gap-4 my-4 py-2 px-4 bg-surface rounded-xl border border-outline-variant/20">
            <div>
              <span className="font-label-sm text-label-sm text-tertiary">Volume Masuk Periode Ini</span>
              <div className="font-headline-sm text-headline-sm font-bold text-primary">{rupiah(chart.total)}</div>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-tertiary">Rata-rata Keranjang (AOV)</span>
              <div className="font-headline-sm text-headline-sm font-bold text-on-surface">{rupiah(aov)}</div>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-tertiary">Rasio Terbayar</span>
              <div className="font-headline-sm text-headline-sm font-bold text-primary">{conversion.toFixed(1)}%</div>
            </div>
          </div>

          {/* Modern SVG Visual Chart Area */}
          <div className="relative w-full h-64 mt-2 flex flex-col justify-end">
            <svg className="w-full h-52 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 700 200">
              <defs>
                <linearGradient id="primaryGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#137A48" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#137A48" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="secondaryGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#A9CFBE" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#A9CFBE" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines Horizontal */}
              <line stroke="#BECABE" strokeDasharray="4 4" strokeOpacity="0.3" strokeWidth="1" x1="0" x2="700" y1="30" y2="30" />
              <line stroke="#BECABE" strokeDasharray="4 4" strokeOpacity="0.3" strokeWidth="1" x1="0" x2="700" y1="80" y2="80" />
              <line stroke="#BECABE" strokeDasharray="4 4" strokeOpacity="0.3" strokeWidth="1" x1="0" x2="700" y1="130" y2="130" />
              <line stroke="#BECABE" strokeOpacity="0.4" strokeWidth="1" x1="0" x2="700" y1="180" y2="180" />
              {/* Area Path for Comparison (Periode Sebelumnya) */}
              <path d={chart.previousArea} fill="url(#secondaryGradient)" />
              <path d={chart.previousPath} stroke="#94B9A9" strokeLinecap="round" strokeWidth="2" />
              {/* Area Path for Primary (Periode Aktif) */}
              <path d={chart.currentArea} fill="url(#primaryGradient)" />
              <path d={chart.currentPath} stroke="#137A48" strokeLinecap="round" strokeWidth="3" />
              {/* Peak Active Point */}
              {chart.peakValue > 0 && (
                <>
                  <circle cx={chart.peakX} cy={chart.peakY} fill="#137A48" r="5" stroke="#FFFFFF" strokeWidth="2" />
                  <g transform={`translate(${Math.min(600, Math.max(0, chart.peakX - 40))}, ${Math.max(2, chart.peakY - 34)})`}>
                    <rect fill="#121B2E" height="28" rx="6" width="80" />
                    <text fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" x="40" y="18">{rupiah(chart.peakValue)}</text>
                  </g>
                </>
              )}
            </svg>
            {/* X-Axis Labels */}
            <div className="flex justify-between items-center text-label-sm font-label-sm text-tertiary pt-2 border-t border-outline-variant/30">
              {chart.labels.map((label, index) => (
                <span key={`${label}-${index}`}>{label}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-container" />
                <span className="font-label-sm text-label-sm text-tertiary">
                  {CHART_PERIODS.find((item) => item.id === period)?.label} (Real-time)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#94B9A9]" />
                <span className="font-label-sm text-label-sm text-tertiary">Periode Sebelumnya</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-medium">
              Total pembanding: {rupiah(chart.previousTotal)}
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Panel Antrian Order & Live Kitchen Dispatch */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div>
            {/* Header Card Antrian */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/25">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Antrian Dapur & POS</h3>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                    {" "}
                    Kitchen Dispatch Aktif
                  </span>
                </div>
              </div>
              <span className="text-label-sm font-label-sm bg-secondary-container px-2 py-0.5 rounded-full text-primary font-bold">
                {counts.orders} Menunggu
              </span>
            </div>
            {/* Live Order Queue Preview */}
            <div className="flex flex-col gap-3 my-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
              {dbOrders.filter((order) => order.status === "paid").length > 0 ? (
                dbOrders
                  .filter((order) => order.status === "paid")
                  .slice(0, 3)
                  .map((ord) => (
                    <button
                      key={ord.id}
                      type="button"
                      onClick={() => setDetailOrder(ord)}
                      className="text-left p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm font-bold text-primary font-mono">
                          #TRX-{ord.id.slice(0, 8).toUpperCase()} • {ord.orderType || "Dine-in"}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold capitalize">
                          Siap Kitchen
                        </span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface truncate" title={orderItemsText(ord)}>
                        {orderItemsText(ord)}
                      </p>
                      <div className="flex items-center justify-between text-[12px] text-tertiary pt-1 border-t border-outline-variant/20">
                        <span>Kasir: {ord.createdBy?.name || "Kasir Utama"}</span>
                        <span className="font-bold text-on-surface font-mono">{rupiah(Number(ord.totalAmount))}</span>
                      </div>
                    </button>
                  ))
              ) : (
                <div className="text-center py-6 text-tertiary text-xs">
                  Belum ada antrean order baru.
                </div>
              )}
            </div>
          </div>
          {/* Quick Kitchen Dispatch Bottom */}
          <div className="pt-4 border-t border-outline-variant/25 flex flex-col gap-2">
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-tertiary">Order Diproses Kitchen:</span>
              <span className="font-label-sm text-label-sm font-bold text-amber-600">
                {counts.preparing} Pesanan
              </span>
            </div>
            <div className="flex gap-2">
              <a href="/pemilik/pesanan" className="flex-1 py-2 rounded-xl text-label-md font-label-md bg-surface-container-lowest border border-primary-container text-primary hover:bg-secondary-container/30 transition-colors flex items-center justify-center gap-1.5 active:scale-[0.98]">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Kelola Pesanan</span>
              </a>
              <a href="/kasir" className="py-2 px-3 rounded-xl text-label-md font-label-md bg-primary text-surface-container-lowest hover:bg-primary-container transition-colors flex items-center justify-center active:scale-[0.98]" title="Buka Kasir POS">
                <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BAGIAN BAWAH: TAB STATUS OPERASIONAL SCM TERPADU */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        {/* Section Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-outline-variant/25 gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`font-headline-sm text-headline-sm pb-2 flex items-center gap-2 transition-colors ${
                activeTab === "orders"
                  ? "font-bold text-primary border-b-2 border-primary"
                  : "font-semibold text-tertiary hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              <span>Pesanan Pelanggan Terbaru</span>
              <span className="bg-secondary-container text-primary font-bold text-[11px] px-2 py-0.5 rounded-full">{counts.orders}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("kitchen")}
              className={`font-headline-sm text-headline-sm pb-2 flex items-center gap-2 transition-colors ${
                activeTab === "kitchen"
                  ? "font-bold text-primary border-b-2 border-primary"
                  : "font-semibold text-tertiary hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">soup_kitchen</span>
              <span>Status Kitchen & Barista</span>
              <span className="bg-[#EFF6FF] text-[#1D4ED8] font-bold text-[11px] px-2 py-0.5 rounded-full">{counts.kitchen}</span>
            </button>
          </div>
          {/* Search Table / Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-tertiary text-[16px]">search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-8 pr-3 py-1.5 bg-surface text-label-md font-label-md rounded-xl border border-outline-variant/35 outline-none focus:border-primary w-56"
                placeholder="Cari ID transaksi, kasir..."
                type="text"
              />
            </div>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="p-1.5 rounded-xl border border-outline-variant/35 text-tertiary hover:bg-surface-container-low"
              title="Reset pencarian"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>
        </div>

        {/* Integrated Kitchen Banner Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 p-3.5 bg-surface rounded-xl border border-outline-variant/25">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">coffee_maker</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-tertiary">Batch Espresso Bar</span>
              <div className="font-label-md text-label-md text-on-surface font-semibold">House Blend #04 • 18 Shot Tersisa</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">bakery_dining</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-tertiary">Kitchen Oven</span>
              <div className="font-label-md text-label-md text-on-surface font-semibold">Croissant Batch 3 • Matang dlm 6 mnt</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-tertiary">Antrean Kitchen</span>
              <div className="font-label-md text-label-md text-primary font-semibold">
                Produksi Berlangsung ({counts.preparing} Order)
              </div>
            </div>
          </div>
        </div>

        {/* Order Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F8F6] h-11 border-y border-outline-variant/25">
                <th className="px-4 font-label-sm text-label-sm uppercase text-tertiary font-bold tracking-wider">ID Transaksi</th>
                <th className="px-4 font-label-sm text-label-sm uppercase text-tertiary font-bold tracking-wider">Waktu</th>
                <th className="px-4 font-label-sm text-label-sm uppercase text-tertiary font-bold tracking-wider">Pelanggan</th>
                <th className="px-4 font-label-sm text-label-sm uppercase text-tertiary font-bold tracking-wider">Item & Modifikasi</th>
                <th className="px-4 font-label-sm text-label-sm uppercase text-tertiary font-bold tracking-wider">Total (Rp)</th>
                <th className="px-4 font-label-sm text-label-sm uppercase text-tertiary font-bold tracking-wider">Pembayaran</th>
                <th className="px-4 font-label-sm text-label-sm uppercase text-tertiary font-bold tracking-wider">Distribusi SCM</th>
                <th className="px-4 font-label-sm text-label-sm uppercase text-tertiary font-bold tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-md font-body-md">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-tertiary">
                    <span className="material-symbols-outlined text-3xl animate-spin text-primary">progress_activity</span>
                    <p className="mt-1 text-body-sm">Memuat transaksi terkini...</p>
                  </td>
                </tr>
              ) : tableOrders.length > 0 ? (
                tableOrders.map((order) => {
                  const statusMeta = STATUS_META[order.status] ?? STATUS_META.pending;
                  const waktu = formatTime(order.createdAt);
                  const initials = (order.createdBy?.name || "CS").slice(0, 2).toUpperCase();
                  const isPendingAction = pendingActionId === order.id;

                  return (
                    <tr key={order.id} className="h-14 hover:bg-[#F9FBFA] transition-colors">
                      <td className="px-4 font-mono font-bold text-primary">
                        #TRX-{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-4 text-tertiary text-body-sm font-body-sm">{waktu} WIB</td>
                      <td className="px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-secondary-container text-primary font-bold flex items-center justify-center text-[12px]">
                            {initials}
                          </div>
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            {order.createdBy?.name || "Pelanggan POS"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 text-body-sm font-body-sm text-on-surface max-w-[280px] truncate" title={orderItemsText(order)}>
                        {orderItemsText(order)}
                      </td>
                      <td className="px-4 font-label-lg text-label-lg font-bold text-on-surface">
                        {rupiah(Number(order.totalAmount))}
                      </td>
                      <td className="px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 font-semibold uppercase">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          {" "}
                          {order.paymentMethod || "cash"}
                        </span>
                      </td>
                      <td className="px-4">
                        <span className={`inline-flex items-center gap-1.5 text-label-sm font-label-sm font-medium px-2.5 py-1 rounded-lg border ${statusMeta.className}`}>
                          <span className="material-symbols-outlined text-[15px]">{statusMeta.icon}</span>
                          {" "}
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setDetailOrder(order)}
                            className="p-1.5 rounded-lg text-tertiary hover:text-primary hover:bg-surface-container-low"
                            title="Detail Pesanan"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          {order.status === "paid" && (
                            <button
                              type="button"
                              onClick={() => handleTransition(order, "preparing")}
                              disabled={isPendingAction}
                              className="px-2.5 py-1.5 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary-container disabled:opacity-60 disabled:cursor-wait flex items-center gap-1"
                              title="Kirim ke Kitchen & Barista"
                            >
                              <span className="material-symbols-outlined text-[14px]">soup_kitchen</span>
                              Kitchen
                            </button>
                          )}
                          {order.status === "preparing" && (
                            <button
                              type="button"
                              onClick={() => handleTransition(order, "completed")}
                              disabled={isPendingAction}
                              className="px-2.5 py-1.5 rounded-lg border border-primary/30 text-primary text-[11px] font-bold hover:bg-[#E8F3EC] disabled:opacity-60 disabled:cursor-wait flex items-center gap-1"
                              title="Tandai pesanan selesai"
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
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-tertiary">
                    {search
                      ? "Tidak ada pesanan yang cocok dengan pencarian."
                      : activeTab === "orders"
                        ? "Belum ada pesanan pelanggan baru."
                        : "Belum ada pesanan yang diproses kitchen."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination / Footer Table */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/25">
          <span className="font-body-sm text-body-sm text-tertiary">
            Menampilkan {tableOrders.length} pesanan
          </span>
          <span className="font-body-sm text-body-sm text-tertiary">
            {counts.orders} menunggu • {counts.preparing} diproses kitchen
          </span>
        </div>
      </div>

      {/* 5. TOMBOL AKSI CEPAT */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">flash_on</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Aksi Cepat Manajemen SCM</h4>
            <p className="font-body-sm text-body-sm text-tertiary">Percepat pengadaan bahan baku dan pembukuan closing shift hari ini.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Aksi 1: Buat Pesanan Pasokan (PO Baru) */}
          <Link
            href="/pemilik/pembelian"
            className="flex-1 sm:flex-initial h-12 bg-primary-container hover:bg-primary text-surface-container-lowest font-label-lg text-label-lg px-5 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">add_business</span>
            <span>Buat Pesanan Pasokan (PO Baru)</span>
          </Link>
          {/* Aksi 2: Tambah Produk */}
          <Link
            href="/pemilik/produk"
            className="flex-1 sm:flex-initial h-12 bg-surface-container-lowest hover:bg-[#E8F3EC] text-on-surface border border-[#94B9A9] font-label-lg text-label-lg px-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">post_add</span>
            <span>Kelola Produk & BOM</span>
          </Link>
          {/* Aksi 3: Lihat Rekap Penjualan */}
          <Link
            href="/pemilik/laporan-scm"
            className="flex-1 sm:flex-initial h-12 bg-surface-container-lowest hover:bg-[#E8F3EC] text-on-surface border border-[#94B9A9] font-label-lg text-label-lg px-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">receipt</span>
            <span>Lihat Laporan SCM</span>
          </Link>
        </div>
      </div>

      {/* MODAL DETAIL PESANAN */}
      {detailOrder && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-inverse-surface/45 backdrop-blur-sm"
          role="presentation"
          onClick={() => setDetailOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-order-title"
            className="w-full max-w-lg bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0_24px_60px_-20px_rgba(23,32,51,0.45)] overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-outline-variant/30">
              <div>
                <h2 id="detail-order-title" className="text-headline-sm font-headline-sm text-on-surface font-bold font-mono">
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
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/25">
                  <span className="text-[11px] font-bold uppercase text-tertiary">Kasir</span>
                  <p className="text-body-sm font-semibold text-on-surface">
                    {detailOrder.createdBy?.name || "Kasir Gerai"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/25">
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
                          {item.quantity} x {rupiah(Number(item.price))}
                        </p>
                      </div>
                      <span className="text-body-sm font-bold text-on-surface font-mono">
                        {rupiah(Number(item.price) * item.quantity)}
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
                  {rupiah(Number(detailOrder.totalAmount))}
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
                  disabled={pendingActionId === detailOrder.id}
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
                  disabled={pendingActionId === detailOrder.id}
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
    </div>
  );
}
