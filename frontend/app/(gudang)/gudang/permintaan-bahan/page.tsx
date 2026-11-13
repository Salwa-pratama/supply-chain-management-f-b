import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permintaan Bahan & Purchase Order (PO) | BAPER SCM Gudang",
};

const PO_REQUESTS = [
  {
    reqId: "REQ-GDG-2025-012",
    vendor: "PT Tani Makmur Sejahtera",
    item: "Biji Kopi Arabika Lintong (Roasted 1kg pack)",
    qty: "50 kg",
    estCost: "Rp 6.250.000",
    urgency: "Mendesak (Buffer Habis)",
    urgencyVariant: "urgent",
    date: "Hari Ini, 08:30 WIB",
    status: "Menunggu Approval Pemilik",
    statusVariant: "waiting",
  },
  {
    reqId: "REQ-GDG-2025-011",
    vendor: "CV Dairy Makmur Sentosa",
    item: "Susu Segar Pasteurisasi Homogen 1L",
    qty: "120 Liter",
    estCost: "Rp 2.400.000",
    urgency: "Rutin (Restock Harian)",
    urgencyVariant: "routine",
    date: "Kemarin, 14:00 WIB",
    status: "Disetujui Pemilik (PO Terbit)",
    statusVariant: "approved",
  },
  {
    reqId: "REQ-GDG-2025-010",
    vendor: "PT Eco Packaging Solusindo",
    item: "Paper Cups Hot 8oz (Double Wall) + Tutup Sip",
    qty: "5 Karton (5.000 Pcs)",
    estCost: "Rp 3.150.000",
    urgency: "Rutin",
    urgencyVariant: "routine",
    date: "22 Mei 2024",
    status: "Pesanan Selesai Diterima",
    statusVariant: "done",
  },
];

export default function GudangPermintaanBahanPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Purchase Requisition &amp; Restock Approval
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Gudang Logistik Cilandak
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Permintaan Bahan Baku (PO Requisition)
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Ajukan permohonan pengadaan bahan baku ke pemilik bisnis dan terbitkan lembar PO resmi kepada mitra pemasok otomatis saat stok mendekati ambang ROP.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Buat Permintaan PO Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">PO Aktif Berjalan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">2 Pengajuan</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            1 Menunggu, 1 Disetujui
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Nilai Permintaan Bulan Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">Rp 34.800.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terkendali Sesuai Budget
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Waktu Approval</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">45 Menit</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Respons Owner Sangat Cepat
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Efisiensi Pemesanan Kolektif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">14.2%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Bundling Hemat Logistik
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {PO_REQUESTS.map((po) => (
          <div
            key={po.reqId}
            className="bg-white rounded-2xl border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[#172033] font-mono text-body-lg">{po.reqId}</h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      po.urgencyVariant === "urgent"
                        ? "bg-[#FDF2F2] text-error border border-error/30"
                        : "bg-[#E8F3EC] text-primary"
                    }`}
                  >
                    {po.urgency}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      po.statusVariant === "approved"
                        ? "bg-[#E8F3EC] text-primary"
                        : po.statusVariant === "waiting"
                        ? "bg-[#FFF9E6] text-[#B7791F]"
                        : "bg-surface-container-low text-tertiary"
                    }`}
                  >
                    {po.status}
                  </span>
                </div>
                <p className="text-body-sm font-semibold text-on-surface mt-1">
                  {po.item} • <span className="text-tertiary font-normal">Pemasok Dituju: {po.vendor}</span>
                </p>
                <div className="text-xs text-tertiary mt-0.5">Tanggal Permintaan: {po.date}</div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-tertiary">Kuantitas Permintaan:</span>
                <div className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                  {po.qty}
                </div>
                <div className="text-xs font-mono text-tertiary">Estimasi: {po.estCost}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="h-10 px-4 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md transition-colors"
              >
                Lihat Detail Pengajuan
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
