import axiosInstance from '@/app/shared/api/axios';

export interface UserDto {
    id: string;
    name: string;
    displayName: string;
    freeDiskSpace: number;
    diskSpaceOccupied: number;
    diskSpace: number;
    createdAt: string;
    modifiedAt: string;
}

export const getSelfUser = async (): Promise<UserDto> => {
    const response = await axiosInstance.get('/api/v1/users/getSelfUser');
    return response.data;
}; 