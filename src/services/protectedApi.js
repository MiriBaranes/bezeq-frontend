
import axiosInstance from './axiosInstance';
import {store} from '../redux/store';

export const protectedApiCall = async (endpoint, method = 'GET', data = null) => {
    const { user } = store.getState();

    if (!user.isAuthenticated) {
        throw new Error('Unauthorized: User is not authenticated');
    }

    try {
        const response = await axiosInstance({
            url: endpoint,
            method,
            data,
        });
        return response.data;
    } catch (error) {
        console.error('Error during protected API call:', error);
        throw error;
    }
};
