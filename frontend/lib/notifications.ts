export type NotificationRole = "admin" | "pemilik" | "pemasok";

export type NotificationCategory =
  | "order"
  | "payment"
  | "warning"
  | "logistics"
  | "rfq"
  | "system";

export interface AppNotification {
  id: string;
  role: NotificationRole;
  title: string;
  message: string;
  category: NotificationCategory;
  categoryLabel: string;
  createdAt: string;
  timeLabel: string;
  unread: boolean;
  icon: string;
  actionLabel?: string;
  actionHref?: string;
}

export const NOTIFICATION_STORAGE_PREFIX = "baper.notifications.v1";

export const notificationStorageKey = (role: NotificationRole) =>
  `${NOTIFICATION_STORAGE_PREFIX}.${role}`;

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

/**
 * Notifikasi awal per role. Karena backend belum punya modul notifikasi,
 * data disimpan di localStorage dan bisa ditandai dibaca secara persisten.
 */
export function getSeedNotifications(role: NotificationRole): AppNotification[] {
  if (role === "admin") {
    return [
      {
        id: "adm-1",
        role,
        title: "Sinkronisasi Database Berhasil",
        message:
          "Snapshot data pengguna, bisnis, dan pemasok berhasil disegarkan dari MySQL. Tidak ada anomali integritas data.",
        category: "system",
        categoryLabel: "Sistem",
        createdAt: minutesAgo(18),
        timeLabel: "18 Menit lalu",
        unread: true,
        icon: "database",
        actionLabel: "Buka Dashboard",
        actionHref: "/admin/dashboard",
      },
      {
        id: "adm-2",
        role,
        title: "Bisnis F&B Baru Menunggu Verifikasi",
        message:
          "Ada 3 pendaftar pemilik bisnis baru yang memerlukan peninjauan dokumen NIB/NPWP sebelum portal diaktifkan.",
        category: "order",
        categoryLabel: "Verifikasi",
        createdAt: minutesAgo(65),
        timeLabel: "1 Jam lalu",
        unread: true,
        icon: "storefront",
        actionLabel: "Review Bisnis",
        actionHref: "/admin/bisnis",
      },
      {
        id: "adm-3",
        role,
        title: "Peringatan Kapasitas Penyimpanan",
        message:
          "Penggunaan storage database mencapai 78% dari kuota. Pertimbangkan menjalankan snapshot & pembersihan audit log lama.",
        category: "warning",
        categoryLabel: "Infrastruktur",
        createdAt: minutesAgo(180),
        timeLabel: "3 Jam lalu",
        unread: true,
        icon: "warning",
        actionLabel: "Buka Pengaturan",
        actionHref: "/admin/pengaturan",
      },
      {
        id: "adm-4",
        role,
        title: "Webhook Payment Gateway Pulih",
        message:
          "Koneksi callback payment gateway kembali normal setelah sempat gagal 2 kali. Antrean transaksi tertunda sudah diproses ulang.",
        category: "payment",
        categoryLabel: "Integrasi",
        createdAt: minutesAgo(420),
        timeLabel: "7 Jam lalu",
        unread: false,
        icon: "payments",
        actionLabel: "Cek Monitoring",
        actionHref: "/admin/monitoring",
      },
    ];
  }

  if (role === "pemilik") {
    return [
      {
        id: "own-1",
        role,
        title: "3 Stok Bahan Baku Kritis",
        message:
          "Susu UHT, Butter Anchor, dan Biji Arabika berada di bawah batas minimum. Buat PO baru agar operasional besok tidak terganggu.",
        category: "warning",
        categoryLabel: "Peringatan Stok",
        createdAt: minutesAgo(12),
        timeLabel: "12 Menit lalu",
        unread: true,
        icon: "warning",
        actionLabel: "Pesan Bahan Baku",
        actionHref: "/pemilik/pembelian",
      },
      {
        id: "own-2",
        role,
        title: "Pesanan Baru Masuk dari Kasir POS",
        message:
          "Ada pesanan pelanggan baru senilai Rp 186.000 yang menunggu dikirim ke Kitchen & Barista.",
        category: "order",
        categoryLabel: "Pesanan Masuk",
        createdAt: minutesAgo(24),
        timeLabel: "24 Menit lalu",
        unread: true,
        icon: "receipt_long",
        actionLabel: "Kelola Pesanan",
        actionHref: "/pemilik/pesanan",
      },
      {
        id: "own-3",
        role,
        title: "Purchase Order Dikonfirmasi Pemasok",
        message:
          "PT Tani Makmur Sejahtera mengonfirmasi PO biji kopi 120 kg. Estimasi pengiriman ke gudang utama besok pukul 09:00.",
        category: "logistics",
        categoryLabel: "Logistik",
        createdAt: minutesAgo(95),
        timeLabel: "1 Jam lalu",
        unread: true,
        icon: "local_shipping",
        actionLabel: "Lihat Pembelian",
        actionHref: "/pemilik/pembelian",
      },
      {
        id: "own-4",
        role,
        title: "Rekap Penjualan Harian Siap",
        message:
          "Laporan penjualan dan arus kas shift kemarin sudah tersedia. Unduh CSV dari halaman laporan SCM.",
        category: "payment",
        categoryLabel: "Laporan",
        createdAt: minutesAgo(600),
        timeLabel: "10 Jam lalu",
        unread: false,
        icon: "analytics",
        actionLabel: "Buka Laporan SCM",
        actionHref: "/pemilik/laporan-scm",
      },
    ];
  }

  return [
    {
      id: "sup-1",
      role,
      title: "Pesanan Baru Masuk: Kopi Kenangan Senopati",
      message:
        "Purchase Order #PO-BPR-2024-0589 senilai Rp 12.850.000 menunggu konfirmasi alokasi stok gudang untuk jadwal kirim besok pagi.",
      category: "order",
      categoryLabel: "Pesanan Masuk",
      createdAt: minutesAgo(25),
      timeLabel: "25 Menit lalu",
      unread: true,
      icon: "receipt_long",
      actionLabel: "Lihat Rincian PO",
      actionHref: "/pemasok/pesanan-po",
    },
    {
      id: "sup-2",
      role,
      title: "Pesanan Baru Masuk: Fore Coffee Grand Indonesia",
      message:
        "Purchase Order #PO-BPR-2024-0590 senilai Rp 8.420.000 membutuhkan 60L Oat Milk dan 40kg Robusta Dampit.",
      category: "order",
      categoryLabel: "Pesanan Masuk",
      createdAt: minutesAgo(45),
      timeLabel: "45 Menit lalu",
      unread: true,
      icon: "receipt_long",
      actionLabel: "Lihat Rincian PO",
      actionHref: "/pemasok/pesanan-po",
    },
    {
      id: "sup-3",
      role,
      title: "Pembayaran Diterima: Kopi Kenangan Mall Kelapa Gading 3",
      message:
        "Dana pelunasan Invoice #INV-2024-05-098 sebesar Rp 18.250.000 telah masuk ke rekening Mandiri Virtual Account resmi Anda.",
      category: "payment",
      categoryLabel: "Pembayaran",
      createdAt: minutesAgo(60),
      timeLabel: "1 Jam lalu",
      unread: true,
      icon: "account_balance_wallet",
      actionLabel: "Cek Bukti Transfer",
      actionHref: "/pemasok/riwayat",
    },
    {
      id: "sup-4",
      role,
      title: "Peringatan Stok Buffer: Oat Milk Barista Menipis",
      message:
        "Sisa persediaan fisik Oat Milk Barista di Central Storage tersisa 85 Liter (Batas aman: 100 Liter). Segera jadwalkan pengadaan ulang dari pabrikan.",
      category: "warning",
      categoryLabel: "Peringatan Stok",
      createdAt: minutesAgo(120),
      timeLabel: "2 Jam lalu",
      unread: true,
      icon: "warning",
      actionLabel: "Buka Katalog Bahan",
      actionHref: "/pemasok/katalog",
    },
    {
      id: "sup-5",
      role,
      title: "Armada Pengiriman Memasuki Radius Gerai",
      message:
        "Truk Chiller B 9481 PXZ (Driver: Agus Hermawan) telah tiba di area bongkar muat Kopi Kenangan Gandaria City.",
      category: "logistics",
      categoryLabel: "Logistik",
      createdAt: minutesAgo(180),
      timeLabel: "3 Jam lalu",
      unread: false,
      icon: "local_shipping",
      actionLabel: "Lacak Armada",
      actionHref: "/pemasok/pengiriman",
    },
    {
      id: "sup-6",
      role,
      title: "Surat Jalan (DO) Berhasil Ditandatangani (POD Sah)",
      message:
        "Surat Jalan #DO-BPR-2024-0818 telah divalidasi dan diterima oleh Supervisor Barista MKG 3 dengan suhu penerimaan 3.4°C.",
      category: "logistics",
      categoryLabel: "Logistik",
      createdAt: minutesAgo(300),
      timeLabel: "5 Jam lalu",
      unread: false,
      icon: "task_alt",
      actionLabel: "Unduh e-POD",
      actionHref: "/pemasok/pengiriman",
    },
    {
      id: "sup-7",
      role,
      title: "Tender Baru Dibuka: Kebutuhan Susu Segar Dear Butter",
      message:
        "Dear Butter Bakery membuka RFQ pengadaan 800 Liter Fresh Milk / bulan untuk kontrak 6 bulan. Batas penawaran 2 hari lagi.",
      category: "rfq",
      categoryLabel: "Tender & RFQ",
      createdAt: minutesAgo(1440),
      timeLabel: "Kemarin",
      unread: false,
      icon: "assignment_turned_in",
      actionLabel: "Ajukan Penawaran",
      actionHref: "/pemasok/permintaan",
    },
  ];
}

export const NOTIFICATION_CATEGORY_META: Record<
  NotificationCategory,
  { label: string; icon: string; tone: "primary" | "warning" | "blue" | "neutral" }
> = {
  order: { label: "Pesanan Masuk", icon: "receipt_long", tone: "primary" },
  payment: { label: "Pembayaran", icon: "payments", tone: "primary" },
  warning: { label: "Peringatan", icon: "warning", tone: "warning" },
  logistics: { label: "Logistik", icon: "local_shipping", tone: "blue" },
  rfq: { label: "Tender & RFQ", icon: "assignment", tone: "neutral" },
  system: { label: "Sistem", icon: "settings", tone: "neutral" },
};

export type { NotificationCategory as AppNotificationCategory };
