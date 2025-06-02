'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGetIsUserLoggedIn } from "@/app/features/auth/hooks/useGetIsUserLoggedIn";
import { useQuery } from "@tanstack/react-query";
import { getSelfUser, UserDto } from "@/app/features/storage-quota/api/getSelfUser";
import { useRouter } from "next/navigation";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Typography, Box, Container, IconButton, Paper, Avatar as MuiAvatar, Card, CardContent } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

// Первая секция
const HeroSection = ({ isLoggedIn, userData, onScrollToNextSection }: { isLoggedIn: boolean, userData?: UserDto, onScrollToNextSection: () => void }) => {
    const router = useRouter();
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
                {isLoggedIn && userData ? (
                    <Paper 
                        elevation={4}
                        onClick={() => router.push('/dashboard/home')}
                        sx={{
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5,
                            p: '10px 16px',
                            borderRadius: '20px',
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.12)',
                            }
                        }}
                    >
                        <MuiAvatar 
                            sx={{ 
                                bgcolor: 'primary.main', 
                                width: 40,
                                height: 40,
                                color: 'white',
                            }}
                        >
                           <AccountCircleIcon sx={{ fontSize: 26 }}/>
                        </MuiAvatar>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                fontWeight: 500,
                                color: 'text.primary',
                                fontSize: '0.95rem',
                                letterSpacing: '0.2px'
                            }}
                        >
                            {userData.displayName}
                        </Typography>
                    </Paper>
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
                    left: '50%',
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
                                            sx={{
                                                fontWeight: 600, 
                                                color: 'primary.dark', 
                                                mb: 1.5, 
                                                letterSpacing: '0.2px'
                                            }}
                                        >
                                            {adv.title}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            sx={{
                                                color: 'text.secondary', 
                                                textAlign: 'center', 
                                                lineHeight: 1.55, 
                                                fontSize: '0.95rem' 
                                            }}
                                        >
                                            {adv.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: {xs: 6, md: 8} }}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        size="large"
                        onClick={handleStartWork} 
                        sx={{
                            textTransform: 'none', 
                            fontWeight: 600,
                            px: 5, 
                            py: 1.75,
                            borderRadius: '16px',
                            letterSpacing: '0.5px',
                            fontSize: '1.1rem',
                            boxShadow: '0px 6px 18px rgba(0, 110, 255, 0.3)',
                            transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-3px) scale(1.03)',
                                boxShadow: '0px 8px 25px rgba(0, 100, 230, 0.45)',
                            }
                        }}
                    >
                        Начать работу
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

const HomePage = () => {
    const { data: isLoggedInStatus, isLoading: isAuthLoading, isSuccess: isAuthSuccess, isError: isAuthError, error: authError } = useGetIsUserLoggedIn();
    
    const isAuthenticated = isAuthSuccess && isLoggedInStatus === 200;

    const { data: userData, isLoading: isUserLoading } = useQuery<UserDto>({
        queryKey: ["selfUser"],
        queryFn: getSelfUser,
        enabled: isAuthenticated, 
    });

    const heroSectionRef = useRef<HTMLDivElement>(null);
    const advantagesSectionRef = useRef<HTMLDivElement>(null);
    
    const [scrollContainerNode, setScrollContainerNode] = useState<HTMLDivElement | null>(null);
    const scrollContainerRefCallback = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            setScrollContainerNode(node);
        }
    }, []);

    type CurrentView = 'hero' | 'advantages';
    const [currentView, setCurrentView] = useState<CurrentView>('hero');
    const currentViewRef = useRef<CurrentView>(currentView);

    const isAnimatingScrollRef = useRef(false);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        currentViewRef.current = currentView;
    }, [currentView]);

    const scrollToHero = useCallback(() => {
        if (heroSectionRef.current) {
            isAnimatingScrollRef.current = true;
            heroSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            setCurrentView('hero'); 
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = setTimeout(() => {
                isAnimatingScrollRef.current = false;
            }, 700); 
        }
    }, [setCurrentView]);

    const scrollToAdvantages = useCallback(() => {
        if (advantagesSectionRef.current) {
            isAnimatingScrollRef.current = true;
            advantagesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            setCurrentView('advantages'); 
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = setTimeout(() => {
                isAnimatingScrollRef.current = false;
            }, 700); 
        }
    }, [setCurrentView]);

    useEffect(() => {
        if (!scrollContainerNode) {
            return; 
        }

        const container = scrollContainerNode; 
        const originalBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                if (document.body.style.overflow !== 'hidden') {
                    document.body.style.overflow = 'hidden';
                }
                if (isAnimatingScrollRef.current) {
                    isAnimatingScrollRef.current = false;
                }
                if (animationTimeoutRef.current) {
                    clearTimeout(animationTimeoutRef.current);
                    animationTimeoutRef.current = null;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        const observerOptions = {
            root: container, 
            threshold: 0.6, 
        };

        const heroObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isAnimatingScrollRef.current) { 
                setCurrentView('hero');
            }
        }, observerOptions);

        const advantagesObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isAnimatingScrollRef.current) { 
                setCurrentView('advantages');
            }
        }, observerOptions);

        if (heroSectionRef.current) heroObserver.observe(heroSectionRef.current);
        if (advantagesSectionRef.current) advantagesObserver.observe(advantagesSectionRef.current);

        const handleWheel = (event: WheelEvent) => {
            const activeView = currentViewRef.current;

            if (isAnimatingScrollRef.current) {
                event.preventDefault(); 
                return;
            }

            if (event.deltaY > 0) { 
                if (activeView === 'hero') {
                    event.preventDefault(); 
                    scrollToAdvantages();
                } 
            } else { 
                if (activeView === 'advantages') {
                    event.preventDefault(); 
                    scrollToHero();
                } 
            }
        };
        
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (heroSectionRef.current) {
                heroObserver.unobserve(heroSectionRef.current);
            }
            if (advantagesSectionRef.current) {
                advantagesObserver.unobserve(advantagesSectionRef.current);
            }
            if (container) {
                 container.removeEventListener('wheel', handleWheel);
            }
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
            document.body.style.overflow = originalBodyOverflow;
        };
    }, [scrollContainerNode, scrollToHero, scrollToAdvantages, setCurrentView]);

    if (isAuthLoading) { 
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-2xl text-gray-600">Проверка авторизации...</p>
            </div>
        );
    }

    if (isAuthError && authError?.response?.status !== 401) {
  return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-2xl text-red-600">Ошибка авторизации. Попробуйте позже.</p>
            </div>
        );
    }
    
    if (isAuthenticated && isUserLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-2xl text-gray-600">Загрузка данных пользователя...</p>
            </div>
        );
    }

    return (
        <div 
            ref={scrollContainerRefCallback} 
            style={{
                height: '100vh',
                overflowY: 'scroll',
                userSelect: 'none', // Стандартное свойство
                WebkitUserSelect: 'none', // Для Safari, Chrome (старыe версии)
                MozUserSelect: 'none',    // Для Firefox
                msUserSelect: 'none'      // Для IE/Edge (старыe версии)
            }}
            className='w-full' 
        >
            <div 
                ref={heroSectionRef} 
                style={{ height: '100vh'}} 
            >
                 <HeroSection isLoggedIn={isAuthenticated} userData={userData} onScrollToNextSection={scrollToAdvantages} />
            </div>
            <div 
                ref={advantagesSectionRef} 
                style={{ height: '100vh'}} 
            >
                <AdvantagesSection isLoggedIn={isAuthenticated} />
            </div>
        </div>
    );
};

export default HomePage;