import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pemasok & Mitra B2B | BAPER SCM Pemilik",
};

const VENDORS = [
  {
    id: "VND-001",
    name: "PT Tani Makmur Sejahtera",
    category: "Biji Kopi Gayo, Fresh Milk & Oat Milk",
    contact: "Hendro Prasetyo (0812-9988-7711)",
    leadTime: "1 Hari (Kirim Subuh)",
    paymentTerm: "TOP 14 Hari (Bank Transfer)",
    moq: "Rp 1.500.000",
    rating: "4.9 / 5.0",
    status: "Pemasok Utama (Kontrak Aktif)",
  },
  {
    id: "VND-002",
    name: "CV Sumber Pangan Nusantara",
    category: "Sirup Gula Aren Organik 5L & Flavour",
    contact: "Denny Setiawan (0813-1122-3344)",
    leadTime: "1-2 Hari",
    paymentTerm: "TOP 30 Hari",
    moq: "Rp 1.000.000",
    rating: "4.8 / 5.0",
    status: "Kontrak Aktif",
  },
  {
    id: "VND-003",
    name: "PT Eco Packaging Solusindo",
    category: "Paper Cups Hot/Cold, Straw PLA & Bags",
    contact: "Bramantyo (0818-9900-1122)",
    leadTime: "3 Hari",
    paymentTerm: "COD / Cash 7 Hari",
    moq: "2 Karton",
    rating: "4.7 / 5.0",
    status: "Kontrak Aktif",
  },
];

export default function PemilikPemasokPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Jaringan Mitra Pengadaan Gerai
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              3 Pemasok Resmi Terikat Kontrak
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pemasok &amp; Rekanan Bahan Baku
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Daftar distributor resmi bahan baku gerai, ketentuan tempo pembayaran (Term of Payment), batas MOQ, dan evaluasi SLA pengiriman.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/pemilik/pembelian"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Buat Pesanan PO Bahan</span>
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {VENDORS.map((v) => (
          <div
            key={v.id}
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
                  <div className="text-xs text-primary font-semibold mt-1">PIC: {v.contact}</div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-tertiary">Rating Evaluasi Gerai</span>
                <div className="text-headline-sm font-headline-sm font-bold text-primary">
                  {v.rating}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-body-sm">
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Waktu Pengiriman (Lead Time):</span>
                <div className="font-semibold text-on-surface mt-0.5">{v.leadTime}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Tempo Pembayaran (TOP):</span>
                <div className="font-semibold text-on-surface mt-0.5">{v.paymentTerm}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                <span className="text-xs font-bold text-tertiary uppercase">Minimal Pemesanan (MOQ):</span>
                <div className="font-semibold text-on-surface mt-0.5">{v.moq}</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                className="h-10 px-4 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md transition-colors"
              >
                Unduh Kontrak Kerjasama (PDF)
              </button>
              <a
                href="/pemilik/pembelian"
                className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 font-bold shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span>Pesan Sekarang</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
