import GudangSidebar from "@/components/gudang/GudangSidebar";
import RoleGuard from "@/features/auth/components/RoleGuard";

export default function GudangLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["manajer_gudang", "owner", "pemilik", "super_admin"]}>
      <div className="min-h-screen flex flex-col">
        <GudangSidebar />
        <div className="pl-[260px] flex-1 flex flex-col min-h-screen">{children}</div>
      </div>
    </RoleGuard>
  );
}
