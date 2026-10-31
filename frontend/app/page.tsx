import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "BAPER - Bantu Pesan dan Rekap | Solusi Digital Rantai Pasok & POS F&B",
};

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-fixed">
      <header className="w-full sticky top-0 z-50 bg-surface-container-lowest shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-8">
            <Link
              className="text-headline-md font-headline-md font-extrabold text-primary flex items-center gap-2 tracking-tight"
              href="/"
            >
              <span className="w-8 h-8 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md font-extrabold text-headline-sm">
                B
              </span>{" "}
              BAPER
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a
                className="text-primary font-bold border-b-2 border-primary py-1 text-label-lg font-label-lg transition-colors duration-150"
                href="#fitur"
              >
                Fitur Solusi
              </a>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors duration-150 py-1 text-label-lg font-label-lg"
                href="#"
              >
                Harga & Paket
              </a>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors duration-150 py-1 text-label-lg font-label-lg"
                href="#"
              >
                Bantuan
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="hidden sm:inline-flex items-center justify-center px-3 py-2.5 text-primary font-label-lg text-label-lg hover:underline underline-offset-4"
              href="/login"
            >
              Masuk
            </Link>
            <Link
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-secondary-fixed/30 hover:border-primary transition-all duration-150"
              href="/daftar"
            >
              Daftar Akun Baru
            </Link>
            <a
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary shadow-sm active:scale-[0.99] transition-all duration-150"
              href="#"
            >
              Hubungi Sales
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-surface-container-low to-background">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Hero */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/70 border border-secondary/20 text-on-secondary-fixed font-label-sm text-label-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Platform Rantai Pasok F&B
                  #1 untuk UMKM Indonesia
                </div>
                <h1 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl text-on-background tracking-tight">
                  Otomasi Pesanan, Kelola Rantai Pasok F&B, dan Rekap Transaksi Tanpa Ribet
                </h1>
                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  Integrasi tanpa celah dari Pemasok Bahan Baku, Dapur & Barista, Kasir POS, hingga WhatsApp
                  AI Assistant. Kendalikan omset harian dan HPP gramasi akurat dalam satu dasbor pintar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    className="h-12 px-6 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary active:scale-[0.98] transition-all shadow-sm"
                    href="/daftar"
                  >
                    <span className="material-symbols-outlined text-[20px]" data-icon="rocket_launch">
                      rocket_launch
                    </span>{" "}
                    Daftar Sekarang - Gratis Uji Coba
                  </Link>
                  <a
                    className="h-12 px-6 rounded-2xl border border-outline-variant bg-surface-container-lowest text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-secondary-fixed/20 hover:border-primary transition-all"
                    href="#cara-kerja"
                  >
                    <span
                      className="material-symbols-outlined text-[20px] text-primary"
                      data-icon="play_circle"
                    >
                      play_circle
                    </span>{" "}
                    Lihat Demo SCM
                  </a>
                </div>
                {/* Quick Trust Bullets */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/40">
                  <div>
                    <p className="text-headline-md font-headline-md text-primary">99.8%</p>
                    <p className="text-body-sm font-body-sm text-tertiary">Akurasi Stok Resep</p>
                  </div>
                  <div>
                    <p className="text-headline-md font-headline-md text-primary">{"<"} 3 Detik</p>
                    <p className="text-body-sm font-body-sm text-tertiary">QRIS Kasir Selesai</p>
                  </div>
                  <div>
                    <p className="text-headline-md font-headline-md text-primary">2.400+</p>
                    <p className="text-body-sm font-body-sm text-tertiary">Outlet F&B Aktif</p>
                  </div>
                </div>
              </div>
              {/* Interactive Mock Dashboard Preview */}
              <div className="lg:col-span-5 relative">
                <div className="relative bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/60 shadow-lg space-y-5">
                  {/* Header bar dasbor mock */}
                  <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary font-headline-sm font-headline-sm">
                        <span className="material-symbols-outlined text-[20px]" data-icon="storefront">
                          storefront
                        </span>
                      </div>
                      <div>
                        <h4 className="text-headline-sm font-headline-sm text-on-surface">
                          Kopi Senja Nusantara
                        </h4>
                        <p className="text-label-sm font-label-sm text-tertiary">
                          Outlet Sudirman • Shift Pagi Aktif
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-label-sm font-label-sm border border-primary/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Terhubung Live
                    </span>
                  </div>
                  {/* KPI Metric Card */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-1">
                      <p className="text-label-md font-label-md text-tertiary">Omset Hari Ini</p>
                      <p className="text-headline-md font-headline-md text-on-surface">Rp 8.420.000</p>
                      <div className="inline-flex items-center gap-1 text-label-sm font-label-sm text-primary font-semibold">
                        <span className="material-symbols-outlined text-[14px]" data-icon="trending_up">
                          trending_up
                        </span>{" "}
                        +18.4% vs kemarin
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-1">
                      <p className="text-label-md font-label-md text-tertiary">Margin HPP Riil</p>
                      <p className="text-headline-md font-headline-md text-on-surface">64.2%</p>
                      <div className="inline-flex items-center gap-1 text-label-sm font-label-sm text-primary font-semibold">
                        <span className="material-symbols-outlined text-[14px]" data-icon="check_circle">
                          check_circle
                        </span>{" "}
                        Sesuai Budget
                      </div>
                    </div>
                  </div>
                  {/* Real-time Supplier PO Status Card */}
                  <div className="p-4 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-label-md font-label-md text-on-surface flex items-center gap-1.5">
                        <span
                          className="material-symbols-outlined text-primary text-[18px]"
                          data-icon="local_shipping"
                        >
                          local_shipping
                        </span>{" "}
                        Pengadaan Bahan Baku Otomatis
                      </span>
                      <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-medium">
                        Auto-PO Dispatched
                      </span>
                    </div>
                    <div className="space-y-2 text-body-sm font-body-sm">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low/60">
                        <span>Susu Fresh Milk (30 L)</span>
                        <span className="text-primary font-semibold text-label-sm font-label-sm">
                          Tiba 14:00 WIB
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low/60">
                        <span>Biji Kopi Arabika House (10 Kg)</span>
                        <span className="text-tertiary font-semibold text-label-sm font-label-sm">
                          Dikonfirmasi Supplier
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* WhatsApp AI Notification Widget */}
                  <div className="p-3.5 rounded-2xl bg-secondary-fixed/40 border border-secondary/20 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]" data-icon="chat">
                        chat
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <p className="text-label-sm font-label-sm text-primary font-bold">
                          WhatsApp Gemini Assistant
                        </p>
                        <span className="text-[10px] text-tertiary">1 mnt lalu</span>
                      </div>
                      <p className="text-body-sm font-body-sm text-on-surface leading-snug">
                        “Pesanan 4x Iced Caramel Macchiato dari Meja 08 masuk & gramasi sirup otomatis
                        dikurangi dari gudang bar.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-10 bg-surface-container-lowest border-y border-outline-variant/30">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <p className="text-center text-label-sm font-label-sm text-tertiary tracking-wider mb-6">
              DIPERCAYA OLEH RATUSAN BRAND KULINER & JARINGAN WARALABA DI SELURUH INDONESIA
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center opacity-70">
              <div className="flex items-center justify-center font-headline-sm font-headline-sm text-tertiary tracking-tight">
                <span className="material-symbols-outlined mr-1 text-primary" data-icon="coffee">
                  coffee
                </span>{" "}
                KOPI RAKYAT
              </div>
              <div className="flex items-center justify-center font-headline-sm font-headline-sm text-tertiary tracking-tight">
                <span className="material-symbols-outlined mr-1 text-primary" data-icon="restaurant">
                  restaurant
                </span>{" "}
                Dapur Sedap Rasa
              </div>
              <div className="flex items-center justify-center font-headline-sm font-headline-sm text-tertiary tracking-tight">
                <span className="material-symbols-outlined mr-1 text-primary" data-icon="bakery_dining">
                  bakery_dining
                </span>{" "}
                ROTI OMA ID
              </div>
              <div className="flex items-center justify-center font-headline-sm font-headline-sm text-tertiary tracking-tight">
                <span className="material-symbols-outlined mr-1 text-primary" data-icon="local_bar">
                  local_bar
                </span>{" "}
                TEH NUSANTARA
              </div>
              <div className="col-span-2 md:col-span-1 flex items-center justify-center font-headline-sm font-headline-sm text-tertiary tracking-tight">
                <span className="material-symbols-outlined mr-1 text-primary" data-icon="lunch_dining">
                  lunch_dining
                </span>{" "}
                BURGER KAMPUNG
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 md:px-8 scroll-mt-24" id="fitur">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
              Arsitektur Solusi 360°
            </span>
            <h2 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl text-on-background">
              Empat Pilar Terintegrasi untuk Bisnis F&B Modern
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant">
              Tinggalkan pencatatan manual di kertas nota. BAPER menyatukan rantai pengadaan, transaksi kasir,
              automasi chat AI, dan laporan laba-rugi secara presisi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Fitur 1: Smart SCM & Otomasi Pengadaan (Span 7) */}
            <div className="md:col-span-7 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/50 shadow-sm hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[28px]" data-icon="inventory_2">
                  inventory_2
                </span>
              </div>
              <span className="text-label-sm font-label-sm text-primary font-bold">
                PILAR 01 — SUPPLY CHAIN MANAGEMENT
              </span>
              <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mt-2 mb-3">
                Smart SCM & Otomasi Pengadaan Bahan
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                Hubungkan gudang outlet langsung dengan mitra pemasok bahan baku & operasional harian. Ketika
                stok sirup atau daging mendekati batas kritis (safety stock), sistem langsung memicu Surat
                Pesanan Otomatis (Auto-PO) ke supplier pilihan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-outline-variant/30">
                <div className="flex items-start gap-2.5">
                  <span
                    className="material-symbols-outlined text-primary text-[20px]"
                    data-icon="check_circle"
                  >
                    check_circle
                  </span>
                  <span className="text-body-sm font-body-sm text-on-surface">
                    Notifikasi batas minimum stok otomatis
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span
                    className="material-symbols-outlined text-primary text-[20px]"
                    data-icon="check_circle"
                  >
                    check_circle
                  </span>
                  <span className="text-body-sm font-body-sm text-on-surface">
                    Validasi invoice pengiriman digital
                  </span>
                </div>
              </div>
            </div>
            {/* Fitur 2: POS & Distribusi Kasir Cepat (Span 5) */}
            <div className="md:col-span-5 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/50 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[28px]" data-icon="point_of_sale">
                    point_of_sale
                  </span>
                </div>
                <span className="text-label-sm font-label-sm text-primary font-bold">
                  PILAR 02 — KASIR & DAPUR
                </span>
                <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mt-2 mb-3">
                  POS & Distribusi Kasir Kilat
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Kasir modern tersinkronisasi gramasi resep, QRIS dinamis instan tanpa jeda, serta order
                  multi-channel langsung meluncur ke display kitchen barista tanpa terlewat.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-2">
                <div className="flex justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface font-semibold">QRIS Terverifikasi Otomatis</span>
                  <span className="text-primary font-bold">0.8 detik</span>
                </div>
                <div className="w-full bg-outline-variant/30 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full w-[94%]" />
                </div>
              </div>
            </div>
            {/* Fitur 3: Bot WhatsApp AI Otomatis (Span 5) */}
            <div className="md:col-span-5 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/50 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[28px]" data-icon="smart_toy">
                    smart_toy
                  </span>
                </div>
                <span className="text-label-sm font-label-sm text-primary font-bold">
                  PILAR 03 — GEMINI POWERED AI
                </span>
                <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mt-2 mb-3">
                  Bot WhatsApp AI Otomatis
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Terima pesanan takeaway atau delivery pelanggan otomatis 24/7 langsung via WhatsApp tanpa
                  memaksa pelanggan mengunduh aplikasi tambahan. AI memahami pesanan rumit dan preferensi
                  kustomisasi rasa.
                </p>
              </div>
              <div className="bg-secondary-fixed/30 p-4 rounded-2xl border border-secondary/20 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]" data-icon="forum">
                  forum
                </span>
                <p className="text-body-sm font-body-sm text-on-surface font-medium">
                  Bisa melayani {">"}500 percakapan order bersamaan tanpa antrean.
                </p>
              </div>
            </div>
            {/* Fitur 4: Laporan Keuangan & Rekap Real-time (Span 7) */}
            <div className="md:col-span-7 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/50 shadow-sm hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[28px]" data-icon="analytics">
                  analytics
                </span>
              </div>
              <span className="text-label-sm font-label-sm text-primary font-bold">
                PILAR 04 — FINANCIAL RECONCILIATION
              </span>
              <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mt-2 mb-3">
                Laporan Keuangan & Rekap Real-Time
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                Ketahui laba kotor, HPP (Harga Pokok Penjualan) presisi per porsi menu, dan pembukuan
                transparan per shift kerja. Laporan akhir hari terekap otomatis siap ekspor ke PDF dan Excel
                untuk akuntan usaha Anda.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/30">
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-tertiary">Laba Bersih Harian</p>
                  <p className="text-headline-sm font-headline-sm text-primary mt-1">Otomatis Terkalkulasi</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-tertiary">Deteksi Selisih Kasir</p>
                  <p className="text-headline-sm font-headline-sm text-on-surface mt-1">
                    Audit Toleransi Nol
                  </p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="text-label-sm font-label-sm text-tertiary">Integrasi Multi-Outlet</p>
                  <p className="text-headline-sm font-headline-sm text-on-surface mt-1">Konsolidasi 1 Klik</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="py-20 bg-surface-container-low border-y border-outline-variant/30 scroll-mt-24"
          id="cara-kerja"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm">
                Alur Kerja Tanpa Hambatan
              </span>
              <h2 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl text-on-background">
                Bagaimana Ekosistem BAPER Bekerja
              </h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant">
                Dari pasokan biji kopi di hulu hingga cangkir hangat di meja pelanggan, setiap data mengalir
                selaras secara otomatis.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/50 shadow-sm relative">
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center font-headline-lg font-headline-lg mb-6">
                  1
                </div>
                <h4 className="text-headline-md font-headline-md text-on-surface mb-2">Pemasok Bahan Baku</h4>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Pemasok menerima order pengadaan secara otomatis dari sistem BAPER saat bahan mencapai batas
                  minimum stok. Surat jalan dan faktur terarsip digital.
                </p>
                <div className="mt-6 flex items-center gap-2 text-label-sm font-label-sm text-primary font-bold">
                  <span className="material-symbols-outlined text-[18px]" data-icon="forklift">
                    forklift
                  </span>{" "}
                  Pengadaan Transparan & Terjadwal
                </div>
              </div>
              {/* Step 2 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/50 shadow-sm relative">
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center font-headline-lg font-headline-lg mb-6">
                  2
                </div>
                <h4 className="text-headline-md font-headline-md text-on-surface mb-2">
                  Merchant F&B (Outlet & Dapur)
                </h4>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Kasir memproses transaksi dengan cepat. Resep menu secara akurat memotong stok bahan baku
                  per gram. Display dapur barista menerima pesanan seketika.
                </p>
                <div className="mt-6 flex items-center gap-2 text-label-sm font-label-sm text-primary font-bold">
                  <span className="material-symbols-outlined text-[18px]" data-icon="skillet">
                    skillet
                  </span>{" "}
                  Operasional Cepat Tanpa Salah Racik
                </div>
              </div>
              {/* Step 3 */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/50 shadow-sm relative">
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center font-headline-lg font-headline-lg mb-6">
                  3
                </div>
                <h4 className="text-headline-md font-headline-md text-on-surface mb-2">Konsumen Akhir</h4>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Pelanggan memesan via meja atau WhatsApp Assistant dengan pengalaman mulus, bayar via QRIS
                  dinamis, dan menerima struk digital ramah lingkungan.
                </p>
                <div className="mt-6 flex items-center gap-2 text-label-sm font-label-sm text-primary font-bold">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="sentiment_very_satisfied"
                  >
                    sentiment_very_satisfied
                  </span>{" "}
                  Kepuasan Pelanggan Maksimal
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
              Kisah Nyata Mitra
            </span>
            <h2 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl text-on-background">
              Kata Mereka yang Bertumbuh Bersama BAPER
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testi 1 */}
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-1">
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant italic leading-relaxed">
                  “Dulu rekap 3 cabang kopi butuh waktu sampai jam 1 malam karena selalu ada selisih susu dan
                  gula. Pakai BAPER, hitungan HPP gramasi akurat 99% dan tutup buku beres dalam 10 menit!”
                </p>
              </div>
              <div className="pt-6 border-t border-outline-variant/30 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  RN
                </div>
                <div>
                  <h5 className="text-headline-sm font-headline-sm text-on-surface">Rian Nugraha</h5>
                  <p className="text-label-sm font-label-sm text-tertiary">
                    Owner Filosofi Kopi Seduh (3 Outlet)
                  </p>
                </div>
              </div>
            </div>
            {/* Testi 2 */}
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-1">
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant italic leading-relaxed">
                  “Fitur WhatsApp Bot AI sangat mengubah permainan. Pelanggan kantoran sekitar resto pesan
                  makan siang lewat chat tanpa ribet antri kasir, omset melonjak hingga 45% dalam dua bulan.”
                </p>
              </div>
              <div className="pt-6 border-t border-outline-variant/30 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  DL
                </div>
                <div>
                  <h5 className="text-headline-sm font-headline-sm text-on-surface">Dewi Lestari</h5>
                  <p className="text-label-sm font-label-sm text-tertiary">Pendiri Resto Sambal Makmur</p>
                </div>
              </div>
            </div>
            {/* Testi 3 */}
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-1">
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px]" data-icon="star" data-weight="fill">
                    star
                  </span>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant italic leading-relaxed">
                  “Fitur SCM otomatis langsung terhubung ke suplier daging dan keju kami. Tidak ada lagi
                  cerita kehabisan bahan saat jam makan malam ramai. Sangat direkomendasikan untuk UMKM.”
                </p>
              </div>
              <div className="pt-6 border-t border-outline-variant/30 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  BA
                </div>
                <div>
                  <h5 className="text-headline-sm font-headline-sm text-on-surface">Bagas Adiputra</h5>
                  <p className="text-label-sm font-label-sm text-tertiary">Co-Founder Burger & Shake Urban</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-20 max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-primary-container text-on-primary rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                Uji Coba 14 Hari Tanpa Kartu Kredit
              </span>
              <h2 className="text-headline-xl-mobile md:text-headline-xl font-headline-xl tracking-tight text-on-primary">
                Siap Membawa Bisnis F&B Anda Naik Kelas dan Bebas Pusing Rekap?
              </h2>
              <p className="text-body-lg font-body-lg text-secondary-fixed leading-relaxed">
                Bergabunglah dengan ribuan merchant kuliner sukses di Indonesia yang telah mengotomasi rantai
                pasok dan kasirnya hari ini bersama BAPER.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  className="h-12 px-8 rounded-2xl bg-surface-container-lowest text-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-secondary-fixed active:scale-[0.98] transition-all shadow-md"
                  href="/daftar"
                >
                  Daftar Akun BAPER Sekarang
                </Link>
                <a
                  className="h-12 px-8 rounded-2xl border border-secondary-fixed text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary transition-all"
                  href="#"
                >
                  Konsultasi dengan Ahli SCM
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter separator />
    </div>
  );
}
