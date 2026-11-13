import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Pengguna | BAPER SCM Super Admin",
};

const USERS = [
  {
    id: "USR-001",
    name: "Aditya Pratama",
    email: "aditya.pratama@baperscm.id",
    phone: "0812-9988-7711",
    role: "Super Admin",
    roleVariant: "admin",
    business: "Kantor Pusat Platform",
    status: "Aktif",
    statusVariant: "active",
    lastLogin: "10 Menit lalu",
  },
  {
    id: "USR-002",
    name: "Budi Hartono",
    email: "budi@kopikenangan.com",
    phone: "0811-2233-4455",
    role: "Pemilik Bisnis",
    roleVariant: "owner",
    business: "Kopi Kenangan Group (14 Cabang)",
    status: "Aktif",
    statusVariant: "active",
    lastLogin: "2 Jam lalu",
  },
  {
    id: "USR-003",
    name: "Bambang Prakoso",
    email: "bambang.p@kopikenangan.com",
    phone: "0813-8899-0011",
    role: "Manager Gudang",
    roleVariant: "gudang",
    business: "Kopi Kenangan - Central Hub",
    status: "Aktif",
    statusVariant: "active",
    lastLogin: "30 Menit lalu",
  },
  {
    id: "USR-004",
    name: "Hendro Prasetyo",
    email: "hendro@tanimakmur.co.id",
    phone: "0812-5566-7788",
    role: "Mitra Pemasok",
    roleVariant: "pemasok",
    business: "PT Tani Makmur Sejahtera",
    status: "Aktif",
    statusVariant: "active",
    lastLogin: "1 Hari lalu",
  },
  {
    id: "USR-005",
    name: "Siti Rahmawati",
    email: "siti.pos@kopikenangan.com",
    phone: "0856-7788-9900",
    role: "Kasir (POS)",
    roleVariant: "kasir",
    business: "Kopi Kenangan Senopati #04",
    status: "Aktif",
    statusVariant: "active",
    lastLogin: "5 Menit lalu",
  },
  {
    id: "USR-006",
    name: "Dewi Anggraini",
    email: "dewi@rotibakar88.com",
    phone: "0878-1122-3344",
    role: "Pemilik Bisnis",
    roleVariant: "owner",
    business: "Roti Bakar Nusantara",
    status: "Nonaktif",
    statusVariant: "inactive",
    lastLogin: "14 Hari lalu",
  },
];

export default function AdminPenggunaPage() {
  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Kontrol Identitas &amp; Hak Akses
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Total 148 Akun Terdaftar
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Manajemen Pengguna Platform
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Kelola izin multi-role akun ekosistem BAPER: Super Admin, Pemilik F&amp;B, Manager Gudang, Mitra Pemasok, dan Kasir POS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor Akun (CSV)</span>
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Tambah Pengguna Baru</span>
          </button>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Pengguna Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">
            142 <span className="text-sm font-normal text-tertiary">Akun</span>
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            96% Tingkat Keaktifan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pemilik Bisnis F&amp;B</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            48 <span className="text-sm font-normal text-tertiary">Brand Terdaftar</span>
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            +6 Bergabung Bulan Ini
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Mitra Pemasok &amp; Gudang</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            62 <span className="text-sm font-normal text-tertiary">Operasional Akun</span>
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terkoneksi Rantai Pasok
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Akun Ditangguhkan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#B54747]">
            6 <span className="text-sm font-normal text-tertiary">Perlu Verifikasi</span>
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/20">
            Audit Kepatuhan
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-tertiary">
            search
          </span>
          <input
            type="text"
            placeholder="Cari nama, email, nomor HP, atau brand bisnis..."
            className="w-full h-11 pl-10 pr-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[#7B8794]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
            <option value="">Semua Peran (Role)</option>
            <option value="super_admin">Super Admin</option>
            <option value="owner">Pemilik Bisnis</option>
            <option value="gudang">Manager Gudang</option>
            <option value="pemasok">Mitra Pemasok</option>
            <option value="kasir">Kasir (POS)</option>
          </select>

          <select className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
            <option value="">Status Akun</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Pengguna &amp; ID</th>
                <th className="py-4 px-4">Kontak</th>
                <th className="py-4 px-4">Role Sistem</th>
                <th className="py-4 px-4">Afiliasi Usaha</th>
                <th className="py-4 px-4">Login Terakhir</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {USERS.map((user) => (
                <tr key={user.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033] hover:text-primary cursor-pointer">
                      {user.name}
                    </div>
                    <span className="text-xs font-mono text-tertiary">{user.id}</span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-on-surface font-medium">{user.email}</div>
                    <div className="text-xs text-tertiary">{user.phone}</div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.roleVariant === "admin"
                          ? "bg-[#172033] text-white"
                          : user.roleVariant === "owner"
                          ? "bg-[#E8F3EC] text-primary border border-primary/25"
                          : user.roleVariant === "pemasok"
                          ? "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200"
                          : user.roleVariant === "gudang"
                          ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30"
                          : "bg-surface-container-low text-tertiary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-on-surface font-medium">{user.business}</td>

                  <td className="py-4 px-4 text-tertiary text-xs">{user.lastLogin}</td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.statusVariant === "active"
                          ? "bg-[#E8F3EC] text-primary border border-primary/20"
                          : "bg-[#FDF2F2] text-error border border-error/30"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.statusVariant === "active" ? "bg-primary" : "bg-error"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                        title="Edit Hak Akses"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg hover:bg-[#FDF2F2] text-tertiary hover:text-[#B54747] flex items-center justify-center transition-colors"
                        title="Reset Sandi / Tangguhkan"
                      >
                        <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
