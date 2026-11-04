"use client";

import { useState } from "react";

// Gambar produk dengan ikon cadangan bila tautan gambar gagal dimuat
// (tautan gambar dari Stitch bisa kedaluwarsa).
export default function ProductImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  iconSize = 40,
}: {
  src: string;
  alt: string;
  className?: string;
  iconSize?: number;
}) {
  const [gagal, setGagal] = useState(false);

  if (gagal) {
    return (
      <div className="w-full h-full flex items-center justify-center text-primary/40">
        <span className="material-symbols-outlined" style={{ fontSize: iconSize }}>
          restaurant_menu
        </span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} loading="lazy" onError={() => setGagal(true)} />
  );
}
