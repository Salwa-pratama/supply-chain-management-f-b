// Data contoh inventaris gudang. Ganti dengan hasil pemanggilan API backend (Go) nanti.

export type StatusStok = "safe" | "warning" | "empty";

export type ItemGudang = {
  sku: string;
  name: string;
  sub: string;
  kategori: "makanan" | "minuman" | "kemasan" | "operasional" | "pendukung";
  kategoriLabel: string;
  vendor: string;
  vendorKey: "tani" | "dairy" | "toffin" | "kemasan" | "lain";
  stok: string;
  stokCls: string;
  min: string;
  lokIcon: string;
  lokIconCls: string;
  lokasi: string;
  status: StatusStok;
};

export const INVENTARIS: ItemGudang[] = [
  {
    sku: "SKU-BPR-001",
    name: "Biji Kopi Arabika Lintong",
    sub: "Roasted Medium Dark - 1kg pack",
    kategori: "minuman",
    kategoriLabel: "Minuman",
    vendor: "PT Tani Makmur Sejahtera",
    vendorKey: "tani",
    stok: "1.8 kg",
    stokCls: "font-bold text-[#B7791F]",
    min: "5.0 kg",
    lokIcon: "ac_unit",
    lokIconCls: "material-symbols-outlined text-[16px] text-blue-500",
    lokasi: "Cold Storage Rak A-01",
    status: "warning",
  },
  {
    sku: "SKU-BPR-002",
    name: "Susu Segar Pasteurisasi",
    sub: "Fresh Milk Barista Grade 1L",
    kategori: "minuman",
    kategoriLabel: "Minuman",
    vendor: "CV Dairy Makmur Sentosa",
    vendorKey: "dairy",
    stok: "28 Liter",
    stokCls: "font-bold text-primary",
    min: "20 Liter",
    lokIcon: "kitchen",
    lokIconCls: "material-symbols-outlined text-[16px] text-blue-500",
    lokasi: "Chiller C-01",
    status: "safe",
  },
  {
    sku: "SKU-BPR-003",
    name: "Sirup Karamel Monin",
    sub: "Glass Bottle 700ml",
    kategori: "minuman",
    kategoriLabel: "Minuman",
    vendor: "PT Toffin Indonesia",
    vendorKey: "toffin",
    stok: "1.2 Botol",
    stokCls: "font-bold text-[#B7791F]",
    min: "3.0 Botol",
    lokIcon: "shelves",
    lokIconCls: "material-symbols-outlined text-[16px] text-tertiary",
    lokasi: "Rak B-03 Sirup",
    status: "warning",
  },
  {
    sku: "SKU-BPR-004",
    name: "Alpukat Mentega Super",
    sub: "Buah Segar Sortir A",
    kategori: "makanan",
    kategoriLabel: "Bahan Makanan",
    vendor: "Mitra Tani Organik",
    vendorKey: "lain",
    stok: "0 kg",
    stokCls: "font-black text-error",
    min: "8.0 kg",
    lokIcon: "kitchen",
    lokIconCls: "material-symbols-outlined text-[16px] text-tertiary",
    lokasi: "Rak A-04 Buah",
    status: "empty",
  },
  {
    sku: "SKU-BPR-005",
    name: "Beras Rojolele Super",
    sub: "Karung 25kg Kemasan Padi Unggul",
    kategori: "makanan",
    kategoriLabel: "Bahan Makanan",
    vendor: "UD Pangan Mandiri",
    vendorKey: "lain",
    stok: "45 kg",
    stokCls: "font-bold text-primary",
    min: "25 kg",
    lokIcon: "warehouse",
    lokIconCls: "material-symbols-outlined text-[16px] text-tertiary",
    lokasi: "Dry Storage D-01",
    status: "safe",
  },
  {
    sku: "SKU-BPR-006",
    name: "Paper Cup Hot 12oz",
    sub: "Logo BAPER Kopi Senopati (1 Pack = 50pcs)",
    kategori: "kemasan",
    kategoriLabel: "Kemasan",
    vendor: "Sentra Kemasan Food-grade",
    vendorKey: "kemasan",
    stok: "1.200 pcs",
    stokCls: "font-bold text-primary",
    min: "500 pcs",
    lokIcon: "inventory_2",
    lokIconCls: "material-symbols-outlined text-[16px] text-tertiary",
    lokasi: "Gudang Kemasan E-02",
    status: "safe",
  },
  {
    sku: "SKU-BPR-007",
    name: "Kertas Thermal Printer Kasir 80mm",
    sub: "Thermal Paper Struk POS Coreless",
    kategori: "operasional",
    kategoriLabel: "Operasional",
    vendor: "Toko Alat Kasirindo",
    vendorKey: "lain",
    stok: "15 Roll",
    stokCls: "font-bold text-[#B7791F]",
    min: "20 Roll",
    lokIcon: "receipt",
    lokIconCls: "material-symbols-outlined text-[16px] text-tertiary",
    lokasi: "Rak F-01 Perlengkapan",
    status: "warning",
  },
];
