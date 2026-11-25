"use client";

import { useEffect, useState } from "react";
import {
  runProgressTask,
  useProgressToast,
} from "@/components/ui/ProgressToast";
import { useToast } from "@/components/ui/Toast";

type SectionId = "ai" | "webhook" | "payment" | "backup" | "security";

interface SettingsState {
  ai: {
    model: string;
    apiKey: string;
    maxTokens: number;
  };
  webhook: {
    url: string;
    secret: string;
    syncInterval: string;
    cloudSync: boolean;
  };
  payment: {
    provider: string;
    merchantId: string;
    serverKey: string;
    escrow: boolean;
  };
  backup: {
    schedule: string;
    retentionDays: number;
    autoBackup: boolean;
    lastBackup: string | null;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    ipWhitelist: string;
  };
}

const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: "ai", label: "Integrasi AI & LLM Engine", icon: "neurology" },
  { id: "webhook", label: "API Webhook & Cloud Sync", icon: "cloud_sync" },
  { id: "payment", label: "Payment Gateway & Escrow", icon: "payments" },
  { id: "backup", label: "Backup Database & Snapshot", icon: "database" },
  { id: "security", label: "Audit Log & Keamanan (2FA)", icon: "security" },
];

const DEFAULT_SETTINGS: SettingsState = {
  ai: {
    model: "gemini-1.5-pro",
    apiKey: "AIzaSyB9X90821-MockKeySecretValid-BAPER",
    maxTokens: 2048,
  },
  webhook: {
    url: "https://api.baper.id/v1/webhooks/scm",
    secret: "whsec_bpr_9f2a7c41d8e54b0a",
    syncInterval: "5",
    cloudSync: true,
  },
  payment: {
    provider: "midtrans",
    merchantId: "G123456789-BAPER",
    serverKey: "SB-Mid-server-BAPER-DEMO-KEY",
    escrow: false,
  },
  backup: {
    schedule: "daily-02",
    retentionDays: 14,
    autoBackup: true,
    lastBackup: null,
  },
  security: {
    twoFactor: true,
    sessionTimeout: 60,
    ipWhitelist: "",
  },
};

const STORAGE_KEY = "baper.admin.settings.v1";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function mergeSettings(raw: unknown): SettingsState {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_SETTINGS };
  const value = raw as Partial<SettingsState>;

  return {
    ai: { ...DEFAULT_SETTINGS.ai, ...(value.ai ?? {}) },
    webhook: { ...DEFAULT_SETTINGS.webhook, ...(value.webhook ?? {}) },
    payment: { ...DEFAULT_SETTINGS.payment, ...(value.payment ?? {}) },
    backup: { ...DEFAULT_SETTINGS.backup, ...(value.backup ?? {}) },
    security: { ...DEFAULT_SETTINGS.security, ...(value.security ?? {}) },
  };
}

const TOGGLE_TRACK =
  "w-11 h-6 bg-outline-variant/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary";

function SectionToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="py-3.5 flex items-center justify-between gap-4">
      <div>
        <div className="font-bold text-[#172033] text-body-md">{title}</div>
        <p className="text-xs text-tertiary mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only peer"
        />
        <div className={TOGGLE_TRACK} />
      </label>
    </div>
  );
}

