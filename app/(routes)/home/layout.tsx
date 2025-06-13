'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full">
        {children}
      </div>
    </QueryClientProvider>
  );
}
