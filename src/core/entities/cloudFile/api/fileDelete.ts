import axios from "@/core/shared/api/axios";

export const fileDelete = async (key: string): Promise<number> => {
    const response = await axios.delete(`/api/v1/files/deleteFile/${key}`);
    return response.status;
};
