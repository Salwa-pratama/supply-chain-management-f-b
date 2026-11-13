import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laporan Mutasi & Stok Gudang | BAPER SCM Gudang",
};

const MUTATIONS = [
  {
    trxId: "MUT-202405-091",
    time: "Hari Ini, 07:15 WIB",
    type: "Masuk (Inbound QC)",
    sku: "SKU-BPR-002",
    item: "Susu Segar Pasteurisasi",
    qty: "+120 Liter",
    qtyVariant: "in",
    ref: "PO-2025-088 (CV Dairy Makmur)",
    balanceAfter: "148 Liter",
  },
  {
    trxId: "MUT-202405-090",
    time: "Hari Ini, 07:45 WIB",
    type: "Keluar (Bar Issue)",
    sku: "SKU-BPR-001",
    item: "Biji Kopi Arabika Lintong",
    qty: "-5.0 kg",
    qtyVariant: "out",
    ref: "DSP-KIT-2025-081 (Bar Senopati)",
    balanceAfter: "14.8 kg",
  },
  {
    trxId: "MUT-202405-089",
    time: "Hari Ini, 09:45 WIB",
    type: "Keluar (Distribusi Cabang)",
    sku: "SKU-BPR-002",
    item: "Susu Segar Pasteurisasi",
    qty: "-60 Liter",
    qtyVariant: "out",
    ref: "DO-HUB-2024-042 (Cabang SCBD)",
    balanceAfter: "88 Liter",
  },
  {
    trxId: "MUT-202405-088",
    time: "Kemarin, 18:00 WIB",
    type: "Koreksi (Stok Opname)",
    sku: "SKU-BPR-001",
    item: "Biji Kopi Arabika Lintong",
    qty: "-0.2 kg",
    qtyVariant: "adjust",
    ref: "OPN-202405-001 (Susut Kalibrasi)",
    balanceAfter: "19.8 kg",
  },
];

export default function GudangLaporanPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Warehouse Analytics &amp; Movement Audit
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Rekapitulasi Mutasi Barang Masuk &amp; Keluar
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Laporan Mutasi &amp; Kartu Stok
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Buku besar mutasi seluruh transaksi penerimaan barang dari pemasok, pengeluaran ke stasiun kitchen, serta pengiriman antar cabang secara kronologis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-on-surface hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Unduh Kartu Stok (Excel)</span>
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>Cetak Rekap Bulanan (PDF)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Masuk (Inbound Bulan Ini)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">1.240 Kg / L</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            18 Pengiriman Pemasok
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Keluar (Outbound Cabang)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">1.180 Kg / L</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terdistribusi ke 3 Outlet
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Susut Fisik (Shrinkage)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">0.18%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Jauh di Bawah Batas Toleransi 1%
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Nilai Persediaan Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">Rp 42.600.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Metode FIFO Terverifikasi
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">ID Mutasi &amp; Waktu</th>
                <th className="py-4 px-4">Tipe Pergerakan</th>
                <th className="py-4 px-4">Bahan Baku (SKU)</th>
                <th className="py-4 px-4">Perubahan Kuantitas</th>
                <th className="py-4 px-4">Dokumen Referensi</th>
                <th className="py-4 px-5 text-right">Saldo Akhir Rak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {MUTATIONS.map((m) => (
                <tr key={m.trxId} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold font-mono text-[#172033]">{m.trxId}</div>
                    <span className="text-xs text-tertiary">{m.time}</span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        m.qtyVariant === "in"
                          ? "bg-[#E8F3EC] text-primary"
                          : m.qtyVariant === "out"
                          ? "bg-[#EFF6FF] text-[#1D4ED8]"
                          : "bg-[#FFF9E6] text-[#B7791F]"
                      }`}
                    >
                      {m.type}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-[#172033]">{m.item}</div>
                    <span className="text-xs font-mono text-tertiary">{m.sku}</span>
                  </td>

                  <td className="py-4 px-4 font-mono font-bold">
                    <span
                      className={
                        m.qtyVariant === "in"
                          ? "text-primary"
                          : m.qtyVariant === "out"
                          ? "text-[#1D4ED8]"
                          : "text-[#B7791F]"
                      }
                    >
                      {m.qty}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-xs text-on-surface">{m.ref}</td>

                  <td className="py-4 px-5 text-right font-mono font-bold text-[#172033]">
                    {m.balanceAfter}
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
