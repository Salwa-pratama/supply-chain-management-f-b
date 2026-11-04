import PemilikSidebar from "@/components/pemilik/PemilikSidebar";

export default function KasirLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PemilikSidebar />
      <div className="pl-[260px] flex-1 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}
