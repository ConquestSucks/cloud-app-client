'use client'

import React from 'react';
import { Box, Avatar as MuiAvatar, Typography, Paper, Skeleton, useTheme } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserDto } from '@/core/features/storage-quota/api/getSelfUser'; // Убедитесь, что путь корректен

interface UserDisplayComponentProps {
    userData: UserDto | null | undefined;
    avatarBlobUrl: string | null;
    isUserLoading: boolean; // Объединенная загрузка данных пользователя
    isAvatarLoading: boolean;
    onClick: () => void;
    variant?: 'navbar' | 'homePage'; // Для возможных стилистических различий
    isMobile?: boolean; // Для адаптивности, если нужно как в navbar
}

const UserDisplayComponent: React.FC<UserDisplayComponentProps> = ({
    userData,
    avatarBlobUrl,
    isUserLoading,
    isAvatarLoading,
    onClick,
    variant = 'navbar',
    isMobile,
}) => {
    const theme = useTheme();

    if (isUserLoading || (userData && isAvatarLoading)) {
        const avatarSize = variant === 'navbar' ? (isMobile ? 30 : 36) : 40;
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: variant === 'navbar' ? '6px 12px' : '10px 16px' }}>
                <Skeleton variant="circular" width={avatarSize} height={avatarSize} />
                {variant === 'navbar' && !isMobile && <Skeleton variant="text" width={80} sx={{ fontSize: '0.9rem'}} />}
                {variant === 'homePage' && <Skeleton variant="text" width={100} sx={{ fontSize: '0.95rem'}} />}
            </Box>
        );
    }

    if (userData) {
        const avatarSize = variant === 'navbar' ? (isMobile ? 30 : 36) : 40;
        const typographyVariant = variant === 'navbar' ? 'subtitle2' : 'subtitle1';
        const displayNameOnMobile = variant === 'navbar' ? !isMobile : true; // В navbar скрываем на mobile, на homePage всегда показываем (если есть)

        return (
            <Paper 
                elevation={variant === 'navbar' ? 0 : 4}
                onClick={onClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: variant === 'navbar' ? 1 : 1.5,
                    p: variant === 'navbar' ? { xs: '4px 8px', sm: '6px 12px' } : '10px 16px',
                    borderRadius: '20px',
                    bgcolor: variant === 'navbar' ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    boxShadow: variant === 'homePage' ? '0px 5px 15px rgba(0, 0, 0, 0.1)' : undefined,
                    backdropFilter: variant === 'homePage' ? 'blur(8px)' : undefined,
                    '&:hover': {
                        bgcolor: variant === 'navbar' ? theme.palette.action.hover : undefined,
                        transform: variant === 'homePage' ? 'scale(1.03)' : undefined,
                        boxShadow: variant === 'homePage' ? '0px 6px 18px rgba(0, 0, 0, 0.12)' : undefined,
                    }
                }}
            >
                <MuiAvatar 
                    key={avatarBlobUrl || userData.id || (variant === 'navbar' ? 'navbar-avatar-placeholder' : 'home-avatar-placeholder')}
                    src={avatarBlobUrl || undefined}
                    sx={{ 
                        width: avatarSize, 
                        height: avatarSize, 
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontSize: variant === 'navbar' ? { xs: '0.8rem', sm: '1rem' } : '1rem' // Пример настройки размера шрифта
                    }}
                >
                    {(!avatarBlobUrl && userData.displayName) ? userData.displayName.charAt(0).toUpperCase() : 
                     (!avatarBlobUrl ? <AccountCircleIcon sx={{ fontSize: variant === 'navbar' ? {xs: 20, sm: 24} : 26 }}/> : null)}
                </MuiAvatar>
                {displayNameOnMobile && userData.displayName && (
                    <Typography 
                        variant={typographyVariant} 
                        sx={{ 
                            fontWeight: 500,
                            color: 'text.primary',
                            display: (variant === 'navbar' && isMobile) ? { xs: 'none', md: 'block'} : 'block', // уточнено для navbar
                            fontSize: variant === 'homePage' ? '0.95rem' : undefined,
                            letterSpacing: variant === 'homePage' ? '0.2px' : undefined,
                        }}
                    >
                        {userData.displayName}
                    </Typography>
                )}
            </Paper>
        );
    }

    // Случай, если пользователь не аутентифицирован (для homePage, например)
    // Navbar этот случай не обрабатывает здесь, а выше по логике isAuthLoading/isAuthenticated
    if (variant === 'homePage' && !isUserLoading && !userData) {
         // Возвращаем null или кнопку "Войти", если этот компонент должен ее рендерить
         // В текущем задании это обрабатывается в HeroSection отдельно, так что здесь можно вернуть null
        return null; 
    }


    // Fallback для navbar, если не аутентифицирован (хотя DashboardNavbarComponent имеет свою логику)
    if (variant === 'navbar' && !isUserLoading && !userData) {
        const avatarSize = isMobile ? 30 : 36;
        return (
             <MuiAvatar sx={{ width: avatarSize, height: avatarSize }}>
                <AccountCircleIcon sx={{ fontSize: isMobile ? 20 : 24 }}/>
            </MuiAvatar>
        );
    }
    
    return null; // Общий fallback
};

export default UserDisplayComponent; 