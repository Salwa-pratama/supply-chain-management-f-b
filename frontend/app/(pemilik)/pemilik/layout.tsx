import PemilikSidebar from "@/components/pemilik/PemilikSidebar";
import PemilikTopbar from "@/components/pemilik/PemilikTopbar";

export default function PemilikLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PemilikSidebar />
      <div className="pl-[260px] flex-1 flex flex-col">
        <PemilikTopbar />
        <main className="p-8 flex-1 flex flex-col gap-8 max-w-[1720px]">{children}</main>
      </div>
    </div>
  );
}
