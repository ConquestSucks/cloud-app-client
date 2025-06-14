'use client';
import DashboardNavbarComponent from "@/core/widgets/dashboard-navbar/ui/DashboardNavbarComponent";
import DashboardSidebarComponent from "@/core/widgets/dashboard-sidebar/ui/Sidebar";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
        <DashboardNavbarComponent/>
        <div className="flex gap-2 flex-1 p-4">
          <DashboardSidebarComponent />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
