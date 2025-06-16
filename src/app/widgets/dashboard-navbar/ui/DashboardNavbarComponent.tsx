'use client'

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from "@mui/material";
import NavbarLogo from "@/app/shared/ui/NavbarLogo";
import { useGetIsUserLoggedIn } from "@/app/features/auth/hooks/useGetIsUserLoggedIn";
import { UserDto } from "@/app/features/storage-quota/api/getSelfUser";
import ProfileModal from './ProfileModal';
import UserDisplayComponent from '@/app/shared/ui/UserDisplayComponent';
import { useUserAvatarLoader } from '@/app/shared/hooks/useUserAvatarLoader';
import { useRouter } from 'next/navigation';
import { useUpdateSelfUser } from "@/app/features/storage-quota/hooks/useUpdateSelfUser";
import { useUser } from "@/app/contexts/UserContext";

const DashboardNavbarComponent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const { isLoading: isAuthLoading } = useGetIsUserLoggedIn();
    const { userData, isUserLoading: isUserQueryLoading } = useUser();
    const { avatarBlobUrl, isAvatarLoading } = useUserAvatarLoader(userData);
    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useUpdateSelfUser();

    const handleOpenProfileModal = () => setIsProfileModalOpen(true);
    const handleCloseProfileModal = () => setIsProfileModalOpen(false);

    const handleSaveProfile = async (updatedData: Partial<UserDto & { avatarFile?: File }>) => {
        try {
            await updateProfile(updatedData);
            handleCloseProfileModal();
        } catch (error) {
            console.error("Failed to save profile from UI", error);
        }
    };
    
    const combinedIsUserLoading = isAuthLoading || isUserQueryLoading;

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
                            isAvatarLoading={isAvatarLoading}
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
                    isCurrentAvatarLoading={isAvatarLoading || isUpdatingProfile} 
                />
            )}
        </>
    );
};

export default DashboardNavbarComponent;
