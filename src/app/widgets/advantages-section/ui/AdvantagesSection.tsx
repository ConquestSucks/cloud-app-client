'use client'

import React from 'react';
import { useRouter } from "next/navigation";
import { Button, Typography, Box, Container, Card, CardContent } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';

export const AdvantagesSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
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
                height: '100vh',
                bgcolor: 'grey.50',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: { xs: 2, sm: 3 }
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: { xs: 3, md: 5 },
                        color: 'text.primary',
                        letterSpacing: '-0.5px',
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
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
                <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 6 } }}>
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