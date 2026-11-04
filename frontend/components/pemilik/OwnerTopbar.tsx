export default function OwnerTopbar() {
  return (
    <header className="sticky top-0 right-0 w-full px-8 h-16 flex items-center justify-between z-30 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
      {/* Left: Store Branch Selector & Search Bar */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/35">
          <span className="material-symbols-outlined text-primary text-[20px]">storefront</span>
          <select
            className="bg-transparent border-0 text-on-surface font-label-lg text-label-lg focus:ring-0 p-0 pr-4 cursor-pointer outline-none"
            defaultValue="Kopi Kenangan - Cabang Senopati"
          >
            <option>Kopi Kenangan - Cabang Senopati</option>
            <option>Kopi Kenangan - Cabang SCBD</option>
            <option>Kopi Kenangan - Cabang Kemang</option>
            <option>Semua Cabang (Konsolidasi)</option>
          </select>
        </div>
        {/* Quick Search Input */}
        <div className="relative w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-tertiary text-[18px]">
            search
          </span>
          <input
            className="w-full bg-surface pl-9 pr-4 py-1.5 text-body-sm font-body-sm rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            placeholder="Cari PO, no resi, bahan baku..."
            type="text"
          />
        </div>
      </div>
      {/* Right: Bot Switch, Notifications, Quick Actions, Profile */}
      <div className="flex items-center gap-4">
        {/* WhatsApp Bot AI Status Badge / Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/60 border border-primary-container/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" />
          </span>
          <span className="font-label-sm text-label-sm text-on-secondary-container font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">neurology</span> Bot WhatsApp AI: Aktif
            (Gemini)
          </span>
        </div>
        {/* Action Icons */}
        <button
          className="relative p-2 rounded-xl text-tertiary hover:bg-surface-container-low transition-colors"
          title="Pemberitahuan"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-surface-container-lowest text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <button
          className="p-2 rounded-xl text-tertiary hover:bg-surface-container-low transition-colors"
          title="Pindah Outlet"
        >
          <span className="material-symbols-outlined text-[22px]">swap_horiz</span>
        </button>
        <div className="h-6 w-px bg-outline-variant/30" />
        {/* User Profile Avatar & Name */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-secondary-container text-primary font-bold text-sm flex items-center justify-center ring-2 ring-primary-container/30">
            BP
          </div>
          <div className="flex flex-col text-left">
            <span className="font-label-lg text-label-lg text-on-surface leading-tight group-hover:text-primary transition-colors">
              Budi Pratama
            </span>
            <span className="font-label-sm text-label-sm text-tertiary leading-tight">Master Franchisee</span>
          </div>
        </div>
      </div>
    </header>
  );
}
