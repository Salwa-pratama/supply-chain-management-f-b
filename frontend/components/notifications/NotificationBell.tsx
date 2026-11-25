"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import {
  AppNotification,
  NOTIFICATION_CATEGORY_META,
} from "@/lib/notifications";

interface NotificationBellProps {
  buttonClassName?: string;
  iconClassName?: string;
  align?: "left" | "right";
  viewAllHref?: string;
  title?: string;
}

const toneClasses: Record<string, string> = {
  primary: "bg-[#E8F3EC] text-primary border-primary/20",
  warning: "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/25",
  blue: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
  neutral: "bg-[#F5F8F6] text-tertiary border-outline-variant/30",
};

function NotificationRow({
  item,
  onOpen,
}: {
  item: AppNotification;
  onOpen: (item: AppNotification) => void;
}) {
  const meta = NOTIFICATION_CATEGORY_META[item.category];

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[#F5F8F6] ${
        item.unread ? "bg-[#F9FFFB]" : ""
      }`}
    >
      <span
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
          toneClasses[item.icon ? meta.tone : "neutral"]
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {item.icon || meta.icon}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-2">
          <span className="text-label-md font-label-md font-bold text-on-surface leading-snug line-clamp-1">
            {item.title}
          </span>
          {item.unread && (
            <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
          )}
        </span>
        <span className="mt-0.5 block text-body-sm font-body-sm text-tertiary leading-snug line-clamp-2">
          {item.message}
        </span>
        <span className="mt-1 flex items-center gap-2 text-[11px] text-tertiary">
          <span className="font-semibold">{item.categoryLabel}</span>
          <span>•</span>
          <span>{item.timeLabel}</span>
        </span>
      </span>
    </button>
  );
}

export default function NotificationBell({
  buttonClassName = "relative w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors",
  iconClassName = "text-[20px]",
  align = "right",
  viewAllHref,
  title = "Notifikasi",
}: NotificationBellProps) {
  const {
    items,
    unreadCount,
    hydrated,
    markRead,
    markAllRead,
  } = useNotifications();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleOpenItem = (item: AppNotification) => {
    markRead(item.id);
    setOpen(false);
    if (item.actionHref) router.push(item.actionHref);
  };

  const preview = items.slice(0, 5);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={buttonClassName}
        title={title}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={
          unreadCount > 0
            ? `${title}, ${unreadCount} belum dibaca`
            : title
        }
      >
        <span className={`material-symbols-outlined ${iconClassName}`}>
          notifications
        </span>
        {hydrated && unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-surface-container-lowest">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={title}
          className={`absolute top-full mt-2 w-[min(22rem,calc(100vw-2rem))] bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0_18px_45px_-14px_rgba(23,32,51,0.35)] z-[70] overflow-hidden ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-outline-variant/30">
            <div>
              <h3 className="text-label-lg font-label-lg font-bold text-on-surface">
                {title}
              </h3>
              <p className="text-[11px] text-tertiary">
                {unreadCount > 0
                  ? `${unreadCount} notifikasi belum dibaca`
                  : "Semua notifikasi sudah dibaca"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="shrink-0 text-[11px] font-bold text-primary hover:underline"
              >
                Tandai semua
              </button>
            )}
          </div>

          <div className="max-h-[22rem] overflow-y-auto custom-scrollbar divide-y divide-outline-variant/20">
            {!hydrated ? (
              <div className="px-4 py-8 text-center text-body-sm text-tertiary">
                Memuat notifikasi...
              </div>
            ) : preview.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <span className="material-symbols-outlined text-[32px] text-tertiary/60">
                  notifications_off
                </span>
                <p className="mt-1 text-body-sm text-tertiary">
                  Belum ada notifikasi.
                </p>
              </div>
            ) : (
              preview.map((item) => (
                <NotificationRow
                  key={item.id}
                  item={item}
                  onOpen={handleOpenItem}
                />
              ))
            )}
          </div>

          {viewAllHref && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(viewAllHref);
              }}
              className="w-full px-4 py-3 text-label-md font-label-md font-bold text-primary bg-surface-container-low/60 hover:bg-[#E8F3EC] border-t border-outline-variant/30 transition-colors flex items-center justify-center gap-1"
            >
              Lihat semua notifikasi
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
