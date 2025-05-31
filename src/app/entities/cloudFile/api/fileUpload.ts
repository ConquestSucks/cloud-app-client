import axios from 'axios';

export const fileUpload = async (fileData: File): Promise<number> => {
    const response = await axios.post('http://localhost:5141/api/v1/files/upload', fileData, {
        withCredentials: true
    });

    return response.status;
};
