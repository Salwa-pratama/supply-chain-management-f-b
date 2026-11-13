import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laporan Rantai Pasok (SCM) | BAPER SCM Pemilik",
};

export default function PemilikLaporanScmPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Analitik Rantai Pasok &amp; Efisiensi Pengadaan
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Laporan Evaluasi Bulanan
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Laporan Kinerja Rantai Pasok (SCM)
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Evaluasi menyeluruh ketepatan waktu pengiriman pemasok, tingkat susut bahan (*waste*), rasio perputaran stok (*Inventory Turnover*), dan penghematan biaya.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor PDF Eksekutif</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Ketepatan Pengiriman Pemasok (OTIF)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">98.5%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Di Atas Target Kontrak (&gt;95%)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Susut / Waste Bahan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">1.8%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terkendali Sangat Rendah (&lt;3%)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Inventory Turnover Ratio (ITR)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">6.2x</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Perputaran Stok Cepat
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Efisiensi Biaya Kontrak B2B</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">Rp 6.250.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Hemat Dibanding Pasar Retail
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            Rapor Mutu &amp; Kepatuhan Mitra Pemasok
          </h3>
          <div className="space-y-3 pt-2">
            {[
              { name: "PT Tani Makmur Sejahtera", score: "99.2%", label: "Grade A+ (Biji Kopi & Dairy)", color: "text-primary" },
              { name: "CV Sumber Pangan Nusantara", score: "97.8%", label: "Grade A (Gula Aren & Sirup)", color: "text-primary" },
              { name: "PT Eco Packaging Solusindo", score: "96.5%", label: "Grade A (Cup & Paper Bag)", color: "text-primary" },
            ].map((v, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#172033] text-body-sm">{v.name}</div>
                  <div className="text-xs text-tertiary">{v.label}</div>
                </div>
                <div className={`font-bold font-mono text-body-md ${v.color}`}>{v.score}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            Rekomendasi Cerdas Optimasi Stok (AI SCM)
          </h3>
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#E8F3EC] border border-primary/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">check_circle</span>
              <div className="text-body-sm">
                <strong className="text-[#172033]">Tambah Buffer Fresh Milk di Hari Jumat:</strong>
                <p className="text-xs text-tertiary mt-0.5">
                  Analisis data menunjukkan peningkatan konsumsi kopi susu 45% setiap akhir pekan.
                </p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#E8F3EC] border border-primary/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">check_circle</span>
              <div className="text-body-sm">
                <strong className="text-[#172033]">Konsolidasi PO Cup &amp; Sirup Sekaligus:</strong>
                <p className="text-xs text-tertiary mt-0.5">
                  Pemesanan bersamaan menghemat ongkos kirim logistik hingga Rp 120.000 per minggu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
