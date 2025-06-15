'use client';
import DashboardNavbarComponent from "@/app/widgets/dashboard-navbar/ui/DashboardNavbarComponent";
import DashboardSidebarComponent from "@/app/widgets/dashboard-sidebar/ui/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      <DashboardNavbarComponent/>
      <div className="flex gap-2 flex-1 p-4">
        <DashboardSidebarComponent />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
