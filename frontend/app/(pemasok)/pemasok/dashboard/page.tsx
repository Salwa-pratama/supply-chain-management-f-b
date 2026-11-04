import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = { title: "Portal Mitra Pemasok | BAPER SCM" };

export default function PemasokDashboardPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER BANNER & QUICK CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">Ringkasan Operasional Hari Ini</span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">Rabu, 24 Mei 2024</span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">Portal Pasokan Bahan Baku F&B</h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Kelola permohonan PO mitra kedai kopi & restoran, cetak surat jalan, dan pantau ketersediaan stok bahan secara aktual.
            </p>
          </div>
          {/* Action cluster */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] hover:border-primary font-label-lg text-label-lg flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh Laporan Pasokan</span>
            </button>
            <button className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              <span>Buat Surat Jalan Baru</span>
            </button>
          </div>
        </div>
        {/* 1. RINGKASAN STATUS PEMENUHAN PASOKAN (Bento Grid KPI Metrics) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              {" "}
              Ringkasan Status Pemenuhan Pasokan
            </h2>
            <span className="text-label-md font-label-md text-tertiary">Diperbarui 3 menit yang lalu</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Permintaan Masuk */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#7B8794]">Total PO Masuk</span>
                <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">inbox</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-[#172033]">
                  24
                  {" "}
                  <span className="text-sm font-normal text-tertiary">Pesanan</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="inline-flex items-center text-[11px] font-bold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-[13px] mr-0.5">trending_up</span>
                    {" "}
                    +12%
                  </span>
                  <span className="text-[11px] text-tertiary">vs minggu lalu</span>
                </div>
              </div>
            </div>
            {/* Menunggu Konfirmasi (Perlu Tindakan) */}
            <div className="bg-white p-5 rounded-2xl border-2 border-[#B54747]/40 bg-gradient-to-br from-white to-[#FDF2F2]/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between hover:border-error transition-all">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#B54747] font-bold">Menunggu Konfirmasi</span>
                <div className="w-8 h-8 rounded-lg bg-[#FDF2F2] flex items-center justify-center text-[#B54747]">
                  <span className="material-symbols-outlined text-[18px]">priority_high</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-[#B54747]">
                  5
                  {" "}
                  <span className="text-sm font-normal text-tertiary">Pesanan Baru</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="inline-flex items-center text-[11px] font-bold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/30 animate-pulse">
                    Perlu Tindakan Segera
                  </span>
                </div>
              </div>
            </div>
            {/* Sedang Diproses / QC */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#7B8794]">Sedang Diproses & QC</span>
                <div className="w-8 h-8 rounded-lg bg-[#FFF9E6] flex items-center justify-center text-[#B7791F]">
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-[#172033]">
                  7
                  {" "}
                  <span className="text-sm font-normal text-tertiary">Pesanan</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="inline-flex items-center text-[11px] font-bold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full border border-[#B7791F]/20">
                    Tahap Pengepakan Gudang
                  </span>
                </div>
              </div>
            </div>
            {/* Dalam Pengiriman Logistik */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#7B8794]">Dalam Pengiriman</span>
                <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-[#172033]">
                  4
                  {" "}
                  <span className="text-sm font-normal text-tertiary">Pengiriman</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="inline-flex items-center text-[11px] font-bold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
                    Armada On-Delivery
                  </span>
                </div>
              </div>
            </div>
            {/* Pesanan Selesai Bulan Ini */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-[#7B8794]">PO Selesai Bulan Ini</span>
                <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-headline-lg font-headline-lg text-primary">
                  86
                  {" "}
                  <span className="text-sm font-normal text-tertiary">PO Terpenuhi</span>
                </div>
                <div className="mt-1 text-label-md font-label-md text-[#172033] font-bold">Rp 138.500.000</div>
                <div className="mt-1 text-[11px] text-tertiary">Tingkat akurasi pemenuhan 99.4%</div>
              </div>
            </div>
          </div>
        </section>
        {/* 2. AKSI CEPAT DAFTAR PESANAN PEMBELIAN (PO) MENUNGGU KONFIRMASI */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-headline-md font-headline-md text-[#172033]">Pesanan Pembelian (PO) Menunggu Konfirmasi</h2>
                <span className="bg-[#B54747] text-white text-xs font-bold px-2 py-0.5 rounded-full">5 Butuh Respon Segera</span>
              </div>
              <p className="text-body-sm font-body-sm text-tertiary mt-0.5">
                Konfirmasi kesiapan stok gudang agar gerai F&B mitra dapat memulai operasional tepat waktu.
              </p>
            </div>
            <a className="text-primary hover:text-[#0D6038] text-label-lg font-label-lg flex items-center gap-1" href="#semua-po">
              <span>Lihat Semua Permintaan PO</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Card PO 1: Kopi Kenangan Senopati (Exact requested example) */}
            <div className="bg-white rounded-2xl border border-outline-variant/50 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#137A48]" />
              <div>
                {/* Header Card */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                      <span className="material-symbols-outlined text-[24px]">coffee</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-[#172033]">Kopi Kenangan - Senopati</h3>
                        <span className="bg-[#E8F3EC] text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                          Mitra Prioritas
                        </span>
                      </div>
                      <p className="text-body-sm text-tertiary font-body-sm">
                        No. PO:
                        {" "}
                        <span className="font-semibold text-on-surface">PO-BPR-2024-0589</span>
                        {" "}
                        • Masuk: 25 Menit lalu
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-label-sm text-tertiary">Estimasi Nilai</span>
                    <div className="text-headline-sm font-headline-sm text-primary font-bold">Rp 12.850.000</div>
                  </div>
                </div>
                {/* Item Pasokan Details */}
                <div className="py-4 space-y-3">
                  <div className="text-label-md font-label-md text-tertiary uppercase tracking-wider">Rincian Pasokan Bahan:</div>
                  <div className="bg-[#F5F8F6] p-3.5 rounded-xl space-y-2 border border-outline-variant/30">
                    <div className="flex items-center justify-between text-body-md font-body-md">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-semibold text-[#172033]">Arabika Specialty Grade 1 (Beans)</span>
                      </div>
                      <span className="font-bold text-on-surface">50 Kg</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-tertiary pl-4">
                      <span>Kemasan Valve 1kg • Stok Gudang: 320 Kg (Aman)</span>
                      <span>Rp 175.000 / Kg</span>
                    </div>
                  </div>
                  <div className="bg-[#F5F8F6] p-3.5 rounded-xl space-y-2 border border-outline-variant/30">
                    <div className="flex items-center justify-between text-body-md font-body-md">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-semibold text-[#172033]">Susu Segar Pasteurised Fresh Milk</span>
                      </div>
                      <span className="font-bold text-on-surface">120 Liter</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-tertiary pl-4">
                      <span>Chilled Carton 1L • Stok Cold Storage: 280 Liter (Aman)</span>
                      <span>Rp 24.500 / Liter</span>
                    </div>
                  </div>
                  {/* Shipping Destination & Note */}
                  <div className="flex items-center gap-2 text-xs text-tertiary pt-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">pin_drop</span>
                    <span>Alamat Kirim: Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#B7791F] bg-[#FFF9E6] px-3 py-1.5 rounded-lg border border-[#B7791F]/20">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span>Permintaan Kirim: Besok pagi sebelum pukul 07.30 WIB (Praperisapan Buka Gerai)</span>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center gap-2">
                <button className="flex-1 h-11 bg-primary text-white rounded-xl font-label-lg text-label-lg hover:bg-[#0D6038] flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Konfirmasi & Siapkan</span>
                </button>
                <button className="h-11 px-4 border border-[#94B9A9] bg-white text-[#172033] rounded-xl font-label-lg text-label-lg hover:bg-[#E8F3EC] flex items-center justify-center gap-1.5 transition-all">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span>Jadwalkan Pengiriman</span>
                </button>
                <button className="h-11 px-3 border border-[#B54747]/40 bg-white text-[#B54747] rounded-xl font-label-lg text-label-lg hover:bg-[#FDF2F2] flex items-center justify-center transition-all" title="Tolak Permintaan">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  <span className="sr-only">Tolak</span>
                </button>
              </div>
            </div>
            {/* Card PO 2: Fore Coffee - Grand Indonesia */}
            <div className="bg-white rounded-2xl border border-outline-variant/50 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#137A48]" />
              <div>
                {/* Header Card */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                      <span className="material-symbols-outlined text-[24px]">local_cafe</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-[#172033]">Fore Coffee - Grand Indonesia</h3>
                        <span className="bg-[#E8F3EC] text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                          Mitra Resmi
                        </span>
                      </div>
                      <p className="text-body-sm text-tertiary font-body-sm">
                        No. PO:
                        {" "}
                        <span className="font-semibold text-on-surface">PO-BPR-2024-0592</span>
                        {" "}
                        • Masuk: 42 Menit lalu
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-label-sm text-tertiary">Estimasi Nilai</span>
                    <div className="text-headline-sm font-headline-sm text-primary font-bold">Rp 8.420.000</div>
                  </div>
                </div>
                {/* Item Pasokan Details */}
                <div className="py-4 space-y-3">
                  <div className="text-label-md font-label-md text-tertiary uppercase tracking-wider">Rincian Pasokan Bahan:</div>
                  <div className="bg-[#F5F8F6] p-3.5 rounded-xl space-y-2 border border-outline-variant/30">
                    <div className="flex items-center justify-between text-body-md font-body-md">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-semibold text-[#172033]">Sirup Gula Aren Organik 1000ml</span>
                      </div>
                      <span className="font-bold text-on-surface">40 Botol</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-tertiary pl-4">
                      <span>Kemasan Jerigen Foodgrade • Stok Gudang: 120 Botol (Aman)</span>
                      <span>Rp 48.000 / Botol</span>
                    </div>
                  </div>
                  <div className="bg-[#F5F8F6] p-3.5 rounded-xl space-y-2 border border-outline-variant/30">
                    <div className="flex items-center justify-between text-body-md font-body-md">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-semibold text-[#172033]">Paper Cup Double Wall Hot 8oz (Eko-Friendly)</span>
                      </div>
                      <span className="font-bold text-on-surface">2.500 Pcs (25 Slop)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-tertiary pl-4">
                      <span>Kardus Isi 100 Pcs • Stok Gudang: 18 Kardus (Aman)</span>
                      <span>Rp 2.600 / Pcs</span>
                    </div>
                  </div>
                  {/* Shipping Destination & Note */}
                  <div className="flex items-center gap-2 text-xs text-tertiary pt-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">pin_drop</span>
                    <span>Alamat Kirim: West Mall Lt. LG, Grand Indonesia, Jakarta Pusat</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#137A48] bg-[#E8F3EC] px-3 py-1.5 rounded-lg border border-primary/20">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span>Permintaan Kirim: Hari ini sebelum pukul 16.00 WIB (Kebutuhan Weekend Spike)</span>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center gap-2">
                <button className="flex-1 h-11 bg-primary text-white rounded-xl font-label-lg text-label-lg hover:bg-[#0D6038] flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Konfirmasi & Siapkan</span>
                </button>
                <button className="h-11 px-4 border border-[#94B9A9] bg-white text-[#172033] rounded-xl font-label-lg text-label-lg hover:bg-[#E8F3EC] flex items-center justify-center gap-1.5 transition-all">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span>Jadwalkan Pengiriman</span>
                </button>
                <button className="h-11 px-3 border border-[#B54747]/40 bg-white text-[#B54747] rounded-xl font-label-lg text-label-lg hover:bg-[#FDF2F2] flex items-center justify-center transition-all" title="Tolak Permintaan">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  <span className="sr-only">Tolak</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* 3. TABEL MANAJEMEN KATALOG BAHAN BAKU & BARANG OPERASIONAL */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory</span>
                {" "}
                Katalog Bahan Baku & Barang Operasional Mitra
              </h2>
              <p className="text-body-sm font-body-sm text-tertiary">
                Kelola harga grosir, batas minimum kuantitas, dan sinkronisasi stok gudang pemasok ke aplikasi gerai F&B.
              </p>
            </div>
            {/* Filter & Action */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Filter Tabs Segmented */}
              <div className="h-10 bg-[#E8F3EC] p-1 rounded-xl flex items-center gap-1 text-label-sm font-label-sm">
                <button className="px-3 py-1.5 rounded-lg bg-white text-primary font-bold shadow-sm">Semua Bahan (48)</button>
                <button className="px-3 py-1.5 rounded-lg text-tertiary hover:text-on-surface">Bahan Minuman</button>
                <button className="px-3 py-1.5 rounded-lg text-tertiary hover:text-on-surface">Kemasan & Cup</button>
                <button className="px-3 py-1.5 rounded-lg text-tertiary hover:text-on-surface">Operasional</button>
              </div>
              <button className="h-10 px-4 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-md text-label-md flex items-center gap-1.5 shadow-sm transition-all">
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Tambah SKU Baru</span>
              </button>
            </div>
          </div>
          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F5F8F6] border-b border-outline-variant/30 text-label-sm font-label-sm text-[#7B8794] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Nama SKU & Deskripsi</th>
                    <th className="py-3.5 px-6">Kategori</th>
                    <th className="py-3.5 px-6">Harga Grosir (Satuan)</th>
                    <th className="py-3.5 px-6">Sisa Stok Gudang</th>
                    <th className="py-3.5 px-6">Status Ketersediaan</th>
                    <th className="py-3.5 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-body-md text-body-md">
                  {/* Item 1: Arabika Specialty */}
                  <tr className="hover:bg-[#F9FBFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary font-bold shrink-0">
                          <span className="material-symbols-outlined text-[20px]">drive_file_rename_outline</span>
                        </div>
                        <div>
                          <div className="font-bold text-[#172033]">Biji Kopi Arabika Specialty Aceh Gayo Grade 1</div>
                          <div className="text-xs text-tertiary font-body-sm">SKU: BPR-KOP-001 • Medium Dark Roast • Kemasan 1 Kg</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F3EC] text-primary border border-primary/20">
                        Bahan Minuman
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#172033]">
                      Rp 175.000
                      {" "}
                      <span className="text-xs font-normal text-tertiary">/ Kg</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-on-surface">320 Kg</div>
                      <div className="text-[11px] text-tertiary">Ambang batas aman: 50 Kg</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#137A48]" />
                        {" "}
                        Tersedia
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Edit SKU">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Kelola Stok">
                          <span className="material-symbols-outlined text-[18px]">tune</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Item 2: Susu Segar Fresh Milk */}
                  <tr className="hover:bg-[#F9FBFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary font-bold shrink-0">
                          <span className="material-symbols-outlined text-[20px]">water_drop</span>
                        </div>
                        <div>
                          <div className="font-bold text-[#172033]">Susu Segar Pasteurised Fresh Milk Homogenized</div>
                          <div className="text-xs text-tertiary font-body-sm">SKU: BPR-SSU-004 • Chilled 4°C • Karton 1 Liter</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F3EC] text-primary border border-primary/20">
                        Bahan Minuman
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#172033]">
                      Rp 24.500
                      {" "}
                      <span className="text-xs font-normal text-tertiary">/ Liter</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-on-surface">280 Liter</div>
                      <div className="text-[11px] text-tertiary">Ambang batas aman: 100 Liter</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#137A48]" />
                        {" "}
                        Tersedia
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Edit SKU">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Kelola Stok">
                          <span className="material-symbols-outlined text-[18px]">tune</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Item 3: Sirup Gula Aren */}
                  <tr className="hover:bg-[#F9FBFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary font-bold shrink-0">
                          <span className="material-symbols-outlined text-[20px]">liquor</span>
                        </div>
                        <div>
                          <div className="font-bold text-[#172033]">Liquid Palm Sugar (Sirup Gula Aren Organik)</div>
                          <div className="text-xs text-tertiary font-body-sm">SKU: BPR-SRP-012 • Brix 75% • Botol Jerigen 1000ml</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F3EC] text-primary border border-primary/20">
                        Bahan Minuman
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#172033]">
                      Rp 48.000
                      {" "}
                      <span className="text-xs font-normal text-tertiary">/ Botol</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-on-surface">34 Botol</div>
                      <div className="text-[11px] text-tertiary">Ambang batas aman: 40 Botol</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/20 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B7791F]" />
                        {" "}
                        Menipis
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Edit SKU">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Kelola Stok">
                          <span className="material-symbols-outlined text-[18px]">tune</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Item 4: Paper Cup Kemasan */}
                  <tr className="hover:bg-[#F9FBFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-tertiary font-bold shrink-0">
                          <span className="material-symbols-outlined text-[20px]">takeout_dining</span>
                        </div>
                        <div>
                          <div className="font-bold text-[#172033]">Paper Cup Hot 8oz Double Wall Kraft Eco</div>
                          <div className="text-xs text-tertiary font-body-sm">SKU: BPR-PKG-021 • Biodegradable • Slop isi 50 Pcs</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container text-[#172033] border border-outline-variant/30">
                        Kemasan & Cup
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#172033]">
                      Rp 130.000
                      {" "}
                      <span className="text-xs font-normal text-tertiary">/ Slop</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-on-surface">18 Kardus (360 Slop)</div>
                      <div className="text-[11px] text-tertiary">Ambang batas aman: 5 Kardus</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#137A48]" />
                        {" "}
                        Tersedia
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Edit SKU">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Kelola Stok">
                          <span className="material-symbols-outlined text-[18px]">tune</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Item 5: Pembersih Mesin Espresso (Operasional) */}
                  <tr className="hover:bg-[#F9FBFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-tertiary font-bold shrink-0">
                          <span className="material-symbols-outlined text-[20px]">cleaning_services</span>
                        </div>
                        <div>
                          <div className="font-bold text-[#172033]">Espresso Machine Backflush Cleaning Powder</div>
                          <div className="text-xs text-tertiary font-body-sm">SKU: BPR-OPS-009 • Food Contact Safe • Tub 900gr</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container text-[#172033] border border-outline-variant/30">
                        Operasional
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#172033]">
                      Rp 195.000
                      {" "}
                      <span className="text-xs font-normal text-tertiary">/ Tub</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-error">0 Tub (Habis)</div>
                      <div className="text-[11px] text-tertiary">Sedang impor dari vendor</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-[#FDF2F2] text-[#B54747] border border-[#B54747]/20 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B54747]" />
                        {" "}
                        Habis
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Edit SKU">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-2 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors" title="Kelola Stok">
                          <span className="material-symbols-outlined text-[18px]">tune</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Table Footer Pagination */}
            <div className="px-6 py-4 bg-[#F5F8F6] border-t border-outline-variant/30 flex items-center justify-between text-body-sm text-tertiary font-body-sm">
              <span>Menampilkan 5 dari 48 total SKU bahan terdaftar</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-container disabled:opacity-50" disabled>
                  Sebelumnya
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold">1</button>
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-container">
                  2
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-container">
                  3
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white hover:bg-surface-container">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* 4. RIWAYAT TRANSAKSI & SURAT JALAN PENGIRIMAN TERBARU */}
        <section className="space-y-4 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                {" "}
                Surat Jalan & Pelacakan Pengiriman Logistik Terkini
              </h2>
              <p className="text-body-sm font-body-sm text-tertiary">Pantau armada kurir logistik dan estimasi waktu tiba di gerai F&B mitra secara real-time.</p>
            </div>
            <button className="h-10 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-md text-label-md flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>Semua Riwayat Pengiriman</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Surat Jalan 1: Sedang Dikirim ke Janji Jiwa */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4 hover:border-primary/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20">
                  Dalam Perjalanan (On-Delivery)
                </span>
                <span className="text-xs text-tertiary">Truk Logistik #03</span>
              </div>
              <div>
                <div className="text-label-md font-label-md text-tertiary">No. Surat Jalan: SJ-2024-05-188</div>
                <div className="text-headline-sm font-headline-sm text-[#172033] font-bold mt-0.5">Janji Jiwa - Gandaria City</div>
                <p className="text-xs text-tertiary mt-1">Muatan: 80L Fresh Milk & 30 Botol Sirup Aren</p>
              </div>
              {/* Resi & Logistics Partner */}
              <div className="p-3 bg-[#F5F8F6] rounded-xl space-y-2 border border-outline-variant/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-tertiary">
                    Kurir:
                    {" "}
                    <strong className="text-on-surface">Lalamove Chilled Van</strong>
                  </span>
                  <span className="text-tertiary">
                    No. Resi:
                    {" "}
                    <strong className="text-on-surface">LLM-89104-JKT</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span className="material-symbols-outlined text-[16px] animate-pulse">timer</span>
                  <span>Estimasi Tiba: Hari ini, 14:15 WIB (~35 Menit lagi)</span>
                </div>
              </div>
              {/* Action Link */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <a className="text-primary hover:underline font-semibold flex items-center gap-1" href="#lacak-sj1">
                  <span>Lacak GPS Kurir</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                <button className="text-tertiary hover:text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">print</span>
                  <span>Cetak SJ</span>
                </button>
              </div>
            </div>
            {/* Surat Jalan 2: Sedang Dikirim ke Titik Temu Coffee */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4 hover:border-primary/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20">
                  Dalam Perjalanan (On-Delivery)
                </span>
                <span className="text-xs text-tertiary">Armada Mandiri</span>
              </div>
              <div>
                <div className="text-label-md font-label-md text-tertiary">No. Surat Jalan: SJ-2024-05-189</div>
                <div className="text-headline-sm font-headline-sm text-[#172033] font-bold mt-0.5">Titik Temu Coffee - SCBD</div>
                <p className="text-xs text-tertiary mt-1">Muatan: 40 Kg Specialty Beans House Blend</p>
              </div>
              {/* Resi & Logistics Partner */}
              <div className="p-3 bg-[#F5F8F6] rounded-xl space-y-2 border border-outline-variant/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-tertiary">
                    Kurir:
                    {" "}
                    <strong className="text-on-surface">Armada PT Tani Makmur (B 9214 PXZ)</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span className="material-symbols-outlined text-[16px] animate-pulse">timer</span>
                  <span>Estimasi Tiba: Hari ini, 15:00 WIB (~1 Jam 20 Menit)</span>
                </div>
              </div>
              {/* Action Link */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <a className="text-primary hover:underline font-semibold flex items-center gap-1" href="#lacak-sj2">
                  <span>Hubungi Driver Mandiri</span>
                  <span className="material-symbols-outlined text-[14px]">phone</span>
                </a>
                <button className="text-tertiary hover:text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">print</span>
                  <span>Cetak SJ</span>
                </button>
              </div>
            </div>
            {/* Surat Jalan 3: Selesai / Terkirim ke Anomali Coffee */}
            <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4 hover:border-primary/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20">
                  Terkirim & Diterima Gerai
                </span>
                <span className="text-xs text-tertiary">Selesai 10:45 WIB</span>
              </div>
              <div>
                <div className="text-label-md font-label-md text-tertiary">No. Surat Jalan: SJ-2024-05-186</div>
                <div className="text-headline-sm font-headline-sm text-[#172033] font-bold mt-0.5">Anomali Coffee - Kemang</div>
                <p className="text-xs text-tertiary mt-1">Muatan: 100 Kg Arabika Mandheling & 5 Karton Cup</p>
              </div>
              {/* Resi & Logistics Partner */}
              <div className="p-3 bg-[#F5F8F6] rounded-xl space-y-2 border border-outline-variant/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-tertiary">
                    Penerima:
                    {" "}
                    <strong className="text-on-surface">Rudi (Store Manager)</strong>
                  </span>
                  <span className="text-xs text-primary font-bold">BA Serah Terima OK</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-tertiary">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  <span>Telah ditandatangani digital via Aplikasi BAPER Kasir</span>
                </div>
              </div>
              {/* Action Link */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <a className="text-primary hover:underline font-semibold flex items-center gap-1" href="#faktur-sj3">
                  <span>Lihat Faktur & Tanda Terima</span>
                  <span className="material-symbols-outlined text-[14px]">receipt</span>
                </a>
                <button className="text-tertiary hover:text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  <span>Unduh PDF</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
