"use client";

import { useEffect, useState } from "react";
import PemasokTopbar from "@/components/pemasok/PemasokTopbar";
import { useMySupplierProfile, useUpdateSupplierProfile } from "@/features/suppliers/hooks/use-suppliers";

export default function PemasokProfilPage() {
  const { data: profile, isLoading } = useMySupplierProfile();
  const updateProfileMutation = useUpdateSupplierProfile();

  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setCategory(profile.category || "Distributor Bahan Baku F&B");
    }
  }, [profile]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(
      {
        name: name.trim(),
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        category: category.trim() || undefined,
      },
      {
        onSuccess: (updated) => {
          setEditOpen(false);
          showToast(`Profil ${updated.name} berhasil diperbarui di database!`);
        },
        onError: (err) => {
          showToast(`Gagal memperbarui profil: ${err.message}`);
        },
      }
    );
  };

  const supplierName = profile?.name || "PT Tani Makmur Sejahtera";
  const supplierCategory = profile?.category || "Distributor Bahan Baku F&B Nasional";
  const supplierPhone = profile?.phone || "+62 811-2345-6789";
  const supplierAddress = profile?.address || "Kawasan Pergudangan Cilandak No. 18, Jakarta Selatan";

  return (
    <>
      <PemasokTopbar />

      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#172033] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-outline-variant/40 animate-fade-in text-sm font-medium">
          <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

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
                    {isLoading ? "Memuat data profil..." : supplierName}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3EC] text-primary border border-primary/25">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Mitra Terverifikasi Grade A+
                  </span>
                </div>
                <p className="text-body-md font-body-md text-tertiary">
                  {supplierCategory} • Kontak: {supplierPhone}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-tertiary">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#B7791F]">star</span>
                    <strong className="text-on-surface">4.9 / 5.0</strong> (Evaluasi Gerai BAPER)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                    Mitra Terdaftar Resmi
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">pin_drop</span>
                    {supplierAddress}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="h-11 px-4 rounded-xl border border-[#94B9A9] bg-white text-[#172033] hover:bg-[#E8F3EC] font-label-lg text-label-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Unduh Portofolio (Print)</span>
              </button>
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] font-label-lg text-label-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
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
              <span className="text-headline-lg font-headline-lg text-[#172033]">1</span>
              <span className="text-xs text-tertiary font-medium">Brand BAPER F&amp;B</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Mitra Suplai Terdaftar
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Akurasi &amp; SLA Pemenuhan</span>
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
              <span className="text-xs text-tertiary font-medium">Palet dari 160</span>
            </div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Utilisasi 70% Aman
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)]">
            <span className="text-label-md font-label-md text-tertiary">Status Sertifikasi Halal &amp; BPOM</span>
            <div className="mt-2 text-headline-lg font-headline-lg text-primary">Aktif</div>
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-[#E8F3EC] px-2 py-0.5 rounded-full">
              Berlaku s/d Des 2027
            </span>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">business</span>
              Informasi Badan Usaha &amp; Alamat
            </h3>
            <div className="space-y-3 pt-2 text-sm text-[#172033]">
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-tertiary font-medium">Nama Legal:</span>
                <span className="font-bold">{supplierName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-tertiary font-medium">Kategori Usaha:</span>
                <span className="font-bold">{supplierCategory}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-tertiary font-medium">No. Telepon / WhatsApp:</span>
                <span className="font-bold">{supplierPhone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-tertiary font-medium">Alamat Pusat:</span>
                <span className="font-bold text-right max-w-xs">{supplierAddress}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/35 shadow-[0_4px_20px_-2px_rgba(23,32,51,0.04)] space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-[#172033] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              Sertifikasi Mutu &amp; Kepatuhan
            </h3>
            <div className="space-y-3 pt-2 text-sm text-[#172033]">
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-tertiary font-medium">Sertifikat Halal MUI:</span>
                <span className="font-bold text-primary">ID31110001892180421 (Valid)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-tertiary font-medium">Izin Edar BPOM MD:</span>
                <span className="font-bold text-primary">MD 268809001234 (Valid)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-tertiary font-medium">Sistem Cold-Chain:</span>
                <span className="font-bold text-primary">HACCP Certified</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-tertiary font-medium">Integrasi Sistem SCM:</span>
                <span className="font-bold text-primary">BAPER Cloud API Connected</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: Perbarui Data Usaha */}
      {editOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-outline-variant/30 p-6 sm:p-8 animate-fade-in space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">edit_square</span>
                </div>
                <div>
                  <h3 className="text-headline-sm font-bold text-[#172033]">Perbarui Data Usaha Pemasok</h3>
                  <p className="text-xs text-tertiary">Data ini langsung disinkronkan ke seluruh gerai mitra</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-tertiary hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">Nama Perusahaan / Supplier *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">Kategori Pasokan</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">Alamat Kantor / Gudang</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-[#172033]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="h-10 px-4 rounded-xl border border-outline-variant/50 text-tertiary hover:bg-[#F5F8F6] text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="h-10 px-5 rounded-xl bg-primary text-white hover:bg-[#0D6038] text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>{updateProfileMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
