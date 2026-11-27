"use client";

import { useState } from "react";
import {
  useAddBusinessMember,
  useBusinessBranches,
  useBusinessMembers,
  useCreateBusinessBranch,
  useToggleMemberStatus,
  useUpdateMemberBranch,
} from "@/features/business/hooks/use-business";

export default function PemilikStafPage() {
  const { data: members = [], isLoading } = useBusinessMembers();
  const { data: branches = [], isLoading: isBranchesLoading } = useBusinessBranches();
  const addMemberMutation = useAddBusinessMember();
  const toggleStatusMutation = useToggleMemberStatus();
  const updateMemberBranchMutation = useUpdateMemberBranch();
  const createBranchMutation = useCreateBusinessBranch();

  const [modalOpen, setModalOpen] = useState(false);
  const [branchModalOpen, setBranchModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Staf#2025");
  const [role, setRole] = useState<"kasir" | "manajer_gudang">("kasir");
  const [branchId, setBranchId] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [branchPhone, setBranchPhone] = useState("");
  const [branchErrorMsg, setBranchErrorMsg] = useState<string | null>(null);

  const [updatingMemberId, setUpdatingMemberId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const defaultBranchId =
    branches.find((b) => b.isMain)?.id ?? branches[0]?.id ?? "";
  const effectiveBranchId = branchId || defaultBranchId;

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
        branchId: effectiveBranchId || undefined,
      },
      {
        onSuccess: () => {
          setModalOpen(false);
          setName("");
          setEmail("");
          setPassword("Staf#2025");
          setBranchId(defaultBranchId);
          showToast(
            `Staf baru (${role === "kasir" ? "Kasir" : "Manajer Gudang"}) berhasil ditambahkan!`
          );
        },
        onError: (err) => {
          setErrorMsg(err.message || "Gagal menambahkan staf.");
        },
      }
    );
  };

  const handleCreateBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBranchErrorMsg(null);
    createBranchMutation.mutate(
      {
        name: branchName.trim(),
        code: branchCode.trim() || undefined,
        address: branchAddress.trim() || undefined,
        phone: branchPhone.trim() || undefined,
      },
      {
        onSuccess: (created) => {
          setBranchModalOpen(false);
          setBranchName("");
          setBranchCode("");
          setBranchAddress("");
          setBranchPhone("");
          showToast(`Cabang baru "${created.name}" berhasil ditambahkan!`);
        },
        onError: (err) => {
          setBranchErrorMsg(err.message || "Gagal menambahkan cabang.");
        },
      }
    );
  };

  const handleBranchChange = (
    memberId: string,
    nextBranchId: string,
    staffName: string
  ) => {
    const resolvedBranchId = nextBranchId || null;
    const targetBranch = branches.find((b) => b.id === resolvedBranchId);
    setUpdatingMemberId(memberId);

    updateMemberBranchMutation.mutate(
      { memberId, branchId: resolvedBranchId },
      {
        onSuccess: () => {
          setUpdatingMemberId(null);
          showToast(
            targetBranch
              ? `Cabang tugas ${staffName} berhasil diubah ke ${targetBranch.name}!`
              : `Penugasan cabang untuk ${staffName} dilepas.`
          );
        },
        onError: (err) => {
          setUpdatingMemberId(null);
          showToast(`Gagal mengubah cabang tugas: ${err.message}`);
        },
      }
    );
  };

  const handleToggle = (memberId: string, currentStatus: boolean, staffName: string) => {
    toggleStatusMutation.mutate(memberId, {
      onSuccess: () => {
        showToast(
          `Akses login untuk ${staffName} berhasil ${
            currentStatus ? "dinonaktifkan" : "diaktifkan"
          }!`
        );
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
              Manajemen Tim &amp; Penugasan Cabang
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              {isLoading ? "Memuat..." : `${members.length} Karyawan • ${branches.length} Cabang`}
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Kelola Staf &amp; Karyawan Gerai
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Atur akun kasir dan manajer gudang, tentukan cabang penugasan masing-masing karyawan, serta kontrol akses login secara instan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setBranchErrorMsg(null);
              setBranchModalOpen(true);
            }}
            className="h-11 px-4 rounded-xl border border-outline-variant/60 bg-[#F5F8F6] text-on-surface hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">add_business</span>
            <span>Tambah Cabang</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setErrorMsg(null);
              setBranchId(defaultBranchId);
              setModalOpen(true);
            }}
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Tambah Karyawan Baru</span>
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Staf Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            {isLoading ? "..." : `${members.filter((m) => m.isActive).length} Orang`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terkoneksi ke Bisnis Ini
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
            {isLoading
              ? "..."
              : `${members.filter((m) => m.role === "manajer_gudang").length} Akun`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Akses Kontrol Stok &amp; QC
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Cabang Operasional</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            {isBranchesLoading ? "..." : `${branches.length} Cabang`}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Lokasi Penugasan Staf
          </span>
        </div>
      </div>

      {/* CABANG OVERVIEW STRIP */}
      {branches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branches.map((branch) => {
            const assignedCount = members.filter((m) => m.branchId === branch.id).length;
            return (
              <div
                key={branch.id}
                className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">storefront</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-body-md text-[#172033] truncate">
                      {branch.name}
                    </h3>
                    {branch.isMain && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F3EC] text-primary shrink-0">
                        Utama
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-tertiary truncate mt-0.5">
                    {branch.code ? `${branch.code} • ` : ""}
                    {branch.address || "Alamat belum diatur"}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    <span>{assignedCount} Karyawan Bertugas</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* STAFF TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Nama Lengkap &amp; Email</th>
                <th className="py-4 px-4">Jabatan / Role</th>
                <th className="py-4 px-4">Cabang Tugas</th>
                <th className="py-4 px-4">Tanggal Bergabung</th>
                <th className="py-4 px-4">Status Akses</th>
                <th className="py-4 px-5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-tertiary">
                    <span className="material-symbols-outlined animate-spin text-2xl text-primary mb-1">
                      progress_activity
                    </span>
                    <p>Memuat daftar staf...</p>
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-tertiary">
                    Belum ada staf yang didaftarkan untuk bisnis ini.
                  </td>
                </tr>
              ) : (
                members.map((mem) => {
                  const staffUser = mem.user;
                  const isUpdatingBranch = updatingMemberId === mem.id;
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

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <select
                            aria-label={`Cabang tugas untuk ${staffUser.name}`}
                            value={mem.branchId ?? ""}
                            disabled={isUpdatingBranch || isBranchesLoading}
                            onChange={(e) =>
                              handleBranchChange(mem.id, e.target.value, staffUser.name)
                            }
                            className="h-9 min-w-[210px] px-3 text-xs font-semibold text-[#172033] bg-[#F5F8F6] border border-[#94B9A9]/60 rounded-xl focus:outline-none focus:border-primary cursor-pointer disabled:opacity-60"
                          >
                            <option value="">-- Belum Ditugaskan --</option>
                            {branches.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.name}
                              </option>
                            ))}
                          </select>
                          {isUpdatingBranch && (
                            <span className="material-symbols-outlined animate-spin text-[16px] text-primary">
                              progress_activity
                            </span>
                          )}
                        </div>
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
                <span className="text-[11px] text-tertiary">
                  Staf dapat menggunakan kata sandi ini untuk login pertama kali.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">
                  Jabatan / Role Operasional
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "kasir" | "manajer_gudang")}
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                >
                  <option value="kasir">Kasir (Akses Terminal Kasir POS)</option>
                  <option value="manajer_gudang">
                    Manajer Gudang (Akses Stok, QC &amp; Logistik)
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">
                  Cabang Penugasan
                </label>
                <select
                  value={effectiveBranchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                >
                  {branches.length === 0 ? (
                    <option value="">Cabang Utama Bisnis</option>
                  ) : (
                    branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} {b.code ? `(${b.code})` : ""}
                      </option>
                    ))
                  )}
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

      {/* MODAL TAMBAH CABANG */}
      {branchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/35 animate-scale-up space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h3 className="font-headline-sm text-headline-sm font-bold text-[#172033] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_business</span>
                Tambah Cabang Gerai Baru
              </h3>
              <button
                type="button"
                onClick={() => setBranchModalOpen(false)}
                className="text-tertiary hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {branchErrorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                {branchErrorMsg}
              </div>
            )}

            <form onSubmit={handleCreateBranchSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">Nama Cabang</label>
                <input
                  type="text"
                  required
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="Contoh: Kopi Kenangan Menteng #12"
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">
                  Kode / Label Cabang
                </label>
                <input
                  type="text"
                  value={branchCode}
                  onChange={(e) => setBranchCode(e.target.value)}
                  placeholder="Contoh: Cabang #12"
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">Alamat Cabang</label>
                <textarea
                  rows={2}
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(e.target.value)}
                  placeholder="Jl. Menteng Raya No. 10, Jakarta Pusat"
                  className="w-full p-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-tertiary uppercase">Nomor Telepon</label>
                <input
                  type="text"
                  value={branchPhone}
                  onChange={(e) => setBranchPhone(e.target.value)}
                  placeholder="081234567899"
                  className="w-full h-11 px-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/40 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setBranchModalOpen(false)}
                  className="flex-1 h-11 rounded-xl border border-outline-variant/40 text-tertiary hover:bg-[#F5F8F6] text-label-md font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createBranchMutation.isPending}
                  className="flex-1 h-11 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  {createBranchMutation.isPending ? "Menyimpan..." : "Simpan Cabang"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
