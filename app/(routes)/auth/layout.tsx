'use client'
import React from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className={"flex justify-center items-center h-full"}>
        {children}
    </div>;
}
