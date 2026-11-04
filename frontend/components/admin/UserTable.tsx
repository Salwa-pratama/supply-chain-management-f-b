"use client";

import { useMemo, useState } from "react";
import SegmentedControl from "@/components/ui/SegmentedControl";

type Peran = "pemilik" | "pemasok-bahan" | "pemasok-ops" | "konsumen";
type Status = "aktif" | "menunggu" | "ditangguhkan";

type Pengguna = {
  nama: string;
  email: string;
  peran: Peran;
  entitas: string;
  keterangan: string;
  keteranganMerah?: boolean;
  status: Status;
  tanggal: string;
};

// Data contoh. Ganti dengan hasil pemanggilan API backend (Go) nanti.
const PENGGUNA: Pengguna[] = [
  {
    nama: "Rian Hidayat",
    email: "rian.hidayat@kopisenja.co.id",
    peran: "pemilik",
    entitas: "Kopi Senja Utama (3 Cabang)",
    keterangan: "Jakarta Selatan",
    status: "aktif",
    tanggal: "24 Agu 2024, 09:30",
  },
  {
    nama: "Surya Mahendra",
    email: "surya@sumberpanganjaya.com",
    peran: "pemasok-bahan",
    entitas: "PT Sumber Pangan Jaya",
    keterangan: "Surabaya (Distributor Dairy)",
    status: "menunggu",
    tanggal: "24 Agu 2024, 08:15",
  },
  {
    nama: "Eko Prasetyo",
    email: "eko@ecopackid.com",
    peran: "pemasok-ops",
    entitas: "EcoPack Kemasan Ramah Lingkungan",
    keterangan: "Tangerang (Cup & Paperbag)",
    status: "aktif",
    tanggal: "23 Agu 2024, 16:40",
  },
  {
    nama: "Dina Anggraini",
    email: "dina.anggr@gmail.com",
    peran: "konsumen",
    entitas: "- (End-Consumer POS Loyalty)",
    keterangan: "Member ID #C-99102",
    status: "aktif",
    tanggal: "23 Agu 2024, 14:10",
  },
  {
    nama: "Fajar Ardiansyah",
    email: "fajar@dapurbundajkt.id",
    peran: "pemilik",
    entitas: "Dapur Bunda Catering",
    keterangan: "Laporan Gagal Bayar PO 2x",
    keteranganMerah: true,
    status: "ditangguhkan",
    tanggal: "19 Agu 2024, 11:22",
  },
];

const PERAN: Record<Peran, { label: string; icon: string; badge: string }> = {
  pemilik: {
    label: "Pemilik Bisnis FNB",
    icon: "store",
    badge: "bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/20",
  },
  "pemasok-bahan": {
    label: "Pemasok Bahan Baku",
    icon: "inventory_2",
    badge: "bg-surface-container text-on-surface-variant border border-outline-variant/40",
  },
  "pemasok-ops": {
    label: "Pemasok Operasional",
    icon: "box",
    badge: "bg-secondary-fixed text-on-secondary-fixed-variant border border-outline-variant/40",
  },
  konsumen: {
    label: "Konsumen",
    icon: "person",
    badge: "bg-surface-container-high text-on-surface border border-outline-variant/30",
  },
};

const STATUS: Record<Status, { label: string; badge: string; dot: string; row: string; avatar: string }> = {
  aktif: {
    label: "Aktif",
    badge: "bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/30",
    dot: "bg-[#137A48]",
    row: "",
    avatar: "bg-[#E8F3EC] text-[#137A48]",
  },
  menunggu: {
    label: "Menunggu Verifikasi",
    badge: "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30",
    dot: "bg-[#B7791F]",
    row: "bg-[#FFF9E6]/20",
    avatar: "bg-[#FFF9E6] text-[#B7791F]",
  },
  ditangguhkan: {
    label: "Ditangguhkan",
    badge: "bg-[#FDF2F2] text-[#B54747] border border-[#B54747]/30",
    dot: "bg-[#B54747]",
    row: "bg-[#FDF2F2]/20",
    avatar: "bg-[#FDF2F2] text-[#B54747]",
  },
};

const FILTER = [
  { value: "semua", label: "Semua Peran" },
  { value: "pemilik", label: "Pemilik F&B" },
  { value: "pemasok", label: "Pemasok Bahan" },
  { value: "konsumen", label: "Konsumen" },
];

const iconBtn = "p-1.5 hover:bg-surface-container rounded-lg text-tertiary hover:text-on-surface";

function inisial(nama: string) {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((k) => k[0])
    .join("")
    .toUpperCase();
}

