"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Progress Toast — notifikasi proses berjalan (kanan bawah) dengan progress bar.
 *
 * Pemakaian singkat:
 *   const progress = useProgressToast();
 *   await runProgressTask(progress, {
 *     title: "Sinkronisasi Database",
 *     steps: [
 *       { message: "Menghubungkan ke server...", run: () => wait(300) },
 *       { message: "Menarik data...", run: () => apiClient("/...") },
 *     ],
 *     successMessage: () => "Data berhasil disinkronkan.",
 *   });
 */

export type ProgressToastStatus = "running" | "success" | "error";

export interface ProgressToastItem {
  id: string;
  title: string;
  message?: string;
  progress: number;
  status: ProgressToastStatus;
  icon: string;
}

export interface StartProgressOptions {
  title: string;
  message?: string;
  progress?: number;
  icon?: string;
}

export interface ProgressToastApi {
  start: (options: StartProgressOptions) => string;
  update: (
    id: string,
    patch: Partial<Pick<ProgressToastItem, "title" | "message" | "progress">>
  ) => void;
  succeed: (id: string, options?: { title?: string; message?: string }) => void;
  fail: (id: string, options?: { title?: string; message?: string }) => void;
  dismiss: (id: string) => void;
}

export interface ProgressTaskStep<T = unknown> {
  message: string;
  run: () => Promise<T> | T;
}

export interface ProgressTaskConfig<T = unknown> {
  title: string;
  icon?: string;
  steps: ProgressTaskStep<T>[];
  successTitle?: string;
  successMessage?: (results: T[]) => string;
  errorTitle?: string;
}

export type ProgressTaskResult<T = unknown> =
  | { ok: true; results: T[] }
  | { ok: false; error: unknown };

const ProgressToastContext = createContext<ProgressToastApi | undefined>(
  undefined
);

const clampProgress = (value: number) => Math.max(0, Math.min(100, value));

