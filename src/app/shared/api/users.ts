import axiosInstance from "./axios";

export const getSelfUserAvatar = async () => {
    const response = await axiosInstance.get(`/api/v1/users/getSelfUserAvatar`, {
        responseType: 'blob',
    });
    return response.data;
}; 