import AppSidebar from "@/components/layout/AppSidebar";

export default function PemilikSidebar() {
  return (
    <AppSidebar
      role="pemilik"
      userProfile={{
        name: "Budi Hartono",
        title: "Pemilik Bisnis & F&B Owner",
        initials: "BH",
        location: "Kopi Kenangan Senopati #04",
      }}
    />
  );
}
