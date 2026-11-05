import LiveClock from "@/components/kasir/LiveClock";

export default function KasirHeader({ onOpenHistory }: { onOpenHistory: () => void }) {
  return (
    <header className="sticky top-0 bg-surface-container-lowest/95 backdrop-blur-md z-30 border-b border-outline-variant/35 px-8 py-3.5 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.03)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-tertiary font-label-sm text-label-sm mb-1">
            <span>Dashboard</span>
            <span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">
              chevron_right
            </span>
            <span>Distribusi</span>
            <span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">
              chevron_right
            </span>
            <span className="text-primary font-semibold">Kasir (POS)</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
              Kasir dan Penjualan
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-primary font-label-sm text-label-sm border border-[#137A48]/20">
              <span className="w-2 h-2 rounded-full bg-[#137A48]" />
              <span>Kasir Aktif (Online)</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-tertiary mt-0.5">
            Kelola transaksi penjualan secara cepat, akurat, dan terintegrasi dengan data produk BAPER
          </p>
        </div>
        {/* Right Header Meta & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Outlet & Cashier Pill */}
          <div className="bg-[#F5F8F6] border border-outline-variant/40 rounded-xl px-3.5 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-sm">
              BH
            </div>
            <div className="text-left leading-tight">
              <p className="font-label-md text-label-md font-bold text-on-surface">Budi Hartono</p>
              <p className="font-body-sm text-[11px] text-tertiary">
                Kasir Shift Pagi • Kopi Kenangan Senopati #04
              </p>
            </div>
            <div className="border-l border-outline-variant/40 pl-3">
              <LiveClock className="font-label-md text-label-md font-bold text-primary tabular-nums" />
            </div>
          </div>
          {/* History Modal Button */}
          <button
            className="h-10 px-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface hover:text-primary transition-all flex items-center gap-2 font-label-md text-label-md shadow-sm active:scale-[0.98]"
            onClick={onOpenHistory}
          >
            <span className="material-symbols-outlined text-[18px]" data-icon="history">
              history
            </span>
            <span>Riwayat Transaksi</span>
          </button>
          {/* Shift Status Button */}
          <button className="h-10 px-3.5 rounded-xl bg-secondary-container/60 hover:bg-secondary-container border border-secondary text-primary transition-all flex items-center gap-2 font-label-md text-label-md active:scale-[0.98]">
            <span className="material-symbols-outlined text-[18px]" data-icon="schedule">
              schedule
            </span>
            <span>Shift 07.00 - 15.00</span>
          </button>
        </div>
      </div>
    </header>
  );
}
