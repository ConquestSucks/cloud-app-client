import axios from 'axios';

interface UploadOptions {
    connectionId?: string;
}

export const fileUpload = async (fileData: File, options?: UploadOptions): Promise<number> => {
    const formData = new FormData();
    formData.append("file", fileData);

    const response = await axios.post(
        `http://localhost:5141/api/v1/files/upload?connectionId=${options?.connectionId}`,
        formData,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );

    return response.status;
};
