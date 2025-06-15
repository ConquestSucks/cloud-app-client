import axiosInstance from "@/app/shared/api/axios";

export const checkIsUserExists = async (login: string): Promise<boolean> => {
    const response = await axiosInstance.get<boolean>('/api/v1/users/isUserExists', {
        params: {
            userLogin: login,
        }
    });
    return response.data;
}; 