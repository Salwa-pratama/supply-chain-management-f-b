import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = {
  title: "Permintaan Pembelian (RFQ) | BAPER SCM",
};

const RFQ_LIST = [
  {
    id: "RFQ-FNB-2024-041",
    brand: "Dear Butter - Artisan Croissant & Bakery",
    category: "Dairy & Butter Segar",
    requestedVolume: "600 Kg Butter Anchor & 800 L Fresh Milk / Bulan",
    targetPrice: "Rp 23.500 / Liter & Rp 140.000 / Kg",
    estimatedContractValue: "Rp 102.800.000 / Bulan",
    period: "Kontrak Pasokan 6 Bulan (Jun - Nov 2024)",
    deadline: "Sisa 2 Hari Lagi",
    deadlineVariant: "urgent",
    status: "Terbuka untuk Penawaran",
    statusVariant: "open",
    location: "Kawasan Bakery Central Kitchen, BSD, Tangerang",
    paymentTerms: "Tempo Pembayaran: TOP 30 Hari",
  },
  {
    id: "RFQ-FNB-2024-039",
    brand: "Tomoro Coffee - Regional Jabodetabek",
    category: "Biji Kopi Specialty",
    requestedVolume: "1.200 Kg Arabika Toraja & Flores Bajawa / Bulan",
    targetPrice: "Rp 160.000 / Kg (Packaging Valve 1kg)",
    estimatedContractValue: "Rp 192.000.000 / Bulan",
    period: "Kontrak Pasokan 12 Bulan (Tahunan)",
    deadline: "Sisa 4 Hari Lagi",
    deadlineVariant: "normal",
    status: "Terbuka untuk Penawaran",
    statusVariant: "open",
    location: "Hub Distribusi Tomoro, Kebon Jeruk, Jakarta Barat",
    paymentTerms: "Tempo Pembayaran: TOP 14 Hari (Transfer Bank)",
  },
  {
    id: "RFQ-FNB-2024-035",
    brand: "Haus! Indonesia - Kemitraan Minuman",
    category: "Sirup & Puree Buah",
    requestedVolume: "350 Jeriken Sirup Gula Aren & Mangga (5L)",
    targetPrice: "Rp 120.000 / Jeriken 5L",
    estimatedContractValue: "Rp 42.000.000 / Bulan",
    period: "Kontrak Pasokan 3 Bulan",
    deadline: "Penawaran Dikirim",
    deadlineVariant: "sent",
    status: "Tahap Evaluasi Penawaran",
    statusVariant: "review",
    location: "Warehouse Logistik Haus!, Ciputat, Tangerang Selatan",
    paymentTerms: "Tempo Pembayaran: Cash on Delivery (COD) / 7 Hari",
  },
  {
    id: "RFQ-FNB-2024-031",
    brand: "Kopi Kenangan - Outlet Baru Sentul",
    category: "Paket Pembukaan Gerai Baru",
    requestedVolume: "Starter Pack: 100 Kg Beans + 300L Milk + Cups",
    targetPrice: "Sesuai Kontrak Master Price Agreement",
    estimatedContractValue: "Rp 24.600.000",
    period: "Pengiriman Perdana Sekaligus",
    deadline: "Terkonfirmasi",
    deadlineVariant: "done",
    status: "Deal - Dikonversi Menjadi PO",
    statusVariant: "success",
    location: "Sentul City Mall Lt. 1, Bogor",
    paymentTerms: "Mengikuti Kontrak Master: TOP 14 Hari",
  },
];

