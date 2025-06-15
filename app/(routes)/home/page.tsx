'use client'

import React from 'react';
import { useGetIsUserLoggedIn } from "@/app/features/auth/hooks/useGetIsUserLoggedIn";
import { Box } from '@mui/material';
import { HeroSection } from '@/app/widgets/hero-section/ui/HeroSection';
import { AdvantagesSection } from '@/app/widgets/advantages-section/ui/AdvantagesSection';
import { usePageScroll } from '@/app/features/home-page-scroll/hooks/usePageScroll';
import { useGetSelfUser } from '@/app/features/storage-quota/hooks/useGetSelfUser';

const HomePage = () => {
    const { data: isLoggedInStatus, isLoading: isAuthLoading } = useGetIsUserLoggedIn();
    const isAuthenticated = !isAuthLoading && isLoggedInStatus === 200;
    const { data: userData, isLoading: isUserQueryLoading } = useGetSelfUser();

    const { 
        heroRef, 
        advantagesRef, 
        scrollContainerRef, 
        scrollToAdvantages 
    } = usePageScroll();
    
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