import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5141',
    withCredentials: true
});

export default axiosInstance; 