export default function PemasokPermintaanPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Pengadaan &amp; Tender Pasokan F&B
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                2 Tender Terbuka Perlu Penawaran
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Permintaan Pembelian &amp; Tender (RFQ)
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Daftar permohonan pasokan bahan baku dari jaringan gerai F&B yang mencari mitra pemasok resmi berskala besar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh Riwayat Penawaran</span>
            </button>
            <button
              type="button"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">post_add</span>
              <span>Kirim Penawaran Terbuka</span>
            </button>
          </div>
        </div>

        {/* STATS 4 CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Tender Terbuka (Baru)</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              2 <span className="text-sm font-normal text-tertiary">Permintaan</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Batas Penawaran Minggu Ini
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Penawaran Diproses</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">
              4 <span className="text-sm font-normal text-tertiary">Pengajuan</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full border border-[#B7791F]/20">
              Evaluasi Harga &amp; Sampel
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Tahap Negosiasi TOP</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              2 <span className="text-sm font-normal text-tertiary">Mitra</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-full">
              Penyusunan Kontrak B2B
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Kontrak Deal / PO Terbit</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              12 <span className="text-sm font-normal text-tertiary">Kontrak</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Tingkat Kemenangan 75%
            </span>
          </div>
        </div>

        {/* RFQ CARDS LIST */}
        <div className="space-y-4">
          {RFQ_LIST.map((rfq) => (
            <div
              key={rfq.id}
              className={`bg-white rounded-2xl border p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden transition-all hover:shadow-md ${
                rfq.statusVariant === "open"
                  ? "border-primary/40 hover:border-primary"
                  : "border-outline-variant/35"
              }`}
            >
              {rfq.statusVariant === "open" && (
                <div className="absolute top-0 left-0 h-1.5 w-full bg-primary" />
              )}
              {rfq.statusVariant === "review" && (
                <div className="absolute top-0 left-0 h-1.5 w-full bg-[#B7791F]" />
              )}
              {rfq.statusVariant === "success" && (
                <div className="absolute top-0 left-0 h-1.5 w-full bg-[#2B8A5B]" />
              )}

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-outline-variant/30">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      rfq.statusVariant === "open"
                        ? "bg-[#E8F3EC] text-primary border-primary/20"
                        : rfq.statusVariant === "review"
                        ? "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/20"
                        : "bg-[#E8F3EC] text-primary border-primary/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      assignment_turned_in
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-[#172033]">
                        {rfq.brand}
                      </h3>
                      <span className="bg-[#F5F8F6] text-tertiary text-[11px] font-bold px-2 py-0.5 rounded-full border border-outline-variant/40">
                        {rfq.category}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-tertiary mt-1">
                      <span>
                        Kode Tender: <strong className="text-on-surface font-mono">{rfq.id}</strong>
                      </span>
                      <span>•</span>
                      <span>{rfq.period}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-tertiary mt-2">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        pin_drop
                      </span>
                      <span>{rfq.location}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Estimasi Nilai */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      rfq.statusVariant === "open"
                        ? "bg-[#E8F3EC] text-primary border border-primary/20"
                        : rfq.statusVariant === "review"
                        ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/20"
                        : "bg-[#E8F3EC] text-primary border border-primary/20"
                    }`}
                  >
                    {rfq.status}
                  </span>

                  <div className="text-right">
                    <span className="text-xs text-tertiary">Estimasi Nilai Kontrak</span>
                    <div className="text-headline-sm font-headline-sm font-bold text-primary">
                      {rfq.estimatedContractValue}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Kebutuhan Bahan & Term */}
              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-body-sm">
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 space-y-1">
                  <span className="text-xs font-bold text-tertiary uppercase">Spesifikasi Kebutuhan:</span>
                  <div className="font-semibold text-on-surface">{rfq.requestedVolume}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 space-y-1">
                  <span className="text-xs font-bold text-tertiary uppercase">Target Harga Mitra:</span>
                  <div className="font-semibold text-[#B7791F]">{rfq.targetPrice}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 space-y-1">
                  <span className="text-xs font-bold text-tertiary uppercase">Ketentuan Pembayaran:</span>
                  <div className="font-semibold text-on-surface">{rfq.paymentTerms}</div>
                </div>
              </div>

              {/* Action Cluster */}
              <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">description</span>
                    <span>Lihat Spesifikasi Lengkap (TOR)</span>
                  </button>
                  <button
                    type="button"
                    className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Tanya PIC Gerai</span>
                  </button>
                </div>

                {rfq.statusVariant === "open" && (
                  <button
                    type="button"
                    className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Ajukan Penawaran Harga (Quotation)</span>
                  </button>
                )}

                {rfq.statusVariant === "review" && (
                  <button
                    type="button"
                    className="h-10 px-5 rounded-xl border border-[#94B9A9] text-primary hover:bg-[#E8F3EC] text-label-md font-label-md flex items-center gap-1.5 transition-all font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    <span>Lihat Penawaran Terkirim</span>
                  </button>
                )}

                {rfq.statusVariant === "success" && (
                  <button
                    type="button"
                    className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    <span>Lihat PO Terbit</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
