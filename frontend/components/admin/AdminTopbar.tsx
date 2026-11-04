export default function AdminTopbar() {
  return (
    <header className="sticky top-0 right-0 w-full px-8 h-16 flex items-center justify-between z-30 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
      {/* Server Status Indicator & Search */}
      <div className="flex items-center gap-6">
        {/* Live Server Health Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-[#E8F3EC] border border-[#137A48]/20 px-3 py-1.5 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-[#137A48] animate-ping inline-block" />
          <span className="font-label-sm text-label-sm text-[#137A48] font-semibold">
            Semua Layanan Normal (Supabase & Fiber Engine)
          </span>
          <span className="text-tertiary text-xs">| Latensi 18ms</span>
        </div>
        {/* Global Omnibar Search */}
        <div className="relative w-80 md:w-96">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-[#F5F8F6] border border-outline-variant/60 rounded-xl text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
            placeholder="Cari bisnis, pemasok, transaksi, atau log..."
            type="text"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-outline-variant/50 text-tertiary rounded shadow-sm">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
      {/* Trailing Actions & Profile */}
      <div className="flex items-center gap-3.5">
        {/* Quick Refresh / Health Trigger */}
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          title="Sinkronisasi Data Realtime"
        >
          <span className="material-symbols-outlined text-[20px]">sync</span>
        </button>
        {/* Notification Bell with Ping */}
        <button
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          title="Notifikasi Sistem"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-white" />
        </button>
        {/* Divider */}
        <div className="h-6 w-px bg-outline-variant/40 mx-1" />
        {/* Super Admin Profile Anchor */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-surface-container-lowest font-bold text-sm shadow-sm ring-2 ring-secondary-container">
            AP
          </div>
          <div className="flex flex-col text-left">
            <span className="font-label-lg text-label-lg text-on-surface leading-tight">
              Super Admin Utama
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              Aditya P. (ID: #SA-01)
            </span>
          </div>
          <button className="text-tertiary hover:text-on-surface">
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
      </div>
    </header>
  );
}
