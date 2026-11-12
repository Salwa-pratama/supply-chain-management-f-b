import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = {
  title: "Pengaturan Akun Pemasok | BAPER SCM",
};

export default function PemasokPengaturanPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Konfigurasi Sistem Mitra
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                ID Mitra: SUP-JKT-8821
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Pengaturan Akun &amp; Preferensi Pasokan
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Atur informasi penanggung jawab (PIC), rekening bank penampung B2B, ketentuan SLA pesanan, dan integrasi WhatsApp alert.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-tertiary hover:bg-[#F5F8F6] font-label-lg text-label-lg transition-all"
            >
              Batal
            </button>
            <button
              type="button"
              className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>

        {/* SETTINGS SECTIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: NAVIGATION / TABS (4 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-1">
              {[
                { label: "Informasi PIC & Akun", icon: "badge", active: true },
                { label: "Rekening Bank & Pencairan", icon: "account_balance", active: false },
                { label: "Kebijakan Pasokan & Logistik", icon: "local_shipping", active: false },
                { label: "Preferensi Notifikasi & Alert", icon: "notifications", active: false },
                { label: "Keamanan & Autentikasi (2FA)", icon: "security", active: false },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md transition-all text-left ${
                    item.active
                      ? "bg-secondary-container text-primary font-bold shadow-sm"
                      : "text-tertiary hover:text-on-surface hover:bg-[#F5F8F6]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Helper Box */}
            <div className="bg-[#E8F3EC] p-5 rounded-2xl border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-body-md">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                <span>Butuh Bantuan IT &amp; API?</span>
              </div>
              <p className="text-xs text-[#2B4D41] leading-relaxed">
                Tim teknis BAPER SCM siap membantu integrasi webhook ERP gudang Anda ke platform supply chain kami 24/7.
              </p>
              <a
                href="mailto:tech@baperscm.id"
                className="inline-block text-xs font-bold text-primary underline pt-1"
              >
                Hubungi Dukungan Integrasi
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: FORMS & CONTROLS (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            {/* SECTION 1: INFORMASI PIC & PERUSAHAAN */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
              <div className="border-b border-outline-variant/30 pb-4">
                <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person</span>
                  Informasi Akun Penanggung Jawab (PIC)
                </h2>
                <p className="text-body-sm text-tertiary mt-1">
                  Kontak resmi yang menerima instruksi penerimaan pesanan dan konfirmasi pembayaran.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">Nama Lengkap PIC</label>
                  <input
                    type="text"
                    defaultValue="Hendro Prasetyo"
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">Jabatan / Role</label>
                  <input
                    type="text"
                    defaultValue="Kepala Logistik & Distribusi"
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">Email Resmi</label>
                  <input
                    type="email"
                    defaultValue="hendro.p@tanimakmur.co.id"
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">No. WhatsApp Darurat</label>
                  <input
                    type="tel"
                    defaultValue="+62 812-9988-7711"
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: REKENING BANK PENAMPUNG B2B */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
              <div className="border-b border-outline-variant/30 pb-4">
                <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">account_balance</span>
                  Rekening Bank Penampung Penjualan Pasokan
                </h2>
                <p className="text-body-sm text-tertiary mt-1">
                  Rekening resmi beratasnamakan badan usaha untuk settlement otomatis tagihan invoice PO.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">Nama Bank Penampung</label>
                  <select className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                    <option value="mandiri">Bank Mandiri (Persero) Tbk</option>
                    <option value="bca">Bank Central Asia (BCA)</option>
                    <option value="bri">Bank Rakyat Indonesia (BRI)</option>
                    <option value="bni">Bank Negara Indonesia (BNI)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">Nomor Rekening Giro B2B</label>
                  <input
                    type="text"
                    defaultValue="127-00-1099281-4"
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-tertiary uppercase">Nama Pemilik Rekening (Harus Sesuai Badan Usaha)</label>
                  <input
                    type="text"
                    defaultValue="PT TANI MAKMUR SEJAHTERA"
                    disabled
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#E9EDFF]/40 border border-outline-variant/40 rounded-xl text-on-surface font-semibold"
                  />
                  <span className="text-[11px] text-tertiary">
                    Nama akun telah terkunci sesuai verifikasi dokumen NIB/NPWP OSS RBA.
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 3: KEBIJAKAN PENGIRIMAN & CUT-OFF PO */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
              <div className="border-b border-outline-variant/30 pb-4">
                <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  Batas Waktu Pemesanan &amp; Logistik
                </h2>
                <p className="text-body-sm text-tertiary mt-1">
                  Aturan cut-off sistem otomatis untuk pemrosesan PO oleh staf gudang.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-outline-variant/35 bg-[#F9F9FF]">
                  <div>
                    <h3 className="font-bold text-[#172033] text-body-md">
                      Jam Cut-off PO untuk Pengiriman Besok Pagi
                    </h3>
                    <p className="text-body-sm text-tertiary">
                      Pesanan yang masuk setelah jam ini akan otomatis dialokasikan ke jadwal pengiriman lusa.
                    </p>
                  </div>
                  <input
                    type="time"
                    defaultValue="18:00"
                    className="h-10 px-3 rounded-lg border border-outline-variant/50 bg-white font-mono font-bold text-primary text-body-md"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-outline-variant/35 bg-[#F9F9FF]">
                  <div>
                    <h3 className="font-bold text-[#172033] text-body-md">
                      Minimal Order Pemesanan Bebas Ongkir (MOQ)
                    </h3>
                    <p className="text-body-sm text-tertiary">
                      Gerai mitra yang memesan di atas nominal ini dibebaskan dari biaya armada logistik.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-tertiary">Rp</span>
                    <input
                      type="text"
                      defaultValue="1.500.000"
                      className="w-36 h-10 px-3 rounded-lg border border-outline-variant/50 bg-white font-mono font-bold text-[#172033] text-body-md text-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: TOGGLE PREFERENSI NOTIFIKASI */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
              <div className="border-b border-outline-variant/30 pb-4">
                <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">toggle_on</span>
                  Preferensi Peringatan &amp; Notifikasi Otomatis
                </h2>
              </div>

              <div className="divide-y divide-outline-variant/20">
                {[
                  {
                    title: "Kirim Notifikasi WhatsApp untuk PO Mendesak",
                    desc: "Sistem mengirimkan ringkasan pesan ke WA PIC saat gerai memesan pasokan same-day.",
                    enabled: true,
                  },
                  {
                    title: "Alert Buffer Stok Menipis ke Manajer Gudang",
                    desc: "Notifikasi otomatis ketika fisik barang di cold storage mencapai 20% kapasitas minimal.",
                    enabled: true,
                  },
                  {
                    title: "Laporan Ringkasan Penjualan Harian via Email",
                    desc: "Kirim rekap PDF faktur transaksi dan pengiriman setiap pukul 21:00 WIB.",
                    enabled: false,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-[#172033] text-body-md">{item.title}</div>
                      <p className="text-xs text-tertiary mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        defaultChecked={item.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-outline-variant/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
