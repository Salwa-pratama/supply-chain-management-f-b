import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = {
  title: "Riwayat Transaksi & Invoice | BAPER SCM",
};

const TRANSACTIONS = [
  {
    invoiceNumber: "INV-2024-05-098",
    poNumber: "PO-BPR-2024-0580",
    client: "Kopi Kenangan - Mall Kelapa Gading 3",
    issueDate: "20 Mei 2024",
    dueDate: "3 Juni 2024",
    paymentMethod: "Bank Mandiri Virtual Account",
    amount: "Rp 18.250.000",
    status: "Lunas",
    statusVariant: "paid",
    paidDate: "22 Mei 2024, 14:20 WIB",
  },
  {
    invoiceNumber: "INV-2024-05-095",
    poNumber: "PO-BPR-2024-0576",
    client: "Fore Coffee - Grand Indonesia",
    issueDate: "18 Mei 2024",
    dueDate: "1 Juni 2024",
    paymentMethod: "BCA Corporate Escrow Transfer",
    amount: "Rp 12.450.000",
    status: "Lunas",
    statusVariant: "paid",
    paidDate: "20 Mei 2024, 10:15 WIB",
  },
  {
    invoiceNumber: "INV-2024-05-091",
    poNumber: "PO-BPR-2024-0572",
    client: "Janji Jiwa - Jilid 488 Tebet",
    issueDate: "15 Mei 2024",
    dueDate: "29 Mei 2024",
    paymentMethod: "Bank BRI Giro B2B",
    amount: "Rp 8.750.000",
    status: "Menunggu Pembayaran",
    statusVariant: "pending",
    paidDate: "-",
  },
  {
    invoiceNumber: "INV-2024-05-088",
    poNumber: "PO-BPR-2024-0568",
    client: "Teguk Indonesia - Otista Hub",
    issueDate: "12 Mei 2024",
    dueDate: "26 Mei 2024",
    paymentMethod: "BCA Corporate Escrow Transfer",
    amount: "Rp 6.300.000",
    status: "Menunggu Pembayaran",
    statusVariant: "pending",
    paidDate: "-",
  },
  {
    invoiceNumber: "INV-2024-05-081",
    poNumber: "PO-BPR-2024-0559",
    client: "Kopi Kenangan - Senopati",
    issueDate: "05 Mei 2024",
    dueDate: "19 Mei 2024",
    paymentMethod: "Bank Mandiri Virtual Account",
    amount: "Rp 8.420.000",
    status: "Lewat Jatuh Tempo (Overdue)",
    statusVariant: "overdue",
    paidDate: "Lewat 5 Hari",
  },
  {
    invoiceNumber: "INV-2024-05-078",
    poNumber: "PO-BPR-2024-0550",
    client: "Fore Coffee - Senayan City",
    issueDate: "02 Mei 2024",
    dueDate: "16 Mei 2024",
    paymentMethod: "BCA Corporate Escrow Transfer",
    amount: "Rp 15.600.000",
    status: "Lunas",
    statusVariant: "paid",
    paidDate: "15 Mei 2024, 16:45 WIB",
  },
];

