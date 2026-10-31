import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = { title: "Daftar Akun Baru | BAPER" };

export default function DaftarPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
      <header className="w-full bg-surface-container-lowest sticky top-0 z-50 shadow-sm border-b border-[rgba(148,185,169,0.25)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo Anchor */}
          <Link className="flex items-center gap-2 group" href="/">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm transition-transform group-hover:scale-95 duration-150">
              <span className="material-symbols-outlined text-2xl" data-icon="receipt_long">receipt_long</span>
            </div>
            <div>
              <span className="text-headline-md font-headline-md font-extrabold text-primary tracking-tight block leading-none">
                BAPER
              </span>
              <span className="text-label-sm font-label-sm text-secondary tracking-wider block mt-0.5">Bantu Pesan & Rekap</span>
            </div>
          </Link>
          {/* Trailing Action */}
          <div className="flex items-center gap-2">
            <span className="text-body-md font-body-md text-on-surface-variant hidden sm:inline">Sudah punya akun?</span>
            <Link className="text-label-lg font-label-lg text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E8F3EC] hover:bg-secondary-container" href="/login">
              <span>Masuk di sini</span>
              <span className="material-symbols-outlined text-base" data-icon="arrow_forward">arrow_forward</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Hero Pitch Banner */}
            <div className="bg-gradient-to-br from-surface-container-lowest to-[#E8F3EC] p-6 sm:p-8 rounded-2xl border border-[rgba(148,185,169,0.35)] shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm mb-4">
                <span className="material-symbols-outlined text-sm" data-icon="bolt">bolt</span>
                <span>Platform Operasional Bisnis F&B Terpadu</span>
              </div>
              <h1 className="text-headline-lg font-headline-lg text-on-surface mb-3 tracking-tight">Mulai kelola pesanan & rekap keuangan tanpa pusing.</h1>
              <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                Bergabunglah dengan ribuan pemilik restoran, kafe, dan mitra supplier bahan baku yang menghemat hingga 4 jam setiap hari dengan automasi BAPER.
              </p>
              {/* Core Benefits Checklist */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container-lowest/80 border border-[rgba(148,185,169,0.25)]">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-lg" data-icon="smart_toy">smart_toy</span>
                  </div>
                  <div>
                    <h2 className="text-label-lg font-label-lg text-on-surface">Otomasi Pesanan via WhatsApp AI</h2>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                      Bot cerdas membaca chat pesanan pembeli, konfirmasi otomatis, dan mencatat tagihan instan.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container-lowest/80 border border-[rgba(148,185,169,0.25)]">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-lg" data-icon="inventory_2">inventory_2</span>
                  </div>
                  <div>
                    <h2 className="text-label-lg font-label-lg text-on-surface">Manajemen Stok & Purchase Order Pemasok</h2>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                      Pantau stok bahan kritis secara real-time dan terbitkan nota pesanan ke pemasok dalam 1 klik.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container-lowest/80 border border-[rgba(148,185,169,0.25)]">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-lg" data-icon="account_balance_wallet">account_balance_wallet</span>
                  </div>
                  <div>
                    <h2 className="text-label-lg font-label-lg text-on-surface">Rekap Nota & Kas Bebas Selisih</h2>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                      Tutup buku harian otomatis lengkap dengan integrasi QRIS, tunai, dan transfer per shift kasir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* F&B Merchant Testimonial Card */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-[rgba(148,185,169,0.35)] shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-surface-container opacity-40 pointer-events-none">
                <span className="material-symbols-outlined text-8xl" data-icon="format_quote">format_quote</span>
              </div>
              <div className="flex items-center gap-1 text-[#B7791F] mb-3">
                <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="text-label-sm font-label-sm text-on-surface-variant ml-1 font-bold">5.0 / 5.0</span>
              </div>
              <p className="text-body-md font-body-md text-on-surface italic mb-4 leading-relaxed relative z-10">
                “Dulu tiap jam 10 malam pusing rekap nota pesanan WhatsApp dan cocokin stok daging. Sejak pakai BAPER, jam 9 malam resto beres tutup buku tanpa ada uang selisih sepeser pun.”
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-11 h-11 rounded-full bg-[#E8F3EC] flex items-center justify-center text-primary font-bold border border-primary/20 shrink-0">
                  <span className="text-label-lg font-label-lg">DA</span>
                </div>
                <div>
                  <div className="text-label-lg font-label-lg text-on-surface">Dimas Anggara</div>
                  <div className="text-body-sm font-body-sm text-on-surface-variant">Owner, Kopi Cerita Jiwa (3 Cabang)</div>
                </div>
              </div>
            </div>
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-2 px-3 text-on-surface-variant text-label-sm font-label-sm">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base" data-icon="lock">lock</span>
                <span>Enkripsi Bank-Grade 256-bit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base" data-icon="verified_user">verified_user</span>
                <span>Uji Coba Gratis 14 Hari</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base" data-icon="support_agent">support_agent</span>
                <span>Bantuan CS Siaga 24/7</span>
              </div>
            </div>
          </div>
          {/* Kolom kanan: formulir (client component, berisi state & validasi) */}
          <div className="lg:col-span-7">
            <RegisterForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
