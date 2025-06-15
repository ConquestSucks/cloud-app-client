'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

export const usePageScroll = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const advantagesRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const [currentView, setCurrentView] = useState<'hero' | 'advantages'>('hero');
    const currentViewRef = useRef(currentView);
    useEffect(() => { currentViewRef.current = currentView; }, [currentView]);

    const isAnimatingScrollRef = useRef(false);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    return {
        heroRef,
        advantagesRef,
        scrollContainerRef,
        scrollToAdvantages,
    };
}; 