import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5258/api', // כתובת בסיס
});

export const fetchPublicGetApi = async ( path ) => {
    try {
        return  await axiosInstance.get(`/${path}`);
    } catch (error) {
        console.error('Error during public API call:', error);
        throw error;
    }
};

export const fetchPublicPostApi = async ( path, data ) => {
    try {
        return  await axiosInstance.post(`/${path}`, data);
    } catch (error) {
        console.error('Error during public API call:', error);
        throw error;
    }
};
