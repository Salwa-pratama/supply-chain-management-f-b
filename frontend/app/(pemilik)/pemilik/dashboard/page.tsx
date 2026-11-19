"use client";

import Link from "next/link";
import { useOwnerOverview } from "@/features/dashboard/hooks/use-dashboard";

function rupiah(val: number) {
  return "Rp " + Math.round(val || 0).toLocaleString("id-ID");
}

export default function PemilikDashboardPage() {
  const { data: overview, isLoading } = useOwnerOverview();

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
          {/* Kolom Kiri: Tren Penjualan Harian & Arus Kas Transaksi (65% -> col-span-8) */}
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
                  <button className="px-3 py-1 rounded-lg text-label-md font-label-md bg-surface-container-lowest text-primary shadow-sm font-bold transition-all">
                    Hari Ini
                  </button>
                  <button className="px-3 py-1 rounded-lg text-label-md font-label-md text-tertiary hover:text-on-surface transition-all">
                    7 Hari
                  </button>
                  <button className="px-3 py-1 rounded-lg text-label-md font-label-md text-tertiary hover:text-on-surface transition-all">
                    Bulan Ini
                  </button>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-label-md font-label-md bg-surface border border-outline-variant/50 text-on-surface hover:bg-surface-container-low transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Ekspor CSV</span>
                </button>
              </div>
            </div>
            {/* Metric Sub-values in Chart Header */}
            <div className="grid grid-cols-3 gap-4 my-4 py-2 px-4 bg-surface rounded-xl border border-outline-variant/20">
              <div>
                <span className="font-label-sm text-label-sm text-tertiary">Volume Masuk Hari Ini</span>
                <div className="font-headline-sm text-headline-sm font-bold text-primary">Rp 4.820.000</div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-tertiary">Rata-rata Keranjang (AOV)</span>
                <div className="font-headline-sm text-headline-sm font-bold text-on-surface">Rp 33.900</div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-tertiary">Tingkat Konversi AI Bot</span>
                <div className="font-headline-sm text-headline-sm font-bold text-primary">88.4%</div>
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
                {/* Area Path for Comparison (Kemarin) */}
                <path d="M0,160 Q100,140 200,120 T400,110 T600,85 L700,70 L700,180 L0,180 Z" fill="url(#secondaryGradient)" />
                <path d="M0,160 Q100,140 200,120 T400,110 T600,85 L700,70" stroke="#94B9A9" strokeLinecap="round" strokeWidth="2" />
                {/* Area Path for Primary Today (Hari Ini) */}
                <path d="M0,170 Q110,120 220,135 T420,70 T580,45 L700,20 L700,180 L0,180 Z" fill="url(#primaryGradient)" />
                <path d="M0,170 Q110,120 220,135 T420,70 T580,45 L700,20" stroke="#137A48" strokeLinecap="round" strokeWidth="3" />
                {/* Current Peak Active Point */}
                <circle cx="580" cy="45" fill="#137A48" r="5" stroke="#FFFFFF" strokeWidth="2" />
                <g transform="translate(540, 5)">
                  <rect fill="#121B2E" height="28" rx="6" width="80" />
                  <text fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" x="40" y="18">Rp 820.000</text>
                </g>
              </svg>
              {/* X-Axis Labels */}
              <div className="flex justify-between items-center text-label-sm font-label-sm text-tertiary pt-2 border-t border-outline-variant/30">
                <span>07:00</span>
                <span>09:00</span>
                <span>11:00</span>
                <span>13:00 (Makan Siang)</span>
                <span>15:00</span>
                <span>17:00 (Peak Hour)</span>
                <span>19:00</span>
                <span>21:00</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-container" />
                  <span className="font-label-sm text-label-sm text-tertiary">Hari Ini (Real-time)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#94B9A9]" />
                  <span className="font-label-sm text-label-sm text-tertiary">Kemarin</span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-medium">Sinkronisasi terakhir: 2 menit yang lalu</span>
            </div>
          </div>
          {/* Kolom Kanan: Panel Antrian Order & Live Kitchen Dispatch (35% -> col-span-4) */}
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
                  3 Menunggu
                </span>
              </div>
              {/* Live Order Queue Preview */}
              <div className="flex flex-col gap-3 my-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                {overview?.recentOrders && overview.recentOrders.length > 0 ? (
                  overview.recentOrders.slice(0, 3).map((ord) => {
                    const itemsText = ord.orderItems
                      ?.map((it) => `${it.quantity}x ${it.product?.name || "Item"}`)
                      .join(", ") || "-";
                    return (
                      <div
                        key={ord.id}
                        className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-bold text-primary font-mono">
                            #TRX-{ord.id.slice(0, 8).toUpperCase()} • {ord.orderType || "Dine-in"}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold capitalize">
                            {ord.status === "paid" ? "Terbayar" : ord.status}
                          </span>
                        </div>
                        <p className="text-body-sm font-body-sm text-on-surface truncate" title={itemsText}>
                          {itemsText}
                        </p>
                        <div className="flex items-center justify-between text-[12px] text-tertiary pt-1 border-t border-outline-variant/20">
                          <span>Kasir: {ord.createdBy?.name || "Kasir Utama"}</span>
                          <span className="font-bold text-on-surface font-mono">{rupiah(Number(ord.totalAmount))}</span>
                        </div>
                      </div>
                    );
                  })
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
                <span className="text-tertiary">Bahan Kritis Dapur:</span>
                <span className="font-label-sm text-label-sm font-bold text-amber-600">Susu UHT &lt; 5 Liter</span>
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
              <button className="font-headline-sm text-headline-sm font-bold text-primary border-b-2 border-primary pb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                <span>Pesanan Pelanggan Terbaru</span>
                <span className="bg-secondary-container text-primary font-bold text-[11px] px-2 py-0.5 rounded-full">12 Menit Terakhir</span>
              </button>
              <button className="font-headline-sm text-headline-sm font-semibold text-tertiary hover:text-on-surface pb-2 flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[20px]">soup_kitchen</span>
                <span>Status Kitchen & Barista</span>
              </button>
            </div>
            {/* Search Table / Filter */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-tertiary text-[16px]">search</span>
                <input className="pl-8 pr-3 py-1 bg-surface text-label-md font-label-md rounded-xl border border-outline-variant/35 outline-none focus:border-primary w-48" placeholder="Cari ID transaksi..." type="text" />
              </div>
              <button className="p-1.5 rounded-xl border border-outline-variant/35 text-tertiary hover:bg-surface-container-low">
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
                <div className="font-label-md text-label-md text-primary font-semibold">Produksi Berlangsung (3 Order)</div>
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
                ) : overview?.recentOrders && overview.recentOrders.length > 0 ? (
                  overview.recentOrders.map((order) => {
                    const itemsText = order.orderItems
                      ?.map((item) => `${item.quantity}x ${item.product?.name || "Item"}`)
                      .join(", ") || "-";
                    const waktu = new Date(order.createdAt).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const initials = (order.createdBy?.name || "CS").slice(0, 2).toUpperCase();

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
                        <td className="px-4 text-body-sm font-body-sm text-on-surface max-w-[280px] truncate" title={itemsText}>
                          {itemsText}
                        </td>
                        <td className="px-4 font-label-lg text-label-lg font-bold text-on-surface">
                          {rupiah(Number(order.totalAmount))}
                        </td>
                        <td className="px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 font-semibold uppercase">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            {" "}
                            {order.paymentMethod || "Lunas"}
                          </span>
                        </td>
                        <td className="px-4">
                          <span className="inline-flex items-center gap-1.5 text-label-sm font-label-sm font-medium text-[#137A48] bg-[#E8F3EC] px-2.5 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-[15px]">done_all</span>
                            {" "}
                            {order.status === "completed" ? "Selesai" : "Diproses"}
                          </span>
                        </td>
                        <td className="px-4 text-right">
                          <button className="p-1.5 rounded-lg text-tertiary hover:text-primary hover:bg-surface-container-low" title="Detail Pesanan">
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-tertiary">
                      Belum ada riwayat transaksi hari ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination / Footer Table */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/25">
            <span className="font-body-sm text-body-sm text-tertiary">
              Menampilkan {overview?.recentOrders?.length || 0} pesanan terkini
            </span>
          </div>
        </div>
        {/* 5. TOMBOL AKSI CEPAT (BOTTOM FLOATING QUICK ACTION BAR) */}
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
              href="/pemilik/pesanan-po"
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
              href="/pemilik/laporan"
              className="flex-1 sm:flex-initial h-12 bg-surface-container-lowest hover:bg-[#E8F3EC] text-on-surface border border-[#94B9A9] font-label-lg text-label-lg px-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">receipt</span>
              <span>Lihat Laporan SCM</span>
            </Link>
          </div>
        </div>
      </div>
  );
}
