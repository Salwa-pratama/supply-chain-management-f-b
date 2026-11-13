import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stok Opname & Audit Fisik | BAPER SCM Gudang",
};

const OPNAME_RECORDS = [
  {
    sku: "SKU-BPR-001",
    name: "Biji Kopi Arabika Lintong",
    systemQty: "20.0 kg",
    physicalQty: "19.8 kg",
    diff: "-0.2 kg",
    diffVariant: "minus",
    reason: "Penyusutan Alami / Kalibrasi Grinder",
    auditor: "Bambang Prakoso",
    date: "Hari Ini, 07:00 WIB",
    status: "Telah Disesuaikan",
  },
  {
    sku: "SKU-BPR-002",
    name: "Susu Segar Pasteurisasi (1L)",
    systemQty: "28 Liter",
    physicalQty: "28 Liter",
    diff: "0.0 Liter",
    diffVariant: "match",
    reason: "Cocok Sempurna (100% Match)",
    auditor: "Bambang Prakoso",
    date: "Hari Ini, 07:15 WIB",
    status: "Selesai (Akurat)",
  },
  {
    sku: "SKU-BPR-003",
    name: "Sirup Gula Aren Organik 5L",
    systemQty: "10 Jeriken",
    physicalQty: "10 Jeriken",
    diff: "0 Jeriken",
    diffVariant: "match",
    reason: "Cocok Sempurna",
    auditor: "Bambang Prakoso",
    date: "Kemarin, 18:00 WIB",
    status: "Selesai (Akurat)",
  },
  {
    sku: "SKU-BPR-004",
    name: "Paper Cup Hot 8oz (Double Wall)",
    systemQty: "1.200 Pcs",
    physicalQty: "1.180 Pcs",
    diff: "-20 Pcs",
    diffVariant: "minus",
    reason: "Cup Rusak / Tertekuk Saat Display",
    auditor: "Bambang Prakoso",
    date: "Kemarin, 18:30 WIB",
    status: "Telah Disesuaikan",
  },
];

export default function GudangOpnamePage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Stock Reconciliation &amp; Audit Trail
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Siklus Opname Harian Shift Pagi
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Stok Opname &amp; Audit Persediaan
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Bandingkan saldo catatan kartu stok sistem dengan hasil hitung fisik di rak, catat selisih beserta alasannya, dan sinkronkan pembukuan secara akuntabel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-on-surface hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor Lembar Opname (PDF)</span>
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Input Hasil Hitung Fisik</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Akurasi Stok Opname</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">99.4%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Standar Akurasi Baik (&gt;99%)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Nilai Total Selisih</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">Rp 48.500</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-full">
            Dalam Toleransi Susut 0.2%
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">SKU Telah Diaudit</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">24 SKU</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            100% Selesai Shift Pagi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Peringatan Penyusutan Ekstrem</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">0 Kejadian</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Nol Kehilangan Abnormal
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Kode SKU &amp; Nama Bahan</th>
                <th className="py-4 px-4">Stok Sistem</th>
                <th className="py-4 px-4">Hitung Fisik</th>
                <th className="py-4 px-4">Selisih (Varian)</th>
                <th className="py-4 px-4">Alasan Penyesuaian</th>
                <th className="py-4 px-4">Auditor &amp; Tanggal</th>
                <th className="py-4 px-5 text-right">Status Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {OPNAME_RECORDS.map((rec) => (
                <tr key={rec.sku} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033]">{rec.name}</div>
                    <span className="text-xs font-mono font-bold text-primary">{rec.sku}</span>
                  </td>

                  <td className="py-4 px-4 font-mono text-tertiary">{rec.systemQty}</td>

                  <td className="py-4 px-4 font-mono font-bold text-[#172033]">{rec.physicalQty}</td>

                  <td className="py-4 px-4">
                    <span
                      className={`font-mono font-bold text-xs px-2.5 py-1 rounded-full ${
                        rec.diffVariant === "match"
                          ? "bg-[#E8F3EC] text-primary"
                          : "bg-[#FFF9E6] text-[#B7791F]"
                      }`}
                    >
                      {rec.diff}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-xs text-on-surface">{rec.reason}</td>

                  <td className="py-4 px-4">
                    <div className="text-xs font-medium text-on-surface">{rec.auditor}</div>
                    <div className="text-[11px] text-tertiary">{rec.date}</div>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20">
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
