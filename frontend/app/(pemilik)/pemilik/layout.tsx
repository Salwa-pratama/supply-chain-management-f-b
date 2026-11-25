import PemilikSidebar from "@/components/pemilik/PemilikSidebar";
import PemilikTopbar from "@/components/pemilik/PemilikTopbar";
import RoleGuard from "@/features/auth/components/RoleGuard";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";

export default function PemilikLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["owner", "pemilik", "super_admin"]}>
      <NotificationProvider role="pemilik">
        <div className="min-h-screen flex flex-col bg-[#F5F8F6]">
          <PemilikSidebar />
          <div className="pl-[260px] flex-1 flex flex-col min-h-screen">
            <PemilikTopbar />
            <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto space-y-8">{children}</main>
          </div>
        </div>
      </NotificationProvider>
    </RoleGuard>
  );
}
