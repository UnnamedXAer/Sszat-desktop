import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000,
    responseType: 'json', // default
    withCredentials: true
});


export default axiosInstance;