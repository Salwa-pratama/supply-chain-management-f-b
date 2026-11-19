import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan Sistem | BAPER SCM Super Admin",
};

export default function AdminPengaturanPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Konfigurasi Global &amp; Infrastruktur
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Server Version: 2.4.0-prod
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pengaturan Sistem &amp; Ekosistem SCM
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Kelola konfigurasi integrasi AI Gemini, Webhook API Gateway, webhook payment gateway, dan kebijakan keamanan platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-tertiary hover:bg-[#F5F8F6] font-label-lg text-label-lg transition-all"
          >
            Reset Default
          </button>
          <button
            type="button"
            className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Simpan Konfigurasi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-1">
            {[
              { label: "Integrasi AI & LLM Engine", icon: "neurology", active: true },
              { label: "API Webhook & Cloud Sync", icon: "cloud_sync", active: false },
              { label: "Payment Gateway & Escrow", icon: "payments", active: false },
              { label: "Backup Database & Snapshot", icon: "database", active: false },
              { label: "Audit Log & Keamanan (2FA)", icon: "security", active: false },
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
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
            <div className="border-b border-outline-variant/30 pb-4">
              <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">neurology</span>
                Konfigurasi Google Gemini AI Engine
              </h2>
              <p className="text-body-sm text-tertiary mt-1">
                Koneksi API model bahasa untuk analisis rekomendasi restock bahan baku cerdas dan optimasi HPP.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-tertiary uppercase">Model AI Aktif</label>
                <select className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary">
                  <option value="gemini-1.5-pro">Google Gemini 1.5 Pro (Precision SCM &amp; Multimodal)</option>
                  <option value="gemini-1.5-flash">Google Gemini 1.5 Flash (Ultra Fast Chat Response)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-tertiary uppercase">Gemini API Key (Server Environment)</label>
                <input
                  type="password"
                  defaultValue="AIzaSyB9X90821-MockKeySecretValid-BAPER"
                  className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl font-mono text-tertiary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-tertiary uppercase">Batas Token Respons / Request</label>
                <input
                  type="number"
                  defaultValue={2048}
                  className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2 border-b border-outline-variant/30 pb-3">
              <span className="material-symbols-outlined text-primary">toggle_on</span>
              Parameter Global Ekosistem
            </h3>
            <div className="divide-y divide-outline-variant/20">
              {[
                { title: "Mode Pemeliharaan (Maintenance Mode)", desc: "Hanya Super Admin yang dapat mengakses rute operasional saat aktif.", enabled: false },
                { title: "Verifikasi Otomatis NIB/NPWP Mitra via OSS", desc: "Validasi nomor registrasi usaha saat pemasok mendaftarkan profil.", enabled: true },
                { title: "Notifikasi Peringatan Darurat Server via Webhook", desc: "Kirim alert ke Telegram/Slack tim IT saat latensi server >500ms.", enabled: true },
              ].map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-[#172033] text-body-md">{item.title}</div>
                    <p className="text-xs text-tertiary mt-0.5">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                    <div className="w-11 h-6 bg-outline-variant/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
