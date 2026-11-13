import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import RoleGuard from "@/features/auth/components/RoleGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["super_admin"]}>
      <div className="min-h-screen flex flex-col bg-[#F5F8F6]">
        <AdminSidebar />
        <div className="pl-[260px] flex-1 flex flex-col min-h-screen">
          <AdminTopbar />
          <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}
