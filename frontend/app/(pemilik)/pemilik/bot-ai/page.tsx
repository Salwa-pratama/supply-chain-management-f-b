import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konfigurasi Bot AI Gemini | BAPER SCM Pemilik",
};

export default function PemilikBotAiPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Autonomous Sales Agent
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Engine: Google Gemini 1.5 Pro
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Konfigurasi Bot AI WhatsApp
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Atur instruksi sistem (*system prompt*), gaya bahasa, katalog menu live yang diajarkan ke AI, dan aturan auto-closing pesanan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Simpan Pengaturan Bot</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Persona & System Instructions */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-5">
            <div className="border-b border-outline-variant/30 pb-4">
              <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span>
                Persona &amp; Perilaku Bot AI
              </h2>
              <p className="text-body-sm text-tertiary mt-1">
                Tentukan bagaimana asisten menyapa pelanggan dan memandu proses pemesanan hingga pembayaran QRIS.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-tertiary uppercase">Nama Asisten Virtual</label>
                <input
                  type="text"
                  defaultValue="Kenangan Bot (Asisten Ramah BAPER)"
                  className="w-full h-11 px-4 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-tertiary uppercase">Nada Bicara / Tone of Voice</label>
                <select className="w-full h-11 px-4 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary">
                  <option>Ramah, Santun &amp; Kasual (F&amp;B Coffee Shop Standar)</option>
                  <option>Sangat Cepat &amp; Formal (Quick Takeaway)</option>
                  <option>Eksklusif &amp; Elegan (Fine Dining / Artisan)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-tertiary uppercase">System Prompt / Panduan Utama Gemini AI</label>
                <textarea
                  rows={6}
                  defaultValue={`Anda adalah asisten pemesanan resmi Kopi Kenangan Senopati. Tugas Anda:
1. Menyapa pelanggan dengan hangat dan menanyakan pesanan mereka.
2. Memeriksa ketersediaan stok menu secara real-time dari sistem BAPER SCM.
3. Menyarankan add-on atau upsell yang relevan (misal: pastry / roti bakar).
4. Membuat ringkasan pesanan rapi beserta total harga dan kode QRIS dinamis.
5. Jika pelanggan menanyakan hal di luar menu, tawarkan bantuan staf secara sopan.`}
                  className="w-full p-4 text-body-sm font-mono text-on-surface bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Auto-closing & Order Generation */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2 border-b border-outline-variant/30 pb-3">
              <span className="material-symbols-outlined text-primary">auto_mode</span>
              Fitur Otomasi Transaksi
            </h3>

            <div className="divide-y divide-outline-variant/20">
              {[
                { title: "Auto-Generate Order ke Antrean Kasir POS", desc: "Langsung masukkan pesanan yang telah dikonfirmasi pelanggan ke layar KDS kitchen.", checked: true },
                { title: "Verifikasi Otomatis Mutasi Pembayaran QRIS", desc: "Cek langsung mutasi bank & payment gateway begitu pelanggan mengunggah bukti bayar.", checked: true },
                { title: "Tolak Otomatis Pesanan jika Bahan Kritis / Sold Out", desc: "Beritahu pelanggan bahwa menu tidak tersedia dan tawarkan alternatif lain secara sopan.", checked: true },
              ].map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-[#172033] text-body-md">{item.title}</div>
                    <p className="text-xs text-tertiary mt-0.5">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                    <div className="w-11 h-6 bg-outline-variant/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Testing & Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">speed</span>
              Metrik Kinerja Bot AI
            </h3>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Waktu Respon Rata-rata</span>
                <div className="text-headline-sm font-headline-sm font-bold text-primary mt-0.5">
                  1.2 Detik
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Tingkat Closing Otomatis</span>
                <div className="text-headline-sm font-headline-sm font-bold text-primary mt-0.5">
                  88.4%
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Intervensi Manual Kasir</span>
                <div className="text-headline-sm font-headline-sm font-bold text-tertiary mt-0.5">
                  11.6%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-3">
            <h4 className="font-bold text-[#172033] text-body-md">Uji Coba Respons (Playground)</h4>
            <p className="text-xs text-tertiary">
              Ketik pertanyaan simulasi pelanggan untuk menguji respons sistem sebelum diterapkan ke nomor WhatsApp resmi.
            </p>
            <input
              type="text"
              placeholder="Contoh: Apakah ada menu non-kopi?"
              className="w-full h-10 px-3 text-xs bg-[#F5F8F6] border border-outline-variant/50 rounded-xl outline-none"
            />
            <button
              type="button"
              className="w-full h-10 rounded-xl bg-secondary-container text-primary font-bold text-xs hover:bg-secondary-container/80 transition-colors"
            >
              Simulasikan Balasan AI
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
