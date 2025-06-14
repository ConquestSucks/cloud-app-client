import axiosInstance from "@/core/shared/api/axios";
import { AxiosError } from "axios";

export const checkIsUserExists = async (login: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.get<boolean>('/api/v1/users/isUserExists', {
            params: {
                userLogin: login,
            }
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("[checkIsUserExists] Error checking user existence:", axiosError.response?.data || axiosError.message);
        return false; 
    }
}; 