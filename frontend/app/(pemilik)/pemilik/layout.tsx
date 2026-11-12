import PemilikSidebar from "@/components/pemilik/PemilikSidebar";
import PemilikTopbar from "@/components/pemilik/PemilikTopbar";
import RoleGuard from "@/features/auth/components/RoleGuard";

export default function PemilikLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["owner", "pemilik", "super_admin"]}>
      <div className="min-h-screen flex flex-col">
        <PemilikSidebar />
        <div className="pl-[260px] flex-1 flex flex-col">
          <PemilikTopbar />
          <main className="p-8 flex-1 flex flex-col gap-8 max-w-[1720px]">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}
