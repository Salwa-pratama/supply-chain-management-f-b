import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = {
  title: "Katalog Bahan & Barang | BAPER SCM",
};

const KATALOG_ITEMS = [
  {
    sku: "SKU-KOP-001",
    name: "Arabika Specialty Gayo Grade 1",
    category: "Biji Kopi",
    packaging: "Alu-foil Valve Bag 1 Kg",
    price: "Rp 175.000",
    unit: "/ kg",
    moq: "10 kg",
    stock: 450,
    minStock: 100,
    status: "Tersedia",
    leadTime: "1 Hari",
    icon: "coffee",
  },
  {
    sku: "SKU-KOP-002",
    name: "Robusta Dampit Fine Grade",
    category: "Biji Kopi",
    packaging: "Alu-foil Valve Bag 1 Kg",
    price: "Rp 85.000",
    unit: "/ kg",
    moq: "20 kg",
    stock: 620,
    minStock: 150,
    status: "Tersedia",
    leadTime: "1 Hari",
    icon: "coffee",
  },
  {
    sku: "SKU-DAI-001",
    name: "Fresh Milk Pasteurisasi Homogen",
    category: "Dairy & Susu",
    packaging: "Chilled Carton 1 Liter",
    price: "Rp 24.500",
    unit: "/ liter",
    moq: "24 liter",
    stock: 380,
    minStock: 200,
    status: "Tersedia",
    leadTime: "Same Day",
    icon: "water_full",
  },
  {
    sku: "SKU-DAI-002",
    name: "Oat Milk Barista Edition",
    category: "Dairy & Susu",
    packaging: "Tetra Brik 1 Liter",
    price: "Rp 42.000",
    unit: "/ liter",
    moq: "12 liter",
    stock: 85,
    minStock: 100,
    status: "Menipis",
    leadTime: "1-2 Hari",
    icon: "water_full",
  },
  {
    sku: "SKU-SYR-001",
    name: "Sirup Gula Aren Organik Cair",
    category: "Sirup & Pemanis",
    packaging: "Jeriken Food Grade 5 Liter",
    price: "Rp 135.000",
    unit: "/ jeriken",
    moq: "2 jeriken",
    stock: 140,
    minStock: 50,
    status: "Tersedia",
    leadTime: "1 Hari",
    icon: "liquor",
  },
  {
    sku: "SKU-SYR-002",
    name: "Vanilla Artisan Flavor Syrup",
    category: "Sirup & Pemanis",
    packaging: "Botol Kaca 750 ml",
    price: "Rp 88.000",
    unit: "/ botol",
    moq: "6 botol",
    stock: 210,
    minStock: 40,
    status: "Tersedia",
    leadTime: "1 Hari",
    icon: "liquor",
  },
  {
    sku: "SKU-TEA-001",
    name: "Matcha Uji Ceremonial Powder",
    category: "Bubuk Minuman",
    packaging: "Tins Pouch 500 gr",
    price: "Rp 260.000",
    unit: "/ pouch",
    moq: "4 pouch",
    stock: 24,
    minStock: 30,
    status: "Menipis",
    leadTime: "2-3 Hari",
    icon: "nest_cam_floodlight",
  },
  {
    sku: "SKU-PKG-001",
    name: "Paper Cup Hot 8oz Double Wall",
    category: "Kemasan & Packaging",
    packaging: "Karton Isi 1.000 Pcs",
    price: "Rp 420.000",
    unit: "/ karton",
    moq: "1 karton",
    stock: 0,
    minStock: 20,
    status: "Habis",
    leadTime: "Pre-Order 3H",
    icon: "inventory",
  },
];

