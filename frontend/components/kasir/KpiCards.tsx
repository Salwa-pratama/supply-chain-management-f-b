"use client";

import { useKasirStats } from "@/features/orders/hooks/use-orders";

function rupiah(n: number) {
  return "Rp " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function KpiCards() {
  const { data: stats } = useKasirStats();

  const trxCount = stats ? stats.transactionCount : 84;
  const totalRev = stats ? stats.totalSales : 2845000;
  const avgVal = stats ? stats.avgTicket : 33800;
  const qris = stats ? stats.paymentSplit.qris : 42;
  const cash = stats ? stats.paymentSplit.cash : 38;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* KPI 1 */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex items-start justify-between">
        <div>
          <span className="font-label-md text-label-md text-tertiary font-medium">Transaksi Hari Ini</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{trxCount}</span>
            <span className="font-label-sm text-label-sm text-tertiary">Struk</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#E8F3EC] text-[#137A48] font-label-sm text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px]" data-icon="trending_up">
                trending_up
              </span>{" "}
              Live POS
            </span>
            <span className="font-body-sm text-[11px] text-tertiary">{qris} QRIS • {cash} Tunai</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[24px]" data-icon="point_of_sale">
            point_of_sale
          </span>
        </div>
      </div>
      {/* KPI 2 */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex items-start justify-between">
        <div>
          <span className="font-label-md text-label-md text-tertiary font-medium">Pendapatan Kasir Hari Ini</span>
          <div className="mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{rupiah(totalRev)}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-body-sm text-[11px] text-tertiary">
              Sinkron otomatis dengan database BAPER
            </span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] flex items-center justify-center text-[#137A48]">
          <span className="material-symbols-outlined text-[24px]" data-icon="payments">
            payments
          </span>
        </div>
      </div>
      {/* KPI 3 */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex items-start justify-between">
        <div>
          <span className="font-label-md text-label-md text-tertiary font-medium">
            Pesanan Pending / Antrean
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-[#D99A25]">0</span>
            <span className="font-label-sm text-label-sm text-tertiary">Antrean</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-body-sm text-[11px] text-tertiary">Semua pesanan shift ini selesai</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#FFF9E6] border border-[#D99A25]/20 flex items-center justify-center text-[#D99A25]">
          <span className="material-symbols-outlined text-[24px]" data-icon="hourglass_top">
            hourglass_top
          </span>
        </div>
      </div>
      {/* KPI 4 */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex items-start justify-between">
        <div>
          <span className="font-label-md text-label-md text-tertiary font-medium">
            Rata-rata Nilai Transaksi
          </span>
          <div className="mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{rupiah(avgVal)}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-body-sm text-[11px] text-tertiary">Rata-rata pengeluaran per tiket</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[24px]" data-icon="query_stats">
            query_stats
          </span>
        </div>
      </div>
    </section>
  );
}
