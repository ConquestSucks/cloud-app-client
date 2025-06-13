import axios from '@/app/shared/api/axios';
import { getBlob } from '../lib/getBlob';

export const downloadFile = async (key: string): Promise<number> => {
    const response = await axios.get(`/api/v1/files/download/${key}`, {
        responseType: "blob",
        withCredentials: true,
    });

    const contentDisposition = response.headers['content-disposition'];
    const fileNameMatch = contentDisposition?.match(/filename\*=UTF-8''(.+)|filename="?([^"]+)"?/);
    let fileName = 'downloaded.file';
    if (fileNameMatch) {
        fileName = fileNameMatch[1] ? decodeURIComponent(fileNameMatch[1]) : fileNameMatch[2];
    }

    getBlob(response.data, fileName);
    return response.status;
}