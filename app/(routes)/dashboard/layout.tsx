import DashboardNavbarComponent from "@/app/widgets/dashboard-navbar/ui/DashboardNavbarComponent";
import DashboardSidebarComponent from "@/app/widgets/dashboard-sidebar/ui/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full gap-5">
      <DashboardNavbarComponent/>
      <div className="flex gap-2">
        <DashboardSidebarComponent />
        {children}
      </div>
    </div>
  );
}
