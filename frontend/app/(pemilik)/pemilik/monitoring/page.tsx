import type { Metadata } from "next";
import SegmentedControl from "@/components/ui/SegmentedControl";
import ActivityTable from "@/components/pemilik/ActivityTable";

export const metadata: Metadata = { title: "Monitoring Rantai Pasok | BAPER" };

export default function MonitoringPage() {
  return (
    <>
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary">
              <span
                className="material-symbols-outlined text-[26px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_tree
              </span>
            </div>
            <div>
              <h1 className="text-headline-md font-headline-md font-bold text-on-surface">
                Monitoring & Visualisasi Alur Rantai Pasok (SCM) FNB
              </h1>
              <p className="text-body-sm font-body-sm text-tertiary">
                Visualisasi komprehensif alur pengadaan pemasok, kontrol penerimaan pemilik gerai, dapur
                produksi, hingga saluran distribusi pelanggan.
              </p>
            </div>
          </div>
        </div>
        {/* Controls: Filter & Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <SegmentedControl
            variant="period"
            options={["Hari Ini", "Minggu Ini", "Bulan Ini"]}
            defaultValue="Hari Ini"
            ariaLabel="Periode monitoring"
          />
          <button className="flex items-center gap-2 bg-[#E8F3EC] text-primary border border-primary/30 px-4 py-2 rounded-xl text-label-md font-label-md hover:bg-secondary-container transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Simulasikan Alur</span>
          </button>
          <button className="flex items-center gap-2 bg-primary-container text-surface-container-lowest px-4 py-2 rounded-xl text-label-md font-label-md hover:bg-primary transition-all active:scale-[0.98] shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor Laporan SCM</span>
          </button>
        </div>
      </div>
      {/* 2. 4 KARTU RINGKASAN OPERASIONAL SCM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Pesanan Pasokan Aktif */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-label-md font-label-md text-tertiary">Pesanan Pasokan Aktif</span>
              <span className="text-headline-lg font-headline-lg text-on-surface mt-1">8 Permintaan</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-body-sm font-body-sm">
            <span className="text-tertiary">Nilai Total Pengadaan:</span>
            <span className="font-bold text-primary">Rp 14.250.000</span>
          </div>
        </div>
        {/* Card 2: Stok Bahan Baku Kritis */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-error/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between bg-gradient-to-br from-white to-error-container/10">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-label-md font-label-md text-tertiary">Stok Bahan Baku Kritis</span>
              <span className="text-headline-lg font-headline-lg text-error mt-1">4 Bahan Baku</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-error-container/70 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-body-sm font-body-sm">
            <span className="text-tertiary">Tindakan Diperlukan:</span>
            <span className="font-bold text-error bg-error-container/60 px-2.5 py-0.5 rounded-full text-label-sm">
              Perlu PO Segera
            </span>
          </div>
        </div>
        {/* Card 3: Produksi Berlangsung */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-label-md font-label-md text-tertiary">Produksi Berlangsung</span>
              <span className="text-headline-lg font-headline-lg text-on-surface mt-1">12 Batch</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">restaurant</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-body-sm font-body-sm">
            <span className="text-tertiary">Lokasi Dapur:</span>
            <span className="font-semibold text-on-surface">Kitchen & Barista Senopati</span>
          </div>
        </div>
        {/* Card 4: Pesanan Konsumen Aktif */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-label-md font-label-md text-tertiary">Pesanan Konsumen Aktif</span>
              <span className="text-headline-lg font-headline-lg text-primary mt-1">46 Pesanan</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-secondary-container/70 flex items-center justify-center text-primary">
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                receipt_long
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-body-sm font-body-sm">
            <span className="text-tertiary">Kanal Utama:</span>
            <span className="font-semibold text-primary">Kasir & WhatsApp Bot</span>
          </div>
        </div>
      </div>
      {/* 3. FOKUS UTAMA: DIAGRAM ALUR UTAMA SCM (MEGAH, BESAR, TIDAK TERPOTONG) */}
      <section className="bg-surface-container-lowest rounded-2xl p-7 border border-[#94B9A9]/50 shadow-[0_8px_30px_-4px_rgba(0,95,53,0.08)] flex flex-col gap-6">
        {/* Header Diagram */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-surface-container-lowest flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[24px]">route</span>
            </div>
            <div>
              <h2 className="text-headline-md font-headline-md font-bold text-on-surface">
                Diagram Alur Rantai Pasok FNB Terintegrasi (End-to-End)
              </h2>
              <p className="text-body-sm font-body-sm text-tertiary">
                Pelacakan linier 5 tahapan pergerakan fisik & data rantai pasok secara real-time dari mitra
                pemasok hingga pelanggan akhir.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-label-sm font-label-sm bg-[#E8F3EC] text-primary px-3 py-1.5 rounded-full font-bold border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Sinkronisasi Real-Time (Live)
            </span>
            <button
              className="flex items-center gap-1.5 text-label-sm font-label-sm text-tertiary hover:text-primary px-2.5 py-1.5 rounded-lg border border-outline-variant/40 hover:bg-[#F5F8F6] transition-colors"
              title="Mode Tampilan Penuh"
            >
              <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              <span>Perluas</span>
            </button>
          </div>
        </div>
        {/* HORIZONTAL 5-STAGE PIPELINE (MEGAH, RESIK & SEIMBANG) */}
        <div className="w-full overflow-x-auto pb-4 pt-2 custom-scrollbar">
          <div className="min-w-[1340px] grid grid-cols-5 gap-3 items-stretch relative px-1">
            {/* ==================== TAHAP 1 ==================== */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 border-2 border-[#94B9A9] shadow-sm hover:border-primary transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-md border border-outline-variant/30">
                    Tahap 01
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-primary font-bold">
                    2 Pemasok Aktif
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] group-hover:bg-primary group-hover:text-surface-container-lowest transition-colors flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                  </div>
                  <div>
                    <h3 className="text-label-lg font-label-lg font-bold text-on-surface leading-snug">
                      Pemasok Bahan Baku & Operasional
                    </h3>
                    <span className="text-[11px] text-tertiary">Petani & Manufaktur</span>
                  </div>
                </div>
                <p className="text-body-sm font-body-sm text-tertiary leading-relaxed mb-3">
                  Pengiriman biji kopi, dairy segar, sirup perisa, serta karton & cup kemasan ramah
                  lingkungan.
                </p>
                <div className="bg-[#F5F8F6] p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-1.5 mb-3 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Mitra Utama:</span>
                    <span className="font-bold text-on-surface">PT Tani Makmur</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Kemasan:</span>
                    <span className="font-bold text-on-surface">Sentra Kemasan Food</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                    <span className="text-tertiary">Status PO:</span>
                    <span className="text-primary font-bold">PO-2025-089 (Di Jalan)</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/30 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-1.5 text-primary bg-[#E8F3EC] hover:bg-secondary-container text-label-sm font-label-sm font-bold py-2 rounded-xl transition-colors">
                  <span>Buka Detail Tahapan</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
            {/* ==================== TAHAP 2 (PUSAT KONTROL / EMPHASIS) ==================== */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 border-[3px] border-primary center-control-glow transition-all flex flex-col justify-between relative bg-gradient-to-b from-white to-[#F0F8F3]">
              {/* Pusat Kendali Ribbon / Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-surface-container-lowest text-[10px] font-bold tracking-wider uppercase px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </span>
                <span>Pusat Kendali Operasional</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3 mt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-md border border-primary/20">
                    Tahap 02 (Inti)
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary text-surface-container-lowest font-bold">
                    Merchant Hub
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-primary text-surface-container-lowest flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">storefront</span>
                  </div>
                  <div>
                    <h3 className="text-label-lg font-label-lg font-bold text-primary leading-snug">
                      Pemilik Bisnis FNB
                    </h3>
                    <span className="text-[11px] text-primary/80 font-semibold">
                      Gudang & Manajemen Gerai
                    </span>
                  </div>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface leading-relaxed mb-3">
                  Kontrol stok masuk, verifikasi standar QC suhu bahan dingin, approval PO darurat, dan
                  kalkulasi HPP otomatis.
                </p>
                <div className="bg-white p-3 rounded-xl border border-primary/30 shadow-sm flex flex-col gap-1.5 mb-3 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Lokasi Buffer:</span>
                    <span className="font-bold text-on-surface">Gudang Senopati #04</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">QC Penerimaan:</span>
                    <span className="font-bold text-primary">Suhu 3.8°C (Aman)</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                    <span className="text-tertiary">Approval HPP:</span>
                    <span className="text-primary font-bold">Margin Resep 68.4%</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-primary/20 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-1.5 bg-primary text-surface-container-lowest hover:bg-primary-container text-label-sm font-label-sm font-bold py-2 rounded-xl transition-all shadow-sm">
                  <span>Buka Detail Tahapan</span>
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
            {/* ==================== TAHAP 3 ==================== */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 border-2 border-[#94B9A9] shadow-sm hover:border-primary transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-md border border-outline-variant/30">
                    Tahap 03
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-primary font-bold">
                    12 Batch Aktif
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] group-hover:bg-primary group-hover:text-surface-container-lowest transition-colors flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">restaurant</span>
                  </div>
                  <div>
                    <h3 className="text-label-lg font-label-lg font-bold text-on-surface leading-snug">
                      Produksi (Kitchen & Barista)
                    </h3>
                    <span className="text-[11px] text-tertiary">Oven & Espresso Station</span>
                  </div>
                </div>
                <p className="text-body-sm font-body-sm text-tertiary leading-relaxed mb-3">
                  Pengolahan bahan mentah jadi sajian minuman & pastry sesuai gramasi resep SOP yang presisi.
                </p>
                <div className="bg-[#F5F8F6] p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-1.5 mb-3 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Barista Station:</span>
                    <span className="font-bold text-on-surface">Espresso Bar #04</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Dapur Pastry:</span>
                    <span className="font-bold text-on-surface">Croissant Batch #03</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                    <span className="text-tertiary">Kepatuhan Resep:</span>
                    <span className="text-primary font-bold">99.2% Akurat</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/30 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-1.5 text-primary bg-[#E8F3EC] hover:bg-secondary-container text-label-sm font-label-sm font-bold py-2 rounded-xl transition-colors">
                  <span>Buka Detail Tahapan</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
            {/* ==================== TAHAP 4 ==================== */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 border-2 border-[#94B9A9] shadow-sm hover:border-primary transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-md border border-outline-variant/30">
                    Tahap 04
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E8F3EC] text-primary font-bold">
                    3 Kanal Siap
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] group-hover:bg-primary group-hover:text-surface-container-lowest transition-colors flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">point_of_sale</span>
                  </div>
                  <div>
                    <h3 className="text-label-lg font-label-lg font-bold text-on-surface leading-snug">
                      Distribusi (Kasir & Delivery)
                    </h3>
                    <span className="text-[11px] text-tertiary">POS & Smart Logistic</span>
                  </div>
                </div>
                <p className="text-body-sm font-body-sm text-tertiary leading-relaxed mb-3">
                  Penerusan produk jadi ke antrean kasir kas, kurir takeaway, dan pengiriman armada dingin ke
                  pemesan.
                </p>
                <div className="bg-[#F5F8F6] p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-1.5 mb-3 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Kasir Gerai:</span>
                    <span className="font-bold text-on-surface">POS Senopati #01</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">WhatsApp AI:</span>
                    <span className="font-bold text-on-surface">Bot AI Auto-Order</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                    <span className="text-tertiary">Armada Antar:</span>
                    <span className="text-primary font-bold">Lalamove Chilled Van</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/30 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-1.5 text-primary bg-[#E8F3EC] hover:bg-secondary-container text-label-sm font-label-sm font-bold py-2 rounded-xl transition-colors">
                  <span>Buka Detail Tahapan</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
            {/* ==================== TAHAP 5 ==================== */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 border-2 border-[#94B9A9] shadow-sm hover:border-primary transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-md border border-outline-variant/30">
                    Tahap 05
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
                    98% Kepuasan
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] group-hover:bg-primary group-hover:text-surface-container-lowest transition-colors flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">sentiment_satisfied</span>
                  </div>
                  <div>
                    <h3 className="text-label-lg font-label-lg font-bold text-on-surface leading-snug">
                      Konsumen Akhir
                    </h3>
                    <span className="text-[11px] text-tertiary">Dine-in, Takeaway, WA</span>
                  </div>
                </div>
                <p className="text-body-sm font-body-sm text-tertiary leading-relaxed mb-3">
                  Penerimaan santapan segar oleh pelanggan, verifikasi status transaksi lunas, serta feedback
                  rasa.
                </p>
                <div className="bg-[#F5F8F6] p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-1.5 mb-3 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Total Hari Ini:</span>
                    <span className="font-bold text-on-surface">148 Transaksi</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Status Bayar:</span>
                    <span className="font-bold text-primary">100% Lunas (QRIS/Cash)</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                    <span className="text-tertiary">Rating Rata-rata:</span>
                    <span className="text-primary font-bold">4.9 / 5.0 Bintang</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/30 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-1.5 text-primary bg-[#E8F3EC] hover:bg-secondary-container text-label-sm font-label-sm font-bold py-2 rounded-xl transition-colors">
                  <span>Buka Detail Tahapan</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
          </div>
          {/* CONNECTOR BADGES ROW (LABELED FLOW ARROWS) */}
          <div className="min-w-[1340px] grid grid-cols-4 gap-4 mt-4 px-3">
            {/* Label 1 -> 2 */}
            <div className="flex items-center justify-center gap-2 bg-[#F5F8F6] border border-[#94B9A9]/50 rounded-xl py-2 px-3 shadow-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">shopping_cart</span>
              <span className="text-[11px] font-bold text-primary">
                Permintaan Pembelian & Pengiriman Bahan
              </span>
              <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
            </div>
            {/* Label 2 -> 3 */}
            <div className="flex items-center justify-center gap-2 bg-[#E8F3EC] border border-primary/30 rounded-xl py-2 px-3 shadow-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">inventory_2</span>
              <span className="text-[11px] font-bold text-primary">Penerimaan Stok & Requisition Dapur</span>
              <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
            </div>
            {/* Label 3 -> 4 */}
            <div className="flex items-center justify-center gap-2 bg-[#F5F8F6] border border-[#94B9A9]/50 rounded-xl py-2 px-3 shadow-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">coffee</span>
              <span className="text-[11px] font-bold text-primary">Produk Jadi Siap Saji</span>
              <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
            </div>
            {/* Label 4 -> 5 */}
            <div className="flex items-center justify-center gap-2 bg-[#F5F8F6] border border-[#94B9A9]/50 rounded-xl py-2 px-3 shadow-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">delivery_dining</span>
              <span className="text-[11px] font-bold text-primary">Distribusi Pesanan ke Pelanggan</span>
              <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
            </div>
          </div>
        </div>
        {/* METRIK INTEGRASI ALUR SCM (BOTTOM STRIP OF DIAGRAM) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-outline-variant/30 bg-[#F5F8F6] p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">speed</span>
            <div>
              <div className="text-label-sm font-label-sm text-tertiary">
                Waktu Siklus Pesanan (Order-to-Cup)
              </div>
              <div className="text-body-md font-body-md font-bold text-on-surface">6.4 Menit / Pesanan</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
            <div>
              <div className="text-label-sm font-label-sm text-tertiary">Kepatuhan Resep & Gramasi SOP</div>
              <div className="text-body-md font-body-md font-bold text-primary">99.2% Sesuai Standar</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">delete_sweep</span>
            <div>
              <div className="text-label-sm font-label-sm text-tertiary">
                Tingkat Susut Bahan Baku (Waste)
              </div>
              <div className="text-body-md font-body-md font-bold text-primary">0.8% (Target {"<"} 2%)</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">monetization_on</span>
            <div>
              <div className="text-label-sm font-label-sm text-tertiary">Rata-rata Margin Kotor Gerai</div>
              <div className="text-body-md font-body-md font-bold text-on-surface">68.4% Gross Margin</div>
            </div>
          </div>
        </div>
      </section>
      {/* 4. PANEL DETAIL TAHAPAN OPERASIONAL (INTERAKTIF & FLEKSIBEL) */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">tune</span>
            </div>
            <div>
              <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                Panel Detail Operasional Tahapan: Produksi & Bahan Baku Kritis
              </h2>
              <p className="text-body-sm font-body-sm text-tertiary">
                Rincian pantauan langsung station barista, kitchen resep, dan stok siaga Senopati.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-label-sm bg-[#E8F3EC] text-primary px-3 py-1 rounded-full font-bold">
              Shift Pagi (07.00 - 15.00 WIB)
            </span>
            <button className="text-primary hover:bg-[#E8F3EC] p-2 rounded-xl border border-primary/20 text-label-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>Riwayat Shift</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Peringatan Stok Kritis (4 Cols) */}
          <div className="lg:col-span-4 bg-error-container/30 border border-error/30 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-error text-[26px]">notification_important</span>
              <div>
                <h3 className="text-label-lg font-label-lg font-bold text-error">
                  Peringatan Stok Biji Kopi Kritis!
                </h3>
                <span className="text-[11px] text-tertiary">Batas Ambang Minimum Terlampaui</span>
              </div>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface leading-relaxed">
              Sisa <strong className="text-error font-bold">Espresso Blend Arabika Lintong</strong> di station
              barista tersisa <strong className="text-error font-bold">1.8 Kg</strong> (Ambang batas aman
              operasional: 5.0 Kg). Estimasi habis dalam 3 jam ke depan.
            </p>
            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-error/20 flex flex-col gap-2">
              <div className="flex justify-between text-label-sm">
                <span className="text-tertiary">Konsumsi Rata-rata:</span>
                <span className="font-bold text-on-surface">0.9 Kg / Jam</span>
              </div>
              <div className="flex justify-between text-label-sm">
                <span className="text-tertiary">Pemasok Default:</span>
                <span className="font-bold text-on-surface">PT Tani Makmur Sejahtera</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-surface-container-lowest px-4 py-2.5 rounded-xl text-label-md font-label-md font-bold hover:bg-primary-container transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>+ Buat PO Darurat ke PT Tani Makmur</span>
            </button>
          </div>
          {/* Pemakaian Bahan Baku & Output (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-label-md font-label-md font-bold text-on-surface">
                Status Pemakaian 4 Komponen Bahan Utama Hari Ini:
              </span>
              <span className="text-label-sm font-label-sm text-tertiary">
                Penanggung Jawab: Andi Pratama (Head Barista) & Rina S. (Baker)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Item 1 */}
              <div className="bg-[#F5F8F6] p-4 rounded-xl border border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-error-container/60 text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">coffee</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-label-md">Biji Kopi Arabika Lintong</div>
                    <div className="text-[11px] text-tertiary">Standar 18g / double shot</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-error">4.2 Kg Digunakan</div>
                  <div className="text-[11px] text-error font-semibold">Tersisa 1.8 Kg (Kritis)</div>
                </div>
              </div>
              {/* Item 2 */}
              <div className="bg-[#F5F8F6] p-4 rounded-xl border border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">water_drop</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-label-md">
                      Susu Segar Pasteurisasi (Greenfields)
                    </div>
                    <div className="text-[11px] text-tertiary">Takaran 150ml / cappuccino</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-on-surface">28 Liter Digunakan</div>
                  <div className="text-[11px] text-primary font-bold">Stok Aman (14L)</div>
                </div>
              </div>
              {/* Item 3 */}
              <div className="bg-[#F5F8F6] p-4 rounded-xl border border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">bakery_dining</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-label-md">
                      Adonan Butter Croissant Mentah
                    </div>
                    <div className="text-[11px] text-tertiary">Proofing 30 Menit, Oven 180°C</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-on-surface">36 Porsi Terbakar</div>
                  <div className="text-[11px] text-primary font-bold">32 Siap Display</div>
                </div>
              </div>
              {/* Item 4 */}
              <div className="bg-[#F5F8F6] p-4 rounded-xl border border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">liquor</span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-label-md">Sirup Karamel Monin Premium</div>
                    <div className="text-[11px] text-tertiary">Pompa dosis 15ml / cup</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-on-surface">1.2 Liter Terpakai</div>
                  <div className="text-[11px] text-primary font-bold">Sisa 3.8 Botol</div>
                </div>
              </div>
            </div>
            {/* HPP Footer */}
            <div className="bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-body-sm text-tertiary">
                <span className="material-symbols-outlined text-primary text-[18px]">receipt</span>
                <span>Total Estimasi Akumulasi HPP Batch Kitchen Pagi:</span>
              </div>
              <span className="text-headline-sm font-headline-sm font-bold text-primary">Rp 1.185.000</span>
            </div>
          </div>
        </div>
      </section>
      {/* 5. TATA KELOLA PLATFORM BAPER SCM (TERPISAH DARI ALUR FISIK BARANG) */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-outline-variant/30 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">hub</span>
              <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                Struktur Tata Kelola Platform BAPER SCM
              </h2>
            </div>
            <p className="text-body-sm font-body-sm text-tertiary mt-0.5">
              Pusat pengawasan sistem multi-entitas BAPER menghubungkan Super Admin, Pemilik Bisnis F&B, Mitra
              Pemasok, dan Konsumen.
            </p>
          </div>
          {/* Label Penjelas Mandat Super Admin */}
          <div className="flex items-center gap-2 bg-[#E8F3EC] border border-primary/20 text-primary px-3 py-1.5 rounded-xl text-label-sm font-bold">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>
              Super Admin: Pengelola Hak Akses, Gateway & Audit Sistem (Bukan Perantara Fisik Barang)
            </span>
          </div>
        </div>
        {/* Tree / Governance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-stretch">
          {/* Super Admin BAPER */}
          <div className="bg-gradient-to-b from-[#E8F3EC]/80 to-[#F5F8F6] p-5 rounded-2xl border-2 border-primary/50 flex flex-col justify-between shadow-sm relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-primary text-surface-container-lowest flex items-center justify-center mb-3 shadow-md">
                <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-surface-container-lowest px-2.5 py-0.5 rounded-full border border-primary/20">
                Pusat Sistem Platform
              </span>
              <h3 className="text-label-lg font-label-lg text-on-surface font-bold mt-2">
                Super Admin BAPER
              </h3>
              <p className="text-body-sm font-body-sm text-tertiary mt-2">
                Mengatur validasi legal merchant F&B, audit integritas log data transaksi, koneksi WhatsApp
                Cloud API, dan billing platform.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-primary/20 w-full flex items-center justify-center gap-1.5 text-[11px] font-bold text-primary">
              <span className="material-symbols-outlined text-[16px]">security</span>
              <span>Akses & Audit Seluruh Tenant</span>
            </div>
          </div>
          {/* Entity 1: Pemilik Bisnis FNB */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">store</span>
                </div>
                <div>
                  <h4 className="text-label-md font-label-md text-on-surface font-bold">
                    Pemilik Bisnis FNB
                  </h4>
                  <span className="text-[11px] text-tertiary">Merchant & Manajer Gerai</span>
                </div>
              </div>
              <ul className="text-body-sm font-body-sm text-tertiary flex flex-col gap-2 mb-3">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Kontrol HPP & SOP Resep Bahan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Otorisasi Purchase Order (PO)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Rekapitulasi Arus Kas Gerai</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 border-t border-outline-variant/20 text-label-sm font-label-sm text-primary font-bold">
              Level Akses: Merchant Admin
            </div>
          </div>
          {/* Entity 2: Mitra Pemasok */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">local_shipping</span>
                </div>
                <div>
                  <h4 className="text-label-md font-label-md text-on-surface font-bold">Mitra Pemasok</h4>
                  <span className="text-[11px] text-tertiary">Petani, Pabrik, Distributor</span>
                </div>
              </div>
              <ul className="text-body-sm font-body-sm text-tertiary flex flex-col gap-2 mb-3">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Penerimaan PO via WA & Portal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Update Resi & Status Armada</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Penagihan Invoice Digital</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 border-t border-outline-variant/20 text-label-sm font-label-sm text-primary font-bold">
              Level Akses: Portal Supplier
            </div>
          </div>
          {/* Entity 3: Konsumen Akhir */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">person</span>
                </div>
                <div>
                  <h4 className="text-label-md font-label-md text-on-surface font-bold">Konsumen Akhir</h4>
                  <span className="text-[11px] text-tertiary">Dine-in, Takeaway & WA</span>
                </div>
              </div>
              <ul className="text-body-sm font-body-sm text-tertiary flex flex-col gap-2 mb-3">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Pemesanan Menu via Bot WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Pembayaran QRIS & e-Wallet</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                  <span>Feedback Rasa & Poin Loyalitas</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 border-t border-outline-variant/20 text-label-sm font-label-sm text-primary font-bold">
              Level Akses: Public Customer API
            </div>
          </div>
        </div>
      </section>
      {/* 6. Aktivitas alur SCM real-time (data: components/pemilik/ActivityTable.tsx) */}
      <ActivityTable />
    </>
  );
}
