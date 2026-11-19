"use client";

import { useMemo, useState } from "react";
import { useAllBusinesses } from "@/features/business/hooks/use-business";

export default function AdminBisnisPage() {
  const { data: businesses = [], isLoading } = useAllBusinesses();
  const [search, setSearch] = useState("");

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      const q = search.trim().toLowerCase();
      return (
        !q ||
        b.name.toLowerCase().includes(q) ||
        (b.owner?.name || "").toLowerCase().includes(q) ||
        (b.owner?.email || "").toLowerCase().includes(q)
      );
    });
  }, [businesses, search]);

  const totalBisnis = businesses.length;
  const totalProdukPlatform = businesses.reduce((sum, b) => sum + (b._count?.products || 0), 0);
  const totalMemberPlatform = businesses.reduce((sum, b) => sum + (b.members?.length || 0), 0);

  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Direktori Tenant &amp; Brand F&amp;B
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Live Database BAPER Platform
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Data Pemilik Bisnis F&amp;B
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau jaringan entitas bisnis terdaftar, pemilik brand, staf terhubung, dan menu produk aktif di ekosistem platform.
          </p>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Brand F&amp;B Terdaftar</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{totalBisnis} Entitas</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tenant Aktif
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total SKU Produk Menu</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{totalProdukPlatform} Menu</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tersedia di POS
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Karyawan &amp; Anggota Tim</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">{totalMemberPlatform} Staf</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Kasir &amp; Manager Gudang
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Status Langganan</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">100% Aktif</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Enterprise Tier SCM
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama bisnis atau pemilik..."
            className="w-full h-10 pl-9 pr-3 text-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat data bisnis...</div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="p-12 text-center text-tertiary">Tidak ada bisnis terdaftar.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">Nama Bisnis / Brand</th>
                  <th className="py-4 px-4">Pemilik (Owner)</th>
                  <th className="py-4 px-4">Kontak &amp; Alamat</th>
                  <th className="py-4 px-4 text-center">Jumlah SKU</th>
                  <th className="py-4 px-4 text-center">Jumlah Staf</th>
                  <th className="py-4 px-5 text-right">Status Tenant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {filteredBusinesses.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#172033]">{b.name}</div>
                      <span className="text-[11px] font-mono text-tertiary">ID: {b.id.slice(0, 8)}</span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-on-surface">{b.owner?.name || "Budi Santoso"}</div>
                      <div className="text-xs text-tertiary font-mono">{b.owner?.email || "-"}</div>
                    </td>

                    <td className="py-4 px-4 text-tertiary">
                      <div>{b.address || "Jl. Senopati No. 4, Jakarta"}</div>
                      <div className="text-xs text-primary font-mono">{b.phoneBusiness || "-"}</div>
                    </td>

                    <td className="py-4 px-4 text-center font-bold text-primary">
                      {b._count?.products || 0} Menu
                    </td>

                    <td className="py-4 px-4 text-center font-bold text-on-surface">
                      {b.members?.length || 0} Karyawan
                    </td>

                    <td className="py-4 px-5 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Aktif Enterprise
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
