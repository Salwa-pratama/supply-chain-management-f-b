import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen & Produksi Masakan | BAPER SCM Pemilik",
};

const BATCHES = [
  {
    batchId: "BATCH-20240524-01",
    recipeName: "Cold Brew Extraction Concentrate (30L)",
    station: "Central Bar Extraction",
    operator: "Fahmi Nugraha (Barista Lead)",
    inputs: "3.5kg Arabika Gayo Coarse + 30L Filtered Water",
    yieldPortion: "120 Porsi Cold Brew",
    status: "Sedang Berlangsung (Steeping 14 Jam)",
    statusVariant: "process",
    progress: 75,
  },
  {
    batchId: "BATCH-20240524-02",
    recipeName: "Pandan Simple Syrup Concentrate (10L)",
    station: "Kitchen Syrups & Sauces",
    operator: "Dewi Lestari (Kitchen Staff)",
    inputs: "5kg Gula Pasir + 200gr Daun Pandan Segar + 6L Air",
    yieldPortion: "10 Botol @ 1 Liter",
    status: "Selesai & Lolos QC Rasa",
    statusVariant: "done",
    progress: 100,
  },
  {
    batchId: "BATCH-20240524-03",
    recipeName: "Croissant Proofing & Baking Batch Pagi",
    station: "Bakery Oven Station",
    operator: "Reza Surya (Baker)",
    inputs: "40 Pcs Frozen Dough Croissant Butter",
    yieldPortion: "40 Pcs Fresh Croissant",
    status: "Selesai Dipanggang",
    statusVariant: "done",
    progress: 100,
  },
];

export default function PemilikProduksiPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Work Order &amp; Batch Kitchen
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              3 Batch Produksi Hari Ini
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Kitchen &amp; Manajemen Produksi
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pencatatan konversi bahan mentah menjadi bahan siap saji (*semi-finished goods*), kalkulasi yield produksi, dan kontrol kualitas rasa.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">skillet</span>
            <span>Mulai Batch Produksi Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Batch Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">3 Batch</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            2 Selesai, 1 Steeping
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Yield Efisiensi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">97.4%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Waste Bahan Baku Minim (&lt;3%)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Porsi Siap Saji Dihasilkan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">170 Porsi</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Langsung Masuk POS
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Biaya Produksi Batch</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">Rp 1.180.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            COGS Terkendali
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {BATCHES.map((b) => (
          <div
            key={b.batchId}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[#172033] text-body-lg">{b.recipeName}</h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      b.statusVariant === "done"
                        ? "bg-[#E8F3EC] text-primary"
                        : "bg-[#FFF9E6] text-[#B7791F]"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="text-xs text-tertiary mt-1">
                  ID Batch: <strong className="font-mono text-on-surface">{b.batchId}</strong> • Stasiun: {b.station} • PJ: {b.operator}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-tertiary">Output Produk Jadi</span>
                <div className="text-headline-sm font-headline-sm font-bold text-primary">
                  {b.yieldPortion}
                </div>
              </div>
            </div>

            <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
              <span className="font-bold text-on-surface">Bahan Baku Digunakan (Inputs):</span> {b.inputs}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-tertiary font-medium">
                <span>Progress Batch</span>
                <span className="font-bold text-primary">{b.progress}%</span>
              </div>
              <div className="w-full bg-[#E9EDFF] h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: `${b.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
