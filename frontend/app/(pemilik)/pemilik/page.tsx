import { redirect } from "next/navigation";

// Sementara ke monitoring. Ganti ke /pemilik/dashboard setelah halaman itu dibuat (Paket 3).
export default function PemilikIndex() {
  redirect("/pemilik/monitoring");
}
