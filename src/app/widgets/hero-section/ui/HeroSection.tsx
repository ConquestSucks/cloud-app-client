'use client'

import React from 'react';
import { useRouter } from "next/navigation";
import { Button, Typography, Box, Container, IconButton, Paper } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import UserDisplayComponent from '@/app/shared/ui/UserDisplayComponent';
import { useUserAvatarLoader } from '@/app/shared/hooks/useUserAvatarLoader';
import { UserDto } from "@/app/features/storage-quota/api/getSelfUser";

export const HeroSection = ({
    isLoggedIn,
    userData,
    isUserQueryLoading,
    onScrollToNextSection
}: {
    isLoggedIn: boolean,
    userData?: UserDto | null,
    isUserQueryLoading: boolean,
    onScrollToNextSection: () => void
}) => {
    const router = useRouter();
    const { avatarBlobUrl, isAvatarLoading } = useUserAvatarLoader(userData);

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#f5f5f5',
                color: 'text.primary',
                p: 3,
            }}
        >
            <Box sx={{ position: 'absolute', top: 24, right: 24 }}>
                {isLoggedIn ? (
                    <UserDisplayComponent
                        userData={userData}
                        avatarBlobUrl={avatarBlobUrl}
                        isUserLoading={isUserQueryLoading}
                        isAvatarLoading={isAvatarLoading}
                        onClick={() => router.push('/dashboard')}
                        variant="homePage"
                    />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push('/auth')}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '12px',
                            px: 3.5,
                            py: 1.25,
                            letterSpacing: '0.5px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
                            }
                        }}
                    >
                        Войти
                    </Button>
                )}
            </Box>

            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-around', textAlign: { xs: 'center', md: 'left' }, py: {xs: 4, md: 0} }}>
                <Box sx={{ width: { xs: '100%', md: '55%' }, mb: { xs: 5, md: 0 }, pr: { md: 4 } }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1.5,
                            fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.5rem' },
                            color: 'primary.dark',
                            lineHeight: 1.25,
                            letterSpacing: '-0.5px',
                        }}
                    >
                        Cloud Storage
                    </Typography>
                    <Box
                        sx={{
                            width: '120px',
                            height: '5px',
                            background: 'linear-gradient(90deg, #2196F3 0%, #1976D2 70%, #0D47A1 100%)',
                            borderRadius: '3px',
                            mb: 4,
                            mx: { xs: 'auto', md: 0 }
                        }}
                    />
                    <Typography
                        variant="h5"
                        component="p"
                        sx={{
                            mb: 4,
                            color: 'text.primary',
                            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                            lineHeight: 1.65,
                            maxWidth: '580px',
                            mx: { xs: 'auto', md: 0 },
                            fontWeight: 300,
                        }}
                    >
                        Ваши файлы всегда под рукой – надежно, безопасно и доступно из любой точки мира. Откройте для себя свободу облачного хранения!
                    </Typography>
                </Box>

                <Box sx={{ width: { xs: '60%', sm: '50%', md: '33%' }, display: 'flex', justifyContent: 'center' }}>
                    <Paper
                        elevation={6}
                        sx={{
                            width: { xs: 180, sm: 220, md: 250 },
                            height: { xs: 180, sm: 220, md: 250 },
                            borderRadius: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(145deg, #e3f2fd, #ffffff)',
                            color: 'primary.dark',
                            p: 2,
                            boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <CloudQueueIcon sx={{ fontSize: { xs: 70, sm: 90, md: 110 } }} />
                    </Paper>
                </Box>
            </Container>

            <IconButton
                onClick={onScrollToNextSection}
                aria-label="Прокрутить вниз"
                className="animate-bounce"
                sx={{
                    position: 'absolute',
                    bottom: 40,
                    margin: "auto",
                    transform: 'translateX(-50%)',
                    color: 'primary.main',
                }}
            >
                <ArrowDownwardIcon sx={{ fontSize: 48 }} />
            </IconButton>
        </Box>
    );
}; 