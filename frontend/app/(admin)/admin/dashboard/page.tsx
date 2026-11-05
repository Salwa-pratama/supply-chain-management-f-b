import type { Metadata } from "next";
import SegmentedControl from "@/components/ui/SegmentedControl";
import UserTable from "@/components/admin/UserTable";

export const metadata: Metadata = { title: "Dashboard Super Admin | BAPER" };

export default function AdminDashboardPage() {
  return (
    <>
      {/* 1. Header Section: Title & Actions */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-headline-lg text-headline-lg text-[#172033] tracking-tight">
              Pusat Kendali Ekosistem BAPER SCM
            </h1>
            <span className="px-2.5 py-0.5 bg-[#E8F3EC] border border-[#137A48]/30 text-[#137A48] rounded-full font-label-sm text-label-sm font-semibold">
              Live Gateway
            </span>
          </div>
          <p className="font-body-md text-body-md text-tertiary mt-1">
            Monitoring terpusat atas rantai pasok bahan baku F&B, integritas data mitra, dan perputaran kas
            platform nasional.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Button: Unduh Laporan Audit */}
          <button className="h-11 px-5 bg-surface-container-lowest border border-[#94B9A9] text-[#172033] rounded-2xl font-label-lg text-label-lg flex items-center gap-2 hover:bg-[#E8F3EC] hover:border-[#137A48] active:scale-[0.98] transition-all shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
            <span>Unduh Laporan Audit</span>
          </button>
          {/* Button: Kelola Hak Akses */}
          <button className="h-11 px-6 bg-primary-container text-surface-container-lowest rounded-2xl font-label-lg text-label-lg flex items-center gap-2 hover:bg-[#0D6038] active:scale-[0.98] transition-all shadow-[0_4px_20px_-2px_rgba(19,122,72,0.25)]">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_person
            </span>
            <span>Kelola Hak Akses</span>
          </button>
        </div>
      </section>
      {/* 2. Baris Statistik Ekosistem (KPI Bento Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Pemilik Bisnis FNB Terdaftar */}
        <div className="bg-surface-container-lowest rounded-[22px] border border-outline-variant/35 p-5 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-label-md text-[#7B8794]">Pemilik Bisnis FNB Terdaftar</span>
            <div className="w-9 h-9 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-[#137A48]">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-headline-lg text-headline-lg text-[#172033]">1.240</span>
            <span className="font-body-sm text-body-sm text-tertiary">Bisnis Aktif</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F3EC] text-[#137A48] font-bold">
              <span className="material-symbols-outlined text-[13px] mr-0.5">trending_up</span> +32
            </span>
            <span className="font-body-sm text-body-sm text-tertiary">pendaftaran minggu ini</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#137A48] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {/* KPI 2: Pemasok Terdaftar */}
        <div className="bg-surface-container-lowest rounded-[22px] border border-outline-variant/35 p-5 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-label-md text-[#7B8794]">Pemasok Terdaftar</span>
            <div className="w-9 h-9 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-[#137A48]">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-headline-lg text-headline-lg text-[#172033]">315</span>
            <span className="font-body-sm text-body-sm text-tertiary">Mitra Pemasok</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-tertiary">
              Bahan Baku: <strong className="text-on-surface">242</strong>
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-label-sm text-label-sm text-tertiary">
              Operasional: <strong className="text-on-surface">73</strong>
            </span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#137A48] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {/* KPI 3: Konsumen Terhubung */}
        <div className="bg-surface-container-lowest rounded-[22px] border border-outline-variant/35 p-5 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-label-md text-[#7B8794]">Konsumen Terhubung</span>
            <div className="w-9 h-9 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-[#137A48]">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-headline-lg text-headline-lg text-[#172033]">84.920</span>
            <span className="font-body-sm text-body-sm text-tertiary">Pelanggan Aktif</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-[#E8F3EC] text-[#137A48] font-bold">
              <span className="material-symbols-outlined text-[13px] mr-0.5">trending_up</span> +14.8%
            </span>
            <span className="font-body-sm text-body-sm text-tertiary">retensi bulanan POS</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#137A48] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {/* KPI 4: Total Transaksi Sistem */}
        <div className="bg-surface-container-lowest rounded-[22px] border border-outline-variant/35 p-5 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-label-md text-[#7B8794]">Total Transaksi Sistem</span>
            <div className="w-9 h-9 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-[#137A48]">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-headline-lg text-headline-lg text-[#172033]">Rp 2,4 M</span>
            <span className="font-body-sm text-body-sm text-tertiary">Bulan Berjalan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              99.82% Sukses Kliring
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-label-sm text-label-sm text-tertiary">14.309 PO</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#137A48] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </section>
      {/* 3. Grid Visual & Analitik (Interactive Chart & Alert Widget) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (8 Cols): Grafik Pertumbuhan Pengguna & Volume Transaksi SCM */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-[24px] border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          {/* Header Chart Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/25">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-[#172033]">
                Pertumbuhan Pengguna & Volume Transaksi SCM
              </h3>
              <p className="font-body-sm text-body-sm text-tertiary">
                Korelasi lonjakan pemesanan bahan baku dengan onboarding outlet baru
              </p>
            </div>
            {/* Filter periode: hubungkan onChange ke API untuk mengganti data grafik */}
            <SegmentedControl
              variant="pill"
              options={["Mingguan", "Bulanan", "Triwulan", "2024 YTD"]}
              defaultValue="Bulanan"
              ariaLabel="Periode grafik"
            />
          </div>
          {/* Legend and Quick Metrics */}
          <div className="flex items-center gap-6 py-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#137A48]" />
              <span className="font-label-sm text-label-sm text-on-surface">
                Volume Transaksi (Miliar IDR)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary-container border border-[#137A48]" />
              <span className="font-label-sm text-label-sm text-tertiary">Pertumbuhan Merchant Baru</span>
            </div>
          </div>
          {/* Interactive SVG Chart Canvas */}
          <div className="relative w-full h-64 mt-2">
            {/* Background Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] text-tertiary">
              <div className="border-b border-outline-variant/20 w-full flex justify-between">
                <span>Rp 3,0 M</span>
              </div>
              <div className="border-b border-outline-variant/20 w-full flex justify-between">
                <span>Rp 2,25 M</span>
              </div>
              <div className="border-b border-outline-variant/20 w-full flex justify-between">
                <span>Rp 1,5 M</span>
              </div>
              <div className="border-b border-outline-variant/20 w-full flex justify-between">
                <span>Rp 0,75 M</span>
              </div>
              <div className="border-b border-outline-variant/30 w-full flex justify-between">
                <span>Rp 0</span>
              </div>
            </div>
            {/* SVG Chart Curve */}
            <svg
              className="w-full h-full pt-4 pb-6 overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 700 200"
            >
              <defs>
                <linearGradient id="primaryGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#137A48" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#137A48" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Area Fill */}
              <polygon
                fill="url(#primaryGradient)"
                points="
              20,180
              20,130
              110,120
              210,140
              310,90
              410,95
              510,50
              610,65
              680,30
              680,180
            "
              />
              {/* Transaction Volume Main Polyline */}
              <polyline
                fill="none"
                points="20,130 110,120 210,140 310,90 410,95 510,50 610,65 680,30"
                stroke="#137A48"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              {/* Merchant Growth Line (Secondary) */}
              <polyline
                fill="none"
                points="20,160 110,150 210,135 310,115 410,110 510,80 610,75 680,55"
                stroke="#626d68"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              {/* Interactive Highlight Markers */}
              <circle cx="510" cy="50" fill="#FFFFFF" r="5" stroke="#137A48" strokeWidth="3" />
              <circle cx="680" cy="30" fill="#137A48" r="6" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
            {/* X-Axis Labels */}
            <div className="flex justify-between text-[11px] text-tertiary px-2 -mt-4">
              <span>Jan 2024</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Mei</span>
              <span>Jun</span>
              <span>Jul</span>
              <span className="font-bold text-[#137A48]">Agust (Aktif)</span>
            </div>
          </div>
          {/* Footnote Status */}
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-tertiary">
            <span>*Rata-rata ticket order B2B: Rp 1.480.000 / transaksi rekap</span>
            <span className="text-primary font-semibold">Tingkat Retensi SCM: 94.2%</span>
          </div>
        </div>
        {/* Right (4 Cols): Widget Peringatan Sistem Rantai Pasok */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-[24px] border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div>
            {/* Title with Attention Badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#B7791F] text-[22px]">warning</span>
                <h3 className="font-headline-sm text-headline-sm text-[#172033]">Peringatan Sistem</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-[#FFF9E6] text-[#B7791F] font-bold border border-[#B7791F]/30">
                3 Kritis
              </span>
            </div>
            {/* Alert Items List */}
            <div className="space-y-3.5">
              {/* Alert Item 1: Logistik Mitra Terlambat */}
              <div className="p-3.5 rounded-2xl bg-[#FFF9E6]/60 border border-[#B7791F]/25 flex flex-col gap-1.5 hover:bg-[#FFF9E6] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-[#B7791F] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">schedule</span> Keterlambatan
                    Logistik
                  </span>
                  <span className="text-[10px] text-tertiary">14 mnt lalu</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                  Pemasok <strong>PT Segar Pangan Nusantara</strong> mengalami hambatan armada menuju 8
                  merchant Bandung Raya.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold text-tertiary">PO: #PO-88219 s/d #PO-88226</span>
                  <button className="text-xs font-bold text-primary hover:underline">Pantau Rute</button>
                </div>
              </div>
              {/* Alert Item 2: Stok Kritis Serentak */}
              <div className="p-3.5 rounded-2xl bg-[#FDF2F2] border border-[#B54747]/25 flex flex-col gap-1.5 hover:bg-[#FDF2F2]/90 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-[#B54747] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">inventory</span> Stok Kritis
                    Serentak (5 Outlet)
                  </span>
                  <span className="text-[10px] text-[#B54747] font-semibold">Prioritas Tinggi</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                  Bahan baku <em>Susu UHT 1L & Biji Kopi Arabika 1kg</em> di bawah safety buffer minimum
                  cabang Jakarta Selatan.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold text-tertiary">Auto-Reorder Bot: Tertahan</span>
                  <button className="text-xs font-bold text-error hover:underline">
                    Kirim Pemasok Cepat
                  </button>
                </div>
              </div>
              {/* Alert Item 3: Anomali Selisih Rekap Kas */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/35 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold text-tertiary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">difference</span> Selisih Rekap
                    POS vs Gudang
                  </span>
                  <span className="text-[10px] text-tertiary">1 jam lalu</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                  Mitra F&B <strong>Kopi Kulo Thamrin</strong> mencatat selisih input syrup vanilla 4 botol
                  pada closing shift.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold text-tertiary">Selisih: Rp 240.000</span>
                  <button className="text-xs font-bold text-tertiary hover:underline">Cek Audit Shift</button>
                </div>
              </div>
            </div>
          </div>
          {/* Trigger Button */}
          <button className="w-full mt-4 py-2.5 bg-surface-container hover:bg-secondary-container text-on-surface rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 transition-all">
            <span className="material-symbols-outlined text-[18px]">rule</span>
            <span>Buka Resolusi Pusat Insiden</span>
          </button>
        </div>
      </section>
      {/* 4. Tabel Manajemen Pengguna & Entitas Bisnis Terbaru (data: components/admin/UserTable.tsx) */}
      <UserTable />
      {/* 5. Log Aktivitas Rantai Pasok Sistem Terbaru (Audit Trail) */}
      <section className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-[#137A48] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">history_edu</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-[#172033]">
                Log Aktivitas Rantai Pasok Sistem Terbaru
              </h2>
              <p className="font-body-sm text-body-sm text-tertiary">
                Audit trail transaksi otomatis, integrasi bot AI rekap checkout, dan sinkronisasi gudang
                real-time
              </p>
            </div>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" /> Stream Kafka Aktif
          </span>
        </div>
        {/* Activity Timeline List */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/40">
          {/* Activity Log 1 */}
          <div className="relative group">
            <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#137A48] ring-4 ring-white" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="font-label-lg text-label-lg text-[#172033]">
                  Pemasok Mengirim PO Bahan Baku
                </span>
                <span className="px-2 py-0.5 bg-[#E8F3EC] text-[#137A48] rounded text-[11px] font-semibold">
                  PO #PO-94102
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-tertiary">2 menit yang lalu</span>
            </div>
            <p className="font-body-md text-body-md text-tertiary mt-0.5">
              <strong>PT Segar Pangan Nusantara</strong> menerbitkan resi pengiriman armada B-9241-KDA menuju{" "}
              <strong>Kedai Kopi Bahagia (Cabang Menteng)</strong>. Total 120 kg beans & 50 liter fresh milk.
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-tertiary">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">badge</span> Driver: Sugeng
                (0812-9988-xxxx)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">timer</span> Estimasi Tiba: 45 Menit
              </span>
            </div>
          </div>
          {/* Activity Log 2 */}
          <div className="relative group">
            <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#005f35] ring-4 ring-white" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="font-label-lg text-label-lg text-[#172033]">
                  Bot AI Sukses Rekapitulasi Checkout Keranjang Cepat
                </span>
                <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded text-[11px] font-semibold">
                  AI Engine BAPER v2.4
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-tertiary">7 menit yang lalu</span>
            </div>
            <p className="font-body-md text-body-md text-tertiary mt-0.5">
              Ekstraksi pesan WhatsApp pemesanan otomatis dari 14 merchant kopi berhasil dikonversi menjadi
              pesanan draft split-vendor dengan akurasi 100%. Total nominal terkumpul: Rp 18.450.000.
            </p>
          </div>
          {/* Activity Log 3 */}
          <div className="relative group">
            <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#436558] ring-4 ring-white" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="font-label-lg text-label-lg text-[#172033]">
                  Update Status Gudang Regional Bandung
                </span>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded text-[11px] font-semibold">
                  Warehouse Hub #WH-BDG02
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-tertiary">19 menit yang lalu</span>
            </div>
            <p className="font-body-md text-body-md text-tertiary mt-0.5">
              Penerimaan pasokan massal 400 karton cup ramah lingkungan dari <strong>EcoPack</strong> telah
              lolos Quality Control dan tercatat pada buffer inventory nasional.
            </p>
          </div>
          {/* Activity Log 4 */}
          <div className="relative group">
            <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-[#B7791F] ring-4 ring-white" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="font-label-lg text-label-lg text-[#172033]">
                  Rekonsiliasi Arus Kas Otomatis Virtual Account
                </span>
                <span className="px-2 py-0.5 bg-[#FFF9E6] text-[#B7791F] rounded text-[11px] font-semibold">
                  Fintech Gateway
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-tertiary">35 menit yang lalu</span>
            </div>
            <p className="font-body-md text-body-md text-tertiary mt-0.5">
              Sistem mencatat pembayaran escrow masuk sejumlah Rp 142.300.000 untuk 82 tagihan tempo mitra
              pemasok terverifikasi. Escrow dana dialokasikan aman ke penampungan kliring.
            </p>
          </div>
        </div>
        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-outline-variant/20 flex justify-center">
          <button className="h-10 px-5 bg-surface-container hover:bg-secondary-container text-on-surface rounded-xl font-label-md text-label-md flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-[18px]">read_more</span>
            <span>Buka Riwayat Audit Trail Lengkap (30 Hari Terakhir)</span>
          </button>
        </div>
      </section>
      {/* Bottom Footer Meta */}
      <footer className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-tertiary border-t border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-on-surface">Platform BAPER SCM Nasional v3.12.0</span>
          <span>•</span>
          <span>Pusat Operasional Jakarta & Regional Hub</span>
        </div>
        <div>
          <span>Terakhir diperbarui otomatis: Hari ini, 24 Agustus 2024 - 10:45:12 WIB</span>
        </div>
      </footer>
    </>
  );
}
