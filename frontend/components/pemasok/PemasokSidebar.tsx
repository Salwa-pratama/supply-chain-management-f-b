import Link from "next/link";
import Logo from "@/components/Logo";
import SidebarNav from "@/components/layout/SidebarNav";
import { pemasokMenu } from "@/lib/menu";

export default function PemasokSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] flex flex-col justify-between p-4 z-40 bg-surface-container-lowest border-r border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3 px-2 pt-1 pb-2 border-b border-outline-variant/20">
          <Logo className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="inline-block bg-[#E8F3EC] text-primary text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border border-primary/20">
              PORTAL PEMASOK
            </span>
            <span className="text-[11px] text-tertiary font-medium">B2B Supply Hub</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full h-11 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-[#0D6038] active:scale-[0.98] transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Perbarui Stok Gudang</span>
        </button>

        <SidebarNav groups={pemasokMenu} size="sm" />
      </div>

      <div className="pt-4 border-t border-outline-variant/25 flex flex-col gap-1">
        <Link
          href="#"
          className="flex items-center gap-3 text-tertiary hover:text-on-surface hover:bg-surface-container-low rounded-lg px-3 py-2 text-label-md font-label-md transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">help</span>
          <span>Pusat Bantuan Mitra</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 text-error hover:bg-[#FDF2F2] rounded-lg px-3 py-2 text-label-md font-label-md transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Keluar</span>
        </Link>
        <div className="mt-2 text-[10px] text-tertiary/70 text-center">
          BAPER SCM v2.4 • Portal Mitra Resmi
        </div>
      </div>
    </aside>
  );
}
