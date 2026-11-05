import PemasokSidebar from "@/components/pemasok/PemasokSidebar";

export default function PemasokLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PemasokSidebar />
      <div className="pl-[260px] flex-1 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}
