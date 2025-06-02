'use client'

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { AppBar, Toolbar, Box, useTheme, useMediaQuery, Avatar as MuiAvatar, Typography, Paper, Skeleton } from "@mui/material";
import NavbarLogo from "@/app/shared/ui/NavbarLogo";
import { useGetIsUserLoggedIn } from "@/app/features/auth/hooks/useGetIsUserLoggedIn";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSelfUser, UserDto } from "@/app/features/storage-quota/api/getSelfUser";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileModal from './ProfileModal';

const updateProfileApiCall = async (data: Partial<UserDto & { avatarFile?: File }>): Promise<void> => {
    console.log("Updating profile with:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.avatarFile) {
        console.log("Uploading avatar:", data.avatarFile.name);
    }
    console.log("Profile updated successfully (simulated)");
};

const DashboardNavbarComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const queryClient = useQueryClient();

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const { data: isLoggedInStatus, isLoading: isAuthLoading } = useGetIsUserLoggedIn();
    const isAuthenticated = !isAuthLoading && isLoggedInStatus === 200;

    const { data: userData, isLoading: isUserLoading } = useQuery<UserDto>({
        queryKey: ["selfUser"],
        queryFn: getSelfUser,
        enabled: isAuthenticated,
    });

    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleSaveProfile = async (updatedData: Partial<UserDto & { avatarFile?: File }>) => {
        try {
            await updateProfileApiCall(updatedData);
            await queryClient.invalidateQueries({ queryKey: ["selfUser"] });
        } catch (error) {
            console.error("Failed to update profile from navbar:", error);
            throw error;
        }
    };
    
    const UserProfileSection = () => {
        if (isAuthLoading || (isAuthenticated && isUserLoading)) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: '6px 12px' }}>
                    <Skeleton variant="circular" width={isMobile ? 30 : 36} height={isMobile ? 30 : 36} />
                    {!isMobile && <Skeleton variant="text" width={80} sx={{ fontSize: '0.9rem'}} />}
                </Box>
            );
        }

        if (isAuthenticated && userData) {
            return (
                <Paper 
                    elevation={0}
                    onClick={handleOpenProfileModal}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: { xs: '4px 8px', sm: '6px 12px' },
                        borderRadius: '20px',
                        bgcolor: 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                            bgcolor: theme.palette.action.hover,
                        }
                    }}
                >
                    <MuiAvatar 
                        sx={{ 
                            width: { xs: 30, sm: 36 }, 
                            height: { xs: 30, sm: 36 }, 
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontSize: { xs: '0.8rem', sm: '1rem' }
                        }}
                    >
                        {userData.displayName ? userData.displayName.charAt(0).toUpperCase() : <AccountCircleIcon sx={{ fontSize: {xs: 20, sm: 24} }}/>}
                    </MuiAvatar>
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            fontWeight: 500,
                            color: 'text.primary',
                            display: { xs: 'none', md: 'block'} 
                        }}
                    >
                        {userData.displayName}
                    </Typography>
                </Paper>
            );
        }

        return (
            <MuiAvatar sx={{ width: { xs: 30, sm: 36 }, height: { xs: 30, sm: 36 } }}>
                <AccountCircleIcon sx={{ fontSize: {xs: 20, sm: 24} }}/>
            </MuiAvatar>
        );
    };

    return (
        <>
            <AppBar position="static" sx={{ 
                backgroundColor: 'background.paper', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                color: 'text.primary' 
            }}>
                <Toolbar sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingX: { xs: 2, sm: 3 }
                }}>
                    <NavbarLogo />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                        {!isMobile && <SearchBar />} 
                        <UserProfileSection />
                    </Box>
                </Toolbar>
                {isMobile && (
                    <Toolbar sx={{ paddingX: { xs: 2, sm: 3 }, paddingBottom: 1, justifyContent: 'center' }}>
                        <SearchBar />
                    </Toolbar>
                )}
            </AppBar>
            {userData && (
                 <ProfileModal 
                    open={isProfileModalOpen} 
                    onClose={handleCloseProfileModal} 
                    userData={userData} 
                    onSave={handleSaveProfile} 
                />
            )}
        </>
    );
};

export default DashboardNavbarComponent;
