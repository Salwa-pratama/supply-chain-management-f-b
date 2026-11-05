// AKUN UJI untuk pengembangan frontend. BUKAN akun sungguhan.
// Hapus file ini (dan pemakaiannya di login/page.tsx) setelah API backend siap.
//
// Di mode produksi (npm run build + npm start) daftar ini otomatis KOSONG,
// sehingga login tidak bisa dipakai dengan akun uji di server sungguhan.

// Nama peran harus sama dengan kunci ROLE_REDIRECT di login/page.tsx.
export type Role = "super_admin" | "owner" | "manajer_gudang" | "pemasok" | "kasir";

export type DemoAccount = {
  identifier: string; // email atau nomor WhatsApp, huruf kecil
  password: string;
  role: Role;
};

export const DEMO_ACCOUNTS: DemoAccount[] =
  process.env.NODE_ENV === "production"
    ? []
    : [
        { identifier: "admin@baper.id", password: "Admin#2025", role: "super_admin" },
        { identifier: "owner@baperfnb.com", password: "RahasiaSuper2025!", role: "owner" },
        { identifier: "gudang@baperfnb.com", password: "Gudang#2025", role: "manajer_gudang" },
        { identifier: "pemasok@baper.id", password: "Pemasok#2025", role: "pemasok" },
        { identifier: "kasir@baperfnb.com", password: "Kasir#2025", role: "kasir" },
      ];

export function cariAkun(identifier: string, password: string) {
  const id = identifier.trim().toLowerCase();
  return DEMO_ACCOUNTS.find((a) => a.identifier === id && a.password === password);
}
