import axios from "axios";

export const getIsUserLoggedIn = async (): Promise<number> => {
    const response = await axios.get('http://localhost:5141/api/v1/users/isUserLoggedIn', {
        withCredentials: true
    });

    return response.status;
}

