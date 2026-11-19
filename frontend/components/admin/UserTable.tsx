"use client";

import { useMemo, useState } from "react";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { useUsers, useToggleUserStatus } from "@/features/users/hooks/use-users";

const FILTER = [
  { value: "semua", label: "Semua Peran" },
  { value: "owner", label: "Pemilik F&B" },
  { value: "pemasok", label: "Pemasok Bahan" },
  { value: "staff", label: "Kasir & Gudang" },
];

function inisial(nama: string) {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((k) => k[0])
    .join("")
    .toUpperCase();
}

export default function UserTable() {
  const { data: users = [], isLoading } = useUsers();
  const toggleMutation = useToggleUserStatus();

  const [filter, setFilter] = useState("semua");
  const [cari, setCari] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleToggle = (id: string, current: boolean, name: string) => {
    toggleMutation.mutate(id, {
      onSuccess: (updated) => {
        showToast(`Akun ${name} berhasil ${updated.isActive ? "diaktifkan" : "dinonaktifkan"}.`);
      },
      onError: (err) => {
        alert(`Gagal: ${err.message}`);
      },
    });
  };

  const baris = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return users.filter((u) => {
      let cocokPeran = true;
      if (filter === "owner") cocokPeran = u.role === "owner";
      else if (filter === "pemasok") cocokPeran = u.role === "pemasok";
      else if (filter === "staff") cocokPeran = u.role === "kasir" || u.role === "manajer_gudang";

      const cocokCari = !q || [u.name, u.email, u.role].some((t) => t.toLowerCase().includes(q));
      return cocokPeran && cocokCari;
    });
  }, [users, filter, cari]);

  return (
    <section className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-5">
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#137A48] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Header & filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">manage_accounts</span>
            <span>Daftar Pengguna Aktif &amp; Mitra Terdaftar</span>
          </h2>
          <p className="font-body-sm text-body-sm text-tertiary mt-0.5">
            Database live pengguna sistem BAPER SCM ({users.length} akun terdaftar)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SegmentedControl options={FILTER} value={filter} onChange={setFilter} />

          {/* Search box */}
          <div className="relative min-w-[220px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-[18px]">
              search
            </span>
            <input
              type="text"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari nama atau email..."
              className="w-full h-10 pl-9 pr-3 text-body-sm bg-surface-bright border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat pengguna dari database...</div>
        ) : baris.length === 0 ? (
          <div className="p-12 text-center text-tertiary">Tidak ada akun yang sesuai kriteria.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-3.5 px-4">Pengguna</th>
                <th className="py-3.5 px-4">Peran (Role)</th>
                <th className="py-3.5 px-4">Afiliasi Bisnis</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Terdaftar</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {baris.map((u) => {
                const businessName =
                  u.businessMembers?.[0]?.business?.name ||
                  (u.role === "pemasok" ? "PT Tani Makmur Sejahtera" : u.role === "super_admin" ? "Platform BAPER" : "Pusat Bisnis FNB");

                return (
                  <tr key={u.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E8F3EC] text-primary flex items-center justify-center font-bold text-xs">
                          {inisial(u.name)}
                        </div>
                        <div>
                          <div className="font-bold text-[#172033]">{u.name}</div>
                          <div className="text-xs text-tertiary font-mono">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
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

                    <td className="py-3.5 px-4 text-on-surface font-medium">{businessName}</td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          u.isActive
                            ? "bg-[#E8F3EC] text-[#137A48]"
                            : "bg-[#FDF2F2] text-error"
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

                    <td className="py-3.5 px-4 text-xs text-tertiary">
                      {new Date(u.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggle(u.id, u.isActive, u.name)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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
        )}
      </div>
    </section>
  );
}
