"use client";
import { useGetIsUserLoggedIn } from "@/app/features/auth/hooks/useGetIsUserLoggedIn";
import AuthForm from "@/app/features/auth/ui/authForm";
import AuthPlateText from "@/app/features/auth/ui/authPlateText";
import { redirect } from "next/navigation";
import React from "react";
import { Box, Paper } from '@mui/material';

export default function AuthPage() {
    const { data } = useGetIsUserLoggedIn();

    if (data === 200) {
        redirect("/dashboard");
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 20%, #f5f5f5 80%)',
                width: '100%',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    p: 3,
                }}
            >
                <Paper 
                    elevation={4}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 4, md: 5 },
                        p: { xs: 3, sm: 4, md: 5 },
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '900px',
                        bgcolor: 'background.paper',
                    }}
                >
                    <AuthPlateText />
                    <AuthForm />
                </Paper>
            </Box>
        </Box>
    );
}
