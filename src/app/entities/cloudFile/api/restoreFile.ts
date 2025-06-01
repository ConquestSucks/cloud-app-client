import axios from 'axios';

export const restoreFile = async (key: string): Promise<number> => {

    const response = await axios.put(`http://localhost:5141/api/v1/files/restoreFile/`, {
        key
    }, {
        withCredentials: true
    });

    return response.status;
};