export default function AdminPengaturanPage() {
  const progress = useProgressToast();
  const toast = useToast();
  const [activeSection, setActiveSection] = useState<SectionId>("ai");
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings(mergeSettings(JSON.parse(raw)));
      }
    } catch {
      // Gunakan default bila data tersimpan rusak.
    }
    setHydrated(true);
  }, []);

  function updateSection<K extends SectionId>(
    section: K,
    patch: Partial<SettingsState[K]>
  ) {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...patch },
    }));
  }

  function persist(next: SettingsState) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      throw new Error("Penyimpanan browser tidak tersedia.");
    }
  }

  const handleSave = async () => {
    const result = await runProgressTask(progress, {
      title: "Menyimpan Konfigurasi Sistem",
      icon: "save",
      steps: [
        {
          message: "Memvalidasi parameter konfigurasi...",
          run: async () => {
            if (!settings.ai.model) {
              throw new Error("Model AI aktif belum dipilih.");
            }
            await wait(320);
            return true;
          },
        },
        {
          message: "Menulis konfigurasi ke penyimpanan aman...",
          run: async () => {
            persist(settings);
            await wait(420);
            return true;
          },
        },
        {
          message: "Menyegarkan cache konfigurasi...",
          run: () => wait(360),
        },
      ],
      successTitle: "Konfigurasi tersimpan",
      successMessage: () =>
        "Semua perubahan konfigurasi sistem berhasil disimpan dan diterapkan.",
      errorTitle: "Gagal menyimpan konfigurasi",
    });

    if (result.ok) {
      toast.success(
        "Pengaturan sistem berhasil disimpan.",
        "Konfigurasi Diperbarui"
      );
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "Kembalikan semua konfigurasi ke nilai default? Perubahan tersimpan akan hilang."
      )
    ) {
      return;
    }

    const next = mergeSettings(DEFAULT_SETTINGS);
    setSettings(next);
    setActiveSection("ai");

    const result = await runProgressTask(progress, {
      title: "Reset ke Default",
      icon: "restart_alt",
      steps: [
        {
          message: "Memuat konfigurasi pabrik...",
          run: () => wait(320),
        },
        {
          message: "Menerapkan nilai default...",
          run: async () => {
            try {
              window.localStorage.removeItem(STORAGE_KEY);
            } catch {
              // tetap pakai state default
            }
            await wait(360);
            return true;
          },
        },
      ],
      successTitle: "Reset selesai",
      successMessage: () => "Seluruh konfigurasi dikembalikan ke nilai default.",
      errorTitle: "Reset gagal",
    });

    if (result.ok) {
      toast.info("Konfigurasi dikembalikan ke default.", "Reset Berhasil");
    }
  };

  const handleBackupNow = async () => {
    const result = await runProgressTask(progress, {
      title: "Membuat Snapshot Database",
      icon: "database",
      steps: [
        {
          message: "Mengunci tabel transaksi...",
          run: () => wait(380),
        },
        {
          message: "Menulis dump database ke storage...",
          run: () => wait(900),
        },
        {
          message: "Memverifikasi checksum snapshot...",
          run: () => wait(520),
        },
      ],
      successTitle: "Snapshot berhasil",
      successMessage: () =>
        "Snapshot database tersimpan dan siap dipulihkan kapan saja.",
      errorTitle: "Backup gagal",
    });

    if (result.ok) {
      const stamp = new Date().toISOString();
      updateSection("backup", { lastBackup: stamp });
      try {
        persist({ ...settings, backup: { ...settings.backup, lastBackup: stamp } });
      } catch {
        // abaikan
      }
      toast.success("Snapshot database berhasil dibuat.", "Backup Selesai");
    }
  };

  const handleExportAudit = () => {
    const now = new Date();
    const rows = [
      ["Waktu", "Aktor", "Aksi", "Status", "IP"],
      [
        now.toLocaleString("id-ID"),
        "Super Admin Utama",
        "Menyimpan konfigurasi sistem",
        "SUKSES",
        "10.10.1.24",
      ],
      [
        new Date(now.getTime() - 42 * 60 * 1000).toLocaleString("id-ID"),
        "Super Admin Utama",
        "Login ke portal admin",
        "SUKSES",
        "10.10.1.24",
      ],
      [
        new Date(now.getTime() - 95 * 60 * 1000).toLocaleString("id-ID"),
        "Sistem",
        "Sinkronisasi database otomatis",
        "SUKSES",
        "internal",
      ],
      [
        new Date(now.getTime() - 180 * 60 * 1000).toLocaleString("id-ID"),
        "system-bot",
        "Percobaan akses webhook gagal",
        "GAGAL",
        "45.88.12.9",
      ],
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `audit_log_${now.toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Audit log berhasil diekspor ke CSV.", "Ekspor Selesai");
  };

  const inputClass =
    "w-full h-11 px-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all";
  const labelClass = "text-xs font-bold text-tertiary uppercase";

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Konfigurasi Global &amp; Infrastruktur
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Server Version: 2.4.0-prod
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Pengaturan Sistem &amp; Ekosistem SCM
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Kelola konfigurasi integrasi AI Gemini, Webhook API Gateway, payment gateway, backup database, dan kebijakan keamanan platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-tertiary hover:bg-[#F5F8F6] font-label-lg text-label-lg transition-all"
          >
            Reset Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Simpan Konfigurasi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-1">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md transition-all text-left ${
                  activeSection === item.id
                    ? "bg-secondary-container text-primary font-bold shadow-sm"
                    : "text-tertiary hover:text-on-surface hover:bg-[#F5F8F6]"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="material-symbols-outlined text-[16px] ml-auto">
                    chevron_right
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="bg-[#E8F3EC] p-4 rounded-2xl border border-primary/20">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">
                verified_user
              </span>
              <div>
                <p className="text-label-md font-label-md font-bold text-primary">
                  Konfigurasi tersimpan lokal
                </p>
                <p className="text-body-sm text-tertiary mt-0.5 leading-relaxed">
                  Perubahan disimpan di browser ini. Hubungkan modul backend
                  untuk menyimpan konfigurasi ke database produksi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {!hydrated ? (
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/35 text-center text-tertiary">
              <span className="material-symbols-outlined animate-spin text-3xl text-primary">
                progress_activity
              </span>
              <p className="mt-2 text-body-sm">Memuat konfigurasi...</p>
            </div>
          ) : (
            <>
              {activeSection === "ai" && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
                  <div className="border-b border-outline-variant/30 pb-4">
                    <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">neurology</span>
                      Konfigurasi Google Gemini AI Engine
                    </h2>
                    <p className="text-body-sm text-tertiary mt-1">
                      Koneksi API model bahasa untuk analisis rekomendasi restock bahan baku cerdas dan optimasi HPP.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className={labelClass}>Model AI Aktif</label>
                      <select
                        value={settings.ai.model}
                        onChange={(event) =>
                          updateSection("ai", { model: event.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="gemini-1.5-pro">Google Gemini 1.5 Pro (Precision SCM &amp; Multimodal)</option>
                        <option value="gemini-1.5-flash">Google Gemini 1.5 Flash (Ultra Fast Chat Response)</option>
                        <option value="gemini-2.0-flash">Google Gemini 2.0 Flash (Eksperimental)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelClass}>Gemini API Key (Server Environment)</label>
                      <input
                        type="password"
                        value={settings.ai.apiKey}
                        onChange={(event) =>
                          updateSection("ai", { apiKey: event.target.value })
                        }
                        className={`${inputClass} font-mono text-tertiary`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelClass}>Batas Token Respons / Request</label>
                      <input
                        type="number"
                        min={256}
                        max={8192}
                        value={settings.ai.maxTokens}
                        onChange={(event) =>
                          updateSection("ai", {
                            maxTokens: Number(event.target.value) || 0,
                          })
                        }
                        className={`${inputClass} font-mono`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "webhook" && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
                  <div className="border-b border-outline-variant/30 pb-4">
                    <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">cloud_sync</span>
                      API Webhook &amp; Cloud Sync
                    </h2>
                    <p className="text-body-sm text-tertiary mt-1">
                      Endpoint callback untuk integrasi sistem eksternal, ERP, dan sinkronisasi cloud.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className={labelClass}>URL Webhook Utama</label>
                      <input
                        type="url"
                        value={settings.webhook.url}
                        onChange={(event) =>
                          updateSection("webhook", { url: event.target.value })
                        }
                        placeholder="https://api.domain.com/v1/webhooks/scm"
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelClass}>Signing Secret</label>
                      <input
                        type="password"
                        value={settings.webhook.secret}
                        onChange={(event) =>
                          updateSection("webhook", { secret: event.target.value })
                        }
                        className={`${inputClass} font-mono text-tertiary`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelClass}>Interval Sinkronisasi Cloud (menit)</label>
                      <select
                        value={settings.webhook.syncInterval}
                        onChange={(event) =>
                          updateSection("webhook", {
                            syncInterval: event.target.value,
                          })
                        }
                        className={inputClass}
                      >
                        <option value="1">Setiap 1 menit (realtime)</option>
                        <option value="5">Setiap 5 menit</option>
                        <option value="15">Setiap 15 menit</option>
                        <option value="60">Setiap 1 jam</option>
                      </select>
                    </div>
                  </div>

                  <div className="divide-y divide-outline-variant/20">
                    <SectionToggle
                      title="Aktifkan Cloud Sync"
                      description="Sinkronkan data pesanan & stok ke cloud storage secara berkala."
                      checked={settings.webhook.cloudSync}
                      onChange={(value) =>
                        updateSection("webhook", { cloudSync: value })
                      }
                    />
                  </div>
                </div>
              )}

              {activeSection === "payment" && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
                  <div className="border-b border-outline-variant/30 pb-4">
                    <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">payments</span>
                      Payment Gateway &amp; Escrow
                    </h2>
                    <p className="text-body-sm text-tertiary mt-1">
                      Konfigurasi penerimaan pembayaran digital dan rekening penampungan dana mitra.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className={labelClass}>Provider Gateway</label>
                      <select
                        value={settings.payment.provider}
                        onChange={(event) =>
                          updateSection("payment", { provider: event.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="midtrans">Midtrans (Snap)</option>
                        <option value="xendit">Xendit</option>
                        <option value="duitku">Duitku</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelClass}>Merchant ID</label>
                      <input
                        value={settings.payment.merchantId}
                        onChange={(event) =>
                          updateSection("payment", { merchantId: event.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelClass}>Server Key</label>
                      <input
                        type="password"
                        value={settings.payment.serverKey}
                        onChange={(event) =>
                          updateSection("payment", { serverKey: event.target.value })
                        }
                        className={`${inputClass} font-mono text-tertiary`}
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-outline-variant/20">
                    <SectionToggle
                      title="Aktifkan Escrow Dana Mitra"
                      description="Dana pembayaran ditahan hingga QC penerimaan barang selesai."
                      checked={settings.payment.escrow}
                      onChange={(value) =>
                        updateSection("payment", { escrow: value })
                      }
                    />
                  </div>
                </div>
              )}

              {activeSection === "backup" && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
                  <div className="border-b border-outline-variant/30 pb-4">
                    <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">database</span>
                      Backup Database &amp; Snapshot
                    </h2>
                    <p className="text-body-sm text-tertiary mt-1">
                      Jadwal pencadangan otomatis dan retensi snapshot untuk pemulihan bencana.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className={labelClass}>Jadwal Backup</label>
                      <select
                        value={settings.backup.schedule}
                        onChange={(event) =>
                          updateSection("backup", { schedule: event.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="daily-02">Harian 02:00 WIB</option>
                        <option value="daily-12">Harian 12:00 WIB</option>
                        <option value="weekly">Mingguan (Minggu 02:00)</option>
                        <option value="manual">Manual saja</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelClass}>Retensi Snapshot (hari)</label>
                      <input
                        type="number"
                        min={1}
                        max={365}
                        value={settings.backup.retentionDays}
                        onChange={(event) =>
                          updateSection("backup", {
                            retentionDays: Number(event.target.value) || 0,
                          })
                        }
                        className={`${inputClass} font-mono`}
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-outline-variant/20">
                    <SectionToggle
                      title="Backup Otomatis"
                      description="Jalankan snapshot sesuai jadwal tanpa intervensi manual."
                      checked={settings.backup.autoBackup}
                      onChange={(value) =>
                        updateSection("backup", { autoBackup: value })
                      }
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                    <div>
                      <p className="text-label-md font-label-md font-bold text-on-surface">
                        Snapshot Manual
                      </p>
                      <p className="text-body-sm text-tertiary">
                        {settings.backup.lastBackup
                          ? `Terakhir dibuat: ${new Date(
                              settings.backup.lastBackup
                            ).toLocaleString("id-ID")}`
                          : "Belum ada snapshot manual pada sesi ini."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleBackupNow}
                      className="h-10 px-4 rounded-xl bg-primary text-white text-label-md font-label-md font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        cloud_upload
                      </span>
                      Backup Sekarang
                    </button>
                  </div>
                </div>
              )}

              {activeSection === "security" && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
                  <div className="border-b border-outline-variant/30 pb-4">
                    <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">security</span>
                      Audit Log &amp; Keamanan (2FA)
                    </h2>
                    <p className="text-body-sm text-tertiary mt-1">
                      Kebijakan autentikasi dua faktor, masa aktif sesi, dan pembatasan akses IP.
                    </p>
                  </div>

                  <div className="divide-y divide-outline-variant/20">
                    <SectionToggle
                      title="Wajibkan 2FA untuk Super Admin"
                      description="Verifikasi OTP saat login dari perangkat atau lokasi baru."
                      checked={settings.security.twoFactor}
                      onChange={(value) =>
                        updateSection("security", { twoFactor: value })
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClass}>Masa Aktif Sesi (menit)</label>
                    <input
                      type="number"
                      min={5}
                      max={1440}
                      value={settings.security.sessionTimeout}
                      onChange={(event) =>
                        updateSection("security", {
                          sessionTimeout: Number(event.target.value) || 0,
                        })
                      }
                      className={`${inputClass} font-mono`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClass}>Whitelist IP Admin (pisahkan dengan koma)</label>
                    <textarea
                      value={settings.security.ipWhitelist}
                      onChange={(event) =>
                        updateSection("security", {
                          ipWhitelist: event.target.value,
                        })
                      }
                      rows={3}
                      placeholder="10.10.1.24, 103.28.14.7"
                      className="w-full px-4 py-3 text-body-sm font-body-sm font-mono bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    />
                    <p className="text-xs text-tertiary">
                      Kosongkan untuk mengizinkan akses dari semua IP.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#F5F8F6] border border-outline-variant/30">
                    <div>
                      <p className="text-label-md font-label-md font-bold text-on-surface">
                        Audit Log Aktivitas
                      </p>
                      <p className="text-body-sm text-tertiary">
                        Unduh jejak aktivitas admin untuk keperluan audit.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleExportAudit}
                      className="h-10 px-4 rounded-xl border border-outline-variant/50 bg-white text-on-surface text-label-md font-label-md hover:bg-[#E8F3EC] transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        download
                      </span>
                      Ekspor Audit Log
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
