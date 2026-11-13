import Link from "next/link";
import Logo from "@/components/Logo";
import SidebarNav from "@/components/layout/SidebarNav";
import LogoutButton from "@/features/auth/components/LogoutButton";
import {
  DASHBOARD_NAV_CONFIG,
  type DashboardRole,
} from "@/lib/navigation";

export interface AppSidebarProps {
  role: DashboardRole;
  userProfile?: {
    name: string;
    title: string;
    initials: string;
    location?: string;
  };
  className?: string;
}

export default function AppSidebar({
  role,
  userProfile,
  className = "",
}: AppSidebarProps) {
  const config = DASHBOARD_NAV_CONFIG[role] ?? DASHBOARD_NAV_CONFIG.pemilik;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-[260px] flex flex-col justify-between p-4 z-40 bg-surface-container-lowest border-r border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-y-auto custom-scrollbar ${className}`}
    >
      <div className="flex flex-col gap-4">
        {/* Logo & Portal Identity */}
        <div className="flex items-center gap-3 px-2 pt-1 pb-2 border-b border-outline-variant/20">
          <Logo className="h-8 w-auto shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="inline-block bg-[#E8F3EC] text-primary text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border border-primary/20 w-max">
              {config.roleBadge}
            </span>
            <span className="text-[11px] text-tertiary font-medium truncate mt-0.5">
              {config.roleSubtitle}
            </span>
          </div>
        </div>

        {/* Quick Action Button */}
        {config.quickAction && (
          <Link
            href={config.quickAction.href ?? config.homeUrl}
            className="w-full h-11 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-[#0D6038] active:scale-[0.98] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              {config.quickAction.icon}
            </span>
            <span>{config.quickAction.label}</span>
          </Link>
        )}

        {/* Navigation Items */}
        <SidebarNav groups={config.groups} size="sm" />
      </div>

      {/* Footer Area */}
      <div className="pt-4 border-t border-outline-variant/25 mt-4 flex flex-col gap-2">
        {/* Optional User Info Badge */}
        {userProfile && (
          <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-white font-bold flex items-center justify-center text-xs shrink-0">
              {userProfile.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-label-sm font-bold text-on-surface truncate">
                {userProfile.name}
              </div>
              <div className="text-[10px] text-tertiary truncate">
                {userProfile.title}
              </div>
              {userProfile.location && (
                <div className="text-[10px] text-primary font-semibold truncate flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[11px]">storefront</span>
                  {userProfile.location}
                </div>
              )}
            </div>
          </div>
        )}

        <Link
          href="#"
          className="flex items-center gap-3 text-tertiary hover:text-on-surface hover:bg-surface-container-low rounded-lg px-3 py-2 text-label-md font-label-md transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">help</span>
          <span>{config.helpText}</span>
        </Link>

        <LogoutButton
          label="Keluar"
          className="flex items-center gap-3 text-error hover:bg-[#FDF2F2] rounded-lg px-3 py-2 text-label-md font-label-md transition-colors w-full text-left"
          iconClassName="material-symbols-outlined text-[18px]"
        />

        <div className="mt-1 text-[10px] text-tertiary/70 text-center">
          BAPER SCM v2.4 • Presisi Terintegrasi
        </div>
      </div>
    </aside>
  );
}
