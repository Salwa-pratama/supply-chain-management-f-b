import AppSidebar from "@/components/layout/AppSidebar";

export default function AdminSidebar() {
  return (
    <AppSidebar
      role="admin"
      userProfile={{
        name: "Aditya Pratama",
        title: "Super Admin Ekosistem",
        initials: "AP",
        location: "Kantor Pusat SCM",
      }}
    />
  );
}
