import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesanan Pelanggan | BAPER SCM Pemilik",
};

const ORDERS = [
  {
    orderId: "ORD-20240524-101",
    customer: "Sarah Amanda",
    channel: "WhatsApp AI Bot",
    channelVariant: "bot",
    items: "2x Kopi Kenangan Mantan (Less Sugar) + 1x Choco Toast",
    total: "Rp 66.000",
    payment: "QRIS Dinamis (Lunas)",
    time: "14:28 WIB",
    status: "Siap Pick-up",
    statusVariant: "ready",
  },
  {
    orderId: "ORD-20240524-102",
    customer: "Dimas Wicaksono",
    channel: "Kasir POS (Dine-in Meja 03)",
    channelVariant: "pos",
    items: "1x Americano Hot + 1x Butter Croissant",
    total: "Rp 48.000",
    payment: "Tunai / Cash (Lunas)",
    time: "14:32 WIB",
    status: "Sedang Dibuat Barista",
    statusVariant: "prep",
  },
  {
    orderId: "ORD-20240524-103",
    customer: "GoFood Driver (#GF-9921)",
    channel: "Online Food Delivery",
    channelVariant: "delivery",
    items: "3x Avocado Float + 2x Matcha Latte",
    total: "Rp 152.000",
    payment: "Aggregator Settlement",
    time: "14:35 WIB",
    status: "Driver Menuju Gerai",
    statusVariant: "shipping",
  },
  {
    orderId: "ORD-20240524-104",
    customer: "Rizky Fauzi",
    channel: "Kasir POS (Takeaway)",
    channelVariant: "pos",
    items: "1x Kopi Kenangan Mantan (Normal Sugar)",
    total: "Rp 22.000",
    payment: "GoPay QRIS",
    time: "14:38 WIB",
    status: "Menunggu Antrean",
    statusVariant: "queue",
  },
  {
    orderId: "ORD-20240524-105",
    customer: "Nadia Safitri",
    channel: "WhatsApp AI Bot",
    channelVariant: "bot",
    items: "4x Kopi Kenangan Mantan (Large) + 2x Donut Kampung",
    total: "Rp 118.000",
    payment: "BCA Virtual Account (Lunas)",
    time: "14:40 WIB",
    status: "Baru Masuk (Terverifikasi)",
    statusVariant: "new",
  },
];

export default function PemilikPesananPage() {
  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Omnichannel Order Feed
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live POS &amp; Bot Stream
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pesanan Masuk &amp; Antrean Bar
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau arus pesanan retail pelanggan dari Kasir POS fisik, integrasi WhatsApp AI Gemini, dan agregator pemesanan online secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/kasir"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
            <span>Buka Kasir POS</span>
          </a>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Pesanan Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">142 Order</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            134 Selesai, 8 Berjalan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Omzet Pesanan Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">Rp 6.420.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Rata-rata Rp 45.200 / Order
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Order via WhatsApp AI Bot</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">46 Order (32%)</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Auto-Closing Aktif
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Waktu Penyajian</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">3.4 Menit</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kecepatan Barista Optimal
          </span>
        </div>
      </div>

      {/* FILTER & TABS */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {["Semua Pesanan (142)", "Antrean Bar (5)", "Siap Ambil (3)", "Selesai (134)"].map((tab, idx) => (
            <button
              key={idx}
              type="button"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                idx === 0
                  ? "bg-primary text-white shadow-sm"
                  : "bg-[#F5F8F6] text-tertiary hover:bg-[#E8F3EC] hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Cari ID pesanan, nama pelanggan..."
            className="w-full h-10 pl-9 pr-3 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">No. Pesanan &amp; Waktu</th>
                <th className="py-4 px-4">Pelanggan</th>
                <th className="py-4 px-4">Saluran Order</th>
                <th className="py-4 px-4">Item &amp; Catatan Resep</th>
                <th className="py-4 px-4">Total &amp; Pembayaran</th>
                <th className="py-4 px-4">Status Bar</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {ORDERS.map((ord) => (
                <tr key={ord.orderId} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold font-mono text-[#172033]">{ord.orderId}</div>
                    <span className="text-xs text-tertiary">{ord.time}</span>
                  </td>

                  <td className="py-4 px-4 font-semibold text-[#172033]">{ord.customer}</td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ord.channelVariant === "bot"
                          ? "bg-[#E8F3EC] text-primary border border-primary/25"
                          : ord.channelVariant === "delivery"
                          ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                          : "bg-surface-container-low text-tertiary"
                      }`}
                    >
                      {ord.channel}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-xs text-on-surface max-w-xs">{ord.items}</td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-primary font-mono">{ord.total}</div>
                    <div className="text-[11px] text-tertiary">{ord.payment}</div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        ord.statusVariant === "ready"
                          ? "bg-[#E8F3EC] text-primary border border-primary/20"
                          : ord.statusVariant === "prep"
                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                          : ord.statusVariant === "shipping"
                          ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                          : "bg-surface-container-low text-tertiary"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-label-sm text-xs font-bold transition-all"
                    >
                      Detail
                    </button>
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
