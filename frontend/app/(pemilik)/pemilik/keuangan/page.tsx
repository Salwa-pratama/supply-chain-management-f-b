"use client";

import { useMemo } from "react";
import { useOrders } from "@/features/orders/hooks/use-orders";
import { usePurchaseOrders } from "@/features/purchase-orders/hooks/use-purchase-orders";

function rupiah(n: number | string) {
  return "Rp " + Math.round(Number(n) || 0).toLocaleString("id-ID");
}

export default function PemilikKeuanganPage() {
  const { data: dbOrders = [], isLoading: loadingOrders } = useOrders();
  const { data: dbPOs = [], isLoading: loadingPOs } = usePurchaseOrders();

  // Financial Computations from Real Database
  const totalRevenue = useMemo(() => {
    return dbOrders
      .filter((o) => o.status === "completed")
      .reduce((acc, o) => acc + Number(o.totalAmount || 0), 0);
  }, [dbOrders]);

  const totalTransactions = useMemo(() => {
    return dbOrders.filter((o) => o.status === "completed").length;
  }, [dbOrders]);

  const totalPoSpend = useMemo(() => {
    return dbPOs
      .filter((po) => po.status !== "cancelled")
      .reduce((acc, po) => acc + Number(po.totalAmount || 0), 0);
  }, [dbPOs]);

  // Food cost standard 32% or calculated from orders BOM
  const cogsAmount = useMemo(() => {
    return Math.round(totalRevenue * 0.32);
  }, [totalRevenue]);

  const grossProfit = totalRevenue - cogsAmount;
  const grossMarginPct = totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : "0.0";

  // Payment Breakdown
  const paymentBreakdown = useMemo(() => {
    if (totalRevenue === 0) {
      return [
        { method: "QRIS Dinamis (GoPay, OVO, ShopeePay)", share: "60%", amount: "Rp 0", count: 0 },
        { method: "Tunai / Cash Kasir", share: "30%", amount: "Rp 0", count: 0 },
        { method: "Transfer Bank & EDC Debit", share: "10%", amount: "Rp 0", count: 0 },
      ];
    }

    const counts: Record<string, { count: number; total: number }> = {};
    dbOrders
      .filter((o) => o.status === "completed")
      .forEach((o) => {
        const m = o.paymentMethod || "cash";
        if (!counts[m]) counts[m] = { count: 0, total: 0 };
        counts[m].count += 1;
        counts[m].total += Number(o.totalAmount || 0);
      });

    const labels: Record<string, string> = {
      qris: "QRIS Dinamis (GoPay, OVO, ShopeePay)",
      cash: "Tunai / Cash Kasir",
      debit: "EDC Debit Mandiri / BCA",
      transfer: "Transfer Bank & Virtual Account",
    };

    return Object.entries(counts).map(([m, val]) => {
      const sharePct = Math.round((val.total / totalRevenue) * 100);
      return {
        method: labels[m] || m.toUpperCase(),
        share: `${sharePct}%`,
        amount: rupiah(val.total),
        count: val.count,
      };
    });
  }, [dbOrders, totalRevenue]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Laporan Finansial &amp; Cash Flow
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Rekapitulasi Penjualan &amp; Laba Bersih
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Rekap Penjualan &amp; Laba Bersih
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Ringkasan omzet harian, perhitungan biaya modal bahan baku (HPP), marjin kotor, dan rekonsiliasi kasir POS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Unduh Laporan Keuangan (PDF)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pendapatan Kotor Kasir (POS)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">
            {rupiah(totalRevenue)}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            {totalTransactions} Transaksi Selesai
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Biaya Bahan Baku (HPP / COGS)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">
            {rupiah(cogsAmount)}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Food Cost 32.0% (Ideal)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Estimasi Laba Kotor (Gross Profit)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary font-mono">
            {rupiah(grossProfit)}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Margin Kotor {grossMarginPct}%
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pengeluaran Pengadaan (PO)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033] font-mono">
            {rupiah(totalPoSpend)}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            {dbPOs.length} PO Terbit ke Pemasok
          </span>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">credit_card</span>
            Metode Pembayaran Transaksi POS
          </h3>
          <div className="space-y-4 pt-2">
            {paymentBreakdown.map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-on-surface">{p.method} ({p.count} trx)</span>
                  <span className="text-primary font-mono">{p.share} • {p.amount}</span>
                </div>
                <div className="w-full bg-[#E9EDFF] h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all" style={{ width: p.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Procurement PO */}
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">receipt_long</span>
            Rekap Pembelian Pasokan (Purchase Orders)
          </h3>
          <div className="space-y-3 pt-2">
            {dbPOs.length === 0 ? (
              <p className="text-xs text-tertiary">Belum ada pengeluaran PO tercatat.</p>
            ) : (
              dbPOs.slice(0, 4).map((po) => (
                <div
                  key={po.id}
                  className="p-3.5 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#172033] text-body-sm">
                      #PO-{po.id.slice(0, 8).toUpperCase()} • {po.supplier?.name || "Mitra Pemasok"}
                    </div>
                    <div className="text-xs text-tertiary">
                      Status: <span className="font-bold uppercase text-primary">{po.status}</span> •{" "}
                      {new Date(po.createdAt).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                  <span className="font-bold text-primary font-mono text-body-sm">
                    {rupiah(po.totalAmount)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
