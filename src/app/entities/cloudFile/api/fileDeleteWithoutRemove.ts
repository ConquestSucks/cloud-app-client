import axios from 'axios';

export const fileDeleteWithoutRemove = async (key: string): Promise<number> => {
    
    const response = await axios.delete(`http://localhost:5141/api/v1/files/deleteFileWithoutRemove/${key}`, {
        withCredentials: true
    });

    return response.status;
};
