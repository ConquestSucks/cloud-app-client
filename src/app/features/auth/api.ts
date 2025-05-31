import axios from "axios";
import { LoginData, ServerResponse } from "./model/types";

export const postUserLogin = async (loginData: LoginData): Promise<ServerResponse> => {
    const response = await axios.post('http://localhost:5141/api/v1/users/login', loginData, {
        withCredentials: true
    });

    return response.data;
};

export const getIsUserLoggedIn = async (): Promise<number> => {
    const response = await axios.get('http://localhost:5141/api/v1/users/isUserLoggedIn', {
        withCredentials: true
    });

    return response.status;
}

