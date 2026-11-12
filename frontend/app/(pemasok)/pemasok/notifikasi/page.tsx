import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = {
  title: "Notifikasi Pemasok | BAPER SCM",
};

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Pesanan Baru Masuk: Kopi Kenangan Senopati",
    message: "Purchase Order #PO-BPR-2024-0589 senilai Rp 12.850.000 menunggu konfirmasi alokasi stok gudang untuk jadwal kirim besok pagi.",
    category: "Pesanan Masuk",
    categoryVariant: "order",
    time: "25 Menit lalu",
    unread: true,
    actionLabel: "Lihat Rincian PO",
    actionHref: "/pemasok/pesanan-po",
    icon: "receipt_long",
  },
  {
    id: 2,
    title: "Pesanan Baru Masuk: Fore Coffee Grand Indonesia",
    message: "Purchase Order #PO-BPR-2024-0590 senilai Rp 8.420.000 membutuhkan 60L Oat Milk dan 40kg Robusta Dampit.",
    category: "Pesanan Masuk",
    categoryVariant: "order",
    time: "45 Menit lalu",
    unread: true,
    actionLabel: "Lihat Rincian PO",
    actionHref: "/pemasok/pesanan-po",
    icon: "receipt_long",
  },
  {
    id: 3,
    title: "Pembayaran Diterima: Kopi Kenangan Mall Kelapa Gading 3",
    message: "Dana pelunasan Invoice #INV-2024-05-098 sebesar Rp 18.250.000 telah masuk ke rekening Mandiri Virtual Account resmi Anda.",
    category: "Pembayaran",
    categoryVariant: "payment",
    time: "1 Jam lalu",
    unread: true,
    actionLabel: "Cek Bukti Transfer",
    actionHref: "/pemasok/riwayat",
    icon: "account_balance_wallet",
  },
  {
    id: 4,
    title: "Peringatan Stok Buffer: Oat Milk Barista Menipis",
    message: "Sisa persediaan fisik Oat Milk Barista di Central Storage tersisa 85 Liter (Batas aman: 100 Liter). Segera jadwalkan pengadaan ulang dari pabrikan.",
    category: "Peringatan Stok",
    categoryVariant: "warning",
    time: "2 Jam lalu",
    unread: true,
    actionLabel: "Buka Katalog Bahan",
    actionHref: "/pemasok/katalog",
    icon: "warning",
  },
  {
    id: 5,
    title: "Armada Pengiriman Memasuki Radius Gerai",
    message: "Truk Chiller B 9481 PXZ (Driver: Agus Hermawan) telah tiba di area bongkar muat Kopi Kenangan Gandaria City.",
    category: "Logistik",
    categoryVariant: "logistics",
    time: "3 Jam lalu",
    unread: false,
    actionLabel: "Lacak Armada",
    actionHref: "/pemasok/pengiriman",
    icon: "local_shipping",
  },
  {
    id: 6,
    title: "Surat Jalan (DO) Berhasil Ditandatangani (POD Sah)",
    message: "Surat Jalan #DO-BPR-2024-0818 telah divalidasi dan diterima oleh Supervisor Barista MKG 3 dengan suhu penerimaan 3.4°C.",
    category: "Logistik",
    categoryVariant: "logistics",
    time: "5 Jam lalu",
    unread: false,
    actionLabel: "Unduh e-POD",
    actionHref: "/pemasok/pengiriman",
    icon: "task_alt",
  },
  {
    id: 7,
    title: "Tender Baru Dibuka: Kebutuhan Susu Segar Dear Butter",
    message: "Dear Butter Bakery membuka RFQ pengadaan 800 Liter Fresh Milk / bulan untuk kontrak 6 bulan. Batas penawaran 2 hari lagi.",
    category: "Tender & RFQ",
    categoryVariant: "rfq",
    time: "Kemarin",
    unread: false,
    actionLabel: "Ajukan Penawaran",
    actionHref: "/pemasok/permintaan",
    icon: "assignment_turned_in",
  },
];

export default function PemasokNotifikasiPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Pusat Aktivitas &amp; Notifikasi
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                4 Notifikasi Belum Dibaca
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Notifikasi &amp; Pembaruan Operasional
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Pantau informasi PO terbaru, pergerakan pengiriman logistik, konfirmasi pembayaran, dan peringatan batas stok bahan baku.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              <span>Tandai Semua Sudah Dibaca</span>
            </button>
            <a
              href="/pemasok/pengaturan"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span>Preferensi Notifikasi</span>
            </a>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { label: "Semua Notifikasi", count: 7, active: true },
            { label: "Pesanan Masuk (PO)", count: 2, active: false, alert: true },
            { label: "Logistik & Armada", count: 2, active: false },
            { label: "Pembayaran & Keuangan", count: 1, active: false },
            { label: "Peringatan Stok", count: 1, active: false, alert: true },
            { label: "Tender & RFQ", count: 1, active: false },
          ].map((tab, idx) => (
            <button
              key={idx}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                tab.active
                  ? "bg-primary text-white font-bold shadow-sm"
                  : "bg-white border border-outline-variant/35 text-tertiary hover:text-on-surface hover:bg-[#F5F8F6]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  tab.active
                    ? "bg-white/20 text-white"
                    : tab.alert
                    ? "bg-[#FDF2F2] text-[#B54747]"
                    : "bg-[#F5F8F6] text-tertiary"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="space-y-3">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition-all hover:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                n.unread
                  ? "bg-white border-primary/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]"
                  : "bg-[#F9F9FF] border-outline-variant/25 opacity-85"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    n.categoryVariant === "order"
                      ? "bg-[#E8F3EC] text-primary border-primary/20"
                      : n.categoryVariant === "payment"
                      ? "bg-[#E8F3EC] text-primary border-primary/20"
                      : n.categoryVariant === "warning"
                      ? "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/30"
                      : n.categoryVariant === "logistics"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]"
                      : "bg-[#F5F8F6] text-tertiary border-outline-variant/30"
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{n.icon}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[#172033] text-body-md">{n.title}</h3>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-primary" title="Belum dibaca" />
                    )}
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        n.categoryVariant === "order"
                          ? "bg-[#E8F3EC] text-primary"
                          : n.categoryVariant === "payment"
                          ? "bg-[#E8F3EC] text-primary"
                          : n.categoryVariant === "warning"
                          ? "bg-[#FFF9E6] text-[#B7791F]"
                          : "bg-[#EFF6FF] text-[#1D4ED8]"
                      }`}
                    >
                      {n.category}
                    </span>
                  </div>

                  <p className="text-body-sm text-tertiary leading-relaxed max-w-3xl">
                    {n.message}
                  </p>

                  <div className="text-xs text-tertiary flex items-center gap-2 pt-0.5">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>{n.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <a
                  href={n.actionHref}
                  className="h-10 px-4 rounded-xl border border-primary/30 text-primary hover:bg-[#E8F3EC] text-label-md font-label-md flex items-center gap-1.5 transition-colors font-bold whitespace-nowrap"
                >
                  <span>{n.actionLabel}</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
