import axios from "@/app/shared/api/axios";
import { AxiosProgressEvent } from "axios";

export const fileUpload = (file: File, options: {
    connectionId: string,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
}) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(`/api/v1/files/upload?connectionId=${options?.connectionId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: options.onUploadProgress
    });
};
