"use client";

import { useOrders } from "@/features/orders/hooks/use-orders";

export default function AdminKonsumenPage() {
  const { data: orders = [], isLoading } = useOrders();

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Ekosistem Konsumen &amp; Pelanggan Ritel
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live Database BAPER
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Data Konsumen &amp; Pelanggan
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Database pembeli akhir yang bertransaksi langsung melalui kasir POS outlet dan pesanan online.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Transaksi Konsumen</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{orders.length} Trx</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tersimpan di Database
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Akumulasi Nilai Belanja</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">
            Rp {totalSpent.toLocaleString("id-ID")}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Total GMV Kasir
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Tiket Belanja</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">
            Rp {orders.length > 0 ? Math.round(totalSpent / orders.length).toLocaleString("id-ID") : 0}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Per Transaksi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Kanal Transaksi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">100% Kasir POS</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Langsung di Outlet
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat data transaksi konsumen...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-tertiary">Belum ada transaksi konsumen tercatat.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">ID Struk Transaksi</th>
                  <th className="py-4 px-4">Kasir Pembantu</th>
                  <th className="py-4 px-4">Jenis Pesanan</th>
                  <th className="py-4 px-4 font-mono">Total Bayar</th>
                  <th className="py-4 px-4">Metode Pembayaran</th>
                  <th className="py-4 px-5 text-right">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                    <td className="py-4 px-5">
                      <span className="font-mono font-bold text-primary">#TRX-{o.id.slice(0, 8).toUpperCase()}</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-on-surface">{o.createdBy?.name || "Kasir"}</td>
                    <td className="py-4 px-4 capitalize">{o.orderType || "Dine-in"}</td>
                    <td className="py-4 px-4 font-mono font-bold text-primary">
                      Rp {Number(o.totalAmount).toLocaleString("id-ID")}
                    </td>
                    <td className="py-4 px-4 uppercase text-xs font-bold">{o.paymentMethod}</td>
                    <td className="py-4 px-5 text-right text-xs text-tertiary">
                      {new Date(o.createdAt).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      WIB
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
