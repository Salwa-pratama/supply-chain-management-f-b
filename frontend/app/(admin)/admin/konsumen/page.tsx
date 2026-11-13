import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Konsumen & Loyalitas | BAPER SCM Super Admin",
};

const CUSTOMERS = [
  {
    id: "CUST-8812",
    name: "Sarah Amanda",
    phone: "0812-9981-2244",
    email: "sarah.amanda@gmail.com",
    favoriteBrand: "Kopi Kenangan (Senopati)",
    totalTransactions: 34,
    totalSpent: "Rp 1.840.000",
    loyaltyPoints: "1.420 Poin",
    channel: "WhatsApp Bot (Gemini)",
  },
  {
    id: "CUST-8813",
    name: "Dimas Wicaksono",
    phone: "0813-7722-1199",
    email: "dimas.w@yahoo.com",
    favoriteBrand: "Fore Coffee (Grand Indonesia)",
    totalTransactions: 28,
    totalSpent: "Rp 1.450.000",
    loyaltyPoints: "980 Poin",
    channel: "Kasir POS Outlet",
  },
  {
    id: "CUST-8814",
    name: "Nadia Safitri",
    phone: "0856-9900-3322",
    email: "nadia.safitri@gmail.com",
    favoriteBrand: "Dear Butter Bakery (BSD)",
    totalTransactions: 19,
    totalSpent: "Rp 920.000",
    loyaltyPoints: "720 Poin",
    channel: "WhatsApp Bot (Gemini)",
  },
  {
    id: "CUST-8815",
    name: "Reza Surya",
    phone: "0878-4455-8811",
    email: "reza.surya@outlook.com",
    favoriteBrand: "Janji Jiwa (Tebet)",
    totalTransactions: 42,
    totalSpent: "Rp 1.950.000",
    loyaltyPoints: "1.890 Poin",
    channel: "Kasir POS Outlet",
  },
];

export default function AdminKonsumenPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
              Data Konsumen Ekosistem F&amp;B
            </span>
            <span className="text-tertiary text-xs">•</span>
            <span className="text-body-sm text-tertiary font-body-sm">
              Total 12.480 Pelanggan Terdata
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Data Konsumen &amp; Aktivitas Transaksi
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Analisis basis pelanggan retail yang memesan melalui POS Kasir maupun WhatsApp Bot AI lintas seluruh gerai.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor Segmen Pelanggan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Pelanggan Terdaftar</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">12.480</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            +1.240 Pelanggan Baru Bulan Ini
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Repeat Order Rate</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">64.8%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Loyalitas Pelanggan Tinggi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Nilai Belanja (AOV)</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">Rp 54.200</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Per Transaksi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Order via AI Bot WhatsApp</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">42%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Konversi Pesan Instan
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Nama Pelanggan &amp; ID</th>
                <th className="py-4 px-4">Kontak (WA &amp; Email)</th>
                <th className="py-4 px-4">Gerai Favorit</th>
                <th className="py-4 px-4">Total Pesanan</th>
                <th className="py-4 px-4">Total Belanja</th>
                <th className="py-4 px-4">Kanal Pemesanan</th>
                <th className="py-4 px-5 text-right">Poin Loyalitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {CUSTOMERS.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033]">{cust.name}</div>
                    <span className="text-xs font-mono text-tertiary">{cust.id}</span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-medium text-on-surface">{cust.phone}</div>
                    <div className="text-xs text-tertiary">{cust.email}</div>
                  </td>

                  <td className="py-4 px-4 text-on-surface font-medium">{cust.favoriteBrand}</td>

                  <td className="py-4 px-4 font-bold text-[#172033]">{cust.totalTransactions} Order</td>

                  <td className="py-4 px-4 font-bold text-primary font-mono">{cust.totalSpent}</td>

                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F8F6] text-tertiary border border-outline-variant/35">
                      {cust.channel}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right font-bold text-primary">{cust.loyaltyPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
