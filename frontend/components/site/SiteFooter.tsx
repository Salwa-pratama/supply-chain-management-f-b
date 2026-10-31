import Link from "next/link";

// Footer bersama untuk halaman publik: landing, login, dan daftar.
// href "#" = halaman hukum belum dibuat (TODO: /syarat, /privasi, /keamanan, /status).
const LINKS = ["Syarat & Ketentuan", "Kebijakan Privasi", "Keamanan Transaksi", "Status Sistem"];

export default function SiteFooter({ separator = false }: { separator?: boolean }) {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-[#94B9A9]/20 mt-auto">
      <div className="w-full py-8 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link href="/" className="font-headline-sm text-headline-sm font-bold text-primary">
            BAPER
          </Link>
          {separator && <span className="hidden sm:inline text-tertiary">|</span>}
          <span className="text-on-surface-variant font-label-sm text-label-sm text-center sm:text-left">
            © 2025 BAPER (Bantu Pesan dan Rekap). Hak Cipta Dilindungi.
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {LINKS.map((label) => (
            <Link
              key={label}
              href="#"
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
