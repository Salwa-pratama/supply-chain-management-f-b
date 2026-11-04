"use client";

import { useMemo, useState } from "react";
import { INVENTARIS, type ItemGudang, type StatusStok } from "@/lib/gudang-data";

const STATUS: Record<StatusStok, { label: string; badge: string; dot: string }> = {
  safe: {
    label: "Stok Aman",
    badge:
      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-[#E8F3EC] text-[#137A48] border border-[#137A48]/30 font-semibold",
    dot: "w-1.5 h-1.5 rounded-full bg-[#137A48]",
  },
  warning: {
    label: "Stok Menipis",
    badge:
      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/30 font-semibold",
    dot: "w-1.5 h-1.5 rounded-full bg-[#D99A25]",
  },
  empty: {
    label: "Stok Habis",
    badge:
      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-[#FDF2F2] text-error border border-error/30 font-bold",
    dot: "w-1.5 h-1.5 rounded-full bg-error",
  },
};

type Aksi = {
  onOpname: () => void;
  onPO: (nama: string) => void;
};

function BarisInventaris({ r, onOpname, onPO }: { r: ItemGudang } & Aksi) {
  const habis = r.status === "empty";
  const st = STATUS[r.status];
  return (
    <tr
      className={
        habis
          ? "bg-[#FDF2F2]/40 hover:bg-[#FDF2F2]/70 transition-colors h-14"
          : "hover:bg-[#F9FBFA] transition-colors h-14"
      }
    >
      <td
        className={
          habis
            ? "px-5 py-3 font-mono font-semibold text-error text-body-sm"
            : "px-5 py-3 font-mono font-semibold text-primary text-body-sm"
        }
      >
        {r.sku}
      </td>
      <td className="px-5 py-3">
        <div
          className={habis ? "font-bold text-error flex items-center gap-1.5" : "font-bold text-on-surface"}
        >
          <span>{r.name}</span>
          {habis && <span className="material-symbols-outlined text-[16px]">priority_high</span>}
        </div>
        <div className="text-body-sm font-body-sm text-tertiary">{r.sub}</div>
      </td>
      <td className="px-5 py-3">
        <span className="inline-flex px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-low text-on-surface-variant font-medium">
          {r.kategoriLabel}
        </span>
      </td>
      <td className="px-5 py-3 text-body-sm font-body-sm text-[#172033]">{r.vendor}</td>
      <td className={`px-5 py-3 text-right ${r.stokCls}`}>{r.stok}</td>
      <td className="px-5 py-3 text-right text-tertiary text-body-sm">{r.min}</td>
      <td className="px-5 py-3">
        <span className="inline-flex items-center gap-1 text-body-sm text-tertiary">
          <span className={r.lokIconCls}>{r.lokIcon}</span> {r.lokasi}
        </span>
      </td>
      <td className="px-5 py-3 text-center">
        <span className={st.badge}>
          <span className={st.dot} /> {st.label}
        </span>
      </td>
      <td className="px-5 py-3 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            className={
              habis
                ? "p-1.5 text-tertiary hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                : "p-1.5 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors"
            }
            title="Lihat Detail"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </button>
          {habis ? (
            <button
              type="button"
              onClick={() => onPO(r.name)}
              className="px-2.5 py-1 bg-error text-white rounded-lg text-label-sm font-label-sm font-bold hover:bg-red-700 shadow-sm transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span> PO Darurat
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onOpname}
                className="p-1.5 text-tertiary hover:text-primary hover:bg-[#E8F3EC] rounded-lg transition-colors"
                title="Koreksi Mutasi"
              >
                <span className="material-symbols-outlined text-[18px]">sync_alt</span>
              </button>
              <button
                type="button"
                onClick={() => onPO(r.name)}
                className="px-2 py-1 bg-[#137A48] text-white rounded-lg text-label-sm font-label-sm font-semibold hover:bg-[#0D6038] transition-colors"
                title="Buat PO Cepat"
              >
                + PO
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function InventoryTable({ onOpname, onPO, onAdd }: Aksi & { onAdd: () => void }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("all");
  const [status, setStatus] = useState("all");
  const [pemasok, setPemasok] = useState("all");

  const rows = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return INVENTARIS.filter(
      (r) =>
        (kategori === "all" || r.kategori === kategori) &&
        (status === "all" || r.status === status) &&
        (pemasok === "all" || r.vendorKey === pemasok) &&
        (!q || [r.sku, r.name, r.sub, r.vendor].some((t) => t.toLowerCase().includes(q))),
    );
  }, [cari, kategori, status, pemasok]);
  const label = rows.length === 0 ? "0" : `1 - ${rows.length}`;

  return (
    <div className="bg-white rounded-[20px] border border-[#94B9A9]/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
      {/* Toolbar Filter & Search */}
      <div className="p-5 border-b border-outline-variant/25 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Item */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              className="w-full bg-[#FFFFFF] border border-[#94B9A9]/60 rounded-xl pl-10 pr-3 py-2 text-body-sm font-body-sm focus:border-primary-container focus:ring-2 focus:ring-[#137A48]/15 outline-none placeholder:text-[#7B8794]"
              placeholder="Cari nama barang / SKU..."
              type="text"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
            />
          </div>
          {/* Kategori Filter */}
          <div className="flex items-center gap-2">
            <label className="text-label-sm font-label-sm text-[#7B8794] hidden sm:inline">Kategori:</label>
            <select
              className="bg-white border border-[#94B9A9]/60 rounded-xl px-3 py-2 text-body-sm font-body-sm text-on-surface focus:border-primary-container outline-none"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            >
              <option value="all">Semua Kategori</option>
              <option value="makanan">Bahan Makanan</option>
              <option value="minuman">Bahan Minuman</option>
              <option value="pendukung">Bahan Pendukung</option>
              <option value="kemasan">Kemasan</option>
              <option value="operasional">Operasional</option>
            </select>
          </div>
          {/* Status Stok Filter */}
          <div className="flex items-center gap-2">
            <label className="text-label-sm font-label-sm text-[#7B8794] hidden sm:inline">Status:</label>
            <select
              className="bg-white border border-[#94B9A9]/60 rounded-xl px-3 py-2 text-body-sm font-body-sm text-on-surface focus:border-primary-container outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="safe">Stok Aman</option>
              <option value="warning">Stok Menipis</option>
              <option value="empty">Stok Habis</option>
            </select>
          </div>
          {/* Pemasok Filter */}
          <div className="flex items-center gap-2">
            <select
              className="bg-white border border-[#94B9A9]/60 rounded-xl px-3 py-2 text-body-sm font-body-sm text-on-surface focus:border-primary-container outline-none"
              value={pemasok}
              onChange={(e) => setPemasok(e.target.value)}
            >
              <option value="all">Semua Pemasok Mitra</option>
              <option value="tani">PT Tani Makmur Sejahtera</option>
              <option value="dairy">CV Dairy Makmur Sentosa</option>
              <option value="toffin">PT Toffin Indonesia</option>
              <option value="kemasan">Sentra Kemasan Food-grade</option>
            </select>
          </div>
        </div>
        {/* Add Item CTA */}
        <button
          className="shrink-0 bg-primary-container hover:bg-[#0D6038] text-white px-4 py-2 rounded-xl text-label-md font-label-md font-semibold flex items-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.98]"
          onClick={onAdd}
        >
          <span className="material-symbols-outlined text-[18px]">add_box</span>
          <span>+ Tambah Barang Baru</span>
        </button>
      </div>
      {/* Responsive Data Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="bg-[#F5F8F6] text-[#7B8794] text-label-sm font-label-sm uppercase tracking-wider h-11 border-b border-outline-variant/30">
              <th className="px-5 py-3 font-semibold">Kode Barang</th>
              <th className="px-5 py-3 font-semibold">Nama Barang & Spesifikasi</th>
              <th className="px-5 py-3 font-semibold">Kategori</th>
              <th className="px-5 py-3 font-semibold">Pemasok Utama</th>
              <th className="px-5 py-3 font-semibold text-right">Stok Fisik</th>
              <th className="px-5 py-3 font-semibold text-right">Batas Min.</th>
              <th className="px-5 py-3 font-semibold">Lokasi Gudang</th>
              <th className="px-5 py-3 font-semibold text-center">Status</th>
              <th className="px-5 py-3 font-semibold text-center">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-body-md font-body-md">
            {/* Row 1: Biji Kopi Arabika Lintong (Menipis) */}
            {/* Row 2: Susu Segar Pasteurisasi (Aman) */}
            {/* Row 3: Sirup Karamel Monin (Menipis) */}
            {/* Row 4: Alpukat Mentega Super (HABIS / MERAH) */}
            {/* Row 5: Beras Rojolele Super (Aman) */}
            {/* Row 6: Paper Cup Hot 12oz (Aman) */}
            {/* Row 7: Kertas Thermal Printer Kasir 80mm (Menipis) */}
            {rows.map((r) => (
              <BarisInventaris key={r.sku} r={r} onOpname={onOpname} onPO={onPO} />
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="px-5 py-10 text-center text-tertiary">
                  Tidak ada barang yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination & Summary Footer */}
      <div className="p-4 bg-[#F5F8F6]/60 border-t border-outline-variant/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-body-sm font-body-sm text-tertiary">
        <div>
          Menampilkan <span className="font-bold text-on-surface">{label}</span> dari{" "}
          <span className="font-bold text-on-surface">48</span> jenis persediaan gudang
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-lg border border-[#94B9A9]/50 bg-white hover:bg-surface-container-low transition-colors disabled:opacity-50"
            disabled
          >
            Sebelumnya
          </button>
          <span className="px-3 py-1 rounded-lg bg-primary-container text-white font-semibold">1</span>
          <button className="px-3 py-1.5 rounded-lg border border-[#94B9A9]/50 bg-white hover:bg-[#E8F3EC] hover:text-primary transition-colors">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-[#94B9A9]/50 bg-white hover:bg-[#E8F3EC] hover:text-primary transition-colors">
            3
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-[#94B9A9]/50 bg-white hover:bg-surface-container-low transition-colors">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
