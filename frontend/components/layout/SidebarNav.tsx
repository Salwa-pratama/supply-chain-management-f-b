"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { label: string; href: string; icon: string; badge?: string };
export type NavGroup = { title?: string; items: NavItem[] };

type Props = {
  groups: NavGroup[];
  /** "md" = admin (py-2.5), "sm" = pemilik (py-2) */
  size?: "md" | "sm";
  className?: string;
};

export default function SidebarNav({ groups, size = "md", className = "" }: Props) {
  const pathname = usePathname();
  const py = size === "md" ? "py-2.5" : "py-2";

  return (
    <nav className={`flex flex-col gap-1 ${className}`}>
      {groups.map((group, gi) => (
        <div key={group.title ?? gi} className="flex flex-col gap-1">
          {group.title && (
            <div className="text-label-sm font-label-sm text-tertiary px-3 pt-3 pb-1 font-semibold uppercase tracking-wider first:pt-1">
              {group.title}
            </div>
          )}
          {group.items.map((item) => {
            // href "#" = halaman belum dibuat, tidak pernah ditandai aktif
            const active =
              item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 ${py} transition-colors ${
                  active
                    ? "bg-secondary-container text-on-secondary-container font-semibold shadow-sm"
                    : "text-tertiary hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${active ? "text-primary" : ""}`}
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className={`text-label-md font-label-md ${active ? "text-primary font-bold" : ""}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
