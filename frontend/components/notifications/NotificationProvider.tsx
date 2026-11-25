"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AppNotification,
  NotificationRole,
  getSeedNotifications,
  notificationStorageKey,
} from "@/lib/notifications";

interface NotificationContextValue {
  role: NotificationRole;
  items: AppNotification[];
  unreadCount: number;
  hydrated: boolean;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  add: (notification: AppNotification) => void;
  reset: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

function isNotificationArray(value: unknown): value is AppNotification[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as AppNotification).id === "string" &&
        typeof (item as AppNotification).title === "string"
    )
  );
}

export function NotificationProvider({
  role,
  children,
}: {
  role: NotificationRole;
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const storageKey = notificationStorageKey(role);

  const loadFromStorage = useCallback(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isNotificationArray(parsed)) {
          setItems(parsed);
          setHydrated(true);
          return;
        }
      }
    } catch {
      // Abaikan data rusak dan mulai dari seed baru.
    }

    setItems(getSeedNotifications(role));
    setHydrated(true);
  }, [role, storageKey]);

  useEffect(() => {
    // Hydration-safe: localStorage hanya ada di browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Storage penuh / diblokir: state tetap jalan di memori.
    }
  }, [items, hydrated, storageKey]);

  // Sinkronkan antar tab agar badge di topbar selalu sama.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey || !event.newValue) return;
      try {
        const parsed: unknown = JSON.parse(event.newValue);
        if (isNotificationArray(parsed)) setItems(parsed);
      } catch {
        // abaikan
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey]);

  const markRead = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  }, []);

  const markAllRead = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const add = useCallback((notification: AppNotification) => {
    setItems((prev) => [notification, ...prev]);
  }, []);

  const reset = useCallback(() => {
    setItems(getSeedNotifications(role));
  }, [role]);

  const unreadCount = useMemo(
    () => items.filter((item) => item.unread).length,
    [items]
  );

  const value = useMemo<NotificationContextValue>(
    () => ({
      role,
      items,
      unreadCount,
      hydrated,
      markRead,
      markAllRead,
      remove,
      add,
      reset,
    }),
    [role, items, unreadCount, hydrated, markRead, markAllRead, remove, add, reset]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
