// Logo BAPER (dari export Stitch) sebagai SVG inline,
// supaya teks "BAPER" memakai font Plus Jakarta Sans milik halaman.
export default function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 48"
      fill="none"
      className={className}
      role="img"
      aria-label="BAPER"
    >
      <rect x="2" y="4" width="40" height="40" rx="12" fill="#137A48" />
      <path d="M14 16H30M14 24H26M14 32H22" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="30" r="5" fill="#E8F3EC" />
      <path d="M26.5 30L27.5 31L29.5 28.5" stroke="#137A48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text
        x="52"
        y="32"
        fontFamily="var(--font-jakarta), Plus Jakarta Sans, sans-serif"
        fontSize="24"
        fontWeight="800"
        fill="#172033"
        letterSpacing="-0.5"
      >
        BAPER
      </text>
      <circle cx="148" cy="22" r="3" fill="#137A48" />
    </svg>
  );
}
