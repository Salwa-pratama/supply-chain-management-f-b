"use client";

import { useOrders } from "@/features/orders/hooks/use-orders";

export default function AdminPesananPage() {
  const { data: orders = [], isLoading } = useOrders();

  const totalTrx = orders.length;
  const totalGmv = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
  const qrisCount = orders.filter((o) => o.paymentMethod === "qris").length;
  const cashCount = orders.filter((o) => o.paymentMethod === "cash").length;

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
              Live Feed Gateway BAPER
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Monitoring Pesanan Lintas Tenant
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau arus transaksi kasir POS retail dan pesanan penjualan di platform secara live dan real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Transaksi Hari Ini</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{totalTrx} Order</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Live Sinkron POS
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Perputaran Nilai (GMV)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">
            Rp {totalGmv.toLocaleString("id-ID")}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Omzet Tercatat
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pembayaran QRIS</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{qrisCount} Trx</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            QRIS Dinamis
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pembayaran Tunai (Cash)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{cashCount} Trx</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tunai Kasir
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat data transaksi live...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-tertiary">Belum ada transaksi pesanan tercatat.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">ID Struk Transaksi</th>
                  <th className="py-4 px-4">Kasir / Pembuat</th>
                  <th className="py-4 px-4">Item Menu Terjual</th>
                  <th className="py-4 px-4 font-mono">Total Transaksi</th>
                  <th className="py-4 px-4">Metode Bayar</th>
                  <th className="py-4 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {orders.map((o) => {
                  const trxNo = `#TRX-${o.id.slice(0, 8).toUpperCase()}`;
                  return (
                    <tr key={o.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                      <td className="py-4 px-5">
                        <span className="font-mono font-bold text-primary">{trxNo}</span>
                        <div className="text-xs text-tertiary">
                          {new Date(o.createdAt).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          WIB
                        </div>
                      </td>

                      <td className="py-4 px-4 font-semibold text-on-surface">
                        {o.createdBy?.name || "Kasir Shift Pagi"}
                      </td>

                      <td className="py-4 px-4 text-xs text-tertiary max-w-xs truncate">
                        {o.orderItems.map((i) => `${i.product?.name || "Menu"} (${i.quantity}x)`).join(", ")}
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-primary">
                        Rp {Number(o.totalAmount).toLocaleString("id-ID")}
                      </td>

                      <td className="py-4 px-4">
                        <span className="uppercase text-xs font-bold px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant">
                          {o.paymentMethod}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Selesai
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
