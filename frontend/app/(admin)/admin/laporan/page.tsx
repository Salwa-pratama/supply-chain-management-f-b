import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laporan & Statistik Platform | BAPER SCM Super Admin",
};

export default function AdminLaporanPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Analitik Bisnis &amp; Pertumbuhan Platform
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Periode: Kuartal 2 (2024)
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Laporan &amp; Statistik Ekosistem
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Data agregasi pertumbuhan tenant F&amp;B, komisi platform, efisiensi rantai pasok, dan metrik kesehatan operasional.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Unduh Laporan Lengkap (PDF)</span>
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">table_chart</span>
            <span>Ekspor Dataset (Excel)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total GMV Kuartal Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">Rp 14.2 Miliar</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            +22.4% vs Kuartal Sebelumnya
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pendapatan Platform BAPER</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">Rp 355.000.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Biaya Layanan &amp; Lisensi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Efisiensi Biaya Pasokan Mitra</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">-18.5%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Hemat Berkat Direct SCM
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Retensi Tenant</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">99.4%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Churn Rate Rendah
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">pie_chart</span>
            Komposisi Transaksi Menurut Kategori Bahan
          </h3>
          <div className="space-y-3 pt-2 text-body-sm">
            {[
              { label: "Biji Kopi Arabika & Robusta", share: "38%", amount: "Rp 5.39 Miliar", color: "bg-primary" },
              { label: "Dairy, Fresh Milk & Krimer", share: "32%", amount: "Rp 4.54 Miliar", color: "bg-[#2B8A5B]" },
              { label: "Sirup Artisan & Puree Pemanis", share: "16%", amount: "Rp 2.27 Miliar", color: "bg-[#7DD99E]" },
              { label: "Kemasan Food Grade (Cup & Straw)", share: "14%", amount: "Rp 1.98 Miliar", color: "bg-[#C2E8D7]" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-on-surface">{item.label}</span>
                  <span className="text-primary">{item.share} ({item.amount})</span>
                </div>
                <div className="w-full bg-[#E9EDFF] h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: item.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">insights</span>
            Ringkasan Kepatuhan &amp; Integritas Operasional
          </h3>
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-on-surface text-body-sm">Sertifikasi Halal &amp; BPOM</div>
                <div className="text-xs text-tertiary">100% vendor terdaftar lolos audit kelayakan pangan</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary">Lolos</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-on-surface text-body-sm">Waktu Tanggap Respon PO</div>
                <div className="text-xs text-tertiary">Rata-rata pemasok mengonfirmasi dalam 18.2 menit</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary">SLA Baik</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-on-surface text-body-sm">Ketepatan Pengiriman Logistik</div>
                <div className="text-xs text-tertiary">98.6% pesanan tiba sebelum jam buka gerai F&amp;B</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary">Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
