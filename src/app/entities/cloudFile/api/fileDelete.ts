import axios from 'axios';

export const fileDelete = async (key: string): Promise<number> => {
    
    const response = await axios.delete(`http://localhost:5141/api/v1/files/deleteFile/${key}`, {
        withCredentials: true
    });

    return response.status;
};
