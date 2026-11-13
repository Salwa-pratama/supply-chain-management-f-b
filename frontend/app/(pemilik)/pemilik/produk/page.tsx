import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Produk Outlet | BAPER SCM Pemilik",
};

const PRODUCTS = [
  {
    sku: "PRD-COF-001",
    name: "Kopi Kenangan Mantan (Aren Latte)",
    category: "Signature Coffee",
    price: "Rp 22.000",
    cogs: "Rp 7.800",
    margin: "64.5%",
    stockPortion: "140 Porsi",
    status: "Tersedia",
    statusVariant: "ready",
    salesToday: 48,
  },
  {
    sku: "PRD-COF-002",
    name: "Avocado Coffee Float",
    category: "Signature Coffee",
    price: "Rp 32.000",
    cogs: "Rp 12.400",
    margin: "61.2%",
    stockPortion: "65 Porsi",
    status: "Tersedia",
    statusVariant: "ready",
    salesToday: 24,
  },
  {
    sku: "PRD-NON-001",
    name: "Uji Matcha Latte (Oatmilk)",
    category: "Non-Coffee",
    price: "Rp 28.000",
    cogs: "Rp 10.200",
    margin: "63.5%",
    stockPortion: "18 Porsi",
    status: "Menipis",
    statusVariant: "low",
    salesToday: 32,
  },
  {
    sku: "PRD-BAK-001",
    name: "Choco Toast Artisan",
    category: "Bakery & Toast",
    price: "Rp 24.000",
    cogs: "Rp 8.900",
    margin: "62.9%",
    stockPortion: "40 Porsi",
    status: "Tersedia",
    statusVariant: "ready",
    salesToday: 19,
  },
  {
    sku: "PRD-BAK-002",
    name: "Croissant Butter France",
    category: "Bakery & Toast",
    price: "Rp 26.000",
    cogs: "Rp 11.500",
    margin: "55.7%",
    stockPortion: "0 Porsi",
    status: "Habis (Sold Out)",
    statusVariant: "empty",
    salesToday: 15,
  },
];

export default function PemilikProdukPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Manajemen Menu &amp; Resep Masakan
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Kopi Kenangan Senopati #04
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Katalog Produk &amp; Menu Outlet
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Atur harga jual kasir POS, rincian biaya pokok produksi (HPP / COGS), dan integrasi otomatis pengurangan stok bahan baku resep.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Ekspor Menu (Excel)</span>
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambah Menu Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Menu Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">36 Menu</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            4 Kategori Penjualan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Margin Profit</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">62.8%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Target HPP Tercapai
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Menu Terlaris Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">Aren Latte</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            48 Cup Terjual
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Menu Habis (Sold Out)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B54747]">1 Menu</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/20">
            Perlu Baking Tambahan
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Nama Menu &amp; SKU</th>
                <th className="py-4 px-4">Kategori</th>
                <th className="py-4 px-4">Harga Jual (POS)</th>
                <th className="py-4 px-4">HPP (COGS)</th>
                <th className="py-4 px-4">Margin</th>
                <th className="py-4 px-4">Estimasi Stok Resep</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {PRODUCTS.map((prd) => (
                <tr key={prd.sku} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033] hover:text-primary cursor-pointer">
                      {prd.name}
                    </div>
                    <span className="text-xs font-mono text-tertiary">{prd.sku}</span>
                  </td>

                  <td className="py-4 px-4 text-tertiary font-medium">{prd.category}</td>

                  <td className="py-4 px-4 font-bold text-primary font-mono">{prd.price}</td>

                  <td className="py-4 px-4 text-tertiary font-mono">{prd.cogs}</td>

                  <td className="py-4 px-4 font-bold text-on-surface">{prd.margin}</td>

                  <td className="py-4 px-4 font-semibold text-on-surface">{prd.stockPortion}</td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        prd.statusVariant === "ready"
                          ? "bg-[#E8F3EC] text-primary border border-primary/20"
                          : prd.statusVariant === "low"
                          ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                          : "bg-[#FDF2F2] text-error border border-error/30"
                      }`}
                    >
                      {prd.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                        title="Edit Menu & Resep"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
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
