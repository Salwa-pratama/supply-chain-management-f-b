import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = {
  title: "Pesanan Pasokan (PO) | BAPER SCM",
};

const PO_ORDERS = [
  {
    id: "PO-BPR-2024-0589",
    client: "Kopi Kenangan - Senopati",
    clientCategory: "Mitra Prioritas",
    incomingTime: "25 Menit lalu",
    deliveryRequest: "Besok pagi sebelum pukul 07.30 WIB",
    address: "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan",
    totalAmount: "Rp 12.850.000",
    status: "Menunggu Konfirmasi",
    statusVariant: "urgent",
    items: [
      { name: "Arabika Specialty Gayo Grade 1", qty: "50 Kg", subtotal: "Rp 8.750.000" },
      { name: "Fresh Milk Pasteurisasi Homogen", qty: "120 Liter", subtotal: "Rp 2.940.000" },
      { name: "Sirup Gula Aren Organik 5L", qty: "8 Jeriken", subtotal: "Rp 1.080.000" },
      { name: "Paper Cup Hot 8oz Double Wall", qty: "2 Karton", subtotal: "Rp 840.000" },
    ],
  },
  {
    id: "PO-BPR-2024-0590",
    client: "Fore Coffee - Grand Indonesia",
    clientCategory: "Mitra Prioritas",
    incomingTime: "45 Menit lalu",
    deliveryRequest: "Besok pagi pukul 08.00 WIB",
    address: "Grand Indonesia West Mall Lt. LG, Jakarta Pusat",
    totalAmount: "Rp 8.420.000",
    status: "Menunggu Konfirmasi",
    statusVariant: "urgent",
    items: [
      { name: "Robusta Dampit Fine Grade", qty: "40 Kg", subtotal: "Rp 3.400.000" },
      { name: "Oat Milk Barista Edition 1L", qty: "60 Liter", subtotal: "Rp 2.520.000" },
      { name: "Vanilla Artisan Flavor Syrup 750ml", qty: "12 Botol", subtotal: "Rp 1.056.000" },
      { name: "Matcha Uji Ceremonial 500g", qty: "6 Pouch", subtotal: "Rp 1.560.000" },
    ],
  },
  {
    id: "PO-BPR-2024-0588",
    client: "Janji Jiwa - Jilid 488 Tebet",
    clientCategory: "Mitra Reguler",
    incomingTime: "2 Jam lalu",
    deliveryRequest: "Hari ini pukul 14.00 WIB",
    address: "Jl. Tebet Raya No. 18, Jakarta Selatan",
    totalAmount: "Rp 6.150.000",
    status: "Sedang Diproses & QC",
    statusVariant: "process",
    items: [
      { name: "Robusta Dampit Fine Grade", qty: "30 Kg", subtotal: "Rp 2.550.000" },
      { name: "Fresh Milk Pasteurisasi", qty: "80 Liter", subtotal: "Rp 1.960.000" },
      { name: "Sirup Gula Aren Organik 5L", qty: "6 Jeriken", subtotal: "Rp 810.000" },
      { name: "Pouch Bubuk Cokelat Dark 1kg", qty: "10 Kg", subtotal: "Rp 830.000" },
    ],
  },
  {
    id: "PO-BPR-2024-0587",
    client: "Teguk Indonesia - Otista Hub",
    clientCategory: "Mitra Reguler",
    incomingTime: "3 Jam lalu",
    deliveryRequest: "Hari ini pukul 15.30 WIB",
    address: "Jl. Otto Iskandardinata No. 82, Jakarta Timur",
    totalAmount: "Rp 5.200.000",
    status: "Sedang Diproses & QC",
    statusVariant: "process",
    items: [
      { name: "Matcha Uji Ceremonial 500g", qty: "10 Pouch", subtotal: "Rp 2.600.000" },
      { name: "Fresh Milk Pasteurisasi", qty: "60 Liter", subtotal: "Rp 1.470.000" },
      { name: "Sirup Pandan Wangi Artisan", qty: "8 Botol", subtotal: "Rp 704.000" },
      { name: "Straw Ramah Lingkungan PLA", qty: "3 Karton", subtotal: "Rp 426.000" },
    ],
  },
  {
    id: "PO-BPR-2024-0585",
    client: "Kopi Kenangan - Gandaria City",
    clientCategory: "Mitra Prioritas",
    incomingTime: "5 Jam lalu",
    deliveryRequest: "Hari ini pukul 13.00 WIB",
    address: "Gandaria City Mall Lt. UG, Kebayoran Lama, Jaksel",
    totalAmount: "Rp 9.750.000",
    status: "Siap Dikirim",
    statusVariant: "ready",
    items: [
      { name: "Arabika Specialty Gayo Grade 1", qty: "40 Kg", subtotal: "Rp 7.000.000" },
      { name: "Fresh Milk Pasteurisasi", qty: "80 Liter", subtotal: "Rp 1.960.000" },
      { name: "Sirup Gula Aren Organik 5L", qty: "5 Jeriken", subtotal: "Rp 675.000" },
      { name: "Plastic Cup Cold 16oz + Lid", qty: "1 Karton", subtotal: "Rp 380.000" },
    ],
  },
];

