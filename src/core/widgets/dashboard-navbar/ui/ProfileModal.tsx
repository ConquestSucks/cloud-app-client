'use client';

import React, { useState, useEffect, FormEventHandler } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Avatar,
    IconButton,
    Box,
    CircularProgress,
    Typography,
    Skeleton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { UserDto } from '@/core/features/storage-quota/api/getSelfUser';

interface ProfileModalProps {
    open: boolean;
    onClose: () => void;
    userData: UserDto | null | undefined;
    onSave: (updatedData: Partial<UserDto & { avatarFile?: File }>) => Promise<void>; 
    currentAvatarBlobUrl: string | null;
    isCurrentAvatarLoading: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ 
    open, 
    onClose, 
    userData, 
    onSave, 
    currentAvatarBlobUrl, 
    isCurrentAvatarLoading 
}) => {
    const [displayName, setDisplayName] = useState('');
    const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
    const [newAvatarPreview, setNewAvatarPreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (open) {
            if (userData) {
                setDisplayName(userData.displayName || '');
            }
        } else {
            setNewAvatarFile(null);
            if (newAvatarPreview) {
                URL.revokeObjectURL(newAvatarPreview);
                setNewAvatarPreview(null);
            }
        }
    }, [userData, open, newAvatarPreview]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setNewAvatarFile(file);
            if (newAvatarPreview) {
                URL.revokeObjectURL(newAvatarPreview);
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!userData) return;
        const trimmedDisplayName = displayName.trim();
        if (!trimmedDisplayName) return;

        setIsSaving(true);
        const updatedData: Partial<UserDto & { avatarFile?: File }> = {
            displayName: trimmedDisplayName,
        };

        if (newAvatarFile) {
            updatedData.avatarFile = newAvatarFile;
        }

        try {
            await onSave(updatedData);
            if (newAvatarFile) {
                setNewAvatarFile(null);
                if(newAvatarPreview) URL.revokeObjectURL(newAvatarPreview);
                setNewAvatarPreview(null);
            }
            onClose(); 
        } catch {
            // Error is handled by the parent component through onSave promise rejection
        } finally {
            setIsSaving(false);
        }
    };

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString; 
            }
            return date.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString; 
        }
    };
    
    const handleCloseDialog = () => {
        onClose();
    };

    if (!userData) {
        return null; 
    }
    
    const isDisplayNameChanged = displayName.trim() !== userData.displayName && displayName.trim() !== '';
    const isAvatarChanged = !!newAvatarFile;
    const canSaveChanges = (isDisplayNameChanged || isAvatarChanged) && displayName.trim() !== '';

    const avatarDisplayUrl = newAvatarPreview || currentAvatarBlobUrl;
    const avatarDisplayKey = newAvatarPreview ? 'new-preview-' + (newAvatarFile?.name || 'file') : (currentAvatarBlobUrl || userData?.id || 'modal-avatar-placeholder');

    return (
        <Dialog 
            open={open} 
            onClose={handleCloseDialog} 
            maxWidth="xs" 
            fullWidth 
            PaperProps={{component: 'form', onSubmit: handleSubmit}}
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>Профиль пользователя</DialogTitle>
            <DialogContent dividers sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1, mb: 2 }}>
                    <Box sx={{ position: 'relative', mb: 1 }}>
                        {isCurrentAvatarLoading ? (
                            <Skeleton variant="circular" width={100} height={100} />
                        ) : (
                            <Avatar 
                                key={avatarDisplayKey} 
                                src={avatarDisplayUrl || undefined} 
                                sx={{ width: 100, height: 100, fontSize: '3rem' }}
                            >
                                {(!avatarDisplayUrl && userData.displayName) ? userData.displayName.charAt(0).toUpperCase() : ' '}
                            </Avatar>
                        )}
                        <IconButton 
                            color="primary" 
                            aria-label="upload picture" 
                            component="label" 
                            disabled={isCurrentAvatarLoading}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: -5,
                                backgroundColor: theme => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0,0,0,0.7)',
                                border: theme => `1px solid ${theme.palette.primary.main}`,
                                padding: '4px',
                                '&:hover': {
                                    backgroundColor: theme => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(0,0,0,0.9)',
                                }
                            }}
                        >
                            <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                            <PhotoCamera sx={{ fontSize: '1.2rem'}} />
                        </IconButton>
                    </Box>
                     <Typography variant="caption" color="text.secondary">Нажмите на иконку для смены аватара</Typography>
                </Box>
                
                <TextField
                    margin="dense"
                    label="Отображаемое имя"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    sx={{ mb: 2 }}
                    required
                    error={displayName.trim() === ''}
                    helperText={displayName.trim() === '' ? 'Имя не может быть пустым' : ''}
                />
                <TextField
                    margin="dense"
                    label="Логин"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={userData.name || 'N/A'}
                    disabled
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Аккаунт создан"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formatDate(userData.createdAt)}
                    disabled
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                />
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px'}}>
                <Button onClick={handleCloseDialog} color="inherit" variant="outlined" sx={{ mr: 1 }}>Отмена</Button>
                <Button type="submit" color="primary" variant="contained" disabled={isSaving || !canSaveChanges || isCurrentAvatarLoading}>
                    {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Сохранить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileModal; 