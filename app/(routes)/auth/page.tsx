"use client";
import { useGetIsUserLoggedIn } from "@/app/features/auth/hooks/useGetIsUserLoggedIn";
import AuthForm from "@/app/features/auth/ui/AuthForm";
import AuthPlateText from "@/app/features/auth/ui/AuthPlateText";
import { redirect } from "next/navigation";
import React from "react";


export default function AuthPage() {


    const { data } = useGetIsUserLoggedIn();

    if (data === 200) {
        redirect("/dashboard")
    }

    return (

        <div className="flex h-full md:flex-row flex-col gap-10 bg-[#0E0E0E] md:min-h-[384] md:h-fit md:rounded-3xl w-[840] p-[36]">
            <AuthPlateText />
            <AuthForm />
        </div>
    );
}
