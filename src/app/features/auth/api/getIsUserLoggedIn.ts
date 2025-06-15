import axios from "@/app/shared/api/axios";

export const getIsUserLoggedIn = async (): Promise<number> => {
    const response = await axios.get('/api/v1/users/isUserLoggedIn');
    return response.status;
}; 