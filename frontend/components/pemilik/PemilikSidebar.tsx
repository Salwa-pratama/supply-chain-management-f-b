import Link from "next/link";
import Logo from "@/components/Logo";
import SidebarNav from "@/components/layout/SidebarNav";
import { pemilikMenu } from "@/lib/menu";

export default function PemilikSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] flex flex-col justify-between p-4 z-40 bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] border-r border-outline-variant/35 custom-scrollbar overflow-y-auto">
      <div className="flex flex-col gap-4">
        {/* Logo & profil */}
        <div className="flex items-center gap-3 px-2 py-1">
          <Logo className="h-9 w-auto" />
          <div className="flex flex-col">
            <span className="text-headline-sm font-headline-sm font-bold text-primary">BAPER SCM</span>
            <span className="text-label-sm font-label-sm text-tertiary">Pemilik Bisnis F&B</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-primary-container text-surface-container-lowest font-label-lg text-label-lg py-2.5 px-4 rounded-lg shadow-sm hover:bg-primary transition-all duration-150 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Buat Pesanan Cepat</span>
        </button>

        <SidebarNav groups={pemilikMenu} size="sm" className="mt-2" />
      </div>

      {/* Footer sidebar */}
      <div className="border-t border-outline-variant/35 pt-3 mt-4 flex flex-col gap-1">
        <Link
          href="#"
          className="flex items-center gap-3 text-tertiary hover:text-on-surface rounded-lg px-3 py-2 hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">help</span>
          <span className="text-label-md font-label-md">Pusat Bantuan</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 text-error hover:bg-error-container/40 rounded-lg px-3 py-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-label-md font-label-md font-semibold">Keluar</span>
        </Link>
      </div>
    </aside>
  );
}
