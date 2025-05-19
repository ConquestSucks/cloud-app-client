import AuthForm from "@/app/features/auth/ui/authForm";
import AuthPlateText from "@/app/features/auth/ui/authPlateText";
import React from "react";

export default function AuthPage() {
    return (
        <div className="flex h-full md:flex-row flex-col gap-10 bg-[#0E0E0E] md:min-h-[384] md:h-fit md:rounded-3xl w-[840] p-[36]">
            <AuthPlateText />
            <AuthForm />
        </div>
    );
}
