"use client";

import { useState } from "react";
import {
  useAddBusinessMember,
  useBusinessMembers,
  useToggleMemberStatus,
} from "@/features/business/hooks/use-business";

export default function PemilikStafPage() {
  const { data: members = [], isLoading } = useBusinessMembers();
  const addMemberMutation = useAddBusinessMember();
  const toggleStatusMutation = useToggleMemberStatus();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Staf#2025");
  const [role, setRole] = useState<"kasir" | "manajer_gudang">("kasir");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    addMemberMutation.mutate(
      {
        name: name.trim(),
        email: email.trim(),
        password: password.trim() || undefined,
        role,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setName("");
          setEmail("");
          setPassword("Staf#2025");
          showToast(`Staf baru (${role === "kasir" ? "Kasir" : "Manajer Gudang"}) berhasil ditambahkan!`);
        },
        onError: (err) => {
          setErrorMsg(err.message || "Gagal menambahkan staf.");
        },
      }
    );
  };

  const handleToggle = (memberId: string, currentStatus: boolean, staffName: string) => {
    toggleStatusMutation.mutate(memberId, {
      onSuccess: () => {
        showToast(`Akses login untuk ${staffName} berhasil ${currentStatus ? "dinonaktifkan" : "diaktifkan"}!`);
      },
      onError: (err) => {
        showToast(`Gagal mengubah status: ${err.message}`);
      },
    });
  };

  return (
    <>
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#172033] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-body-sm animate-fade-in border border-primary/30">
          <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Manajemen Tim &amp; Hak Akses Gerai
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              {isLoading ? "Memuat..." : `${members.length} Karyawan Terdaftar`}
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Kelola Staf &amp; Karyawan Gerai
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Tambah akun staf kasir dan manajer gudang, kontrol wewenang peran (RBAC), serta aktifkan atau nonaktifkan akses secara instan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Tambah Karyawan Baru</span>
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Staf Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {isLoading ? "..." : `${members.filter((m) => m.isActive).length} Orang`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terkoneksi ke Toko Ini
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Posisi Kasir (POS)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {isLoading ? "..." : `${members.filter((m) => m.role === "kasir").length} Akun`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Akses Mesin Kasir / POS
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Posisi Manajer Gudang</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {isLoading ? "..." : `${members.filter((m) => m.role === "manajer_gudang").length} Akun`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Akses Kontrol Stok &amp; QC
          </span>
        </div>
      </div>

      {/* STAFF TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Nama Lengkap &amp; Email</th>
                <th className="py-4 px-4">Jabatan / Role</th>
                <th className="py-4 px-4">Tanggal Bergabung</th>
                <th className="py-4 px-4">Status Akses</th>
                <th className="py-4 px-5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-tertiary">
                    <span className="material-symbols-outlined animate-spin text-2xl text-primary mb-1">
                      progress_activity
                    </span>
                    <p>Memuat daftar staf...</p>
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-tertiary">
                    Belum ada staf yang didaftarkan untuk bisnis ini.
                  </td>
                </tr>
              ) : (
                members.map((mem) => {
                  const staffUser = mem.user;
                  return (
                    <tr key={mem.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#172033]">{staffUser.name}</div>
                        <div className="text-xs text-tertiary font-mono">{staffUser.email}</div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            mem.role === "kasir"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {mem.role === "kasir" ? "point_of_sale" : "warehouse"}
                          </span>
                          {mem.role === "kasir" ? "Kasir Utama" : "Manajer Gudang"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs text-tertiary">
                        {new Date(mem.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            mem.isActive
                              ? "bg-[#E8F3EC] text-primary border border-primary/20"
                              : "bg-[#FDF2F2] text-error border border-error/30"
                          }`}
                        >
                          {mem.isActive ? "Aktif Bekerja" : "Akses Dinonaktifkan"}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggle(mem.id, mem.isActive, staffUser.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            mem.isActive
                              ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                          }`}
                        >
                          {mem.isActive ? "Nonaktifkan" : "Aktifkan Kembali"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH STAF */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/35 animate-scale-up space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h3 className="font-headline-sm text-headline-sm font-bold text-[#172033] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person_add</span>
                Tambah Akun Staf Baru
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-tertiary hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">Nama Lengkap Staf</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">Email Akun Login</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@baperfnb.com"
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">Kata Sandi Awal</label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary font-mono"
                />
                <span className="text-[11px] text-tertiary">Staf dapat menggunakan kata sandi ini untuk login pertama kali.</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">Jabatan / Role Operasional</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "kasir" | "manajer_gudang")}
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                >
                  <option value="kasir">Kasir (Akses Terminal Kasir POS)</option>
                  <option value="manajer_gudang">Manajer Gudang (Akses Stok, QC &amp; Logistik)</option>
                </select>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 h-11 rounded-xl border border-outline-variant/40 text-tertiary hover:bg-[#F5F8F6] text-label-md font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={addMemberMutation.isPending}
                  className="flex-1 h-11 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  {addMemberMutation.isPending ? "Menyimpan..." : "Daftarkan Staf"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
