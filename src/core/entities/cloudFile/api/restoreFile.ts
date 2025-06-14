import axios from '@/core/shared/api/axios';

export const restoreFile = async (key: string): Promise<number> => {

    const response = await axios.put(`/api/v1/files/restoreFile/`, {
        key
    });

    return response.status;
};
