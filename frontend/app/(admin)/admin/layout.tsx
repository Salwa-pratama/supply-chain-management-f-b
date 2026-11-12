import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import RoleGuard from "@/features/auth/components/RoleGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["super_admin"]}>
      <div className="overflow-x-hidden">
        <AdminSidebar />
        <div className="pl-[260px]">
          <AdminTopbar />
          <main className="min-h-screen p-8 max-w-[1520px] mx-auto space-y-7">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}
