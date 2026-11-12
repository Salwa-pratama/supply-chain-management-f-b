import type { Metadata } from "next";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";

export const metadata: Metadata = {
  title: "Profil Pemasok & Perusahaan | BAPER SCM",
};

export default function PemasokProfilPage() {
  return (
    <>
      <PemasokTopbar />
      <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">
        {/* HEADER PERUSAHAAN */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-[#2B8A5B] to-[#7DD99E]" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-secondary-container border-2 border-primary/20 flex items-center justify-center font-bold text-primary text-2xl shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[40px]">storefront</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-headline-xl font-headline-xl text-[#172033]">
                    PT Tani Makmur Sejahtera
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/25">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Mitra Terverifikasi Grade A+
                  </span>
                </div>
                <p className="text-body-md font-body-md text-tertiary">
                  Distributor Bahan Baku F&B Nasional • Biji Kopi Specialty, Susu Segar Pasteurisasi, & Sirup Artisan
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-tertiary">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#B7791F]">star</span>
                    <strong className="text-on-surface">4.9 / 5.0</strong> (142 Evaluasi Gerai)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                    Mitra BAPER sejak Januari 2023
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">pin_drop</span>
                    Cilandak, Jakarta Selatan
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Unduh Portofolio & Legalitas</span>
              </button>
              <button
                type="button"
                className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">edit_square</span>
                <span>Perbarui Data Usaha</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Jaringan Gerai Mitra</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-headline-lg font-headline-lg text-[#172033]">28</span>
              <span className="text-xs text-tertiary font-medium">Brand & Outlet F&B</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              +4 Gerai Baru Kuartal Ini
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Akurasi & SLA Pemenuhan</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-headline-lg font-headline-lg text-primary">99.4%</span>
              <span className="text-xs text-tertiary font-medium">Tepat Waktu</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              SLA Optimal (Target &gt;98%)
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Kapasitas Gudang Terpakai</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-headline-lg font-headline-lg text-[#172033]">112</span>
              <span className="text-xs text-tertiary font-medium">/ 150 Tonase (74%)</span>
            </div>
            <div className="w-full bg-[#E9EDFF] h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "74%" }} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Rata-rata Respon PO</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-headline-lg font-headline-lg text-[#172033]">18</span>
              <span className="text-xs text-tertiary font-medium">Menit</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-[#B7791F] bg-[#FFF9E6] px-2 py-0.5 rounded-full border border-[#B7791F]/20">
              Responsif 24/7
            </span>
          </div>
        </div>

        {/* 2-COLUMN DETAIL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: LEGALITAS, SERTIFIKASI & FASILITAS (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Legalitas & Sertifikasi */}
            <section className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-6">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[24px]">verified_user</span>
                  <h2 className="text-headline-md font-headline-md text-[#172033]">
                    Legalitas & Sertifikasi Standar F&B
                  </h2>
                </div>
                <span className="text-xs text-primary bg-[#E8F3EC] font-semibold px-2.5 py-1 rounded-full">
                  Semua Dokumen Aktif
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-outline-variant/40 bg-[#F9F9FF] space-y-1.5">
                  <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">
                    Nomor Induk Berusaha (NIB)
                  </span>
                  <div className="font-semibold text-on-surface text-body-md font-mono">
                    9120004928174001
                  </div>
                  <div className="text-xs text-tertiary">Terbitan BKPM / OSS RBA • Berlaku Efektif</div>
                </div>

                <div className="p-4 rounded-xl border border-outline-variant/40 bg-[#F9F9FF] space-y-1.5">
                  <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">
                    NPWP Badan Usaha
                  </span>
                  <div className="font-semibold text-on-surface text-body-md font-mono">
                    01.884.291.5-014.000
                  </div>
                  <div className="text-xs text-tertiary">KPP Pratama Jakarta Kebayoran Baru Satu</div>
                </div>

                <div className="p-4 rounded-xl border border-outline-variant/40 bg-[#F9F9FF] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">
                      Sertifikat Halal BPJPH / MUI
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded">
                      VALID
                    </span>
                  </div>
                  <div className="font-semibold text-on-surface text-body-md font-mono">
                    ID00410000281200922
                  </div>
                  <div className="text-xs text-tertiary">Mencakup seluruh komoditas kopi, susu, & sirup</div>
                </div>

                <div className="p-4 rounded-xl border border-outline-variant/40 bg-[#F9F9FF] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">
                      Sertifikasi Keamanan Pangan BPOM
                    </span>
                    <span className="text-[10px] font-bold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded">
                      GRADE A
                    </span>
                  </div>
                  <div className="font-semibold text-on-surface text-body-md font-mono">
                    BPOM RI MD 202488102941
                  </div>
                  <div className="text-xs text-tertiary">HACCP & GMP Certified Food Safety Facility</div>
                </div>
              </div>
            </section>

            {/* Fasilitas Pergudangan & Cold Chain */}
            <section className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-5">
              <div className="flex items-center gap-2.5 border-b border-outline-variant/30 pb-4">
                <span className="material-symbols-outlined text-primary text-[24px]">warehouse</span>
                <h2 className="text-headline-md font-headline-md text-[#172033]">
                  Fasilitas Logistik & Rantai Dingin (Cold Chain)
                </h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-outline-variant/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">ac_unit</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#172033] text-body-lg">
                        Central Cold Storage Cilandak
                      </h3>
                      <p className="text-body-sm text-tertiary">
                        Kapasitas 60.000 Liter • Kontrol Suhu Presisi 2°C s/d 4°C untuk Fresh Milk & Dairy
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-mono text-primary font-semibold">
                        Suhu Aktual Sensor IoT: 2.8°C (Stabil)
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20 self-start sm:self-center">
                    Aktif Beroperasi
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-outline-variant/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">inventory_2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#172033] text-body-lg">
                        Gudang Bahan Kering & Green Beans (Tangerang)
                      </h3>
                      <p className="text-body-sm text-tertiary">
                        Luas 1.800 m² • Sistem Rak Pallet 4 Tingkat, Dehumidifier Udara Terkalibrasi
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-mono text-tertiary font-semibold">
                        Kelembapan Ruangan: 58% RH (Standar SCAA)
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20 self-start sm:self-center">
                    Aktif Beroperasi
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-outline-variant/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F3EC] text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">local_shipping</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#172033] text-body-lg">
                        Armada Logistik Sendiri (Dedicated Fleet)
                      </h3>
                      <p className="text-body-sm text-tertiary">
                        6 Unit Thermo King Chiller Box + 4 Van Delivery Cepat untuk Jadwal Pengiriman Pagi
                      </p>
                      <span className="inline-block mt-1 text-[11px] text-tertiary font-semibold">
                        Semua Armada Dilengkapi GPS Tracker & Live Temperature Logger
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/20 self-start sm:self-center">
                    10 Armada Siaga
                  </span>
                </div>
              </div>
            </section>

            {/* Rekam Jejak Mitra F&B */}
            <section className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[24px]">handshake</span>
                  <h2 className="text-headline-md font-headline-md text-[#172033]">
                    Jaringan Mitra F&B Resmi
                  </h2>
                </div>
                <span className="text-xs text-tertiary">28 Gerai Berlangganan Aktif</span>
              </div>

              <div className="divide-y divide-outline-variant/20">
                {[
                  {
                    name: "Kopi Kenangan Group",
                    branches: "14 Outlet Jabodetabek",
                    items: "Specialty Arabica & Fresh Milk Pasteurisasi",
                    vol: "1.400 Kg & 2.800 L / Bulan",
                    status: "Mitra Utama Prioritas",
                  },
                  {
                    name: "Fore Coffee Indonesia",
                    branches: "8 Outlet Jakarta Pusat & Selatan",
                    items: "Single Origin Beans & Sirup Gula Aren",
                    vol: "850 Kg & 400 L / Bulan",
                    status: "Kontrak Tahunan Aktif",
                  },
                  {
                    name: "Janji Jiwa & Jiwa Toast",
                    branches: "6 Outlet Jakarta Timur & Depok",
                    items: "Blend Robusta-Arabika & Susu Kental Manis",
                    vol: "600 Kg / Bulan",
                    status: "Mitra Reguler",
                  },
                ].map((client, idx) => (
                  <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#172033] text-body-md">{client.name}</h4>
                        <span className="text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
                          {client.branches}
                        </span>
                      </div>
                      <p className="text-xs text-tertiary mt-0.5">Komoditas: {client.items}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs font-bold text-on-surface">{client.vol}</div>
                      <span className="text-[11px] text-[#2B8A5B] font-medium">{client.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: PIC, KONTAK & OPERASIONAL (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            {/* PIC Tim Pengelola */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-5">
              <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2 border-b border-outline-variant/30 pb-3">
                <span className="material-symbols-outlined text-primary">contacts</span>
                Penanggung Jawab (PIC)
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary font-bold flex items-center justify-center text-sm border border-primary/20 shrink-0">
                    HP
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-body-md">Hendro Prasetyo</div>
                    <div className="text-xs text-tertiary">Kepala Logistik & Armada</div>
                    <div className="text-xs text-primary font-semibold mt-0.5">+62 812-9988-7711</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary font-bold flex items-center justify-center text-sm border border-primary/20 shrink-0">
                    MK
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-body-md">Maya Kartika, S.T.</div>
                    <div className="text-xs text-tertiary">Account Manager B2B & PO</div>
                    <div className="text-xs text-primary font-semibold mt-0.5">+62 811-2233-4455</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/20">
                <a
                  href="https://wa.me/6281299887711"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-11 rounded-xl bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 font-label-md text-label-md flex items-center justify-center gap-2 font-bold transition-all border border-[#25D366]/30"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Hubungi Hotline Darurat B2B</span>
                </a>
              </div>
            </div>

            {/* Lokasi Kantor & Warehouse */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
              <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2 border-b border-outline-variant/30 pb-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                Alamat Kantor & Gudang
              </h3>

              <div className="space-y-3 text-body-sm text-tertiary">
                <div>
                  <strong className="text-on-surface block">Kantor Pusat & Central Hub:</strong>
                  <span>Kawasan Pergudangan Cilandak Commercial Estate, Blok B-14, Pasar Minggu, Jakarta Selatan, 12560</span>
                </div>
                <div>
                  <strong className="text-on-surface block">Telepon Kantor:</strong>
                  <span>(021) 7884-9900 (Hunting)</span>
                </div>
                <div>
                  <strong className="text-on-surface block">Email Resmi:</strong>
                  <span className="text-primary font-medium">supply@tanimakmur.co.id</span>
                </div>
              </div>
            </div>

            {/* Ketentuan Pemesanan Pasokan (SLA) */}
            <div className="bg-[#F5F8F6] p-5 rounded-2xl border border-outline-variant/40 space-y-3">
              <h4 className="font-bold text-[#172033] text-body-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">info</span>
                Ketentuan SLA Pemesanan
              </h4>
              <ul className="text-xs text-tertiary space-y-2 list-disc pl-4">
                <li>Cut-off PO untuk pengiriman subuh: Pukul 18.00 WIB setiap harinya.</li>
                <li>Minimal order (MOQ) untuk bebas ongkir Jabodetabek: Rp 1.500.000.</li>
                <li>Pemeriksaan QC bersama driver saat serah terima barang di gerai mitra.</li>
                <li>Kebijakan retur maksimal 1x24 jam untuk barang rusak atau cacat kemasan.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