export default function PemasokPesananPoPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER & QUICK ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-semibold text-primary uppercase tracking-wider">
                Kelola Pesanan Pengadaan Masuk
              </span>
              <span className="text-tertiary text-xs">•</span>
              <span className="text-body-sm text-tertiary font-body-sm">
                5 Pesanan Butuh Respon Hari Ini
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-[#172033]">
              Pesanan Pasokan (Purchase Order)
            </h1>
            <p className="text-body-md font-body-md text-tertiary mt-1">
              Tinjau dokumen PO resmi dari gerai F&B mitra, alokasikan stok gudang, dan terbitkan surat jalan pengiriman.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Ekspor Rekap PO (Excel)</span>
            </button>
            <button
              type="button"
              className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              <span>Konfirmasi Sekaligus</span>
            </button>
          </div>
        </div>

        {/* STATUS TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { label: "Semua PO", count: 24, active: false },
            { label: "Menunggu Konfirmasi", count: 5, active: true, alert: true },
            { label: "Sedang Diproses & QC", count: 7, active: false },
            { label: "Siap Kirim", count: 3, active: false },
            { label: "Selesai Terpenuhi", count: 86, active: false },
            { label: "Dibatalkan", count: 1, active: false },
          ].map((tab, idx) => (
            <button
              key={idx}
              type="button"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                tab.active
                  ? "bg-primary text-white font-bold shadow-sm"
                  : "bg-white border border-outline-variant/35 text-tertiary hover:text-on-surface hover:bg-[#F5F8F6]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  tab.active
                    ? tab.alert
                      ? "bg-[#B54747] text-white"
                      : "bg-white/20 text-white"
                    : tab.alert
                    ? "bg-[#FDF2F2] text-[#B54747]"
                    : "bg-[#F5F8F6] text-tertiary"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-tertiary">
              search
            </span>
            <input
              type="text"
              placeholder="Cari no. PO, nama brand, atau alamat outlet..."
              className="w-full h-11 pl-10 pr-4 text-body-sm font-body-sm bg-[#F5F8F6] border border-outline-variant/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[#7B8794]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
              <option value="">Semua Mitra Kedai</option>
              <option value="kenangan">Kopi Kenangan</option>
              <option value="fore">Fore Coffee</option>
              <option value="janji">Janji Jiwa</option>
              <option value="teguk">Teguk Indonesia</option>
            </select>

            <select className="h-11 px-3.5 rounded-xl border border-outline-variant/50 bg-[#F5F8F6] text-on-surface text-body-sm focus:outline-none focus:border-primary">
              <option value="">Jadwal Pengiriman</option>
              <option value="today">Hari Ini</option>
              <option value="tomorrow">Besok Pagi</option>
              <option value="week">Minggu Ini</option>
            </select>

            <button
              type="button"
              className="h-11 px-3.5 rounded-xl border border-outline-variant/50 hover:bg-[#F5F8F6] text-on-surface text-body-sm flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              <span>Pilih Tanggal</span>
            </button>
          </div>
        </div>

        {/* PO LIST CARDS */}
        <div className="space-y-4">
          {PO_ORDERS.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-2xl border p-6 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden transition-all hover:shadow-md ${
                order.statusVariant === "urgent"
                  ? "border-[#B54747]/30 hover:border-error"
                  : "border-outline-variant/40 hover:border-primary/40"
              }`}
            >
              {order.statusVariant === "urgent" && (
                <div className="absolute top-0 left-0 h-1.5 w-full bg-[#B54747]" />
              )}
              {order.statusVariant === "process" && (
                <div className="absolute top-0 left-0 h-1.5 w-full bg-[#B7791F]" />
              )}
              {order.statusVariant === "ready" && (
                <div className="absolute top-0 left-0 h-1.5 w-full bg-primary" />
              )}

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-outline-variant/30">
                {/* Info Utama PO */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      order.statusVariant === "urgent"
                        ? "bg-[#FDF2F2] text-[#B54747] border-[#B54747]/20"
                        : order.statusVariant === "process"
                        ? "bg-[#FFF9E6] text-[#B7791F] border-[#B7791F]/20"
                        : "bg-[#E8F3EC] text-primary border-primary/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {order.statusVariant === "urgent"
                        ? "priority_high"
                        : order.statusVariant === "process"
                        ? "fact_check"
                        : "local_shipping"}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-[#172033]">
                        {order.client}
                      </h3>
                      <span className="bg-[#E8F3EC] text-primary text-[11px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                        {order.clientCategory}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-tertiary mt-1">
                      <span>
                        No. PO:{" "}
                        <strong className="text-on-surface font-mono">{order.id}</strong>
                      </span>
                      <span>•</span>
                      <span>Masuk: {order.incomingTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-tertiary mt-2">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        pin_drop
                      </span>
                      <span>{order.address}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs text-[#B7791F] bg-[#FFF9E6] px-3 py-1 rounded-lg border border-[#B7791F]/20 mt-2">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      <span>Jadwal Pengiriman: <strong>{order.deliveryRequest}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Status & Total Nilai */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      order.statusVariant === "urgent"
                        ? "bg-[#FDF2F2] text-[#B54747] border border-[#B54747]/30"
                        : order.statusVariant === "process"
                        ? "bg-[#FFF9E6] text-[#B7791F] border border-[#B7791F]/20"
                        : "bg-[#E8F3EC] text-primary border border-primary/20"
                    }`}
                  >
                    {order.status}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-tertiary">Total Nilai Tagihan</span>
                    <div className="text-headline-sm font-headline-sm font-bold text-primary">
                      {order.totalAmount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rincian Komoditas Bahan Baku */}
              <div className="py-4">
                <div className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2">
                  Komoditas Dipesan:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#F5F8F6] border border-outline-variant/30 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-semibold text-[#172033] text-body-sm line-clamp-1">
                          {item.name}
                        </div>
                        <div className="text-xs text-tertiary mt-0.5">Jumlah: <strong className="text-on-surface">{item.qty}</strong></div>
                      </div>
                      <div className="text-xs font-bold text-primary mt-2">{item.subtotal}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Cluster */}
              <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt</span>
                    <span>Lihat Dokumen PO</span>
                  </button>
                  <button
                    type="button"
                    className="h-10 px-3.5 rounded-xl border border-outline-variant/40 hover:bg-[#F5F8F6] text-on-surface text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    <span>Cetak Proforma</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {order.statusVariant === "urgent" && (
                    <>
                      <button
                        type="button"
                        className="h-10 px-4 rounded-xl border border-[#B54747]/40 text-[#B54747] hover:bg-[#FDF2F2] text-label-md font-label-md flex items-center gap-1.5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                        <span>Tolak PO</span>
                      </button>
                      <button
                        type="button"
                        className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Konfirmasi &amp; Alokasikan Stok</span>
                      </button>
                    </>
                  )}

                  {order.statusVariant === "process" && (
                    <button
                      type="button"
                      className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                      <span>Terbitkan Surat Jalan (DO)</span>
                    </button>
                  )}

                  {order.statusVariant === "ready" && (
                    <button
                      type="button"
                      className="h-10 px-5 rounded-xl bg-[#006D3E] text-white hover:bg-[#0D6038] text-label-md font-label-md flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">navigation</span>
                      <span>Lacak Posisi Armada Kirim</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
