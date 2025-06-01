import axiosInstance from '@/app/shared/api/axios';

export interface QuotaItem {
    fileType: string;
    totalSize: number;
}

export const getUserQuota = async (): Promise<QuotaItem[]> => {
    const response = await axiosInstance.get('/api/v1/users/getUserQuota');
    return response.data;
}; 