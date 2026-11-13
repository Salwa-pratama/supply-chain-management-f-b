import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitoring Rantai Pasok Nasional | BAPER SCM Super Admin",
};

const SUPPLY_FLOWS = [
  {
    hub: "Central Cold Storage Cilandak (Pemasok)",
    destination: "Kopi Kenangan Senopati #04",
    item: "Fresh Milk Pasteurisasi (120L) & Arabika Gayo (50kg)",
    carrier: "Isuzu Giga Chiller Box (B 9481 PXZ)",
    temperature: "3.2°C (Stabil)",
    status: "Dalam Perjalanan",
    statusVariant: "ontheway",
    eta: "15 Menit Lagi",
  },
  {
    hub: "Gudang Bahan Kering Tangerang",
    destination: "Fore Coffee Grand Indonesia",
    item: "Robusta Dampit Fine (40kg) & Vanilla Flavor (12 Botol)",
    carrier: "Toyota Dyna Thermo King (B 9122 SQR)",
    temperature: "24.5°C (Bahan Kering)",
    status: "Bongkar Muat di Gerai",
    statusVariant: "unloading",
    eta: "Tiba Pukul 11:30 WIB",
  },
  {
    hub: "Sentra Gula Aren Nusantara (Lebak Bulus)",
    destination: "Janji Jiwa Tebet Jilid 488",
    item: "Sirup Aren Organik 5L (10 Jeriken)",
    carrier: "Gran Max Van (B 9811 KLC)",
    temperature: "26.0°C (Suhu Ruang)",
    status: "Selesai Diterima (POD Sah)",
    statusVariant: "delivered",
    eta: "Selesai 09:40 WIB",
  },
  {
    hub: "Pabrik Kemasan Cikarang",
    destination: "Central Warehouse Kopi Kenangan",
    item: "Paper Cup Hot 8oz (50 Karton / 50.000 Pcs)",
    carrier: "Hino Dutro Box (B 9044 NMX)",
    temperature: "Suhu Ruang",
    status: "Dalam Perjalanan",
    statusVariant: "ontheway",
    eta: "45 Menit Lagi",
  },
];

export default function AdminMonitoringPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Telemetri Rantai Pasok Nasional
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              68 Pengiriman Aktif Hari Ini
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Monitoring Rantai Pasok Ekosistem
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pengawasan real-time pergerakan komoditas pangan dari petani/distributor ke central warehouse dan seluruh gerai F&amp;B.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span>Refresh Telemetri</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Armada Logistik Jalan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">68 Truk</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            GPS Tracker Terhubung
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Cold Chain Integrity</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">99.8%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Suhu 2°C - 4°C Aman
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Peringatan Bottleneck</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">1 Titik</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full border border-[#B7791F]/30">
            Tol Jakarta - Cikampek KM 19
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata On-Time Arrival</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">98.4%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Sesuai Target SLA Gerai
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {SUPPLY_FLOWS.map((flow, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[#172033] text-body-md">
                      {flow.hub} ➔ <span className="text-primary">{flow.destination}</span>
                    </h3>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        flow.statusVariant === "ontheway"
                          ? "bg-[#E8F3EC] text-primary"
                          : flow.statusVariant === "unloading"
                          ? "bg-[#FFF9E6] text-[#B7791F]"
                          : "bg-surface-container-low text-tertiary"
                      }`}
                    >
                      {flow.status}
                    </span>
                  </div>
                  <p className="text-xs text-tertiary mt-1">Muatan: {flow.item}</p>
                </div>
              </div>

              <div className="text-left lg:text-right">
                <div className="text-xs text-tertiary">Armada &amp; Telemetri:</div>
                <div className="font-semibold text-on-surface text-body-sm">{flow.carrier}</div>
                <div className="text-xs font-mono text-primary font-bold">{flow.temperature}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-tertiary pt-1">
              <span>Status Pengiriman: <strong className="text-on-surface">{flow.eta}</strong></span>
              <button
                type="button"
                className="text-primary font-bold hover:underline flex items-center gap-1"
              >
                <span>Lihat Live Map GPS</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
