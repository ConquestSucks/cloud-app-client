import axios from '@/core/shared/api/axios';

export const fileDeleteWithoutRemove = async (key: string): Promise<number> => {
    
    const response = await axios.delete(`/api/v1/files/deleteFileWithoutRemove/${key}`);

    return response.status;
};
