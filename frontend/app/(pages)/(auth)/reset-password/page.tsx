"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/site/SiteFooter";
import { useToast } from "@/components/ui/Toast";
import { formatErrorMessage } from "@/lib/error-formatter";
import { resetPasswordApi } from "@/features/auth/api/password";

export default function ResetPasswordPage() {
  const toast = useToast();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(params.get("token") ?? "");
  }, []);

  const passwordChecks = useMemo(
    () => [
      { label: "Minimal 8 karakter", ok: password.length >= 8 },
      { label: "Mengandung huruf", ok: /[a-zA-Z]/.test(password) },
      { label: "Mengandung angka", ok: /\d/.test(password) },
    ],
    [password]
  );

  const canSubmit =
    Boolean(token) &&
    password.length >= 8 &&
    password === confirmPassword &&
    !loading;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!token) {
      setError("Token reset tidak ditemukan pada tautan.");
      return;
    }
    if (password.length < 8) {
      setError("Kata sandi baru minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi belum sama.");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi(token, password);
      setSuccess(true);
      toast.success(
        "Kata sandi berhasil diperbarui. Silakan masuk kembali.",
        "Reset Berhasil"
      );
    } catch (err) {
      const parsed = formatErrorMessage(err, "login");
      setError(parsed.message);
      toast.error(parsed.message, parsed.title);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-secondary-container selection:text-primary">
      <header className="w-full sticky top-0 z-50 bg-surface-container-lowest shadow-sm">
        <div className="w-full flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-9 w-auto" />
          </Link>
          <Link
            href="/login"
            className="font-label-lg text-label-lg text-primary hover:text-[#0D6038] px-4 py-2 rounded-xl transition duration-150"
          >
            Kembali ke Login
          </Link>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 py-10 md:py-12 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-[24px] p-8 md:p-10 border border-black/5 shadow-[0_12px_36px_-6px_rgba(23,32,51,0.06)]">
          <div className="flex flex-col items-center text-center mb-7">
            <span className="w-14 h-14 rounded-2xl bg-[#E8F3EC] text-[#137A48] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[30px]">
                password
              </span>
            </span>
            <h1 className="font-headline-lg text-headline-lg text-[#172033] tracking-tight">
              {success ? "Kata Sandi Diperbarui" : "Buat Kata Sandi Baru"}
            </h1>
            <p className="font-body-md text-body-md text-[#7B8794] mt-1">
              {success
                ? "Akun Anda sudah aman dengan kata sandi baru."
                : "Masukkan kata sandi baru untuk akun BAPER Anda."}
            </p>
          </div>

          {success ? (
            <div className="space-y-5">
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
                <div>
                  <p className="font-label-md text-label-md font-bold">
                    Reset berhasil
                  </p>
                  <p className="font-body-sm text-body-sm mt-0.5">
                    Gunakan kata sandi baru Anda untuk masuk ke dashboard.
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="w-full h-12 bg-[#137A48] hover:bg-[#0D6038] text-white font-label-lg text-label-lg rounded-[16px] shadow-sm flex items-center justify-center gap-2 transition duration-150 active:scale-[0.98]"
              >
                <span>Masuk ke Akun</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          ) : token === "" ? (
            <div className="space-y-5">
              <div
                role="alert"
                className="flex items-start gap-3 p-4 rounded-[16px] bg-[#FDF2F2] border border-[#B54747]/30 text-[#B54747]"
              >
                <span className="material-symbols-outlined text-xl mt-0.5">
                  link_off
                </span>
                <div>
                  <p className="font-label-md text-label-md font-bold">
                    Tautan reset tidak valid
                  </p>
                  <p className="font-body-sm text-body-sm mt-0.5">
                    Token tidak ditemukan. Minta tautan baru dari halaman login.
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="w-full h-12 bg-[#137A48] hover:bg-[#0D6038] text-white font-label-lg text-label-lg rounded-[16px] flex items-center justify-center gap-2 transition duration-150"
              >
                <span className="material-symbols-outlined text-[18px]">
                  lock_reset
                </span>
                <span>Minta Tautan Reset Baru</span>
              </Link>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-1.5">
                <label
                  htmlFor="new-password"
                  className="block font-label-md text-label-md text-[#172033] font-semibold"
                >
                  Kata Sandi Baru
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[#7B8794] flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </span>
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full h-12 pl-12 pr-12 bg-white border border-[#94B9A9] rounded-[16px] text-body-md font-body-md text-[#172033] placeholder-[#7B8794] focus:outline-none focus:border-[#137A48] focus:ring-2 focus:ring-[#137A48]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 text-[#7B8794] hover:text-[#172033] transition"
                    aria-label="Tampilkan atau sembunyikan kata sandi"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="confirm-password"
                  className="block font-label-md text-label-md text-[#172033] font-semibold"
                >
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-[#7B8794] flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">
                      lock_reset
                    </span>
                  </span>
                  <input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full h-12 pl-12 pr-4 bg-white border border-[#94B9A9] rounded-[16px] text-body-md font-body-md text-[#172033] placeholder-[#7B8794] focus:outline-none focus:border-[#137A48] focus:ring-2 focus:ring-[#137A48]/20 transition-all"
                  />
                </div>
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <p className="font-body-sm text-body-sm text-[#B54747]">
                    Konfirmasi kata sandi belum sama.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {passwordChecks.map((check) => (
                  <span
                    key={check.label}
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      check.ok
                        ? "bg-[#E8F3EC] text-[#137A48]"
                        : "bg-[#F5F8F6] text-[#7B8794]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {check.ok ? "check_circle" : "circle"}
                    </span>
                    {check.label}
                  </span>
                ))}
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 p-3 rounded-xl bg-[#FDF2F2] border border-[#B54747]/30 text-[#B54747]"
                >
                  <span className="material-symbols-outlined text-[18px] mt-0.5">
                    error
                  </span>
                  <p className="font-body-sm text-body-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full h-12 bg-[#137A48] hover:bg-[#0D6038] text-white font-label-lg text-label-lg rounded-[16px] shadow-sm flex items-center justify-center gap-2 transition duration-150 active:scale-[0.98] ${
                  !canSubmit ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <span>{loading ? "Menyimpan..." : "Simpan Kata Sandi Baru"}</span>
                <span className="material-symbols-outlined text-[18px]">
                  {loading ? "progress_activity" : "check"}
                </span>
              </button>
            </form>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
