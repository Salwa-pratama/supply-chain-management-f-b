import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pembelian Bahan Baku (PO) | BAPER SCM Pemilik",
};

const PURCHASE_ORDERS = [
  {
    poNumber: "PO-BPR-2024-0589",
    vendor: "PT Tani Makmur Sejahtera",
    issueDate: "24 Mei 2024",
    deliveryTarget: "Besok pagi (25 Mei), 07.30 WIB",
    totalAmount: "Rp 12.850.000",
    items: "50kg Arabika Gayo + 120L Fresh Milk + 8 Jeriken Aren + 2 Karton Cup",
    status: "Menunggu Konfirmasi Vendor",
    statusVariant: "waiting",
  },
  {
    poNumber: "PO-BPR-2024-0585",
    vendor: "PT Tani Makmur Sejahtera",
    issueDate: "23 Mei 2024",
    deliveryTarget: "Hari ini (24 Mei), 12.45 WIB",
    totalAmount: "Rp 9.750.000",
    items: "40kg Arabika Gayo + 80L Fresh Milk + Sirup Aren",
    status: "Armada Sedang Mengantar",
    statusVariant: "shipping",
  },
  {
    poNumber: "PO-BPR-2024-0570",
    vendor: "CV Sumber Pangan",
    issueDate: "18 Mei 2024",
    deliveryTarget: "19 Mei 2024",
    totalAmount: "Rp 2.450.000",
    items: "15 Jeriken Sirup Aren Organik Cair",
    status: "Selesai Diterima & QC Lolos",
    statusVariant: "done",
  },
];

export default function PemilikPembelianPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Pengadaan &amp; Purchase Order (PO)
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Kopi Kenangan Senopati #04
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pembelian Bahan Baku &amp; Restock
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Terbitkan surat Purchase Order resmi kepada mitra pemasok, pantau alur verifikasi, dan pantau kedatangan armada logistik ke gerai.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Buat PO Pasokan Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Pengeluaran Bahan Bulan Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">Rp 48.650.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Food Cost 31.2% (Aman)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Aktif Berjalan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">2 PO</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            1 OTW, 1 Menunggu Vendor
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Efisiensi Harga Grosir</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">12.5%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kontrak Pasokan BAPER
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tagihan Menunggu Tempo (TOP)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">Rp 22.600.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-full">
            Jatuh Tempo 7 - 14 Hari
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {PURCHASE_ORDERS.map((po) => (
          <div
            key={po.poNumber}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[#172033] font-mono text-body-lg">{po.poNumber}</h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      po.statusVariant === "waiting"
                        ? "bg-[#FFF9E6] text-[#B7791F]"
                        : po.statusVariant === "shipping"
                        ? "bg-[#E8F3EC] text-primary"
                        : "bg-surface-container-low text-tertiary"
                    }`}
                  >
                    {po.status}
                  </span>
                </div>
                <div className="text-xs text-tertiary mt-1">Vendor: <strong className="text-on-surface">{po.vendor}</strong> • Diterbitkan: {po.issueDate}</div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-tertiary">Total Nilai Tagihan</span>
                <div className="text-headline-sm font-headline-sm font-bold text-primary font-mono">
                  {po.totalAmount}
                </div>
              </div>
            </div>

            <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
              <span className="font-bold text-on-surface">Rincian Muatan:</span> {po.items}
              <div className="text-xs text-primary font-semibold mt-1">Target Tiba: {po.deliveryTarget}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="h-10 px-4 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md transition-colors"
              >
                Cetak Surat PO
              </button>
              {po.statusVariant === "shipping" && (
                <a
                  href="/pemilik/monitoring"
                  className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 font-bold shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">navigation</span>
                  <span>Lacak Truk OTW</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
