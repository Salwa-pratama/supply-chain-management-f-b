import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = {
  title: "Pengiriman & Logistik | BAPER SCM",
};

const DELIVERIES = [
  {
    doNumber: "DO-BPR-2024-0821",
    poNumber: "PO-BPR-2024-0585",
    client: "Kopi Kenangan - Gandaria City",
    address: "Gandaria City Mall Lt. UG, Kebayoran Lama, Jakarta Selatan",
    driver: "Agus Hermawan",
    phone: "+62 813-4455-6677",
    vehicle: "Isuzu Giga Chiller Box • B 9481 PXZ",
    temperature: "3.2°C (Suhu Cold Storage Stabil)",
    eta: "12:45 WIB (15 Menit Lagi)",
    status: "Dalam Perjalanan",
    statusVariant: "ontheway",
    itemsSummary: "40 Kg Arabika Gayo + 80 Liter Fresh Milk + Sirup Aren",
    progressStep: 2, // 0: Packing, 1: Berangkat, 2: On The Road, 3: Sampai
  },
  {
    doNumber: "DO-BPR-2024-0820",
    poNumber: "PO-BPR-2024-0584",
    client: "Fore Coffee - Senayan City",
    address: "Senayan City Mall Lt. LG, Jl. Asia Afrika, Jakarta Pusat",
    driver: "Dedi Supriyadi",
    phone: "+62 812-7788-9900",
    vehicle: "Toyota Dyna Thermo King • B 9122 SQR",
    temperature: "3.0°C (Suhu Cold Storage Stabil)",
    eta: "13:15 WIB (45 Menit Lagi)",
    status: "Dalam Perjalanan",
    statusVariant: "ontheway",
    itemsSummary: "60 Liter Oat Milk Barista + 30 Kg Robusta + Vanilla Syrup",
    progressStep: 2,
  },
  {
    doNumber: "DO-BPR-2024-0819",
    poNumber: "PO-BPR-2024-0582",
    client: "Janji Jiwa - Tebet Eco Park",
    address: "Jl. Tebet Barat Raya No. 42, Jakarta Selatan",
    driver: "Rian Hidayat",
    phone: "+62 856-1122-3344",
    vehicle: "Daihatsu Gran Max Box • B 9811 KLC",
    temperature: "Bahan Kering (Suhu Ruang 26°C)",
    eta: "Sedang Bongkar Muat (Tiba 11:30 WIB)",
    status: "Bongkar Muat di Gerai",
    statusVariant: "unloading",
    itemsSummary: "50 Kg Robusta Dampit + 10 Jeriken Gula Aren + 2 Karton Cup",
    progressStep: 3,
  },
  {
    doNumber: "DO-BPR-2024-0818",
    poNumber: "PO-BPR-2024-0580",
    client: "Kopi Kenangan - Mall Kelapa Gading 3",
    address: "MKG 3 Lt. Ground, Kelapa Gading, Jakarta Utara",
    driver: "Agus Hermawan",
    phone: "+62 813-4455-6677",
    vehicle: "Isuzu Giga Chiller Box • B 9481 PXZ",
    temperature: "Suhu Diterima: 3.4°C (Sesuai Standar QC)",
    eta: "Selesai Diterima (Pukul 09:15 WIB)",
    status: "Selesai Diterima Gerai (POD Sah)",
    statusVariant: "delivered",
    itemsSummary: "80 Kg Arabika Specialty + 160 Liter Fresh Milk Pasteurisasi",
    progressStep: 4,
  },
];

