import AppSidebar from "@/components/layout/AppSidebar";

export default function GudangSidebar() {
  return (
    <AppSidebar
      role="gudang"
      userProfile={{
        name: "Bambang Prakoso",
        title: "Manager Gudang & Logistik",
        initials: "BP",
        location: "Central Warehouse Cilandak",
      }}
    />
  );
}
