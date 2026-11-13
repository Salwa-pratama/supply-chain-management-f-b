import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitoring Pesanan Platform | BAPER SCM Super Admin",
};

const ORDERS_FEED = [
  {
    id: "TRX-BPR-9021",
    brand: "Kopi Kenangan Senopati #04",
    items: "2x Aren Latte, 1x Choco Toast",
    amount: "Rp 66.000",
    payment: "QRIS Dinamis (Lunas)",
    type: "Dine-in POS",
    time: "2 Menit lalu",
    status: "Selesai",
  },
  {
    id: "TRX-BPR-9020",
    brand: "Fore Coffee Grand Indonesia",
    items: "1x Butterscotch Sea Salt, 1x Kouign Amann",
    amount: "Rp 72.000",
    payment: "BCA Virtual Account",
    type: "WhatsApp Gemini Bot",
    time: "5 Menit lalu",
    status: "Diproses Kitchen",
  },
  {
    id: "TRX-BPR-9019",
    brand: "Dear Butter BSD",
    items: "5x Original Croffle Box",
    amount: "Rp 125.000",
    payment: "GoPay E-Wallet",
    type: "Takeaway",
    time: "8 Menit lalu",
    status: "Selesai",
  },
  {
    id: "PO-BPR-0589",
    brand: "Kopi Kenangan ➔ PT Tani Makmur",
    items: "50kg Arabika Gayo + 120L Fresh Milk",
    amount: "Rp 12.850.000",
    payment: "Invoice B2B TOP 14",
    type: "Pasokan PO Bahan Baku",
    time: "25 Menit lalu",
    status: "Menunggu Konfirmasi Vendor",
  },
];

export default function AdminPesananPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Transaksi &amp; Order Stream Nasional
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live Feed Gateway
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Monitoring Pesanan Lintas Tenant
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau arus transaksi kasir POS retail dan pesanan pasokan bahan baku (B2B PO) di seluruh Indonesia secara live.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor Transaksi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Transaksi Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">3.412 Order</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            +14% dari Kemarin
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Perputaran Nilai Transaksi (GMV)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">Rp 218.400.000</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Hari Berjalan (Per 14:30 WIB)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pesanan Bahan Baku B2B</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">48 PO</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Nilai: Rp 142.5 Juta
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Tingkat Kegagalan Transaksi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">&lt; 0.05%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Payment Gateway Stabil
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">No. Transaksi / PO</th>
                <th className="py-4 px-4">Brand / Outlet</th>
                <th className="py-4 px-4">Rincian Pembelian</th>
                <th className="py-4 px-4">Tipe Saluran</th>
                <th className="py-4 px-4">Nominal</th>
                <th className="py-4 px-4">Metode Bayar</th>
                <th className="py-4 px-4">Waktu</th>
                <th className="py-4 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {ORDERS_FEED.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5 font-bold font-mono text-[#172033]">{ord.id}</td>
                  <td className="py-4 px-4 font-semibold text-on-surface">{ord.brand}</td>
                  <td className="py-4 px-4 text-xs text-tertiary">{ord.items}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F8F6] text-tertiary border border-outline-variant/35">
                      {ord.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-primary font-mono">{ord.amount}</td>
                  <td className="py-4 px-4 text-xs text-on-surface">{ord.payment}</td>
                  <td className="py-4 px-4 text-xs text-tertiary">{ord.time}</td>
                  <td className="py-4 px-5 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20">
                      {ord.status}
                    </span>
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
