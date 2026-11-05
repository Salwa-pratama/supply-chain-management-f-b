import type { Metadata } from "next";
import PosTerminal from "@/components/kasir/PosTerminal";

export const metadata: Metadata = { title: "Kasir (POS) | BAPER SCM" };

export default function KasirPage() {
  return <PosTerminal />;
}
