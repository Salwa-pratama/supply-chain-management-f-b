// AKUN UJI untuk pengembangan frontend. BUKAN akun sungguhan.
// Hapus file ini (dan pemakaiannya di login/page.tsx) setelah API backend siap.
//
// Di mode produksi (npm run build + npm start) daftar ini otomatis KOSONG,
// sehingga login tidak bisa dipakai dengan akun uji di server sungguhan.

export type DemoAccount = {
  identifier: string; // email atau nomor WhatsApp, huruf kecil
  password: string;
  role: "super_admin" | "pemilik";
};

export const DEMO_ACCOUNTS: DemoAccount[] =
  process.env.NODE_ENV === "production"
    ? []
    : [
      { identifier: "admin@baper.id", password: "Admin#2025", role: "super_admin" },
      { identifier: "owner@baperfnb.com", password: "Rahasia123!", role: "pemilik" },
    ];

export function cariAkun(identifier: string, password: string) {
  const id = identifier.trim().toLowerCase();
  return DEMO_ACCOUNTS.find((a) => a.identifier === id && a.password === password);
}
