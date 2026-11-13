import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penerimaan & QC Masuk Gudang | BAPER SCM Gudang",
};

const INBOUND_QC = [
  {
    poNumber: "PO-2025-089",
    vendor: "PT Tani Makmur Sejahtera",
    item: "Biji Kopi Arabika Lintong",
    batchNumber: "LOT-TNI-2025-021",
    qtyOrdered: "25 kg",
    qtyReceived: "25 kg",
    temperature: "22.4°C (Normal Ruang)",
    inspectionNotes: "Kemasan foil utuh ber-valve, aroma segar, sertifikat roasting disertakan.",
    driver: "Iwan Setiawan (B 9481 PXZ)",
    status: "Menunggu Pemeriksaan Fisik",
    statusVariant: "pending",
  },
  {
    poNumber: "PO-2025-088",
    vendor: "CV Dairy Makmur Sentosa",
    item: "Susu Segar Pasteurisasi (Fresh Milk 1L)",
    batchNumber: "LOT-DRY-9901",
    qtyOrdered: "120 Liter",
    qtyReceived: "120 Liter",
    temperature: "3.2°C (Chiller Box)",
    inspectionNotes: "Suhu cold chain stabil &lt;4°C, segel tutup aman, tanggal kedaluwarsa 14 hari ke depan.",
    driver: "Agus S. (B 9122 SQR)",
    status: "Lolos QC (Diterima Penuh)",
    statusVariant: "approved",
  },
  {
    poNumber: "PO-2025-085",
    vendor: "PT Eco Packaging Solusindo",
    item: "Paper Cups Hot 8oz Double Wall",
    batchNumber: "LOT-PKG-441",
    qtyOrdered: "10 Karton (10.000 Pcs)",
    qtyReceived: "10 Karton (10.000 Pcs)",
    temperature: "Suhu Ruang",
    inspectionNotes: "1 karton sudut penyok ringan, namun isi cup higienis dan tidak rusak.",
    driver: "Toni H. (B 9044 NMX)",
    status: "Lolos QC Bersyarat",
    statusVariant: "warning",
  },
];

export default function GudangPenerimaanQcPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Inbound Receiving &amp; Quality Control (QC)
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Standar HACCP &amp; Rantai Dingin
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Penerimaan Barang &amp; Verifikasi QC
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Validasi fisik barang kiriman dari mitra pemasok: periksa kesesuaian faktur PO, kondisi kemasan, suhu armada chiller, dan terbitkan Berita Acara Penerimaan (BAP).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            <span>Mulai Verifikasi QC Masuk</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Tiba Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">3 Pengiriman</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            2 Lolos, 1 Menunggu Inspeksi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Kelulusan QC</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">99.1%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Sesuai Standar Mutu F&amp;B
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Barang Ditolak / Retur</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">0 Item</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Nol Klaim Kerusakan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Durasi QC</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">12 Menit</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Bongkar Muat Cepat
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {INBOUND_QC.map((qc) => (
          <div
            key={qc.poNumber}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[#172033] font-mono text-body-lg">{qc.poNumber}</h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      qc.statusVariant === "approved"
                        ? "bg-[#E8F3EC] text-primary"
                        : qc.statusVariant === "warning"
                        ? "bg-[#FFF9E6] text-[#B7791F]"
                        : "bg-[#EFF6FF] text-[#1D4ED8]"
                    }`}
                  >
                    {qc.status}
                  </span>
                </div>
                <p className="text-body-sm font-semibold text-on-surface mt-1">
                  {qc.item} • <span className="text-tertiary font-normal">Pemasok: {qc.vendor}</span>
                </p>
                <div className="text-xs text-tertiary mt-0.5">
                  No. Lot: <span className="font-mono">{qc.batchNumber}</span> • Driver: {qc.driver}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-tertiary">Kuantitas Diterima:</span>
                <div className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                  {qc.qtyReceived}
                </div>
                <div className="text-xs font-mono text-tertiary">Suhu: {qc.temperature}</div>
              </div>
            </div>

            <div className="text-body-sm text-tertiary bg-[#F5F8F6] p-3.5 rounded-xl border border-outline-variant/30">
              <span className="font-bold text-on-surface">Catatan Verifikasi QC:</span> {qc.inspectionNotes}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="h-10 px-4 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md transition-colors"
              >
                Lihat Berita Acara (BAP)
              </button>
              {qc.statusVariant === "pending" && (
                <button
                  type="button"
                  className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 font-bold shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Verifikasi &amp; Masukkan Stok</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
