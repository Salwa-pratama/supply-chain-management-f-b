"use client";

import { useStockMovements, useInventory } from "@/features/inventory/hooks/use-inventory";

function formatWaktu(isoString: string) {
  try {
    const d = new Date(isoString);
    const p = (n: number) => String(n).padStart(2, "0");
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${p(d.getDate())} ${bulan[d.getMonth()]} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())} WIB`;
  } catch {
    return "-";
  }
}

export default function GudangLaporanPage() {
  const { data: movements = [], isLoading } = useStockMovements();
  const { data: inventory = [] } = useInventory();

  const inCount = movements.filter((m) => m.type === "in").length;
  const outCount = movements.filter((m) => m.type === "out").length;
  const adjustCount = movements.filter((m) => m.type === "adjust").length;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Warehouse Analytics &amp; Movement Audit
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Rekapitulasi Mutasi Stok Real-Time
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Laporan Mutasi &amp; Kartu Stok
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Buku besar mutasi seluruh transaksi penerimaan barang dari pemasok, pengeluaran ke kitchen / kasir POS, serta koreksi opname secara kronologis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Transaksi Mutasi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">{movements.length} Catatan</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Log Lengkap Database
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Mutasi Masuk (PO/Inbound)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#137A48]">{inCount} Transaksi</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Penerimaan Pemasok
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Mutasi Keluar (Kitchen/POS)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-error">{outCount} Transaksi</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-full">
            Konsumsi Operasional
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Penyesuaian Opname Fisik</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-amber-600">{adjustCount} Catatan</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Audit Selisih Stok
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-tertiary">Memuat log mutasi...</div>
        ) : movements.length === 0 ? (
          <div className="p-12 text-center text-tertiary">Belum ada riwayat mutasi tercatat.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">ID Mutasi &amp; Waktu</th>
                  <th className="py-4 px-4">Nama Bahan Baku</th>
                  <th className="py-4 px-4">Jenis Mutasi</th>
                  <th className="py-4 px-4 text-right">Perubahan Qty</th>
                  <th className="py-4 px-4">Petugas / Operator</th>
                  <th className="py-4 px-5">ID Referensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {movements.map((m) => {
                  const isIn = m.type === "in";
                  const isOut = m.type === "out";
                  const unit = m.ingredient?.unit || "Unit";
                  const mutId = `MUT-${m.id.slice(0, 8).toUpperCase()}`;

                  return (
                    <tr key={m.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                      <td className="py-4 px-5">
                        <span className="font-mono font-bold text-primary">{mutId}</span>
                        <div className="text-xs text-tertiary mt-0.5">{formatWaktu(m.createdAt)}</div>
                      </td>

                      <td className="py-4 px-4 font-bold text-[#172033]">
                        {m.ingredient?.name || "Bahan Baku"}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            isIn
                              ? "bg-[#E8F3EC] text-[#137A48]"
                              : isOut
                              ? "bg-[#FFF9E6] text-[#B7791F]"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {isIn ? "arrow_downward" : isOut ? "arrow_upward" : "tune"}
                          </span>
                          {isIn ? "Masuk (Penerimaan PO)" : isOut ? "Keluar (Produksi/POS)" : "Koreksi Opname"}
                        </span>
                      </td>

                      <td
                        className={`py-4 px-4 text-right font-mono font-bold ${
                          isIn ? "text-[#137A48]" : isOut ? "text-error" : "text-blue-700"
                        }`}
                      >
                        {isIn ? `+${Number(m.qty).toLocaleString("id-ID")}` : `-${Number(m.qty).toLocaleString("id-ID")}`} {unit}
                      </td>

                      <td className="py-4 px-4 text-on-surface">
                        {m.createdBy?.name || "Petugas Gudang"}
                      </td>

                      <td className="py-4 px-5 font-mono text-xs text-tertiary">
                        {m.referenceId ? `#${m.referenceId.slice(0, 10)}` : "-"}
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
