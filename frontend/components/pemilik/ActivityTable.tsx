"use client";

import { useState } from "react";

type StatusAlur =
  | "Menunggu Konfirmasi"
  | "Sedang Diproses"
  | "Dalam Pengiriman"
  | "Produksi Berlangsung"
  | "Siap Dijual"
  | "Selesai";

type Aktivitas = {
  id: string;
  entitas: string;
  keterangan: string;
  item: string;
  nilai: string;
  lunas?: boolean;
  status: StatusAlur;
  waktu: string;
  aksi: string;
};

// Data contoh. Ganti dengan hasil pemanggilan API backend (Go) nanti.
const AKTIVITAS: Aktivitas[] = [
  {
    id: "PO-2025-091",
    entitas: "Sentra Kemasan Food-grade",
    keterangan: "Pemasok Paper Cup 12oz",
    item: "1.000 Pcs Cup + Tutup Lid",
    nilai: "Rp 1.450.000",
    status: "Menunggu Konfirmasi",
    waktu: "10:42 WIB",
    aksi: "Kirim Reminder",
  },
  {
    id: "PO-2025-090",
    entitas: "CV Dairy Makmur Sentosa",
    keterangan: "Pemasok Susu Pasteurisasi",
    item: "50 Karton Fresh Milk 1L",
    nilai: "Rp 2.100.000",
    status: "Sedang Diproses",
    waktu: "10:15 WIB",
    aksi: "Cek Faktur",
  },
  {
    id: "PO-2025-089",
    entitas: "PT Tani Makmur Sejahtera",
    keterangan: "Petani Kopi Mandheling",
    item: "25 Kg Biji Kopi Roast Arabika",
    nilai: "Rp 6.250.000",
    status: "Dalam Pengiriman",
    waktu: "09:50 WIB",
    aksi: "Lacak Kurir",
  },
  {
    id: "BATCH-KTC-04",
    entitas: "Kitchen & Pastry Dapur Utama",
    keterangan: "Baker Shift Pagi",
    item: "40 pcs Croissant Mentega Panas",
    nilai: "Rp 480.000 (HPP)",
    status: "Produksi Berlangsung",
    waktu: "09:30 WIB",
    aksi: "QC Dapur",
  },
  {
    id: "BATCH-BAR-08",
    entitas: "Station Barista Senopati",
    keterangan: "Cold Brew & Espresso Base",
    item: "60 Botol Cold Brew Caramel 250ml",
    nilai: "Rp 1.500.000 (Retail)",
    status: "Siap Dijual",
    waktu: "09:10 WIB",
    aksi: "Masuk Kasir POS",
  },
  {
    id: "ORD-WA-2041",
    entitas: "Konsumen (Ibu Kartika - SCBD)",
    keterangan: "Order via BAPER WhatsApp Bot",
    item: "12 Cup Kopi Susu Aren + 6 Pastry",
    nilai: "Rp 432.000 (Lunas)",
    lunas: true,
    status: "Selesai",
    waktu: "08:45 WIB",
    aksi: "Lihat Bukti",
  },
];

const STATUS_STYLE: Record<StatusAlur, string> = {
  "Menunggu Konfirmasi": "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/20",
  "Sedang Diproses": "bg-[#E8F3EC] text-primary border border-primary/20",
  "Dalam Pengiriman": "bg-secondary-container text-on-secondary-container",
  "Produksi Berlangsung": "bg-primary text-surface-container-lowest",
  "Siap Dijual": "bg-[#E8F3EC] text-primary border border-primary/20",
  Selesai: "bg-secondary-container text-on-secondary-container",
};

const SEMUA = "Semua Status Alur SCM";

export default function ActivityTable() {
  const [filter, setFilter] = useState<string>(SEMUA);
  const baris = filter === SEMUA ? AKTIVITAS : AKTIVITAS.filter((a) => a.status === filter);

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-headline-sm font-headline-sm font-bold text-on-surface">
            Aktivitas Alur SCM Real-time Hari Ini
          </h2>
          <p className="text-body-sm font-body-sm text-tertiary">
            Rekap menyeluruh pergerakan bahan masuk, tahapan produksi dapur, dan penerimaan pesanan kasir.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter status alur"
              className="appearance-none bg-[#F5F8F6] border border-outline-variant/50 rounded-xl pl-3 pr-8 py-2 text-label-md font-label-md text-on-surface focus:outline-none focus:border-primary"
            >
              <option>{SEMUA}</option>
              {(Object.keys(STATUS_STYLE) as StatusAlur[]).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[18px] text-tertiary pointer-events-none">
              expand_more
            </span>
          </div>
          <button
            type="button"
            title="Muat Ulang Data"
            onClick={() => setFilter(SEMUA)} // TODO: ambil ulang data dari API
            className="p-2 border border-outline-variant/40 rounded-xl hover:bg-[#F5F8F6] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-tertiary">refresh</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-outline-variant/30 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F8F6] text-label-sm font-label-sm text-tertiary uppercase tracking-wider border-b border-outline-variant/30 h-11">
              <th className="py-3 px-4">ID Transaksi / Alur</th>
              <th className="py-3 px-4">Entitas Terkait</th>
              <th className="py-3 px-4">Item & Kuantitas</th>
              <th className="py-3 px-4">Nilai / Estimasi</th>
              <th className="py-3 px-4">Status Tahapan</th>
              <th className="py-3 px-4">Waktu Pembaruan</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-body-sm font-body-sm">
            {baris.map((a) => (
              <tr key={a.id} className="hover:bg-[#F9FBFA] transition-colors">
                <td className="py-3.5 px-4 font-bold text-on-surface">{a.id}</td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-on-surface">{a.entitas}</div>
                  <div className="text-[11px] text-tertiary">{a.keterangan}</div>
                </td>
                <td className="py-3.5 px-4">{a.item}</td>
                <td
                  className={`py-3.5 px-4 ${a.lunas ? "font-bold text-primary" : "font-semibold text-on-surface"}`}
                >
                  {a.nilai}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm font-bold ${STATUS_STYLE[a.status]}`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-tertiary">{a.waktu}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    className="text-primary hover:text-primary-container font-label-sm font-bold text-[12px] underline"
                  >
                    {a.aksi}
                  </button>
                </td>
              </tr>
            ))}
            {baris.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 px-4 text-center text-tertiary">
                  Belum ada alur dengan status ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-body-sm font-body-sm text-tertiary pt-2">
        <span>Menampilkan {baris.length} dari 48 alur rantai pasok aktif hari ini</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface font-semibold text-label-sm"
          >
            Sebelumnya
          </button>
          <span className="px-2 font-bold text-primary text-label-sm">1</span>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface font-semibold text-label-sm"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </section>
  );
}
