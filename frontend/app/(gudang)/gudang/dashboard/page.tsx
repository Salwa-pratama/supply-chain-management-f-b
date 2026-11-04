import type { Metadata } from "next";
import GudangDashboard from "@/components/gudang/GudangDashboard";

export const metadata: Metadata = { title: "Dashboard Manager Gudang | BAPER SCM" };

export default function GudangDashboardPage() {
  return <GudangDashboard />;
}
