import axios from 'axios';
import { GetFilesResponse } from '../model/types';

export const getFiles = async (pageNumber: number, pageSize: number, deletedFiles: boolean): Promise<GetFilesResponse> => {
    const response = await axios.get('http://localhost:5141/api/v1/files/getUserFiles', {
        params: {
            pageNumber,
            pageSize,
            deletedFiles
        },
        withCredentials: true,
    });
    return {
        files: response.data,
        headers: {
            "x-total-count": response.headers["x-total-count"],
            "x-total-pages": response.headers["x-total-pages"]
        }
    }
}