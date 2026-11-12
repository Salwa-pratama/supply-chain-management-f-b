"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

export type ToastType = "error" | "success" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (options: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  error: (message: string, title?: string) => void;
  success: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 4500 }: Omit<ToastItem, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const error = useCallback(
    (message: string, title = "Terjadi Kesalahan") => {
      showToast({ type: "error", title, message });
    },
    [showToast]
  );

  const success = useCallback(
    (message: string, title = "Berhasil") => {
      showToast({ type: "success", title, message });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, title = "Perhatian") => {
      showToast({ type: "warning", title, message });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, title = "Informasi") => {
      showToast({ type: "info", title, message });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, removeToast, error, success, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onClose={() => onRemove(t.id)} />
      ))}
    </div>
  );
}

function ToastCard({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: () => void;
}) {
  const styles: Record<
    ToastType,
    {
      bg: string;
      border: string;
      text: string;
      icon: string;
      iconColor: string;
    }
  > = {
    error: {
      bg: "bg-[#FFF5F5]",
      border: "border-[#B54747]/30",
      text: "text-[#B54747]",
      icon: "error",
      iconColor: "text-[#B54747]",
    },
    success: {
      bg: "bg-[#F0FDF4]",
      border: "border-[#137A48]/30",
      text: "text-[#137A48]",
      icon: "check_circle",
      iconColor: "text-[#137A48]",
    },
    warning: {
      bg: "bg-[#FFFBEB]",
      border: "border-[#B7791F]/30",
      text: "text-[#B7791F]",
      icon: "warning",
      iconColor: "text-[#B7791F]",
    },
    info: {
      bg: "bg-[#EFF6FF]",
      border: "border-[#3B82F6]/30",
      text: "text-[#1D4ED8]",
      icon: "info",
      iconColor: "text-[#2563EB]",
    },
  };

  const style = styles[toast.type];

  return (
    <div
      role={toast.type === "error" ? "alert" : "status"}
      className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl border shadow-[0_10px_25px_-5px_rgba(23,32,51,0.12)] transition-all animate-in fade-in slide-in-from-top-3 duration-200 ${style.bg} ${style.border}`}
    >
      <span
        className={`material-symbols-outlined text-[24px] shrink-0 mt-0.5 ${style.iconColor}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {style.icon}
      </span>
      <div className="flex-1 min-w-0 pr-1">
        {toast.title && (
          <h4 className={`text-label-md font-label-md font-bold leading-tight ${style.text}`}>
            {toast.title}
          </h4>
        )}
        <p className="text-body-sm font-body-sm text-[#172033] mt-0.5 leading-snug break-words">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 text-slate-400 hover:text-slate-700 transition p-1 -mr-1 -mt-1 rounded-lg"
        aria-label="Tutup notifikasi"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}

