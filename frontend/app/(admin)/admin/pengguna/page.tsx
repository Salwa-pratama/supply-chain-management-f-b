"use client";

import { useMemo, useState } from "react";
import { useUsers, useToggleUserStatus } from "@/features/users/hooks/use-users";

export default function AdminPenggunaPage() {
  const { data: users = [], isLoading } = useUsers();
  const toggleStatusMutation = useToggleUserStatus();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !search.trim() ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const activeCount = users.filter((u) => u.isActive).length;
  const ownerCount = users.filter((u) => u.role === "owner").length;
  const staffCount = users.filter((u) => u.role === "kasir" || u.role === "manajer_gudang").length;
  const supplierCount = users.filter((u) => u.role === "pemasok").length;

  const handleToggle = (id: string, currentStatus: boolean, name: string) => {
    toggleStatusMutation.mutate(id, {
      onSuccess: (updated) => {
        showToast(`Akun ${name} berhasil ${updated.isActive ? "diaktifkan" : "dinonaktifkan"}.`);
      },
      onError: (err) => {
        alert(`Gagal mengubah status: ${err.message}`);
      },
    });
  };

  return (
    <>
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#137A48] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Kontrol Identitas &amp; Hak Akses
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Total {users.length} Akun Terdaftar di Database
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Manajemen Pengguna Platform
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Kelola izin multi-role akun ekosistem BAPER: Super Admin, Pemilik F&amp;B, Manager Gudang, Mitra Pemasok, dan Kasir POS.
          </p>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Pengguna Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{activeCount}</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            100% Akses Live
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pemilik Bisnis (Owner)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{ownerCount} Akun</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tenant Enterprise
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Staf Operasional (Kasir/Gudang)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{staffCount} Akun</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Operasional Outlet
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Mitra Pemasok</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{supplierCount} Akun</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Vendor Resmi
          </span>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, atau peran..."
            className="w-full h-10 pl-9 pr-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary"
          >
            <option value="all">Semua Peran (Role)</option>
            <option value="super_admin">Super Admin</option>
            <option value="owner">Pemilik Bisnis (Owner)</option>
            <option value="manajer_gudang">Manager Gudang</option>
            <option value="kasir">Kasir (POS)</option>
            <option value="pemasok">Mitra Pemasok</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat data pengguna dari database...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-tertiary">Tidak ada pengguna yang cocok.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">Nama &amp; Kontak</th>
                  <th className="py-4 px-4">Role Akses</th>
                  <th className="py-4 px-4">Entitas Bisnis / Afiliasi</th>
                  <th className="py-4 px-4">Status Akun</th>
                  <th className="py-4 px-4">Tanggal Bergabung</th>
                  <th className="py-4 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {filteredUsers.map((u) => {
                  const businessName =
                    u.businessMembers?.[0]?.business?.name ||
                    (u.role === "pemasok" ? "PT Tani Makmur Sejahtera" : u.role === "super_admin" ? "Platform BAPER" : "Pusat Bisnis FNB");

                  return (
                    <tr key={u.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold text-[#172033]">{u.name}</div>
                        <div className="text-xs text-tertiary font-mono">{u.email}</div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            u.role === "super_admin"
                              ? "bg-purple-100 text-purple-800"
                              : u.role === "owner"
                              ? "bg-[#E8F3EC] text-primary"
                              : u.role === "pemasok"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {u.role.replace("_", " ").toUpperCase()}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-on-surface font-medium">{businessName}</td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            u.isActive ? "bg-[#E8F3EC] text-[#137A48]" : "bg-[#FDF2F2] text-error"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              u.isActive ? "bg-[#137A48]" : "bg-error"
                            }`}
                          />
                          {u.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs text-tertiary">
                        {new Date(u.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggle(u.id, u.isActive, u.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            u.isActive
                              ? "bg-red-50 text-error hover:bg-red-100"
                              : "bg-green-50 text-primary hover:bg-green-100"
                          }`}
                        >
                          {u.isActive ? "Nonaktifkan" : "Aktifkan"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
