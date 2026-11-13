import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengeluaran Bahan ke Kitchen & Bar | BAPER SCM Gudang",
};

const KITCHEN_DISPATCHES = [
  {
    dispatchId: "DSP-KIT-2025-081",
    station: "Bar Kopi & Minuman Utama",
    requester: "Fahmi Nugraha (Head Barista)",
    items: "5 kg Biji Kopi Arabika Lintong + 20 Liter Susu Segar Pasteurisasi",
    time: "Hari Ini, 07:15 WIB (Shift Pagi)",
    status: "Telah Diserahkan & Stok Terpotong",
    statusVariant: "dispatched",
  },
  {
    dispatchId: "DSP-KIT-2025-082",
    station: "Pastry & Bakery Station",
    requester: "Reza Surya (Chef Pastry)",
    items: "40 Pcs Frozen Dough Croissant + 2 Jeriken Sirup Gula Aren",
    time: "Hari Ini, 07:30 WIB",
    status: "Telah Diserahkan & Stok Terpotong",
    statusVariant: "dispatched",
  },
  {
    dispatchId: "DSP-KIT-2025-083",
    station: "Bar Kopi & Minuman Utama",
    requester: "Fahmi Nugraha (Head Barista)",
    items: "2 Karton Paper Cup Hot 8oz (2.000 Pcs)",
    time: "Hari Ini, 11:30 WIB (Restock Siang)",
    status: "Siap Ambil di Meja Dispatch",
    statusVariant: "ready",
  },
];

export default function GudangPengeluaranKitchenPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Material Issuance &amp; Kitchen Requisitions
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Pengeluaran Bahan Baku ke Bar &amp; Kitchen
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pengeluaran Bahan ke Kitchen &amp; Bar
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Catat dan verifikasi serah terima bahan baku dari ruang gudang ke stasiun kerja barista dan dapur roti, saldo inventaris otomatis berkurang secara FIFO.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">output</span>
            <span>Input Pengeluaran Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Permintaan Selesai Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">3 Pengeluaran</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            2 Diserahkan, 1 Siap Ambil
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Bahan Baku Dikeluarkan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">25 Kg / Liter</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kopi, Susu &amp; Sirup
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Waktu Tunggu Serah Terima</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">4 Menit</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Respons Cepat Gudang
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Kesesuaian Timbangan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">100%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Diverifikasi Barista Lead
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {KITCHEN_DISPATCHES.map((dsp) => (
          <div
            key={dsp.dispatchId}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[#172033] font-mono text-body-lg">{dsp.dispatchId}</h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      dsp.statusVariant === "dispatched"
                        ? "bg-[#E8F3EC] text-primary"
                        : "bg-[#FFF9E6] text-[#B7791F]"
                    }`}
                  >
                    {dsp.status}
                  </span>
                </div>
                <p className="text-body-sm font-semibold text-on-surface mt-1">
                  Tujuan: {dsp.station} • <span className="text-tertiary font-normal">Penerima: {dsp.requester}</span>
                </p>
                <div className="text-xs text-tertiary mt-0.5">Waktu Serah Terima: {dsp.time}</div>
              </div>
            </div>

            <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
              <span className="font-bold text-on-surface">Rincian Komoditas:</span> {dsp.items}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="h-10 px-4 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md transition-colors"
              >
                Cetak Bukti Pengeluaran Barang
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