function Aksi({ p }: { p: Pengguna }) {
  if (p.status === "menunggu") {
    return (
      <>
        <button
          type="button"
          className="px-2.5 py-1 bg-primary-container text-white text-xs font-semibold rounded-lg hover:bg-[#0D6038]"
        >
          Aktivasi
        </button>
        <button type="button" className={iconBtn} title="Detail Berkas NIB/SIUP">
          <span className="material-symbols-outlined text-[18px]">assignment</span>
        </button>
      </>
    );
  }
  if (p.status === "ditangguhkan") {
    return (
      <>
        <button
          type="button"
          className="px-2.5 py-1 bg-surface-container border border-outline-variant text-xs font-semibold rounded-lg hover:bg-secondary-container"
        >
          Buka Suspend
        </button>
        <button type="button" className={iconBtn} title="Detail Kasus Audit">
          <span className="material-symbols-outlined text-[18px]">find_in_page</span>
        </button>
      </>
    );
  }
  return (
    <>
      <button type="button" className={iconBtn} title="Detail Profil">
        <span className="material-symbols-outlined text-[18px]">visibility</span>
      </button>
      <button
        type="button"
        className="p-1.5 hover:bg-error-container/30 rounded-lg text-error"
        title="Nonaktifkan"
      >
        <span className="material-symbols-outlined text-[18px]">block</span>
      </button>
    </>
  );
}

export default function UserTable() {
  const [filter, setFilter] = useState("semua");
  const [cari, setCari] = useState("");

  const baris = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return PENGGUNA.filter((p) => {
      const cocokPeran =
        filter === "semua" || (filter === "pemasok" ? p.peran.startsWith("pemasok") : p.peran === filter);
      const cocokCari = !q || [p.nama, p.email, p.entitas].some((t) => t.toLowerCase().includes(q));
      return cocokPeran && cocokCari;
    });
  }, [filter, cari]);

  return (
    <section className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/35 p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-5">
      {/* Header & filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-[#172033]">
            Manajemen Pengguna & Entitas Bisnis Terbaru
          </h2>
          <p className="font-body-sm text-body-sm text-tertiary">
            Otorisasi, verifikasi identitas, dan status hak operasional seluruh pendaftaran mitra platform.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SegmentedControl
            variant="chip"
            options={FILTER}
            value={filter}
            onChange={setFilter}
            ariaLabel="Filter peran"
          />
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[16px]">
              search
            </span>
            <input
              type="text"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari user / bisnis..."
              className="h-9 pl-9 pr-3 text-xs bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary-container"
            />
          </div>
          <button
            type="button"
            className="h-9 px-3 bg-[#E8F3EC] text-[#137A48] font-label-sm text-label-sm rounded-xl flex items-center gap-1.5 hover:bg-[#E8F3EC]/80"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-2xl border border-outline-variant/35 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F8F6] h-11 border-b border-outline-variant/35 font-label-sm text-label-sm text-[#7B8794] tracking-wider uppercase">
              <th className="px-5 py-3">Nama Pengguna & Kontak</th>
              <th className="px-4 py-3">Peran Ekosistem</th>
              <th className="px-4 py-3">Nama Bisnis / Entitas</th>
              <th className="px-4 py-3">Status Akun</th>
              <th className="px-4 py-3">Tanggal Daftar</th>
              <th className="px-5 py-3 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
            {baris.map((p) => {
              const st = STATUS[p.status];
              const pr = PERAN[p.peran];
              const avatar = p.peran === "konsumen" ? "bg-surface-container text-tertiary" : st.avatar;
              return (
                <tr key={p.email} className={`h-16 hover:bg-[#F9FBFA] transition-colors ${st.row}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs ${avatar}`}
                      >
                        {inisial(p.nama)}
                      </div>
                      <div>
                        <span className="font-label-md text-label-md text-on-surface block">{p.nama}</span>
                        <span className="text-xs text-tertiary">{p.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${pr.badge}`}
                    >
                      <span className="material-symbols-outlined text-[13px]">{pr.icon}</span>
                      {pr.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={p.peran === "konsumen" ? "text-tertiary" : "font-semibold text-on-surface"}
                    >
                      {p.entitas}
                    </span>
                    <span
                      className={`block text-[11px] ${p.keteranganMerah ? "text-error font-medium" : "text-tertiary"}`}
                    >
                      {p.keterangan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${st.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {st.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-tertiary">{p.tanggal}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Aksi p={p} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {baris.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-tertiary">
                  Tidak ada pengguna yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (statis; hubungkan ke API) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <span className="font-body-sm text-body-sm text-tertiary">
          Menampilkan <strong>{baris.length === 0 ? 0 : `1 - ${baris.length}`}</strong> dari{" "}
          <strong>1.555</strong> total entitas terdaftar
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className="w-8 h-8 rounded-lg border border-outline-variant/50 flex items-center justify-center text-tertiary hover:bg-surface-container disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg bg-primary-container text-white font-bold text-xs flex items-center justify-center"
          >
            1
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-surface-container text-tertiary text-xs flex items-center justify-center"
          >
            2
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-surface-container text-tertiary text-xs flex items-center justify-center"
          >
            3
          </button>
          <span className="text-xs text-tertiary px-1">...</span>
          <button
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-surface-container text-tertiary text-xs flex items-center justify-center"
          >
            311
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg border border-outline-variant/50 flex items-center justify-center text-tertiary hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}
