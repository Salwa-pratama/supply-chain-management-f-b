"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "@/features/auth/hooks/use-register";

type Role = "merchant" | "supplier";

const ROLE_COPY: Record<Role, { label: string; placeholder: string; nama: string }> = {
  merchant: {
    label: "Nama Usaha / Brand F&B",
    placeholder: "Contoh: Kopi Cerita Jiwa",
    nama: "Pemilik Bisnis F&B",
  },
  supplier: {
    label: "Nama Usaha / PT Mitra Pemasok",
    placeholder: "Contoh: PT Pangan Makmur Abadi",
    nama: "Mitra Pemasok",
  },
};

const ROLE_BTN =
  "flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-label-lg font-label-lg transition-all duration-150";
const ROLE_ACTIVE = "bg-surface-container-lowest text-primary shadow-sm ring-1 ring-primary/10";
const ROLE_IDLE = "text-on-surface-variant hover:text-primary";

const INPUT =
  "w-full h-12 px-4 rounded-2xl bg-surface-container-lowest border border-[rgba(148,185,169,0.6)] text-body-md font-body-md text-on-surface placeholder:text-[#7B8794] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const LABEL = "block text-label-md font-label-md text-on-surface mb-1.5";

const KATEGORI = [
  ["coffee", "Kedai Kopi / Kafe"],
  ["heavy_food", "Makanan Berat / Restoran"],
  ["bakery", "Roti & Pastry / Bakery"],
  ["cloud_kitchen", "Cloud Kitchen / Catering"],
  ["raw_supplier", "Pemasok Bahan Segar (Sayur/Daging)"],
  ["packaging", "Pemasok Kemasan & Logistik"],
] as const;

// Kekuatan kata sandi: 0 = kosong, 1-4 = lemah sampai sangat kuat
function nilaiKekuatan(pw: string) {
  if (!pw) return { level: 0, label: "Belum terisi", text: "text-outline", bar: "" };
  let skor = 0;
  if (pw.length >= 8) skor++;
  if (/[A-Z]/.test(pw)) skor++;
  if (/[0-9]/.test(pw)) skor++;
  if (/[^A-Za-z0-9]/.test(pw)) skor++;
  if (skor <= 1) return { level: 1, label: "Lemah", text: "text-error", bar: "bg-error" };
  if (skor === 2) return { level: 2, label: "Cukup", text: "text-[#B7791F]", bar: "bg-[#B7791F]" };
  if (skor === 3) return { level: 3, label: "Baik", text: "text-secondary", bar: "bg-secondary" };
  return { level: 4, label: "Sangat Kuat", text: "text-primary", bar: "bg-primary" };
}

function Req() {
  return <span className="text-error">*</span>;
}

