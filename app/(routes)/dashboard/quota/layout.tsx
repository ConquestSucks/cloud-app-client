'use client'
import React from "react";

export default function QuotaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="dashboard-page">
            {children}
        </div>
    );
} 