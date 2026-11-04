export default function KpiCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* KPI 1 */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex items-start justify-between">
        <div>
          <span className="font-label-md text-label-md text-tertiary font-medium">Transaksi Hari Ini</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">84</span>
            <span className="font-label-sm text-label-sm text-tertiary">Struk</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#E8F3EC] text-[#137A48] font-label-sm text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px]" data-icon="trending_up">
                trending_up
              </span>{" "}
              +12%
            </span>
            <span className="font-body-sm text-[11px] text-tertiary">vs kemarin</span>
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
          <span className="font-label-md text-label-md text-tertiary font-medium">Pendapatan Hari Ini</span>
          <div className="mt-1">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">Rp 2.845.000</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-body-sm text-[11px] text-tertiary">
              Target Harian: <span className="font-semibold text-on-surface">Rp 3.500.000</span> (81%)
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
            <span className="font-headline-lg text-headline-lg font-bold text-[#D99A25]">3</span>
            <span className="font-label-sm text-label-sm text-tertiary">Pesanan</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-body-sm text-[11px] text-tertiary">Meja 02, WhatsApp Bot #8822</span>
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
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">Rp 33.800</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-body-sm text-[11px] text-tertiary">Rata-rata 2.4 produk / struk</span>
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
