import Link from "next/link";
import Logo from "@/components/Logo";
import SidebarNav from "@/components/layout/SidebarNav";
import { adminMenu } from "@/lib/menu";

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] flex flex-col justify-between p-4 z-40 bg-surface-container-lowest border-r border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
      <div className="flex flex-col gap-5">
        {/* Logo + tag Super Admin */}
        <div className="px-2 pt-1">
          <div className="flex items-center justify-between gap-2">
            <Logo className="h-9 w-auto" />
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#172033] text-surface-container-lowest uppercase">
              Super Admin
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2 px-1">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-sm text-label-sm text-tertiary">Pusat Ekosistem Nasional SCM</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full h-10 px-3 bg-secondary-container text-on-secondary-container rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-secondary-container/90 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>Akses Kontrol Konsol</span>
        </button>

        <SidebarNav
          groups={adminMenu}
          size="md"
          className="overflow-y-auto max-h-[calc(100vh-270px)] custom-scrollbar pr-1"
        />
      </div>

      {/* Footer sidebar */}
      <div className="border-t border-outline-variant/35 pt-3 flex flex-col gap-1">
        <Link
          href="#"
          className="flex items-center gap-3 text-tertiary hover:text-on-surface hover:bg-surface-container-low rounded-lg px-3 py-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[19px]">help</span>
          <span className="font-label-md text-label-md">Pusat Bantuan SCM</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 text-error hover:bg-error-container/30 rounded-lg px-3 py-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[19px]">logout</span>
          <span className="font-label-md text-label-md font-semibold">Keluar Sistem</span>
        </Link>
      </div>
    </aside>
  );
}
