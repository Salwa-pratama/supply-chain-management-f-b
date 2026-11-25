import PemasokSidebar from "@/components/pemasok/PemasokSidebar";
import RoleGuard from "@/features/auth/components/RoleGuard";
import { NotificationProvider } from "@/components/notifications/NotificationProvider";

export default function PemasokLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["pemasok", "super_admin"]}>
      <NotificationProvider role="pemasok">
        <div className="min-h-screen flex flex-col">
          <PemasokSidebar />
          <div className="pl-[260px] flex-1 flex flex-col min-h-screen">{children}</div>
        </div>
      </NotificationProvider>
    </RoleGuard>
  );
}
