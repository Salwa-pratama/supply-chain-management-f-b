"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/site/SiteFooter";
import { useLogin } from "@/features/auth/hooks/use-login";

// Tujuan setelah login berhasil, berdasarkan peran dari backend.
const ROLE_REDIRECT: Record<string, string> = {
  super_admin: "/admin/dashboard",
  owner: "/pemilik/monitoring",
  manajer_gudang: "/pemilik/monitoring",
  pemasok: "/portal",
  kasir: "/pemilik/monitoring",
};

const DEFAULT_REDIRECT = "/pemilik/monitoring";

// Jeda agar pesan "Verifikasi Berhasil!" sempat terbaca sebelum pindah halaman.
const REDIRECT_DELAY_MS = 1200;

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ identifier: false, password: false });
  const [successMessage, setSuccessMessage] = useState("");

  const loginMutation = useLogin({
    onSuccess: (data) => {
      setSuccessMessage(
        `Selamat datang kembali, ${data.user.name}! Mengalihkan ke dashboard...`,
      );
      const role = data.user.role;
      setTimeout(() => {
        router.push(ROLE_REDIRECT[role] ?? DEFAULT_REDIRECT);
      }, REDIRECT_DELAY_MS);
    },
  });

  const isLoading = loginMutation.isPending;
  const isSuccess = loginMutation.isSuccess;
  const isError = loginMutation.isError;
  const errorMessage =
    loginMutation.error?.message ||
    "Email atau kata sandi tidak cocok dengan data terdaftar di sistem BAPER.";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. Validasi field kosong
    const nextErrors = {
      identifier: !identifier.trim(),
      password: !password.trim(),
    };
    setErrors(nextErrors);
    if (nextErrors.identifier || nextErrors.password) {
      return;
    }

    // 2. Kirim data via TanStack Query mutation
    loginMutation.mutate({
      email: identifier.trim(),
      password: password.trim(),
      remember,
    });
  }

  // Kelas input: normal vs error
  const inputBase =
    "w-full h-12 pl-12 bg-white border rounded-[16px] text-body-md font-body-md text-[#172033] placeholder-[#7B8794] focus:outline-none transition-all duration-150";
  const inputNormal =
    "border-[#94B9A9] focus:border-[#137A48] focus:ring-2 focus:ring-[#137A48]/20";
  const inputError =
    "border-[#B54747] focus:border-[#B54747] ring-2 ring-[#B54747]/20";

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-secondary-container selection:text-primary">
      {/* Top Navigation Bar */}
      <header className="w-full sticky top-0 z-50 bg-surface-container-lowest shadow-sm">
        <div className="w-full flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-9 w-auto" />
            </Link>
            <div className="hidden lg:flex items-center pl-4 border-l border-outline-variant/40">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3EC] text-primary-container font-label-sm text-label-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                Bantu Pesan dan Rekap
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Fitur Solusi", href: "/#fitur" },
              { label: "Harga & Paket", href: "#" },
              { label: "Bantuan", href: "#" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="hidden sm:inline-flex items-center font-label-lg text-label-lg text-primary hover:text-[#0D6038] px-4 py-2 rounded-xl transition duration-150"
            >
              Hubungi Sales
            </Link>
            <Link
              href="/daftar"
              className="inline-flex items-center justify-center font-label-lg text-label-lg text-white bg-primary-container hover:bg-[#0D6038] px-5 py-2.5 rounded-[14px] transition duration-150 shadow-sm active:scale-[0.99]"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </div>
      </header>

      {/* Konten utama */}
      <main className="w-full max-w-7xl mx-auto px-6 py-10 md:py-12 flex-1 flex flex-col items-center justify-center">
        <section className="w-full flex justify-center items-center">
          <div className="w-full max-w-lg bg-white rounded-[24px] p-8 md:p-10 border border-black/5 shadow-[0_12px_36px_-6px_rgba(23,32,51,0.06)] relative transition-all">
            {/* Header kartu */}
            <div className="mb-7">
              <div className="flex flex-col items-center text-center mb-6">
                <Logo className="h-12 w-auto mb-3" />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3EC] text-primary-container font-label-sm text-label-sm mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                  Bantu Pesan dan Rekap
                </span>
                <h2 className="font-headline-lg text-headline-lg text-[#172033] tracking-tight mb-2">
                  Selamat Datang Kembali
                </h2>
                <p className="font-body-md text-body-md text-[#7B8794]">
                  Masuk ke akun Anda untuk mengelola pesanan dan rekap bisnis
                  harian.
                </p>
              </div>
            </div>

            {/* Alert error / sukses TanStack Query */}
            {isError && (
              <div className="mb-6">
                <div
                  role="alert"
                  className="flex items-start gap-3 p-4 rounded-[16px] bg-[#FDF2F2] border border-[#B54747]/30 text-[#B54747]"
                >
                  <span className="material-symbols-outlined text-xl mt-0.5">
                    error
                  </span>
                  <div className="flex-1">
                    <p className="font-label-md text-label-md font-bold">
                      Gagal Masuk
                    </p>
                    <p className="font-body-sm text-body-sm mt-0.5">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isSuccess && (
              <div className="mb-6">
                <div
                  role="status"
                  className="flex items-start gap-3 p-4 rounded-[16px] bg-[#E8F3EC] border border-[#137A48]/30 text-[#137A48]"
                >
                  <span
                    className="material-symbols-outlined text-xl mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <div className="flex-1">
                    <p className="font-label-md text-label-md font-bold">
                      Login Berhasil!
                    </p>
                    <p className="font-body-sm text-body-sm mt-0.5">
                      {successMessage || "Mengarahkan Anda ke Dashboard..."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Email / WhatsApp */}
              <div className="space-y-1.5">
                <label
                  htmlFor="username-input"
                  className="block font-label-md text-label-md text-[#172033] font-semibold"
                >
                  Email atau Nomor WhatsApp
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[#7B8794] flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">
                      alternate_email
                    </span>
                  </span>
                  <input
                    id="username-input"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="nama@tokoanda.com atau 08123456789"
                    className={`${inputBase} pr-4 ${
                      errors.identifier ? inputError : inputNormal
                    }`}
                  />
                </div>
                {errors.identifier && (
                  <p className="font-body-sm text-body-sm text-[#B54747] pt-1">
                    Email atau nomor WhatsApp wajib diisi.
                  </p>
                )}
              </div>

              {/* Kata sandi */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password-input"
                  className="block font-label-md text-label-md text-[#172033] font-semibold"
                >
                  Kata Sandi
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[#7B8794] flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </span>
                  <input
                    id="password-input"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi Anda"
                    className={`${inputBase} pr-12 ${
                      errors.password ? inputError : inputNormal
                    }`}
                  />
                  <button
                    type="button"
                    aria-label="Tampilkan atau sembunyikan kata sandi"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 text-[#7B8794] hover:text-[#172033] transition flex items-center focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="font-body-sm text-body-sm text-[#B54747] pt-1">
                    Kata sandi wajib diisi.
                  </p>
                )}
              </div>

              {/* Ingat saya & lupa kata sandi */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-5 h-5 rounded-[6px] border-[1.5px] border-[#94B9A9] text-[#137A48] focus:ring-0 focus:ring-offset-0 focus:outline-none accent-[#137A48] cursor-pointer"
                  />
                  <span className="font-body-md text-body-md text-[#172033]">
                    Ingat saya
                  </span>
                </label>
                <Link
                  href="#"
                  className="font-label-md text-label-md font-medium text-[#137A48] hover:underline focus:outline-none"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              {/* Tombol masuk */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className={`w-full h-12 bg-[#137A48] hover:bg-[#0D6038] text-white font-label-lg text-label-lg rounded-[16px] shadow-sm flex items-center justify-center gap-2 transition duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#137A48]/30 ${
                  isLoading || isSuccess ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                <span>
                  {isLoading
                    ? "Memverifikasi..."
                    : isSuccess
                      ? "Mengarahkan..."
                      : "Masuk ke Akun"}
                </span>
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                )}
              </button>

              {/* Pemisah */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white px-3 font-body-sm text-body-sm text-[#7B8794]">
                  atau
                </span>
              </div>

              {/* Login Google */}
              <button
                type="button"
                className="w-full h-12 bg-white hover:bg-[#E8F3EC]/50 border border-[#94B9A9] text-[#172033] font-label-lg text-label-lg rounded-[16px] flex items-center justify-center gap-3 transition duration-150 active:scale-[0.99] focus:outline-none"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.9-3.05c-1.08.72-2.46 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Masuk dengan Google</span>
              </button>
            </form>

            {/* Footer kartu */}
            <div className="mt-8 text-center border-t border-slate-100 pt-5">
              <p className="font-body-md text-body-md text-[#7B8794]">
                Belum punya akun toko?{" "}
                <Link
                  href="/daftar"
                  className="font-semibold text-[#137A48] hover:underline focus:outline-none"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
