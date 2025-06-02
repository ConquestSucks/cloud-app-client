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
    Typography
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { UserDto } from '@/app/features/storage-quota/api/getSelfUser';

interface ProfileModalProps {
    open: boolean;
    onClose: () => void;
    userData: UserDto | null | undefined;
    onSave: (updatedData: Partial<UserDto & { avatarFile?: File }>) => Promise<void>; 
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, userData, onSave }) => {
    const [displayName, setDisplayName] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (userData) {
            setDisplayName(userData.displayName || '');
            // Если у UserDto есть поле avatarUrl, его можно установить здесь:
            // setAvatarPreview(userData.avatarUrl || null);
        }
        if (!open) { // Сброс состояния при закрытии модального окна
            setAvatarFile(null);
            setAvatarPreview(null); 
            if (userData) {
                 setDisplayName(userData.displayName || '');
            }
        }
    }, [userData, open]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        if (!userData) return;
        
        const trimmedDisplayName = displayName.trim();
        if (!trimmedDisplayName) {
            return; // Имя не может быть пустым, TextField уже должен это показать
        }

        setIsSaving(true);
        const updatedData: Partial<UserDto & { avatarFile?: File }> = {};
        
        if (trimmedDisplayName !== userData.displayName) {
            updatedData.displayName = trimmedDisplayName;
        }
        if (avatarFile) {
            updatedData.avatarFile = avatarFile;
        }

        try {
            await onSave(updatedData);
            if (avatarFile) {
                setAvatarFile(null); // Сбрасываем файл после успешной отправки
            }
            onClose(); 
        } catch (error) {
            console.error("Failed to save profile data:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.warn("Invalid date string for formatDate:", dateString);
                return dateString; 
            }
            return date.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            console.error("Error formatting date:", e);
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
    const isAvatarChanged = !!avatarFile;
    const canSaveChanges = (isDisplayNameChanged || isAvatarChanged) && displayName.trim() !== '';

    return (
        <Dialog 
            open={open} 
            onClose={handleCloseDialog} 
            maxWidth="xs" 
            fullWidth 
            PaperProps={{component: 'form', onSubmit: handleSubmit}} // Используем onSubmit здесь
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>Профиль пользователя</DialogTitle>
            <DialogContent dividers sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1, mb: 2 }}>
                    <Box sx={{ position: 'relative', mb: 1 }}>
                        <Avatar 
                            src={avatarPreview /* || userData.avatarUrl */ || undefined} 
                            sx={{ width: 100, height: 100, fontSize: '3rem' }}
                        >
                            {(!avatarPreview && /* !userData.avatarUrl && */ userData.displayName) ? userData.displayName.charAt(0).toUpperCase() : ' '}
                        </Avatar>
                        <IconButton 
                            color="primary" 
                            aria-label="upload picture" 
                            component="label" 
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
                <Button type="submit" color="primary" variant="contained" disabled={isSaving || !canSaveChanges}>
                    {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Сохранить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileModal; 