"use client";

import { useEffect, useState } from "react";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { useMySupplierProfile, useUpdateSupplierProfile } from "@/features/suppliers/hooks/use-suppliers";

export default function PemasokPengaturanPage() {
  const { data: profile, isLoading } = useMySupplierProfile();
  const updateProfileMutation = useUpdateSupplierProfile();

  const [activeTab, setActiveTab] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [bankName, setBankName] = useState("mandiri");
  const [bankAccount, setBankAccount] = useState("127-00-1099281-4");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setCategory(profile.category || "Distributor Bahan Baku F&B");
    }
  }, [profile]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(
      {
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        category: category.trim() || undefined,
      },
      {
        onSuccess: (updated) => {
          showToast(`Pengaturan profil pemasok ${updated.name} berhasil disimpan!`);
        },
        onError: (err) => {
          showToast(`Gagal menyimpan: ${err.message}`);
        },
      }
    );
  };

  return (
    <>
      <PemasokTopbar />

      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#172033] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/40 animate-fade-in text-sm font-medium">
          <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Konfigurasi Sistem Mitra
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                ID Mitra: {profile ? `SUP-${profile.id.slice(0, 8).toUpperCase()}` : "SUP-LOADING"}
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Pengaturan Akun &amp; Preferensi Pasokan
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Atur informasi penanggung jawab (PIC), rekening bank penampung B2B, ketentuan SLA pesanan, dan preferensi notifikasi alert.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (profile) {
                  setName(profile.name || "");
                  setPhone(profile.phone || "");
                  setAddress(profile.address || "");
                  setCategory(profile.category || "");
                }
                showToast("Formulir telah di-reset ke nilai tersimpan.");
              }}
              className="h-11 px-4 rounded-xl border border-outline-variant/50 bg-white text-tertiary hover:bg-[#F5F8F6] font-label-lg text-label-lg transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={updateProfileMutation.isPending}
              className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] font-bold cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{updateProfileMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </div>

        {/* SETTINGS SECTIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: NAVIGATION / TABS (4 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-1">
              {[
                { label: "Informasi PIC & Akun", icon: "badge" },
                { label: "Rekening Bank & Pencairan", icon: "account_balance" },
                { label: "Kebijakan Pasokan & Logistik", icon: "local_shipping" },
                { label: "Preferensi Notifikasi & Alert", icon: "notifications" },
                { label: "Keamanan & Autentikasi (2FA)", icon: "security" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md transition-all text-left cursor-pointer ${
                    activeTab === idx
                      ? "bg-secondary-container text-primary font-bold shadow-sm"
                      : "text-tertiary hover:text-on-surface hover:bg-[#F5F8F6]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Helper Box */}
            <div className="bg-[#E8F3EC] p-5 rounded-2xl border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-body-md">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                <span>Butuh Bantuan IT &amp; API?</span>
              </div>
              <p className="text-xs text-[#2B4D41] leading-relaxed">
                Tim teknis BAPER SCM siap membantu integrasi webhook ERP gudang Anda ke platform supply chain kami 24/7.
              </p>
              <a
                href="mailto:tech@baperscm.id"
                className="inline-block text-xs font-bold text-primary underline pt-1"
              >
                Hubungi Dukungan Integrasi
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: FORMS & CONTROLS (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            {/* SECTION 1: INFORMASI PIC & PERUSAHAAN */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
              <div className="border-b border-outline-variant/30 pb-4">
                <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person</span>
                  Informasi Akun Penanggung Jawab (PIC)
                </h2>
                <p className="text-body-sm text-tertiary mt-1">
                  Kontak resmi yang menerima instruksi penerimaan pesanan dan konfirmasi pembayaran.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-tertiary uppercase">Nama Perusahaan Pemasok *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-white border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-[#172033]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">Kategori Pasokan</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-white border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-[#172033]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">No. Telepon / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-white border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-mono text-[#172033]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-tertiary uppercase">Alamat Pergudangan / Kantor</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 text-body-sm font-body-sm bg-white border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-[#172033]"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: REKENING BANK PENAMPUNG B2B */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
              <div className="border-b border-outline-variant/30 pb-4">
                <h2 className="text-headline-md font-headline-md text-[#172033] flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">account_balance</span>
                  Rekening Bank Penampung Penjualan Pasokan
                </h2>
                <p className="text-body-sm text-tertiary mt-1">
                  Rekening resmi beratasnamakan badan usaha untuk settlement otomatis tagihan invoice PO.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">Nama Bank Penampung</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-white border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-[#172033]"
                  >
                    <option value="mandiri">Bank Mandiri (Persero) Tbk</option>
                    <option value="bca">Bank Central Asia (BCA)</option>
                    <option value="bri">Bank Rakyat Indonesia (BRI)</option>
                    <option value="bni">Bank Negara Indonesia (BNI)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-tertiary uppercase">Nomor Rekening Giro B2B</label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-white border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-mono font-bold text-[#172033]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-tertiary uppercase">Nama Pemilik Rekening</label>
                  <input
                    type="text"
                    value={name.toUpperCase()}
                    disabled
                    className="w-full h-11 px-4 text-body-sm font-body-sm bg-[#E9EDFF]/40 border border-outline-variant/40 rounded-xl text-on-surface font-semibold"
                  />
                  <span className="text-[11px] text-tertiary">
                    Nama akun telah terkunci sesuai verifikasi dokumen NIB/NPWP OSS RBA mitra pemasok.
                  </span>
                </div>
              </div>
            </div>

            {/* Save Action Bottom Bar */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={updateProfileMutation.isPending}
                className="h-11 px-6 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] font-bold cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>{updateProfileMutation.isPending ? "Menyimpan..." : "Simpan Perubahan Pengaturan"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
