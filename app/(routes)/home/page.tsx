'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGetIsUserLoggedIn } from "@/core/features/auth/hooks/useGetIsUserLoggedIn";
import { useQuery } from "@tanstack/react-query";
import { getSelfUser, UserDto } from "@/core/features/storage-quota/api/getSelfUser";
import { useRouter } from "next/navigation";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button, Typography, Box, Container, IconButton, Paper, Card, CardContent } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import UserDisplayComponent from '@/core/shared/ui/UserDisplayComponent';
import { useUserAvatarLoader } from '@/core/shared/hooks/useUserAvatarLoader';

const HeroSection = ({ 
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

const AdvantagesSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const router = useRouter();
    const advantages = [
        { title: "Всегда онлайн", description: "Гарантируем сохранность ваших данных с аптаймом 99.9% и автоматическим резервным копированием. Ваши файлы в безопасности 24/7.", icon: CloudDoneIcon },
        { title: "Неприступная защита", description: "Современные алгоритмы шифрования и многоуровневая защита оберегают ваши файлы от любых угроз и посторонних глаз.", icon: SecurityIcon },
        { title: "Доступ без границ", description: "Работайте с файлами на компьютере, планшете или смартфоне, где бы вы ни находились. Все, что нужно – это интернет.", icon: DevicesIcon },
        { title: "Интуитивная простота", description: "Никаких сложных инструкций. Наш понятный интерфейс позволит вам легко загружать, организовывать и делиться файлами с первых минут.", icon: SpeedIcon },
    ];

    const handleStartWork = () => {
        if (isLoggedIn) {
            router.push("/dashboard/home");
        } else {
            router.push("/auth");
        }
    };

    return (
        <Box 
            component="section" 
            sx={{
                py: { xs: 6, md: 8 },
                bgcolor: 'grey.50', 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        > 
            <Container maxWidth="lg"> 
                <Typography 
                    variant="h2" 
                    component="h2" 
                    sx={{
                        fontWeight: 'bold', 
                        textAlign: 'center', 
                        mb: {xs: 6, md: 8},
                        color: 'text.primary', 
                        letterSpacing: '-0.5px'
                    }}
                >
                    Откройте мир возможностей с Cloud Storage
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {advantages.map((adv, index) => {
                        const IconComponent = adv.icon; 
                        return (
                            <div key={index} className="h-full">
                                <Card sx={{
                                    height: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    borderRadius: '16px', 
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', 
                                    border: '1px solid transparent',
                                    '&:hover': { 
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.12)', 
                                        borderColor: 'primary.light',
                                    }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: {xs: 2.5, sm: 3} }}>
                                        <IconComponent sx={{ fontSize: 48, color: 'primary.main', mb: 2.5 }} />
                                        <Typography 
                                            variant="h5" 
                                            component="h3"
                                            sx={{ fontWeight: '600', mb: 1.5, color: 'text.primary' }}
                                        >
                                            {adv.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, flexGrow: 1 }}>
                                            {adv.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
                <Box sx={{ textAlign: 'center', mt: {xs: 6, md: 8} }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={handleStartWork}
                        sx={{ 
                            minWidth: '220px', 
                            py: 1.5, 
                            textTransform: 'none', 
                            borderRadius: '12px', 
                            fontSize: '1.1rem',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                            }
                        }}
                    >
                        {isLoggedIn ? 'Перейти в хранилище' : 'Начать работу'}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

const HomePage = () => {
    const advantagesRef = useRef<HTMLDivElement>(null);
    const { data: isLoggedInStatus, isLoading: isAuthLoading } = useGetIsUserLoggedIn();
    const isAuthenticated = !isAuthLoading && isLoggedInStatus === 200;

    const { data: userData, isLoading: isUserQueryLoading } = useQuery<UserDto>({
        queryKey: ["selfUser"],
        queryFn: getSelfUser,
        enabled: isAuthenticated,
        refetchOnWindowFocus: false, 
    });

    const heroRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const [currentView, setCurrentView] = useState<'hero' | 'advantages'>('hero');
    const currentViewRef = React.useRef(currentView);
    useEffect(() => { currentViewRef.current = currentView; }, [currentView]);

    const isAnimatingScrollRef = React.useRef(false);
    const animationTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const scrollToHero = useCallback(() => {
        if (heroRef.current) {
            isAnimatingScrollRef.current = true;
            heroRef.current.scrollIntoView({ behavior: 'smooth' });
            setCurrentView('hero'); 
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = setTimeout(() => {
                isAnimatingScrollRef.current = false;
            }, 700); 
        }
    }, []);

    const scrollToAdvantages = useCallback(() => {
        if (advantagesRef.current) {
            isAnimatingScrollRef.current = true;
            advantagesRef.current.scrollIntoView({ behavior: 'smooth' });
            setCurrentView('advantages'); 
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = setTimeout(() => {
                isAnimatingScrollRef.current = false;
            }, 700); 
        }
    }, []);
    
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const originalBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden'; 

        const handleWheel = (event: WheelEvent) => {
            if (isAnimatingScrollRef.current) {
                event.preventDefault(); 
                return;
            }
            if (event.deltaY > 0) { 
                if (currentViewRef.current === 'hero') {
                    event.preventDefault(); 
                    scrollToAdvantages();
                } 
            } else { 
                if (currentViewRef.current === 'advantages') {
                    event.preventDefault(); 
                    scrollToHero();
                } 
            }
        };
        
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            if (container) {
                 container.removeEventListener('wheel', handleWheel);
            }
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
            document.body.style.overflow = originalBodyOverflow;
        };
    }, [scrollToHero, scrollToAdvantages]);
    
    const combinedIsUserLoading = isAuthLoading || (isAuthenticated && isUserQueryLoading);

    return (
        <Box 
            ref={scrollContainerRef}
            sx={{ 
                overflowY: 'scroll', 
                height: '100vh', 
                scrollSnapType: 'y mandatory',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
            }}
        > 
            <div ref={heroRef} style={{ height: '100vh', scrollSnapAlign: 'start' }}>
                 <HeroSection 
                    isLoggedIn={isAuthenticated} 
                    userData={userData} 
                    isUserQueryLoading={combinedIsUserLoading}
                    onScrollToNextSection={scrollToAdvantages} 
                />
            </div>
            <div ref={advantagesRef} style={{ height: '100vh', scrollSnapAlign: 'start' }}>
                <AdvantagesSection isLoggedIn={isAuthenticated} /> 
            </div>
        </Box>
    );
};

export default HomePage;