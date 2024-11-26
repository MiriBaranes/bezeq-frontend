
import axios from 'axios';
import {store} from '../redux/store';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5258/api',
});


axiosInstance.interceptors.request.use(
    (config) => {
        const { user } = store.getState();
        if (user.isAuthenticated && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
