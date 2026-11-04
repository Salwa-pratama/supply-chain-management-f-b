export default function GudangHeader({ onQuickPO }: { onQuickPO: () => void }) {
  return (
    <header className="sticky top-0 right-0 w-full px-6 h-16 flex items-center justify-between z-30 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
      {/* Search and Navigation Links */}
      <div className="flex items-center gap-6">
        <div className="relative w-64 md:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            className="w-full bg-[#FFFFFF] border border-[#94B9A9]/60 rounded-xl pl-10 pr-4 py-1.5 text-body-md font-body-md focus:border-primary-container focus:ring-2 focus:ring-[#137A48]/15 outline-none placeholder:text-[#7B8794]"
            placeholder="Cari SKU, bahan baku, atau PO..."
            type="text"
          />
        </div>
        <div className="hidden lg:flex items-center gap-4 text-label-lg font-label-lg">
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            Semua Cabang
          </a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">
            Rekap Harian
          </a>
          <a className="text-primary font-semibold border-b-2 border-primary pb-1" href="#">
            Status Stok
          </a>
        </div>
      </div>
      {/* Trailing Actions */}
      <div className="flex items-center gap-3">
        {/* Store Switcher */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#94B9A9]/60 hover:bg-[#E8F3EC] text-body-sm font-label-md transition-colors">
          <span className="material-symbols-outlined text-[16px] text-primary">storefront</span>
          <span className="font-medium text-on-surface">Senopati #04</span>
          <span className="material-symbols-outlined text-[14px] text-tertiary">expand_more</span>
        </button>
        {/* Notification Icon Button */}
        <button
          className="relative p-2 rounded-xl text-tertiary hover:bg-surface-container-low transition-colors"
          title="Notifikasi Stok & PO"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-white" />
        </button>
        {/* Primary Action CTA */}
        <button
          className="bg-primary-container hover:bg-[#0D6038] text-white px-4 py-2 rounded-xl text-label-md font-label-md font-semibold flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
          onClick={onQuickPO}
        >
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          <span>Pesan Bahan Baku</span>
        </button>
      </div>
    </header>
  );
}
