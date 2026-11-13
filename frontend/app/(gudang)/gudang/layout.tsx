import GudangSidebar from "@/components/gudang/GudangSidebar";
import GudangTopbar from "@/components/gudang/GudangTopbar";
import RoleGuard from "@/features/auth/components/RoleGuard";

export default function GudangLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["manajer_gudang", "owner", "pemilik", "super_admin"]}>
      <div className="min-h-screen flex flex-col bg-[#F5F8F6]">
        <GudangSidebar />
        <div className="pl-[260px] flex-1 flex flex-col min-h-screen">
          <GudangTopbar />
          <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}
