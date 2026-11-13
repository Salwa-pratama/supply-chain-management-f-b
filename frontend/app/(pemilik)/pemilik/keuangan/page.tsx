import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rekap Penjualan & Keuangan | BAPER SCM Pemilik",
};

const PAYMENTS_SUMMARY = [
  { method: "QRIS Dinamis (GoPay, OVO, ShopeePay)", share: "54%", amount: "Rp 3.466.800", count: 78 },
  { method: "Tunai / Cash Kasir", share: "22%", amount: "Rp 1.412.400", count: 32 },
  { method: "Transfer Bank & Virtual Account", share: "14%", amount: "Rp 898.800", count: 18 },
  { method: "Online Delivery Aggregator", share: "10%", amount: "Rp 642.000", count: 14 },
];

export default function PemilikKeuanganPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Laporan Finansial &amp; Cash Flow
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Kopi Kenangan Senopati #04
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Rekap Penjualan &amp; Laba Bersih
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Ringkasan omzet harian, perhitungan biaya modal bahan baku (HPP), marjin kotor, dan rekonsiliasi kasir POS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Unduh Laporan Keuangan (PDF)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pendapatan Kotor Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">Rp 6.420.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            142 Transaksi Selesai
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Biaya Bahan Baku (HPP / COGS)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">Rp 2.054.400</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Food Cost 32.0% (Ideal)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Estimasi Laba Kotor (Gross Profit)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">Rp 4.365.600</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Margin Kotor 68.0%
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Status Kas Laci Kasir (Closing)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">Seimbang</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Nol Selisih Kasir Pagi
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">credit_card</span>
            Metode Pembayaran Transaksi
          </h3>
          <div className="space-y-4 pt-2">
            {PAYMENTS_SUMMARY.map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-on-surface">{p.method} ({p.count} trx)</span>
                  <span className="text-primary font-mono">{p.share} • {p.amount}</span>
                </div>
                <div className="w-full bg-[#E9EDFF] h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: p.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">receipt_long</span>
            Rekap Pengeluaran Operasional (OPEX)
          </h3>
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#172033] text-body-sm">Pembelian Bahan Baku (PO Terbit)</div>
                <div className="text-xs text-tertiary">PT Tani Makmur &amp; CV Sumber Pangan</div>
              </div>
              <span className="font-bold text-primary font-mono text-body-sm">Rp 12.850.000</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#172033] text-body-sm">Gas Elpiji &amp; Utilitas Bar</div>
                <div className="text-xs text-tertiary">Pengeluaran kas kecil kasir</div>
              </div>
              <span className="font-bold text-on-surface font-mono text-body-sm">Rp 150.000</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#172033] text-body-sm">Biaya Logistik &amp; Antar Bahan</div>
                <div className="text-xs text-tertiary">Distribusi antar cabang SCBD &amp; Kemang</div>
              </div>
              <span className="font-bold text-on-surface font-mono text-body-sm">Rp 80.000</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
