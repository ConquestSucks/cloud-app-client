'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function TrashLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [queryClient] = React.useState(() => new QueryClient());
    return <div className={"flex justify-center items-center h-full grow"}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </div>;
}
