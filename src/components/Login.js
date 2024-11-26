import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { fetchPublicPostApi} from "../services/fetchPublicApi";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetchPublicPostApi('Auth/login', {
                email,
                password,
            });
            const { token } = response.data;
            dispatch(
                loginSuccess({
                    user: { email },
                    token,
                })
            );
            document.cookie = `token=${token}; path=/`;
            alert('Login successful!');
            navigate('/cart');
        } catch (error) {
            alert('Login failed: ' + error.response?.data?.message || error.message);
        }
    };

    const fields = [
        { label: 'Email', value: email, onChange: (e) => setEmail(e.target.value) },
        { label: 'Password', value: password, onChange: (e) => setPassword(e.target.value), type: 'password' },
    ];

    return (
        <AuthForm
            title="Login"
            fields={fields}
            handleSubmit={handleLogin}
            link="Register"
            linkText="Don't have an account?"
            linkHref="/register"
        />
    );
};

export default Login;
