"use client";

import { useState } from "react";

type Variant = "pill" | "chip" | "period";
type Option = string | { value: string; label: string };

// Gaya diambil dari tiga pola tombol segmen di desain Stitch.
const STYLES: Record<Variant, { wrap: string; base: string; active: string; idle: string }> = {
  // Filter periode pada grafik dashboard admin
  pill: {
    wrap: "h-10 bg-[#E8F3EC] p-1 rounded-2xl flex items-center gap-1 self-start sm:self-auto",
    base: "px-3.5 py-1 rounded-xl font-label-sm text-label-sm transition-all",
    active: "bg-surface-container-lowest text-[#137A48] font-bold shadow-sm",
    idle: "text-tertiary hover:text-on-surface",
  },
  // Filter peran pada tabel pengguna
  chip: {
    wrap: "flex items-center bg-[#F5F8F6] p-1 rounded-2xl border border-outline-variant/40",
    base: "px-3 py-1 rounded-xl font-label-sm text-label-sm transition-all",
    active: "bg-surface-container-lowest text-[#137A48] font-bold shadow-sm",
    idle: "text-tertiary hover:text-on-surface",
  },
  // Filter Hari Ini / Minggu Ini / Bulan Ini pada halaman monitoring
  period: {
    wrap: "flex items-center bg-[#E8F3EC] p-1 rounded-xl border border-outline-variant/40",
    base: "px-3.5 py-1.5 rounded-lg text-label-sm font-label-sm transition-all",
    active: "font-bold bg-surface-container-lowest text-primary shadow-sm",
    idle: "font-medium text-tertiary hover:text-on-surface",
  },
};

type Props = {
  options: Option[];
  variant?: Variant;
  /** Mode tak terkontrol: nilai awal. */
  defaultValue?: string;
  /** Mode terkontrol: nilai dari induk. */
  value?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
};

export default function SegmentedControl({
  options,
  variant = "pill",
  defaultValue,
  value,
  onChange,
  ariaLabel,
}: Props) {
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const [inner, setInner] = useState(defaultValue ?? items[0]?.value);
  const current = value ?? inner;
  const s = STYLES[variant];

  return (
    <div className={s.wrap} role="group" aria-label={ariaLabel}>
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          aria-pressed={current === it.value}
          onClick={() => {
            setInner(it.value);
            onChange?.(it.value);
          }}
          className={`${s.base} ${current === it.value ? s.active : s.idle}`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
