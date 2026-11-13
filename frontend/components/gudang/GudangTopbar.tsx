export default function GudangTopbar() {
  return (
    <header className="sticky top-0 right-0 w-full px-8 h-16 flex items-center justify-between z-30 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
      {/* Search and Warehouse Navigation */}
      <div className="flex items-center gap-6">
        <div className="relative w-72 md:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            className="w-full bg-[#FFFFFF] border border-[#94B9A9]/60 rounded-xl pl-10 pr-4 py-1.5 text-body-md font-body-md focus:border-primary-container focus:ring-2 focus:ring-[#137A48]/15 outline-none placeholder:text-[#7B8794]"
            placeholder="Cari SKU, bahan baku, atau PO gudang..."
            type="text"
          />
        </div>
        <div className="hidden lg:flex items-center gap-2 bg-[#E8F3EC] border border-[#137A48]/20 px-3 py-1 rounded-full text-xs text-[#137A48] font-semibold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Status Sensor Suhu &amp; Kelembapan: Normal (24.2°C)</span>
        </div>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-3.5">
        {/* Warehouse Selector */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#94B9A9]/60 bg-[#F5F8F6] text-body-sm font-label-md">
          <span className="material-symbols-outlined text-[16px] text-primary">warehouse</span>
          <span className="font-semibold text-on-surface">Central Hub Cilandak</span>
          <span className="material-symbols-outlined text-[14px] text-tertiary">expand_more</span>
        </div>

        {/* Notification Icon Button */}
        <button
          className="relative p-2 rounded-xl text-tertiary hover:bg-surface-container-low transition-colors"
          title="Notifikasi Stok & PO"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-white" />
        </button>

        {/* Profile Tag */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-outline-variant/35">
          <div className="w-9 h-9 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-xs shadow-sm">
            BP
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-label-sm font-bold text-on-surface leading-tight">
              Bambang P.
            </span>
            <span className="text-[10px] text-tertiary leading-tight">
              Manager Logistik
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