export function ProgressToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ProgressToastItem[]>([]);
  const dismissTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    const timer = dismissTimers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      dismissTimers.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const scheduleDismiss = useCallback(
    (id: string, delay: number) => {
      const existing = dismissTimers.current.get(id);
      if (existing) clearTimeout(existing);

      dismissTimers.current.set(
        id,
        setTimeout(() => dismiss(id), delay)
      );
    },
    [dismiss]
  );

  const start = useCallback((options: StartProgressOptions) => {
    const id = `progress-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    setToasts((prev) => [
      ...prev,
      {
        id,
        title: options.title,
        message: options.message,
        progress: clampProgress(options.progress ?? 0),
        status: "running",
        icon: options.icon ?? "sync",
      },
    ]);

    return id;
  }, []);

  const update = useCallback(
    (
      id: string,
      patch: Partial<Pick<ProgressToastItem, "title" | "message" | "progress">>
    ) => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id
            ? {
                ...toast,
                ...patch,
                progress:
                  patch.progress !== undefined
                    ? clampProgress(patch.progress)
                    : toast.progress,
              }
            : toast
        )
      );
    },
    []
  );

  const succeed = useCallback(
    (id: string, options?: { title?: string; message?: string }) => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id
            ? {
                ...toast,
                status: "success",
                progress: 100,
                title: options?.title ?? toast.title,
                message: options?.message ?? toast.message,
                icon: "check_circle",
              }
            : toast
        )
      );
      scheduleDismiss(id, 3200);
    },
    [scheduleDismiss]
  );

  const fail = useCallback(
    (id: string, options?: { title?: string; message?: string }) => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id
            ? {
                ...toast,
                status: "error",
                title: options?.title ?? toast.title,
                message: options?.message ?? toast.message,
                icon: "error",
              }
            : toast
        )
      );
      scheduleDismiss(id, 6500);
    },
    [scheduleDismiss]
  );

  const api = useMemo<ProgressToastApi>(
    () => ({ start, update, succeed, fail, dismiss }),
    [start, update, succeed, fail, dismiss]
  );

  return (
    <ProgressToastContext.Provider value={api}>
      {children}
      <ProgressToastContainer toasts={toasts} onDismiss={dismiss} />
    </ProgressToastContext.Provider>
  );
}

export function useProgressToast() {
  const context = useContext(ProgressToastContext);
  if (!context) {
    throw new Error(
      "useProgressToast must be used within a ProgressToastProvider"
    );
  }
  return context;
}

/**
 * Menjalankan beberapa langkah berurutan sambil menggerakkan progress bar.
 * Progress beranimasi halus dan otomatis menampilkan toast sukses/gagal.
 */
export async function runProgressTask<T = unknown>(
  progress: ProgressToastApi,
  config: ProgressTaskConfig<T>
): Promise<ProgressTaskResult<T>> {
  const id = progress.start({
    title: config.title,
    icon: config.icon,
    message: config.steps[0]?.message,
  });

  const results: T[] = [];
  const totalSteps = Math.max(1, config.steps.length);
  const animator = createProgressAnimator(progress, id);

  try {
    for (let index = 0; index < config.steps.length; index += 1) {
      const step = config.steps[index];
      const from = (index / totalSteps) * 100;
      const to = ((index + 1) / totalSteps) * 100;

      progress.update(id, { message: step.message, progress: from });

      const [result] = await Promise.all([
        Promise.resolve().then(() => step.run()),
        animator.run(from, Math.max(from, to - 1), 650),
      ]);

      results.push(result);
      progress.update(id, { progress: to });
    }

    progress.succeed(id, {
      title: config.successTitle,
      message: config.successMessage?.(results),
    });

    return { ok: true, results };
  } catch (error) {
    animator.cancel();
    progress.fail(id, {
      title: config.errorTitle,
      message:
        error instanceof Error
          ? error.message
          : "Proses gagal. Silakan coba lagi.",
    });
    return { ok: false, error };
  }
}

function createProgressAnimator(progress: ProgressToastApi, id: string) {
  let frame: number | null = null;

  return {
    run(from: number, to: number, duration: number): Promise<void> {
      if (
        typeof window === "undefined" ||
        typeof window.requestAnimationFrame !== "function"
      ) {
        progress.update(id, { progress: to });
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const startedAt = window.performance.now();

        const tick = (now: number) => {
          const ratio = Math.min(1, (now - startedAt) / duration);
          // easeOutCubic agar gerakan bar terasa natural
          const eased = 1 - Math.pow(1 - ratio, 3);
          progress.update(id, { progress: from + (to - from) * eased });

          if (ratio < 1) {
            frame = window.requestAnimationFrame(tick);
          } else {
            frame = null;
            resolve();
          }
        };

        frame = window.requestAnimationFrame(tick);
      });
    },

    cancel() {
      if (frame !== null && typeof window !== "undefined") {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    },
  };
}

function ProgressToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ProgressToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-5 right-5 z-[9999] flex w-[min(22rem,calc(100vw-2.5rem))] flex-col gap-3"
    >
      {toasts.map((toast) => (
        <ProgressToastCard
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  );
}

function ProgressToastCard({
  toast,
  onDismiss,
}: {
  toast: ProgressToastItem;
  onDismiss: () => void;
}) {
  const isRunning = toast.status === "running";
  const isError = toast.status === "error";
  const percent = Math.round(toast.progress);

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`progress-toast-in pointer-events-auto rounded-2xl border bg-surface-container-lowest p-4 shadow-[0_18px_45px_-14px_rgba(23,32,51,0.35)] ${
        isError
          ? "border-error/30"
          : toast.status === "success"
            ? "border-primary/30"
            : "border-outline-variant/45"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            isError
              ? "bg-error-container text-error"
              : "bg-[#E8F3EC] text-primary"
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isRunning ? "animate-spin [animation-duration:1.6s]" : ""
            }`}
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            {toast.icon}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-label-lg font-label-lg font-bold leading-tight text-on-surface">
              {toast.title}
            </h4>
            <span
              className={`shrink-0 text-label-lg font-label-lg font-bold tabular-nums ${
                isError ? "text-error" : "text-primary"
              }`}
            >
              {isError ? "Gagal" : `${percent}%`}
            </span>
          </div>

          {toast.message && (
            <p
              className={`mt-1 text-body-sm font-body-sm leading-snug ${
                isError ? "text-error" : "text-tertiary"
              }`}
            >
              {toast.message}
            </p>
          )}
        </div>

        {!isRunning && (
          <button
            type="button"
            onClick={onDismiss}
            className="-mr-1 -mt-1 shrink-0 rounded-lg p-1 text-tertiary/70 transition-colors hover:bg-surface-container hover:text-on-surface"
            aria-label="Tutup notifikasi"
          >
            <span className="material-symbols-outlined text-[16px]">
              close
            </span>
          </button>
        )}
      </div>

      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-container"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`${toast.title} ${percent}%`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease-out ${
            isError
              ? "bg-error"
              : toast.status === "success"
                ? "bg-primary-container"
                : "bg-primary"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
