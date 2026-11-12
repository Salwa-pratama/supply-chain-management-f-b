import PemilikSidebar from "@/components/pemilik/PemilikSidebar";
import RoleGuard from "@/features/auth/components/RoleGuard";

export default function KasirLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["kasir", "owner", "pemilik", "super_admin"]}>
      <div className="min-h-screen flex flex-col">
        <PemilikSidebar />
        <div className="pl-[260px] flex-1 flex flex-col min-h-screen">{children}</div>
      </div>
    </RoleGuard>
  );
}
