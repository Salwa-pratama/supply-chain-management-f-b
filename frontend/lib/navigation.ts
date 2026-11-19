import type { NavGroup } from "@/components/layout/SidebarNav";

export type DashboardRole = "admin" | "pemilik" | "gudang" | "pemasok";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  description?: string;
}

export interface NavGroupConfig {
  title?: string;
  items: NavItemConfig[];
}

export interface DashboardConfig {
  role: DashboardRole;
  roleBadge: string;
  roleSubtitle: string;
  portalTitle: string;
  homeUrl: string;
  quickAction?: {
    label: string;
    icon: string;
    href?: string;
  };
  helpText: string;
  groups: NavGroupConfig[];
}

/**
 * Konfigurasi Menu & Navigasi Terpusat untuk Seluruh Dashboard (Super Admin, Pemilik Bisnis, Manager Gudang, Pemasok).
 */
export const DASHBOARD_NAV_CONFIG: Record<DashboardRole, DashboardConfig> = {
  admin: {
    role: "admin",
    roleBadge: "SUPER ADMIN",
    roleSubtitle: "Pusat Ekosistem Nasional",
    portalTitle: "Pusat Kendali Ekosistem BAPER SCM",
    homeUrl: "/admin/dashboard",
    quickAction: {
      label: "Kelola Hak Akses",
      icon: "shield_person",
      href: "/admin/pengguna",
    },
    helpText: "Pusat Bantuan SCM",
    groups: [
      {
        items: [
          { label: "Dashboard Super Admin", href: "/admin/dashboard", icon: "dashboard" },
          { label: "Manajemen Pengguna", href: "/admin/pengguna", icon: "manage_accounts" },
          { label: "Data Pemilik Bisnis FNB", href: "/admin/bisnis", icon: "storefront" },
          { label: "Data Pemasok & Mitra", href: "/admin/pemasok", icon: "local_shipping" },
          { label: "Data Konsumen", href: "/admin/konsumen", icon: "groups" },
          { label: "Monitoring Rantai Pasok", href: "/admin/monitoring", icon: "hub" },
          { label: "Monitoring Pesanan", href: "/admin/pesanan", icon: "receipt_long" },
          { label: "Laporan & Statistik", href: "/admin/laporan", icon: "bar_chart" },
          { label: "Pengaturan Sistem", href: "/admin/pengaturan", icon: "settings" },
        ],
      },
    ],
  },

  pemilik: {
    role: "pemilik",
    roleBadge: "PEMILIK BISNIS",
    roleSubtitle: "Store & Chain Management",
    portalTitle: "Portal Pemilik Bisnis F&B",
    homeUrl: "/pemilik/dashboard",
    quickAction: {
      label: "Pesan Bahan Baku",
      icon: "add_shopping_cart",
      href: "/pemilik/pembelian",
    },
    helpText: "Pusat Bantuan Bisnis",
    groups: [
      {
        title: "Navigasi Utama",
        items: [
          { label: "Dashboard Bisnis", href: "/pemilik/dashboard", icon: "dashboard" },
          { label: "Katalog Produk", href: "/pemilik/produk", icon: "restaurant_menu" },
          { label: "Stok & Inventaris", href: "/pemilik/inventaris", icon: "inventory_2", badge: "3 Kritis" },
          { label: "Pemasok & Mitra", href: "/pemilik/pemasok", icon: "local_shipping" },
          { label: "Pembelian Bahan", href: "/pemilik/pembelian", icon: "shopping_bag" },
          { label: "Kitchen & Produksi", href: "/pemilik/produksi", icon: "blender" },
          { label: "Distribusi Outlet", href: "/pemilik/distribusi", icon: "delivery_dining" },
          { label: "Pesanan Pelanggan", href: "/pemilik/pesanan", icon: "receipt_long" },
          { label: "Kelola Karyawan", href: "/pemilik/staf", icon: "badge" },
          { label: "Monitoring Rantai Pasok", href: "/pemilik/monitoring", icon: "schema" },
          { label: "Kasir (POS)", href: "/kasir", icon: "point_of_sale" },
        ],
      },
      {
        title: "Laporan & Keuangan",
        items: [
          { label: "Rekap Penjualan", href: "/pemilik/keuangan", icon: "account_balance_wallet" },
          { label: "Laporan SCM", href: "/pemilik/laporan-scm", icon: "analytics" },
        ],
      },
    ],
  },

  gudang: {
    role: "gudang",
    roleBadge: "MANAGER GUDANG",
    roleSubtitle: "Hub Logistik & Bahan Baku",
    portalTitle: "Portal Manajemen Gudang & Logistik",
    homeUrl: "/gudang/dashboard",
    quickAction: {
      label: "Verifikasi QC Masuk",
      icon: "fact_check",
      href: "/gudang/penerimaan-qc",
    },
    helpText: "Bantuan Gudang",
    groups: [
      {
        title: "Operasional Gudang",
        items: [
          { label: "Dashboard Gudang", href: "/gudang/dashboard", icon: "warehouse" },
          { label: "Stok & Inventaris Bahan", href: "/gudang/inventaris", icon: "inventory_2" },
          { label: "Penerimaan & QC Masuk", href: "/gudang/penerimaan-qc", icon: "fact_check", badge: "2 Antre" },
          { label: "Stok Opname & Audit", href: "/gudang/opname", icon: "inventory" },
          { label: "Data Pemasok Gudang", href: "/gudang/pemasok", icon: "local_shipping" },
          { label: "Permintaan Bahan (PO)", href: "/gudang/permintaan-bahan", icon: "shopping_cart_checkout" },
          { label: "Pengeluaran Kitchen", href: "/gudang/pengeluaran-kitchen", icon: "skillet" },
          { label: "Distribusi ke Outlet", href: "/gudang/distribusi", icon: "rv_hookup" },
          { label: "Laporan Mutasi & Stok", href: "/gudang/laporan", icon: "analytics" },
        ],
      },
    ],
  },

  pemasok: {
    role: "pemasok",
    roleBadge: "PORTAL PEMASOK",
    roleSubtitle: "B2B Supply Hub",
    portalTitle: "Portal Pasokan Bahan Baku F&B",
    homeUrl: "/pemasok/dashboard",
    quickAction: {
      label: "Perbarui Stok Gudang",
      icon: "add_circle",
      href: "/pemasok/katalog",
    },
    helpText: "Pusat Bantuan Mitra",
    groups: [
      {
        items: [
          { label: "Dashboard Pemasok", href: "/pemasok/dashboard", icon: "dashboard" },
          { label: "Profil Pemasok & Perusahaan", href: "/pemasok/profil", icon: "storefront" },
          { label: "Katalog Bahan & Barang", href: "/pemasok/katalog", icon: "inventory_2" },
          { label: "Pesanan Pasokan (PO)", href: "/pemasok/pesanan-po", icon: "receipt_long", badge: "5 Baru" },
          { label: "Permintaan Pembelian", href: "/pemasok/permintaan", icon: "assignment_turned_in" },
          { label: "Pengiriman & Logistik", href: "/pemasok/pengiriman", icon: "local_shipping", badge: "4 Jalan" },
          { label: "Riwayat Transaksi", href: "/pemasok/riwayat", icon: "account_balance_wallet" },
          { label: "Notifikasi", href: "/pemasok/notifikasi", icon: "notifications" },
          { label: "Pengaturan Akun", href: "/pemasok/pengaturan", icon: "settings" },
        ],
      },
    ],
  },
};

export const adminMenu: NavGroup[] = DASHBOARD_NAV_CONFIG.admin.groups;
export const pemilikMenu: NavGroup[] = DASHBOARD_NAV_CONFIG.pemilik.groups;
export const gudangMenu: NavGroup[] = DASHBOARD_NAV_CONFIG.gudang.groups;
export const pemasokMenu: NavGroup[] = DASHBOARD_NAV_CONFIG.pemasok.groups;
