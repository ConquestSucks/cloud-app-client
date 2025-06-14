import { GetFilesParams, GetFilesResponse } from '../model/types';
import axios from '@/core/shared/api/axios';

export const getFiles = async ({ pageNumber, pageSize, deletedFiles }: GetFilesParams): Promise<GetFilesResponse> => {
    const response = await axios.get('/api/v1/files/getUserFiles', {
        params: {
            pageNumber,
            pageSize,
            deletedFiles
        },
    });
    return {
        files: response.data,
        headers: {
            "x-total-count": response.headers["x-total-count"],
            "x-total-pages": response.headers["x-total-pages"]
        }
    }
}