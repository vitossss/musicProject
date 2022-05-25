import axios from "axios";

export const API_URL = "http://127.0.0.1:8000/api/"

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {config.headers.Authorization = `Token ${token}`}
    return config;
})

export default instance;