export default function PemasokKatalogPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER & QUICK ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Manajemen Komoditas B2B
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">Total 24 Bahan Terdaftar</span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Katalog Bahan Baku &amp; Barang Pasokan
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Atur harga kontrak B2B, batas minimal pemesanan (MOQ), dan pantau jumlah ketersediaan stok fisik gudang.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Unduh Daftar Harga (PDF/Excel)</span>
            </button>
            <button
              type="button"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Tambah Bahan Baku</span>
            </button>
          </div>
        </div>

        {/* 4 SUMMARY STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Total SKU Aktif</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              24 <span className="text-sm font-normal text-tertiary">Komoditas</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              6 Kategori Bahan F&B
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Stok Aman (Tersedia)</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              21 <span className="text-sm font-normal text-tertiary">Item</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Siap Kirim Same-Day
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Stok Menipis (Buffer Low)</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#B7791F]">
              2 <span className="text-sm font-normal text-tertiary">Item</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full border border-[#B7791F]/20">
              Perlu Restock Pabrik
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Stok Habis / Out of Stock</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#B54747]">
              1 <span className="text-sm font-normal text-tertiary">Item</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/30">
              Status Pre-Order
            </span>
          </div>
        </div>

        {/* SEARCH, CATEGORY PILLS & FILTERS */}
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-tertiary">
                search
              </span>
              <input
                type="text"
                placeholder="Cari SKU, nama komoditas, atau kemasan..."
                className="w-full h-11 pl-10 pr-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[#7B8794]"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <select className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
                <option value="">Semua Kategori</option>
                <option value="kopi">Biji Kopi</option>
                <option value="dairy">Dairy &amp; Susu</option>
                <option value="sirup">Sirup &amp; Pemanis</option>
                <option value="powder">Bubuk Minuman</option>
                <option value="pkg">Kemasan Food Grade</option>
              </select>

              <select className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
                <option value="">Semua Status Stok</option>
                <option value="tersedia">Tersedia (Aman)</option>
                <option value="menipis">Stok Menipis</option>
                <option value="habis">Habis</option>
              </select>

              <button
                type="button"
                className="h-11 px-3.5 rounded-xl border border-outline-variant/50 hover:bg-[#F5F8F6] text-on-surface text-body-sm flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Filter Lanjutan</span>
              </button>
            </div>
          </div>

          {/* Category Quick Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {["Semua Komoditas (24)", "Biji Kopi (8)", "Dairy & Susu (5)", "Sirup & Puree (6)", "Bubuk Minuman (3)", "Kemasan & Packaging (2)"].map(
              (tab, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                    idx === 0
                      ? "bg-primary text-white font-bold shadow-sm"
                      : "bg-[#F5F8F6] text-tertiary hover:text-on-surface hover:bg-[#E8F3EC]"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* KATALOG TABLE */}
        <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">Komoditas &amp; SKU</th>
                  <th className="py-4 px-4">Kategori</th>
                  <th className="py-4 px-4">Kemasan Standar</th>
                  <th className="py-4 px-4">Harga Grosir (B2B)</th>
                  <th className="py-4 px-4">Min. Order (MOQ)</th>
                  <th className="py-4 px-4">Stok Gudang</th>
                  <th className="py-4 px-4">Lead Time</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {KATALOG_ITEMS.map((item) => (
                  <tr key={item.sku} className="hover:bg-[#F5F8F6]/60 transition-colors">
                    {/* Komoditas & SKU */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0 border border-primary/20">
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        </div>
                        <div>
                          <div className="font-bold text-[#172033] hover:text-primary cursor-pointer transition-colors">
                            {item.name}
                          </div>
                          <span className="text-xs font-mono text-tertiary">{item.sku}</span>
                        </div>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="py-4 px-4 text-tertiary font-medium">{item.category}</td>

                    {/* Kemasan */}
                    <td className="py-4 px-4 text-on-surface">{item.packaging}</td>

                    {/* Harga */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-[#172033]">{item.price}</span>
                      <span className="text-xs text-tertiary font-normal"> {item.unit}</span>
                    </td>

                    {/* MOQ */}
                    <td className="py-4 px-4 font-medium text-on-surface">{item.moq}</td>

                    {/* Stok Gudang */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#172033]">{item.stock} unit</div>
                      <div className="w-24 bg-[#E9EDFF] h-1.5 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.stock === 0
                              ? "bg-error"
                              : item.stock < item.minStock
                              ? "bg-[#B7791F]"
                              : "bg-primary"
                          }`}
                          style={{
                            width: `${Math.min(100, (item.stock / (item.minStock * 2)) * 100)}%`,
                          }}
                        />
                      </div>
                    </td>

                    {/* Lead Time */}
                    <td className="py-4 px-4 text-tertiary font-medium">{item.leadTime}</td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.status === "Tersedia"
                            ? "bg-[#E8F3EC] text-primary border border-primary/20"
                            : item.status === "Menipis"
                            ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                            : "bg-[#FDF2F2] text-error border border-error/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === "Tersedia"
                              ? "bg-primary"
                              : item.status === "Menipis"
                              ? "bg-[#B7791F]"
                              : "bg-error"
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                          title="Edit Produk & Harga"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                          title="Perbarui Stok Fisik"
                        >
                          <span className="material-symbols-outlined text-[18px]">inventory</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-4 bg-[#F9F9FF] border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-tertiary">
            <span>Menampilkan 1 - 8 dari total 24 item katalog komoditas</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white text-tertiary hover:bg-[#F5F8F6] disabled:opacity-50"
                disabled
              >
                Sebelumnya
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-primary text-white font-bold flex items-center justify-center shadow-sm"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white border border-outline-variant/40 text-on-surface hover:bg-[#F5F8F6] flex items-center justify-center font-medium"
              >
                2
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white border border-outline-variant/40 text-on-surface hover:bg-[#F5F8F6] flex items-center justify-center font-medium"
              >
                3
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white text-on-surface hover:bg-[#F5F8F6]"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
