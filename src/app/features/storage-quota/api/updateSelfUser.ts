import axiosInstance from '@/app/shared/api/axios';
import { UserDto } from './getSelfUser';

export const updateSelfUser = async (data: Partial<UserDto & { avatarFile?: File }>): Promise<void> => {
    const displayNameToUpdate = data.displayName;
    const avatarFileToUpdate = data.avatarFile;

    if (!displayNameToUpdate) {
        throw new Error("displayName is required for profile update.");
    }

    const queryParams = { displayName: displayNameToUpdate };
    
    if (avatarFileToUpdate) {
        const formData = new FormData();
        formData.append('avatar', avatarFileToUpdate);
        await axiosInstance.put('/api/v1/users/updateSelfUser', formData, {
            params: queryParams,
        });
    } else {
        const emptyFormData = new FormData();
        await axiosInstance.put('/api/v1/users/updateSelfUser', emptyFormData, {
            params: queryParams,
        });
    }
}; 