export default function PemasokPengirimanPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Manajemen Logistik &amp; Armada Distribusi
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                4 Armada Sedang Bertugas (On-Delivery)
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Pengiriman &amp; Logistik Terintegrasi
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Pemantauan pengiriman pesanan bahan baku real-time, kontrol suhu armada berpendingin (Cold Chain), dan tanda terima digital (e-POD).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh Rekap Surat Jalan</span>
            </button>
            <button
              type="button"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              <span>Buat Surat Jalan (DO) Baru</span>
            </button>
          </div>
        </div>

        {/* 4 KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Armada Aktif Mengantar</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              4 <span className="text-sm font-normal text-tertiary">Kendaraan</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Chiller Box GPS Aktif
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Total Surat Jalan Hari Ini</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              12 <span className="text-sm font-normal text-tertiary">Surat Jalan (DO)</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              6 Selesai Terkirim
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Ketepatan Waktu (On-Time)</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">98.6%</div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Sesuai Jadwal Buka Gerai
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Kondisi Suhu Cold Storage</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              3.1°C <span className="text-xs font-normal text-tertiary">(Avg)</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Kualitas Susu Terjaga
            </span>
          </div>
        </div>

        {/* DELIVERIES LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">route</span>
              Manifest &amp; Status Pengiriman Aktif
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-tertiary">Diperbarui secara langsung via GPS armada</span>
            </div>
          </div>

          {DELIVERIES.map((item) => (
            <div
              key={item.doNumber}
              className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden space-y-5"
            >
              <div
                className={`absolute top-0 left-0 h-1.5 w-full ${
                  item.statusVariant === "ontheway"
                    ? "bg-primary"
                    : item.statusVariant === "unloading"
                    ? "bg-[#B7791F]"
                    : "bg-[#2B8A5B]"
                }`}
              />

              {/* Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-outline-variant/30">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      item.statusVariant === "ontheway"
                        ? "bg-[#E8F3EC] text-primary border-primary/20"
                        : item.statusVariant === "unloading"
                        ? "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/20"
                        : "bg-[#E8F3EC] text-primary border-primary/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {item.statusVariant === "ontheway"
                        ? "local_shipping"
                        : item.statusVariant === "unloading"
                        ? "forklift"
                        : "check_circle"}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-[#172033]">
                        {item.client}
                      </h3>
                      <span className="bg-[#E8F3EC] text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-primary/20">
                        {item.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-tertiary mt-1">
                      <span>
                        Surat Jalan:{" "}
                        <strong className="text-on-surface font-mono">{item.doNumber}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Referensi PO:{" "}
                        <strong className="text-on-surface font-mono">{item.poNumber}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-tertiary mt-2">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        pin_drop
                      </span>
                      <span>{item.address}</span>
                    </div>
                  </div>
                </div>

                {/* Driver & ETA */}
                <div className="flex lg:flex-col items-start lg:items-end justify-between gap-1 text-right">
                  <div className="text-xs text-tertiary">
                    Estimasi Tiba (ETA):
                  </div>
                  <div className="text-body-md font-bold text-primary font-mono">{item.eta}</div>
                  <div className="text-xs text-tertiary mt-1">
                    Driver: <strong className="text-on-surface">{item.driver}</strong> ({item.phone})
                  </div>
                  <span className="text-[11px] text-tertiary font-mono">{item.vehicle}</span>
                </div>
              </div>

              {/* Rantai Dingin & Ringkasan Muatan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm">
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      device_thermostat
                    </span>
                    <div>
                      <div className="text-xs text-tertiary font-bold uppercase">Sensor Rantai Dingin (IoT):</div>
                      <div className="font-semibold text-primary">{item.temperature}</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    inventory_2
                  </span>
                  <div>
                    <div className="text-xs text-tertiary font-bold uppercase">Ringkasan Muatan Bahan:</div>
                    <div className="font-semibold text-on-surface line-clamp-1">{item.itemsSummary}</div>
                  </div>
                </div>
              </div>

              {/* PROGRESS BAR TRACKER */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-tertiary font-semibold mb-2">
                  <span className={item.progressStep >= 1 ? "text-primary font-bold" : ""}>
                    1. Gudang Pusat (08:30)
                  </span>
                  <span className={item.progressStep >= 2 ? "text-primary font-bold" : ""}>
                    2. Dalam Perjalanan
                  </span>
                  <span className={item.progressStep >= 3 ? "text-primary font-bold" : ""}>
                    3. Bongkar Muat
                  </span>
                  <span className={item.progressStep >= 4 ? "text-primary font-bold" : ""}>
                    4. Diterima Gerai (POD)
                  </span>
                </div>
                <div className="w-full bg-[#E9EDFF] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{
                      width: `${(item.progressStep / 4) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    <span>Cetak Surat Jalan Fisik</span>
                  </button>
                  <button
                    type="button"
                    className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                    <span>Lihat QR Barcode DO</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-10 px-4 rounded-xl border border-primary/30 text-primary hover:bg-[#E8F3EC] text-label-md font-label-md flex items-center gap-1.5 transition-colors font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span>Hubungi Driver</span>
                  </button>
                  <button
                    type="button"
                    className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">navigation</span>
                    <span>Lacak Live Radar GPS</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
