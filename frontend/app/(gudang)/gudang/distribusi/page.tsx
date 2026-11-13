import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribusi ke Outlet & Gerai Cabang | BAPER SCM Gudang",
};

const OUTLET_DISPATCHES = [
  {
    doNumber: "DO-HUB-2024-041",
    destination: "Kopi Kenangan Senopati #04 (Flagship)",
    carrier: "Gran Max Blind Van (B 9811 KLC) - Driver Rudi",
    departure: "06:30 WIB",
    arrival: "07:05 WIB (Selesai Bongkar)",
    items: "50kg Biji Arabika + 100L Fresh Milk + 10 Jeriken Aren + 4 Karton Cup",
    status: "Diterima Outlet (POD Terbit)",
    statusVariant: "received",
  },
  {
    doNumber: "DO-HUB-2024-042",
    destination: "Kopi Kenangan SCBD Lot 8",
    carrier: "Isuzu Giga Chiller Box (B 9481 PXZ) - Driver Wahyu",
    departure: "09:45 WIB",
    arrival: "10:20 WIB (Tiba di Lokasi)",
    items: "25kg Biji Arabika + 60L Fresh Milk + 2 Karton Cup",
    status: "Bongkar Muat di Gerai",
    statusVariant: "unloading",
  },
  {
    doNumber: "DO-HUB-2024-043",
    destination: "Kopi Kenangan Kemang Raya",
    carrier: "Gran Max Blind Van (B 9811 KLC) - Driver Rudi",
    departure: "13:30 WIB",
    arrival: "Estimasi 14:15 WIB",
    items: "20kg Biji Arabika + 40L Fresh Milk + 1 Karton Straw PLA",
    status: "Dalam Perjalanan (OTW)",
    statusVariant: "shipping",
  },
];

export default function GudangDistribusiPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Outbound Logistics &amp; Outlet Delivery
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Distribusi Central Hub ke 3 Cabang
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Distribusi Bahan Baku ke Outlet
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pengelolaan surat jalan (*Delivery Order* / DO), penyiapan muatan palet, rute kurir logistik internal, dan konfirmasi penerimaan fisik di gerai cabang.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">rv_hookup</span>
            <span>Buat Surat Jalan DO Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pengiriman Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">3 Pengiriman</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            1 Selesai, 1 Bongkar, 1 OTW
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Outlet Cabang Terlayani</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">3 Gerai</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Senopati, SCBD &amp; Kemang
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Pemenuhan Order Outlet</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">100%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Semua Permintaan Terpenuhi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Waktu Distribusi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">38 Menit</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tepat Waktu Sebelum Buka
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {OUTLET_DISPATCHES.map((d) => (
          <div
            key={d.doNumber}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[#172033] font-mono text-body-lg">{d.doNumber}</h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      d.statusVariant === "received"
                        ? "bg-[#E8F3EC] text-primary"
                        : d.statusVariant === "unloading"
                        ? "bg-[#FFF9E6] text-[#B7791F]"
                        : "bg-[#EFF6FF] text-[#1D4ED8]"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
                <p className="text-body-sm font-semibold text-primary mt-1">
                  Gerai Tujuan: {d.destination}
                </p>
                <div className="text-xs text-tertiary mt-0.5">
                  Armada &amp; Driver: {d.carrier} • Berangkat: {d.departure} • Tiba: {d.arrival}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <a
                  href="/pemilik/monitoring"
                  className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">navigation</span>
                  <span>Lacak Live Kurir</span>
                </a>
              </div>
            </div>

            <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
              <span className="font-bold text-on-surface">Daftar Bahan Muatan:</span> {d.items}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="h-10 px-4 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md transition-colors"
              >
                Cetak Surat Jalan (DO)
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
