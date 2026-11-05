"use client";

import { useEffect, useState } from "react";

// Jam digital WIB. Awalnya kosong supaya tidak beda dengan HTML dari server (hydration).
export default function LiveClock({ className }: { className?: string }) {
  const [now, setNow] = useState("");

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      setNow(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} WIB`);
    };
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {now || "--:--:-- WIB"}
    </span>
  );
}
