import type { NavGroup } from "@/components/layout/SidebarNav";

// href "#" = halaman belum dibuat. Ganti dengan route aslinya saat halaman selesai.

export const adminMenu: NavGroup[] = [
  {
    items: [
      { label: "Dashboard Super Admin", href: "/admin/dashboard", icon: "dashboard" },
      { label: "Manajemen Pengguna", href: "#", icon: "manage_accounts" },
      { label: "Data Pemilik Bisnis FNB", href: "#", icon: "storefront" },
      { label: "Data Pemasok & Mitra", href: "#", icon: "local_shipping" },
      { label: "Data Konsumen", href: "#", icon: "groups" },
      { label: "Monitoring Rantai Pasok", href: "#", icon: "hub" },
      { label: "Monitoring Pesanan", href: "#", icon: "receipt_long" },
      { label: "Laporan & Statistik", href: "#", icon: "bar_chart" },
      { label: "Pengaturan Sistem", href: "#", icon: "settings" },
    ],
  },
];

// Dipakai bersama oleh peran owner, manajer_gudang, dan kasir.
export const pemilikMenu: NavGroup[] = [
  {
    title: "Navigasi Utama",
    items: [
      { label: "Dashboard Bisnis", href: "/pemilik/dashboard", icon: "dashboard" },
      { label: "Katalog Produk", href: "#", icon: "restaurant_menu" },
      { label: "Stok & Inventaris", href: "#", icon: "inventory_2", badge: "3" },
      { label: "Pemasok & Mitra", href: "#", icon: "local_shipping" },
      { label: "Pembelian Bahan", href: "#", icon: "shopping_bag" },
      { label: "Kitchen & Produksi", href: "#", icon: "blender" },
      { label: "Distribusi Outlet", href: "#", icon: "delivery_dining" },
      { label: "Kasir (POS)", href: "/kasir", icon: "point_of_sale" },
      { label: "Pesanan Pelanggan", href: "#", icon: "receipt_long" },
      { label: "Monitoring Rantai Pasok", href: "/pemilik/monitoring", icon: "schema" },
    ],
  },
  {
    title: "Komunikasi & AI",
    items: [
      { label: "Chat WhatsApp", href: "#", icon: "chat", badge: "3" },
      { label: "Konfigurasi Bot AI", href: "#", icon: "smart_toy" },
    ],
  },
  {
    title: "Laporan & Portalan",
    items: [
      { label: "Rekap Penjualan", href: "#", icon: "account_balance_wallet" },
      { label: "Laporan SCM", href: "#", icon: "analytics" },
      { label: "Portal Super Admin", href: "/admin/dashboard", icon: "admin_panel_settings" },
    ],
  },
];

export const pemasokMenu: NavGroup[] = [
  {
    items: [
      { label: "Dashboard Pemasok", href: "/pemasok/dashboard", icon: "dashboard" },
      { label: "Profil Pemasok & Perusahaan", href: "#", icon: "storefront" },
      { label: "Katalog Bahan & Barang", href: "#", icon: "inventory_2" },
      { label: "Pesanan Pasokan (PO)", href: "#", icon: "receipt_long", badge: "5 Baru" },
      { label: "Permintaan Pembelian", href: "#", icon: "assignment_turned_in" },
      { label: "Pengiriman & Logistik", href: "#", icon: "local_shipping", badge: "4 Jalan" },
      { label: "Riwayat Transaksi", href: "#", icon: "account_balance_wallet" },
      { label: "Notifikasi", href: "#", icon: "notifications" },
      { label: "Pengaturan Akun", href: "#", icon: "settings" },
    ],
  },
];

export const gudangMenu: NavGroup[] = [
  {
    title: "Operasional Bisnis",
    items: [
      { label: "Dashboard Bisnis", href: "/pemilik/dashboard", icon: "dashboard" },
      { label: "Produk", href: "#", icon: "category" },
      { label: "Stok dan Inventaris", href: "#", icon: "inventory" },
      { label: "Manager Gudang", href: "/gudang/dashboard", icon: "warehouse" },
      { label: "Pemasok", href: "#", icon: "local_shipping" },
      { label: "Pembelian Bahan Baku", href: "#", icon: "shopping_cart_checkout" },
      { label: "Produksi", href: "#", icon: "skillet" },
      { label: "Distribusi", href: "#", icon: "rv_hookup" },
      { label: "Kasir (POS)", href: "/kasir", icon: "point_of_sale" },
      { label: "Pesanan Pelanggan", href: "#", icon: "receipt_long" },
      { label: "Rekap Penjualan", href: "#", icon: "finance" },
      { label: "Laporan SCM", href: "#", icon: "analytics" },
    ],
  },
];