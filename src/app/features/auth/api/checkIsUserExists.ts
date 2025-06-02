import axiosInstance from "@/app/shared/api/axios";

export const checkIsUserExists = async (login: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.get<boolean>('/api/v1/users/isUserExists', {
            params: {
                userLogin: login,
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("[checkIsUserExists] Error checking user existence:", error.response?.data || error.message);
        return false; 
    }
}; 