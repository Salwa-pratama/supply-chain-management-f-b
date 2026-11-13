import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Pemasok & Mitra | BAPER SCM Super Admin",
};

const SUPPLIERS = [
  {
    id: "SUP-001",
    name: "PT Tani Makmur Sejahtera",
    category: "Biji Kopi Specialty, Dairy & Sirup",
    location: "Cilandak, Jakarta Selatan",
    pic: "Hendro Prasetyo (0812-9988-7711)",
    clientsCount: 28,
    activePO: 12,
    rating: "4.9 / 5.0",
    status: "Grade A+ (Verified)",
    statusVariant: "active",
  },
  {
    id: "SUP-002",
    name: "CV Sumber Pangan Nusantara",
    category: "Gula Aren Organik & Bahan Pemanis",
    location: "Lebak Bulus, Jakarta Selatan",
    pic: "Denny Setiawan (0813-1122-3344)",
    clientsCount: 19,
    activePO: 6,
    rating: "4.8 / 5.0",
    status: "Grade A (Verified)",
    statusVariant: "active",
  },
  {
    id: "SUP-003",
    name: "PT Agro Dairy Jaya",
    category: "Fresh Milk Pasteurisasi & Whipping Cream",
    location: "Cibubur, Jakarta Timur",
    pic: "Rina Kusuma (0857-4455-6677)",
    clientsCount: 34,
    activePO: 18,
    rating: "4.9 / 5.0",
    status: "Grade A+ (Verified)",
    statusVariant: "active",
  },
  {
    id: "SUP-004",
    name: "PT Eco Packaging Solusindo",
    category: "Paper Cups, Straws PLA & Lunch Box",
    location: "Cikarang, Jawa Barat",
    pic: "Bramantyo (0818-9900-1122)",
    clientsCount: 22,
    activePO: 4,
    rating: "4.7 / 5.0",
    status: "Grade B+ (Verified)",
    statusVariant: "active",
  },
];

export default function AdminPemasokPage() {
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
              36 Mitra Pemasok Terverifikasi
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-[#172033]">
            Data Pemasok &amp; Mitra Terdaftar
          </h1>
          <p className="text-body-md font-body-md text-tertiary mt-1">
            Direktori distributor nasional bahan baku F&amp;B, audit mutu rantai pasok (QC), dan evaluasi kepuasan gerai.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Unduh Laporan Audit Pemasok</span>
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Verifikasi Mitra Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pemasok Terverifikasi</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">36</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Sertifikat Halal &amp; BPOM
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Pesanan Pasokan Aktif</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">68 PO</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Dalam Proses Pengiriman
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">Rata-rata Rating Kualitas</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-primary">4.88 / 5.0</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Tingkat Kepuasan Tinggi
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <span className="text-label-md font-label-md text-tertiary">SLA Pemenuhan Tepat Waktu</span>
          <div className="mt-2 text-headline-lg font-headline-lg text-[#172033]">98.7%</div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
            Standar Rantai Dingin
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9F9FF] border-b border-outline-variant/30 text-xs font-bold text-tertiary uppercase tracking-wider">
                <th className="py-4 px-5">Nama Mitra &amp; ID</th>
                <th className="py-4 px-4">Komoditas Pasokan</th>
                <th className="py-4 px-4">Penanggung Jawab (PIC)</th>
                <th className="py-4 px-4">Gerai Dilayani</th>
                <th className="py-4 px-4">PO Aktif</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Status Akreditasi</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {SUPPLIERS.map((sup) => (
                <tr key={sup.id} className="hover:bg-[#F5F8F6]/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033] hover:text-primary cursor-pointer">
                      {sup.name}
                    </div>
                    <span className="text-xs font-mono text-tertiary">{sup.id}</span>
                  </td>

                  <td className="py-4 px-4 text-tertiary">{sup.category}</td>

                  <td className="py-4 px-4 text-xs font-medium text-on-surface">{sup.pic}</td>

                  <td className="py-4 px-4 font-bold text-primary">{sup.clientsCount} Mitra</td>

                  <td className="py-4 px-4 font-medium text-on-surface">{sup.activePO} PO</td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-on-surface">{sup.rating}</span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      {sup.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-lg hover:bg-[#E8F3EC] text-tertiary hover:text-primary flex items-center justify-center transition-colors"
                        title="Lihat Detail Profil"
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
      </div>
    </>
  );
}
