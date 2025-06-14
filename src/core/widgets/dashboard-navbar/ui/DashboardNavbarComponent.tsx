'use client'

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from "@mui/material";
import NavbarLogo from "@/core/shared/ui/NavbarLogo";
import { useGetIsUserLoggedIn } from "@/core/features/auth/hooks/useGetIsUserLoggedIn";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSelfUser, UserDto } from "@/core/features/storage-quota/api/getSelfUser";
import ProfileModal from './ProfileModal';
import UserDisplayComponent from '@/core/shared/ui/UserDisplayComponent';
import { useUserAvatarLoader } from '@/core/shared/hooks/useUserAvatarLoader';
import { useRouter } from 'next/navigation';

const updateProfileApiCall = async (data: Partial<UserDto & { avatarFile?: File }>): Promise<void> => {
    const displayNameToUpdate = data.displayName;
    const avatarFileToUpdate = data.avatarFile;

    if (!displayNameToUpdate) {
        const errorMsg = "Critical: displayNameToUpdate is undefined in updateProfileApiCall. displayName is required for profile update.";
        throw new Error(errorMsg);
    }

    const queryParams = { displayName: displayNameToUpdate };

    try {
        const axiosInstance = (await import("@/core/shared/api/axios")).default;

        if (avatarFileToUpdate) {
            const formData = new FormData();
            formData.append('avatar', avatarFileToUpdate);
            
            await axiosInstance.put('/api/v1/users/updateSelfUser', formData, {
                params: queryParams,
            });
        } else {
            await axiosInstance.put('/api/v1/users/updateSelfUser', undefined, {
                params: queryParams,
            });
        }
    } catch (error) {
        throw error; 
    }
};

const DashboardNavbarComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const queryClient = useQueryClient();
    const router = useRouter();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const { data: isLoggedInStatus, isLoading: isAuthLoading } = useGetIsUserLoggedIn();
    const isAuthenticated = !isAuthLoading && isLoggedInStatus === 200;

    const { data: userData, isLoading: isUserQueryLoading } = useQuery<UserDto>({
        queryKey: ["selfUser"],
        queryFn: getSelfUser,
        enabled: isAuthenticated,
        refetchOnWindowFocus: false, 
    });

    const { avatarBlobUrl, isAvatarLoading: isAvatarLoadingGlobal } = useUserAvatarLoader(userData);

    const handleOpenProfileModal = () => setIsProfileModalOpen(true);
    const handleCloseProfileModal = () => setIsProfileModalOpen(false);

    const handleSaveProfile = async (updatedData: Partial<UserDto & { avatarFile?: File }>) => {
        try {
            await updateProfileApiCall(updatedData);
            handleCloseProfileModal();
            await queryClient.invalidateQueries({ queryKey: ["selfUser"] });
        } catch (error) {
            throw error;
        }
    };
    
    const combinedIsUserLoading = isAuthLoading || (isAuthenticated && isUserQueryLoading);

    return (
        <>
            <AppBar 
                position="static" 
                sx={{ 
                    backgroundColor: 'background.paper', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                    color: 'text.primary',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                }}
            >
                <Toolbar sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingX: { xs: 2, sm: 3 }
                }}>
                    <Box onClick={() => router.push('/home')} sx={{ cursor: 'pointer' }}>
                        <NavbarLogo />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                        {!isMobile && <SearchBar />} 
                        <UserDisplayComponent 
                            userData={userData}
                            avatarBlobUrl={avatarBlobUrl}
                            isUserLoading={combinedIsUserLoading}
                            isAvatarLoading={isAvatarLoadingGlobal}
                            onClick={handleOpenProfileModal}
                            variant="navbar"
                            isMobile={isMobile}
                        />
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
                    currentAvatarBlobUrl={avatarBlobUrl}
                    isCurrentAvatarLoading={isAvatarLoadingGlobal} 
                />
            )}
        </>
    );
};

export default DashboardNavbarComponent;
