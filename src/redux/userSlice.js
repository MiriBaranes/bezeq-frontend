import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
};


const savedToken = Cookies.get('token');
const savedUser = Cookies.get('user');

if (savedToken && savedUser) {
    initialState.user = JSON.parse(savedUser);
    initialState.token = savedToken;
    initialState.isAuthenticated = true;
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;


            Cookies.set('token', action.payload.token);
            Cookies.set('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            Cookies.remove('token');
            Cookies.remove('user');
            localStorage.removeItem("cart")
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
