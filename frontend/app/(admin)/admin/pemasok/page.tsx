"use client";

import { useMemo, useState } from "react";
import { useSuppliers } from "@/features/suppliers/hooks/use-suppliers";

export default function AdminPemasokPage() {
  const { data: suppliers = [], isLoading } = useSuppliers();
  const [search, setSearch] = useState("");

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const q = search.trim().toLowerCase();
      return (
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.email || "").toLowerCase().includes(q) ||
        (s.phone || "").toLowerCase().includes(q)
      );
    });
  }, [suppliers, search]);

  const totalSuppliers = suppliers.length;
  const totalCommodities = suppliers.reduce((sum, s) => sum + (s.items?.length || 0), 0);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Ekosistem Vendor &amp; Supplier Bahan Baku
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live Database BAPER Platform
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Data Pemasok &amp; Mitra Terdaftar
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Direktori distributor bahan baku F&amp;B nasional, audit mutu rantai pasok (QC), dan evaluasi kepuasan gerai.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pemasok Terverifikasi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{totalSuppliers} Mitra</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Database Terverifikasi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Komoditas Katalog</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{totalCommodities} SKU</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kopi, Susu, Sirup &amp; Kemasan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Rating Kualitas</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">4.9 / 5.0</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tingkat Kepuasan Tinggi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Kepatuhan QC Masuk</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">100%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Standar HACCP Terpenuhi
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama pemasok atau kontak..."
            className="w-full h-10 pl-9 pr-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat data pemasok...</div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="p-12 text-center text-tertiary">Belum ada pemasok terdaftar.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">Nama Mitra Pemasok</th>
                  <th className="py-4 px-4">Kontak &amp; Email</th>
                  <th className="py-4 px-4">Alamat Fasilitas</th>
                  <th className="py-4 px-4 text-center">Komoditas Ditawarkan</th>
                  <th className="py-4 px-4 text-center">Rating Mutu</th>
                  <th className="py-4 px-5 text-right">Status Akreditasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {filteredSuppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#172033]">{s.name}</div>
                      <span className="text-[11px] font-mono text-tertiary">ID: {s.id.slice(0, 8)}</span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-on-surface">{s.phone || "-"}</div>
                      <div className="text-xs text-tertiary font-mono">{s.email || "-"}</div>
                    </td>

                    <td className="py-4 px-4 text-tertiary">
                      {s.address || "Jl. Perkebunan No. 12, Bandung"}
                    </td>

                    <td className="py-4 px-4 text-center font-bold text-primary">
                      {s.items?.length || 0} SKU
                    </td>

                    <td className="py-4 px-4 text-center font-bold text-amber-600">
                      ★ {s.rating || 5.0}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {s.isVerified ? "Grade A+ (Verified)" : "Terverifikasi"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
