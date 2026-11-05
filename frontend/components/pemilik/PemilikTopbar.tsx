export default function PemilikTopbar() {
  return (
    <header className="sticky top-0 right-0 w-full px-8 h-16 flex items-center justify-between z-30 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
      {/* Breadcrumbs & Quick Search */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-tertiary">
          <span className="font-semibold text-primary">BAPER SCM</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface font-semibold">Monitoring Rantai Pasok</span>
        </div>
        <div className="relative w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-tertiary">
            search
          </span>
          <input
            className="w-full bg-[#F5F8F6] border border-outline-variant/50 rounded-xl pl-9 pr-3 py-1.5 text-body-sm font-body-sm placeholder:text-tertiary text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Cari bahan, PO, batch produksi..."
            type="text"
          />
        </div>
      </div>
      {/* Switcher, Actions, Profile */}
      <div className="flex items-center gap-4">
        {/* Switcher Cabang */}
        <div className="flex items-center gap-2 bg-[#E8F3EC] border border-outline-variant/40 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-secondary-container/50 transition-colors">
          <span
            className="material-symbols-outlined text-[20px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            storefront
          </span>
          <div className="flex flex-col text-left">
            <span className="text-label-sm font-label-sm text-primary font-bold">Kopi Kenangan Senopati</span>
            <span className="text-[10px] text-tertiary leading-none">Cabang Utama #04</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-primary">expand_more</span>
        </div>
        {/* Action Button Quick PO */}
        <button className="flex items-center gap-1.5 bg-primary text-surface-container-lowest text-label-md font-label-md px-3.5 py-2 rounded-xl hover:bg-primary-container transition-all shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          <span>Pesan Bahan Baku</span>
        </button>
        {/* Trailing Icons */}
        <div className="flex items-center gap-1">
          <button
            className="relative p-2 rounded-xl text-tertiary hover:text-on-surface hover:bg-[#F5F8F6] transition-colors"
            title="Notifikasi Rantai Pasok"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface-container-lowest" />
          </button>
          <button
            className="p-2 rounded-xl text-tertiary hover:text-on-surface hover:bg-[#F5F8F6] transition-colors"
            title="Bantuan Alur SCM"
          >
            <span className="material-symbols-outlined text-[22px]">help_outline</span>
          </button>
        </div>
        {/* Profile Section */}
        <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/40">
          <div className="w-9 h-9 rounded-full bg-secondary-container border border-primary/20 flex items-center justify-center text-primary font-bold text-label-md">
            KK
          </div>
          <div className="flex flex-col text-left">
            <span className="text-label-md font-label-md text-on-surface leading-tight">Budi Hartono</span>
            <span className="text-label-sm font-label-sm text-tertiary leading-tight">Store Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
}
