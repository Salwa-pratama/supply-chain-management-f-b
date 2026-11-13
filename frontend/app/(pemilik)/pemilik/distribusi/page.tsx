import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribusi Outlet & Cabang | BAPER SCM Pemilik",
};

const TRANSFERS = [
  {
    transferId: "TRF-OUT-202405-01",
    origin: "Central Kitchen Senopati (Hub)",
    destination: "Cabang Kopi Kenangan SCBD Lot 8",
    items: "20L Cold Brew Concentrate + 40 Pcs Croissant + 10L Pandan Syrup",
    driver: "Wahyu Hidayat (Motor Kurir Hub)",
    departureTime: "10:30 WIB",
    eta: "11:00 WIB (Tiba)",
    status: "Selesai Diterima Cabang",
    statusVariant: "done",
  },
  {
    transferId: "TRF-OUT-202405-02",
    origin: "Central Kitchen Senopati (Hub)",
    destination: "Cabang Kopi Kenangan Kemang Raya",
    items: "15L Cold Brew Concentrate + 20 Pcs Toast Choco",
    driver: "Rudi Hartono (Van Delivery Hub)",
    departureTime: "13:45 WIB",
    eta: "14:20 WIB (OTW)",
    status: "Dalam Perjalanan Antar Cabang",
    statusVariant: "shipping",
  },
];

export default function PemilikDistribusiPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Transfer Antar Outlet &amp; Waralaba
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Distribusi Internal Cabang
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Distribusi Bahan Antar Outlet
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Kelola pengiriman bahan siap saji dari Central Kitchen induk ke gerai-gerai cabang satelit dengan surat jalan transfer resmi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">rv_hookup</span>
            <span>Kirim Bahan ke Cabang</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Pengiriman Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">2 Pengiriman</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            1 Selesai, 1 OTW
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Outlet Satelit Terlayani</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">2 Cabang</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            SCBD &amp; Kemang
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Pemenuhan Cabang</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">100%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Nol Kekurangan Stok
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Waktu Kirim</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">32 Menit</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Radius 8 KM
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {TRANSFERS.map((t) => (
          <div
            key={t.transferId}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[#172033] text-body-lg">
                    {t.origin} ➔ <span className="text-primary">{t.destination}</span>
                  </h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      t.statusVariant === "done"
                        ? "bg-[#E8F3EC] text-primary"
                        : "bg-[#FFF9E6] text-[#B7791F]"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="text-xs text-tertiary mt-1">
                  No. Transfer: <strong className="font-mono text-on-surface">{t.transferId}</strong> • Driver: {t.driver}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-tertiary">Estimasi / Waktu Tiba</span>
                <div className="font-semibold text-primary text-body-sm font-mono">{t.eta}</div>
              </div>
            </div>

            <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
              <span className="font-bold text-on-surface">Bahan yang Dikirim:</span> {t.items}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