export default function RegisterForm() {
  const [role, setRole] = useState<Role>("merchant");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const registerMutation = useRegister({
    onSuccess: (data) => {
      setSuccessMessage(
        `Akun ${data.user.name} berhasil dibuat! Mengalihkan ke halaman login...`
      );
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (err) => {
      setError(err.message || "Gagal melakukan registrasi");
    },
  });

  const copy = ROLE_COPY[role];
  const kuat = nilaiKekuatan(password);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Konfirmasi kata sandi tidak cocok. Harap periksa kembali.");
      return;
    }
    setError("");

    const backendRole = role === "supplier" ? "pemasok" : "owner";
    registerMutation.mutate({
      name: fullName.trim() || businessName.trim(),
      email: email.trim(),
      password: password.trim(),
      role: backendRole,
    });
  }

  const isLoading = registerMutation.isPending;
  const isSuccess = registerMutation.isSuccess;
  const activeError = error || registerMutation.error?.message;

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 md:p-10 rounded-2xl border border-[rgba(148,185,169,0.35)] shadow-[0_4px_20px_-2px_rgba(23,32,51,0.06)]">
      <div className="mb-6">
        <h2 className="text-headline-md font-headline-md text-on-surface tracking-tight">
          Buat Akun Bisnis Anda
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-1">
          Pilih tipe akun yang sesuai dengan peran ekosistem usaha Anda.
        </p>
      </div>

      {/* Daftar cepat Google (belum terhubung) */}
      <button
        type="button"
        className="w-full h-12 flex items-center justify-center gap-3 rounded-2xl border border-[rgba(148,185,169,0.6)] bg-surface-container-lowest hover:bg-[#E8F3EC] text-on-surface font-label-lg text-label-lg transition-all duration-150 active:scale-[0.99] mb-6 shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
        <span>Daftar Cepat dengan Google</span>
      </button>

      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-[rgba(148,185,169,0.35)] w-full" />
        <span className="bg-surface-container-lowest px-4 text-label-sm font-label-sm text-outline absolute uppercase tracking-wider">
          atau isi rincian bisnis
        </span>
      </div>

      {/* Pilihan peran */}
      <div className="mb-6">
        <span className="block text-label-md font-label-md text-on-surface mb-2">Tipe Akun Pengguna</span>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-[#E8F3EC] rounded-2xl border border-[rgba(148,185,169,0.35)]"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={role === "merchant"}
            onClick={() => setRole("merchant")}
            className={`${ROLE_BTN} ${role === "merchant" ? ROLE_ACTIVE : ROLE_IDLE}`}
          >
            <span className="material-symbols-outlined text-xl">storefront</span>
            <span className="text-left">
              <span className="block leading-none font-bold">Pemilik Bisnis F&B</span>
              <span className="text-body-sm font-body-sm text-on-surface-variant block text-xs mt-0.5">
                Kafe, Resto, Katering
              </span>
            </span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === "supplier"}
            onClick={() => setRole("supplier")}
            className={`${ROLE_BTN} ${role === "supplier" ? ROLE_ACTIVE : ROLE_IDLE}`}
          >
            <span className="material-symbols-outlined text-xl">local_shipping</span>
            <span className="text-left">
              <span className="block leading-none font-bold">Mitra Pemasok</span>
              <span className="text-body-sm font-body-sm text-on-surface-variant block text-xs mt-0.5">
                Bahan Baku & Kemasan
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Pesan error / sukses */}
      {activeError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 p-4 rounded-[16px] bg-[#FDF2F2] border border-[#B54747]/30 text-[#B54747]"
        >
          <span className="material-symbols-outlined text-xl mt-0.5">error</span>
          <div className="flex-1">
            <p className="font-label-md text-label-md font-bold">Pendaftaran Gagal</p>
            <p className="font-body-sm text-body-sm mt-0.5">{activeError}</p>
          </div>
        </div>
      )}
      {isSuccess && (
        <div
          role="status"
          className="mb-5 flex items-start gap-3 p-4 rounded-[16px] bg-[#E8F3EC] border border-[#137A48]/30 text-[#137A48]"
        >
          <span
            className="material-symbols-outlined text-xl mt-0.5"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <div className="flex-1">
            <p className="font-label-md text-label-md font-bold">Pendaftaran Berhasil!</p>
            <p className="font-body-sm text-body-sm mt-0.5">
              {successMessage || (
                <>
                  Pendaftaran sebagai {copy.nama} sudah diterima. Silakan{" "}
                  <Link href="/login" className="font-bold underline underline-offset-2">
                    masuk ke akun Anda
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Baris 1: nama lengkap & nama usaha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL} htmlFor="full_name">
              Nama Lengkap Pemilik / PIC <Req />
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              autoComplete="name"
              placeholder="Contoh: Dimas Anggara"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={INPUT}
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="business_name">
              {copy.label} <Req />
            </label>
            <input
              id="business_name"
              name="business_name"
              type="text"
              required
              autoComplete="organization"
              placeholder={copy.placeholder}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={INPUT}
            />
          </div>
        </div>

        {/* Baris 2: kategori & email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL} htmlFor="business_category">
              Kategori Usaha <Req />
            </label>
            <div className="relative">
              <select
                id="business_category"
                name="business_category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${INPUT} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  Pilih Kategori Bisnis
                </option>
                {KATEGORI.map(([nilai, nama]) => (
                  <option key={nilai} value={nilai}>
                    {nama}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant flex items-center">
                <span className="material-symbols-outlined text-xl">expand_more</span>
              </div>
            </div>
          </div>
          <div>
            <label className={LABEL} htmlFor="business_email">
              Email Bisnis Aktif <Req />
            </label>
            <input
              id="business_email"
              name="business_email"
              type="email"
              required
              autoComplete="email"
              placeholder="nama@bisnismu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT}
            />
          </div>
        </div>

        {/* Baris 3: WhatsApp */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-label-md font-label-md text-on-surface" htmlFor="whatsapp_number">
              Nomor WhatsApp Aktif <Req />
            </label>
            <span className="text-label-sm font-label-sm text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">chat</span> Integrasi Bot BAPER
            </span>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-4 font-label-md text-label-md flex items-center gap-1 select-none text-secondary">
              <span>+62</span>
              <span className="h-4 w-px bg-[rgba(148,185,169,0.6)] mx-1" />
            </span>
            <input
              id="whatsapp_number"
              name="whatsapp_number"
              type="tel"
              required
              autoComplete="tel-national"
              placeholder="812-3456-7890"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className={`${INPUT} pl-20 pr-4`}
            />
          </div>
          <p className="text-body-sm font-body-sm text-outline mt-1">
            Nomor ini digunakan untuk kirim notifikasi pesanan masuk & rekap transaksi harian otomatis.
          </p>
        </div>

        {/* Baris 4: kata sandi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className={LABEL} htmlFor="password">
              Kata Sandi <Req />
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${INPUT} pr-11`}
              />
              <button
                type="button"
                aria-label="Tampilkan atau sembunyikan kata sandi"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPw ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
          <div>
            <label className={LABEL} htmlFor="confirm_password">
              Konfirmasi Kata Sandi <Req />
            </label>
            <div className="relative">
              <input
                id="confirm_password"
                name="confirm_password"
                type={showConfirm ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Ulangi kata sandi"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`${INPUT} pr-11`}
              />
              <button
                type="button"
                aria-label="Tampilkan atau sembunyikan konfirmasi kata sandi"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {showConfirm ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Indikator kekuatan kata sandi */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between text-label-sm font-label-sm">
            <span className="text-on-surface-variant">Kekuatan Kata Sandi:</span>
            <span className={`font-bold ${kuat.text}`}>{kuat.label}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`h-full rounded-full transition-all ${n <= kuat.level ? kuat.bar : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>

        {/* Syarat & ketentuan */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="pt-0.5">
              <input
                id="terms_agree"
                name="terms_agree"
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-5 h-5 rounded-md text-primary-container focus:ring-primary/20 border-[#94B9A9] focus:ring-2 transition cursor-pointer"
              />
            </div>
            <span className="text-body-sm font-body-sm text-on-surface leading-snug">
              Saya menyetujui{" "}
              <Link
                href="#"
                className="text-primary font-semibold underline decoration-primary/40 underline-offset-2 hover:text-on-primary-fixed-variant"
              >
                Syarat & Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                href="#"
                className="text-primary font-semibold underline decoration-primary/40 underline-offset-2 hover:text-on-primary-fixed-variant"
              >
                Kebijakan Privasi
              </Link>{" "}
              BAPER untuk pengelolaan data operasional usaha.
            </span>
          </label>
        </div>

        {/* Tombol kirim */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.98] ${
              isLoading || isSuccess ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            <span>
              {isLoading
                ? "Mengirim pendaftaran..."
                : isSuccess
                  ? "Pendaftaran Terkirim"
                  : "Daftar Akun BAPER Sekarang"}
            </span>
            <span className="material-symbols-outlined text-xl">check_circle</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <p className="text-body-md font-body-md text-on-surface-variant">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:text-on-primary-fixed-variant ml-1 transition-colors"
            >
              Masuk ke Dashboard
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
