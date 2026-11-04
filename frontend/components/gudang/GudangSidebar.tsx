import Link from "next/link";
import SidebarNav from "@/components/layout/SidebarNav";
import QuickQCButton from "@/components/gudang/QuickQCButton";
import { gudangMenu } from "@/lib/menu";

export default function GudangSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] flex flex-col justify-between p-4 z-40 bg-surface-container-lowest border-r border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] custom-scrollbar overflow-y-auto">
      <div>
        <div className="flex items-center gap-3 px-2 py-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[24px]">inventory_2</span>
          </div>
          <div>
            <div className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">
              BAPER SCM
            </div>
            <div className="text-label-sm font-label-sm text-tertiary">Pemilik Bisnis F&B</div>
          </div>
        </div>

        <QuickQCButton />

        <SidebarNav groups={gudangMenu} size="sm" />
      </div>

      <div className="pt-4 border-t border-outline-variant/35 mt-4 space-y-3">
        <div className="space-y-0.5">
          <Link
            href="#"
            className="flex items-center gap-3 text-tertiary hover:text-on-surface rounded-lg px-3 py-2 text-body-sm font-body-sm hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>Pusat Bantuan</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 text-tertiary hover:text-error rounded-lg px-3 py-2 text-body-sm font-body-sm hover:bg-error-container/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Keluar</span>
          </Link>
        </div>
        <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary-container text-white font-bold flex items-center justify-center text-label-md shrink-0">
            BP
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-label-md font-label-md font-bold text-on-surface truncate">
              Bambang Prakoso
            </div>
            <div className="text-label-sm font-label-sm text-tertiary truncate">
              Manager Gudang & Logistik
            </div>
            <div className="text-[10px] text-primary font-semibold flex items-center gap-1 mt-0.5 truncate">
              <span className="material-symbols-outlined text-[12px]">storefront</span> Kopi Kenangan Senopati
              #04
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
