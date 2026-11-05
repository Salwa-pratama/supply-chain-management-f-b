export default function PemasokTopbar() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] px-8 flex items-center justify-between">
      {/* Search & Merchant Partner Identity */}
      <div className="flex items-center gap-6">
        {/* Search Bar on Left */}
        <div className="relative w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-tertiary">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[#7B8794]"
            placeholder="Cari SKU, nama bahan, atau nomor PO..."
            type="text"
          />
        </div>
        <div className="h-6 w-[1px] bg-outline-variant/40 hidden md:block" />
        {/* Mitra Pemasok Info Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                PT Tani Makmur Sejahtera
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8F3EC] text-primary border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Menerima Pesanan
              </span>
            </div>
            <span className="text-body-sm text-tertiary font-body-sm text-[12px]">
              Pemasok Resmi Biji Kopi & Susu Segar • ID Pemasok: SUP-JKT-8821
            </span>
          </div>
        </div>
      </div>
      {/* Trailing Action Cluster */}
      <div className="flex items-center gap-3">
        {/* Warehouse Branch Selector */}
        <div className="relative">
          <button className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-outline-variant/50 bg-white text-on-surface hover:bg-[#E8F3EC]/50 font-label-md text-label-md transition-colors">
            <span className="material-symbols-outlined text-[18px] text-primary">warehouse</span>
            <span className="hidden sm:inline">Gudang Utama: Cilandak</span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">arrow_drop_down</span>
          </button>
        </div>
        {/* Notification Bell with Ping */}
        <button
          className="relative w-10 h-10 rounded-xl border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-[#E8F3EC] transition-colors"
          title="Notifikasi Baru"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#B54747] rounded-full border-2 border-white" />
        </button>
        {/* Divider */}
        <div className="h-6 w-[1px] bg-outline-variant/40" />
        {/* Profile Avatar & Meta */}
        <div className="flex items-center gap-3 pl-1 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-secondary-container border border-primary/20 flex items-center justify-center font-bold text-primary text-sm group-hover:scale-105 transition-transform shadow-sm">
            TM
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-label-md font-label-md text-on-surface">Hendro Prasetyo</span>
            <span className="text-[11px] text-tertiary">Kepala Logistik & Distribusi</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-tertiary group-hover:text-primary transition-colors">
            expand_more
          </span>
        </div>
      </div>
    </header>
  );
}
