import GudangSidebar from "@/components/gudang/GudangSidebar";

export default function GudangLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <GudangSidebar />
      <div className="pl-[260px] flex-1 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}
