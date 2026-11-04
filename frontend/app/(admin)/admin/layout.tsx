import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden">
      <AdminSidebar />
      <div className="pl-[260px]">
        <AdminTopbar />
        <main className="min-h-screen p-8 max-w-[1520px] mx-auto space-y-7">{children}</main>
      </div>
    </div>
  );
}