export default function PemasokRiwayatPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Keuangan &amp; Penagihan B2B
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                Bulan Berjalan: Mei 2024
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Riwayat Transaksi &amp; Faktur Penagihan
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Rekapitulasi pencairan pembayaran pasokan dari gerai mitra, status pelunasan invoice TOP, dan bukti transfer resmi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Unduh Rekap Laporan Keuangan (Excel)</span>
            </button>
            <button
              type="button"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">add_card</span>
              <span>Terbitkan Invoice Baru</span>
            </button>
          </div>
        </div>

        {/* 4 FINANCIAL KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Total Pembayaran Diterima</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">
              Rp 138.500.000
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              86 Invoice Lunas Bulan Ini
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Piutang Menunggu Jatuh Tempo</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              Rp 45.200.000
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-tertiary bg-[#F5F8F6] px-2 py-0.5 rounded-full">
              7 Invoice Aktif (TOP 14-30 Hari)
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#B54747]/30 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] bg-gradient-to-br from-white to-[#FDF2F2]/30">
            <span className="text-label-md font-label-md text-[#B54747] font-bold">Tagihan Lewat Jatuh Tempo</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#B54747]">
              Rp 8.420.000
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#B54747] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#B54747]/30">
              1 Gerai Perlu Pengingat
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Rata-rata Waktu Pembayaran</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
              12.4 <span className="text-sm font-normal text-tertiary">Hari</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Arus Kas Sehat &amp; Lancar
            </span>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-tertiary">
              search
            </span>
            <input
              type="text"
              placeholder="Cari no. invoice, nama outlet, atau no. PO..."
              className="w-full h-11 pl-10 pr-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[#7B8794]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
              <option value="">Semua Status Pembayaran</option>
              <option value="lunas">Lunas (Paid)</option>
              <option value="pending">Menunggu Pembayaran</option>
              <option value="overdue">Lewat Jatuh Tempo</option>
            </select>

            <select className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
              <option value="">Metode Pembayaran</option>
              <option value="va">Virtual Account Mandiri</option>
              <option value="bca">BCA Escrow Transfer</option>
              <option value="giro">Giro / B2B Clearing</option>
            </select>

            <button
              type="button"
              className="h-11 px-3.5 rounded-xl border border-outline-variant/50 hover:bg-[#F5F8F6] text-on-surface text-body-sm flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              <span>Pilih Periode</span>
            </button>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                  <th className="py-4 px-5">No. Invoice &amp; PO</th>
                  <th className="py-4 px-4">Gerai Mitra</th>
                  <th className="py-4 px-4">Tanggal Terbit</th>
                  <th className="py-4 px-4">Jatuh Tempo</th>
                  <th className="py-4 px-4">Metode Bayar</th>
                  <th className="py-4 px-4">Total Tagihan</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-body-sm">
                {TRANSACTIONS.map((trx) => (
                  <tr key={trx.invoiceNumber} className="hover:bg-[#F5F8F6]/60 transition-colors">
                    {/* Invoice & PO */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#172033] font-mono hover:text-primary cursor-pointer">
                        {trx.invoiceNumber}
                      </div>
                      <div className="text-xs font-mono text-tertiary">Ref: {trx.poNumber}</div>
                    </td>

                    {/* Mitra */}
                    <td className="py-4 px-4 font-semibold text-on-surface">{trx.client}</td>

                    {/* Tanggal Terbit */}
                    <td className="py-4 px-4 text-tertiary">{trx.issueDate}</td>

                    {/* Jatuh Tempo */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-on-surface">{trx.dueDate}</div>
                      {trx.statusVariant === "overdue" && (
                        <span className="text-[11px] font-bold text-error">
                          {trx.paidDate}
                        </span>
                      )}
                    </td>

                    {/* Metode */}
                    <td className="py-4 px-4 text-tertiary text-xs">{trx.paymentMethod}</td>

                    {/* Nominal */}
                    <td className="py-4 px-4 font-bold text-primary font-mono">{trx.amount}</td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          trx.statusVariant === "paid"
                            ? "bg-[#E8F3EC] text-primary border border-primary/20"
                            : trx.statusVariant === "pending"
                            ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/20"
                            : "bg-[#FDF2F2] text-error border border-error/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            trx.statusVariant === "paid"
                              ? "bg-primary"
                              : trx.statusVariant === "pending"
                              ? "bg-[#B7791F]"
                              : "bg-error"
                          }`}
                        />
                        {trx.status}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                          title="Unduh Invoice PDF"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                        {trx.statusVariant === "overdue" && (
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg hover:bg-[#FDF2F2] text-[#B54747] flex items-center justify-center transition-colors"
                            title="Kirim Pengingat WhatsApp"
                          >
                            <span className="material-symbols-outlined text-[18px]">send</span>
                          </button>
                        )}
                        <button
                          type="button"
                          className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                          title="Lihat Rincian Faktur"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-4 bg-[#F9F9FF] border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-tertiary">
            <span>Menampilkan 1 - 6 dari total 94 riwayat faktur tagihan</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white text-tertiary hover:bg-[#F5F8F6] disabled:opacity-50"
                disabled
              >
                Sebelumnya
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-primary text-white font-bold flex items-center justify-center shadow-sm"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white border border-outline-variant/40 text-on-surface hover:bg-[#F5F8F6] flex items-center justify-center font-medium"
              >
                2
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-white text-on-surface hover:bg-[#F5F8F6]"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
