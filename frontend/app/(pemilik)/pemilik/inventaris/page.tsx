import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stok & Inventaris Toko | BAPER SCM Pemilik",
};

const INVENTORY = [
  {
    sku: "RAW-KOP-001",
    name: "Arabika Gayo Grade 1 (Roasted Beans)",
    category: "Biji Kopi",
    currentStock: 18.5,
    minBuffer: 15.0,
    unit: "Kg",
    reorderPoint: "20.0 Kg",
    supplier: "PT Tani Makmur Sejahtera",
    status: "Aman",
    statusVariant: "safe",
  },
  {
    sku: "RAW-DAI-001",
    name: "Fresh Milk Pasteurisasi Homogen",
    category: "Dairy & Susu",
    currentStock: 24,
    minBuffer: 30,
    unit: "Liter",
    reorderPoint: "40 Liter",
    supplier: "PT Tani Makmur Sejahtera",
    status: "Kritis (Buffer Low)",
    statusVariant: "critical",
  },
  {
    sku: "RAW-DAI-002",
    name: "Oat Milk Barista Edition",
    category: "Dairy & Susu",
    currentStock: 12,
    minBuffer: 15,
    unit: "Liter",
    reorderPoint: "24 Liter",
    supplier: "PT Tani Makmur Sejahtera",
    status: "Kritis (Buffer Low)",
    statusVariant: "critical",
  },
  {
    sku: "RAW-SYR-001",
    name: "Sirup Gula Aren Organik 5L",
    category: "Pemanis & Sirup",
    currentStock: 4,
    minBuffer: 2,
    unit: "Jeriken",
    reorderPoint: "5 Jeriken",
    supplier: "CV Sumber Pangan",
    status: "Aman",
    statusVariant: "safe",
  },
  {
    sku: "RAW-PKG-001",
    name: "Paper Cup Hot 8oz Double Wall",
    category: "Kemasan",
    currentStock: 120,
    minBuffer: 250,
    unit: "Pcs",
    reorderPoint: "500 Pcs",
    supplier: "PT Eco Packaging",
    status: "Kritis (Buffer Low)",
    statusVariant: "critical",
  },
];

export default function PemilikInventarisPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Kontrol Persediaan Fisik Gerai
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              3 Bahan Baku di Bawah Batas Kritis
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Stok &amp; Inventaris Bahan Baku
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau ketersediaan bahan mentah di bar dan chiller gerai, peringatan titik pemesanan ulang (Reorder Point), dan lakukan stock opname.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">inventory</span>
            <span>Mulai Stock Opname</span>
          </button>
          <a
            href="/pemilik/pembelian"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Pesan Pasokan ke Pemasok</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Bahan Baku Bar</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">28 Bahan</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kopi, Susu, Sirup &amp; Kemasan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#B54747]/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] bg-gradient-to-br from-white to-[#FDF2F2]/30">
          <span className="text-label-md font-label-md text-[#B54747] font-bold">Stok di Bawah Batas Aman</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B54747]">3 Item</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/20">
            Fresh Milk, Oat Milk, Paper Cup
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Nilai Aset Persediaan Toko</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">Rp 16.450.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Perhitungan FIFO Harian
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Akurasi Opname Fisik</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">99.1%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tingkat Selisih &lt;1%
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Nama Bahan &amp; SKU</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4">Stok Fisik Saat Ini</th>
                <th className="py-4 px-4">Buffer Minimal</th>
                <th className="py-4 px-4">Titik Reorder (ROP)</th>
                <th className="py-4 px-4">Mitra Pemasok Utama</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {INVENTORY.map((item) => (
                <tr key={item.sku} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033] hover:text-primary cursor-pointer">
                      {item.name}
                    </div>
                    <span className="text-xs font-mono text-tertiary">{item.sku}</span>
                  </td>

                  <td className="py-4 px-4 text-tertiary font-medium">{item.category}</td>

                  <td className="py-4 px-4 font-bold text-[#172033]">
                    {item.currentStock} {item.unit}
                  </td>

                  <td className="py-4 px-4 text-tertiary">
                    {item.minBuffer} {item.unit}
                  </td>

                  <td className="py-4 px-4 text-xs font-mono font-bold text-primary">
                    {item.reorderPoint}
                  </td>

                  <td className="py-4 px-4 text-xs text-on-surface font-medium">{item.supplier}</td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        item.statusVariant === "safe"
                          ? "bg-[#E8F3EC] text-primary border border-primary/20"
                          : "bg-[#FDF2F2] text-[#B54747] border border-[#B54747]/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <a
                      href="/pemilik/pembelian"
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-label-sm text-xs font-bold transition-all"
                    >
                      + Pesan PO
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
