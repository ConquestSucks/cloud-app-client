import axios from 'axios';

export const fileUpload = async (fileData: File): Promise<number> => {
    const formData = new FormData();
    formData.append("file", fileData);
    const response = await axios.post('http://localhost:5141/api/v1/files/upload', formData, {
        withCredentials: true
    });

    return response.status;
};
