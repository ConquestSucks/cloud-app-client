import axios from "@/app/shared/api/axios";
import { LoginData, ServerResponse } from "../model/types";

export const postUserLogin = async (loginData: LoginData): Promise<ServerResponse> => {
    const response = await axios.post('/api/v1/users/login', loginData);
    return response.data;
}; 