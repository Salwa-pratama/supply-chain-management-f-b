import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Pemasok & Vendor Gudang | BAPER SCM Gudang",
};

const WAREHOUSE_VENDORS = [
  {
    vendorId: "VND-LOG-01",
    name: "PT Tani Makmur Sejahtera",
    category: "Biji Kopi Arabika Lintong & Robusta Dampit",
    schedule: "Senin, Rabu, Jumat (07:00 - 09:00 WIB)",
    coldChain: "Ya (Chiller Truk Thermo)",
    contact: "Bpk. Hendro / Driver Iwan (0812-9988-7711)",
    leadTime: "24 Jam",
    onTimeRate: "99.2%",
    status: "Mitra Prioritas",
  },
  {
    vendorId: "VND-LOG-02",
    name: "CV Dairy Makmur Sentosa",
    category: "Fresh Milk Pasteurisasi & Whipping Cream",
    schedule: "Setiap Hari (06:00 - 07:30 WIB Subuh)",
    coldChain: "Wajib Suhu 2°C - 4°C",
    contact: "Ibu Rina / Driver Agus (0857-4455-6677)",
    leadTime: "12 Jam",
    onTimeRate: "98.8%",
    status: "Mitra Prioritas",
  },
  {
    vendorId: "VND-LOG-03",
    name: "PT Eco Packaging Solusindo",
    category: "Karton Box, Paper Cup Hot 8oz, Straw PLA",
    schedule: "Selasa & Kamis (10:00 - 14:00 WIB)",
    coldChain: "Tidak (Dry Box Truck)",
    contact: "Bpk. Toni H. (0818-9900-1122)",
    leadTime: "48 Jam",
    onTimeRate: "97.5%",
    status: "Mitra Reguler",
  },
];

export default function GudangPemasokPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Vendor Logistics &amp; Inbound Dock Directory
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Jadwal Bongkar Muat Dock 1 &amp; Dock 2
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Data Pemasok &amp; Rekanan Gudang
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Informasi kontak PIC operasional logistik, jadwal slot kedatangan truk ekspedisi, kepatuhan suhu cold-chain, dan riwayat ketepatan waktu bongkar muat.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/gudang/permintaan-bahan"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Buat PO Permintaan Bahan</span>
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {WAREHOUSE_VENDORS.map((v) => (
          <div
            key={v.vendorId}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center font-bold text-xl shrink-0">
                  <span className="material-symbols-outlined text-[26px]">local_shipping</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-headline-sm text-headline-sm text-[#172033]">{v.name}</h3>
                    <span className="bg-[#E8F3EC] text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-primary/20">
                      {v.status}
                    </span>
                  </div>
                  <p className="text-body-sm text-tertiary mt-0.5">{v.category}</p>
                  <div className="text-xs text-primary font-semibold mt-1">Kontak Operasional: {v.contact}</div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-tertiary">Ketepatan Jam Tiba (OTD)</span>
                <div className="text-headline-sm font-headline-sm font-bold text-primary">
                  {v.onTimeRate}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-body-sm">
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Slot Jadwal Penerimaan:</span>
                <div className="font-semibold text-on-surface mt-0.5 text-xs">{v.schedule}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Standar Armada Cold Chain:</span>
                <div className="font-semibold text-on-surface mt-0.5 text-xs">{v.coldChain}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Lead Time Pemesanan:</span>
                <div className="font-semibold text-on-surface mt-0.5 text-xs">{v.leadTime}</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <a
                href="/gudang/permintaan-bahan"
                className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 font-bold shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                <span>Pesan PO ke Vendor Ini</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
