import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Pemilik Bisnis FNB | BAPER SCM Super Admin",
};

const BUSINESS_DATA = [
  {
    id: "BIZ-001",
    brand: "Kopi Kenangan Group",
    owner: "Budi Hartono",
    category: "Coffee & Beverage",
    outlets: 14,
    city: "Jabodetabek & Bandung",
    plan: "Enterprise SCM",
    gmv: "Rp 1.450.000.000",
    status: "Aktif",
    joinedDate: "Januari 2023",
  },
  {
    id: "BIZ-002",
    brand: "Fore Coffee Indonesia",
    owner: "Vania Stephanie",
    category: "Coffee & Beverage",
    outlets: 8,
    city: "Jakarta Pusat & Selatan",
    plan: "Enterprise SCM",
    gmv: "Rp 880.000.000",
    status: "Aktif",
    joinedDate: "Maret 2023",
  },
  {
    id: "BIZ-003",
    brand: "Janji Jiwa & Toast",
    owner: "Agus Pratama",
    category: "Quick Service Restaurant",
    outlets: 6,
    city: "Jakarta Timur & Depok",
    plan: "Pro Tier",
    gmv: "Rp 420.000.000",
    status: "Aktif",
    joinedDate: "Agustus 2023",
  },
  {
    id: "BIZ-004",
    brand: "Dear Butter Artisan Bakery",
    owner: "Kevin Sanjaya",
    category: "Bakery & Pastry",
    outlets: 4,
    city: "Tangerang & Serpong",
    plan: "Pro Tier",
    gmv: "Rp 310.000.000",
    status: "Aktif",
    joinedDate: "November 2023",
  },
  {
    id: "BIZ-005",
    brand: "Teguk Indonesia",
    owner: "Rahmat Hidayat",
    category: "Street Beverage",
    outlets: 12,
    city: "Jabodetabek",
    plan: "Enterprise SCM",
    gmv: "Rp 690.000.000",
    status: "Aktif",
    joinedDate: "Februari 2024",
  },
];

export default function AdminBisnisPage() {
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
              48 Entitas Bisnis Aktif
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Data Pemilik Bisnis F&amp;B
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Pantau jaringan waralaba, jumlah gerai/outlet, estimasi omzet platform, dan status langganan lisensi BAPER SCM.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Unduh Rekap Tenant (Excel)</span>
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_business</span>
            <span>Daftarkan Bisnis Baru</span>
          </button>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Brand F&amp;B</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">48</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            +4 Brand Kuartal Ini
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Total Gerai / Outlet</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">184</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Terhubung POS &amp; Gudang
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">GMV Bulanan Ekosistem</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">
            Rp 4.82 Miliar
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            +18% MoM Growth
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Retensi Tenant</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">99.2%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Sangat Stabil
          </span>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Nama Bisnis &amp; ID</th>
                <th className="py-4 px-4">Pemilik (Owner)</th>
                <th className="py-4 px-4">Kategori F&amp;B</th>
                <th className="py-4 px-4">Jumlah Gerai</th>
                <th className="py-4 px-4">Wilayah Operasional</th>
                <th className="py-4 px-4">Paket SCM</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {BUSINESS_DATA.map((biz) => (
                <tr key={biz.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033] hover:text-primary cursor-pointer">
                      {biz.brand}
                    </div>
                    <span className="text-xs font-mono text-tertiary">{biz.id}</span>
                  </td>

                  <td className="py-4 px-4 font-medium text-on-surface">{biz.owner}</td>

                  <td className="py-4 px-4 text-tertiary">{biz.category}</td>

                  <td className="py-4 px-4 font-bold text-primary">{biz.outlets} Outlet</td>

                  <td className="py-4 px-4 text-tertiary text-xs">{biz.city}</td>

                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20">
                      {biz.plan}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {biz.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                        title="Lihat Detail Tenant"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                        title="Kelola Lisensi"
                      >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
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
