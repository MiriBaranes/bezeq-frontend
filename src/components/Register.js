import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import {fetchPublicPostApi} from "../services/fetchPublicApi";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetchPublicPostApi('Auth/register', {
                email,
                password,
                firstName,
                lastName,
                address,
                phone,
            });

            const { token } = response.data;

            dispatch(
                loginSuccess({
                    user: { email },
                    token,
                })
            );

            alert('Registration successful!');
            navigate('/cart');
        } catch (error) {
            alert('Registration failed: ' + error.response?.data?.message || error.message);
        }
    };

    const fields = [
        { label: 'First Name', value: firstName, onChange: (e) => setFirstName(e.target.value) },
        { label: 'Last Name', value: lastName, onChange: (e) => setLastName(e.target.value) },
        { label: 'Email', value: email, onChange: (e) => setEmail(e.target.value) },
        { label: 'Password', value: password, onChange: (e) => setPassword(e.target.value), type: 'password' },
        { label: 'Address', value: address, onChange: (e) => setAddress(e.target.value) },
        { label: 'Phone', value: phone, onChange: (e) => setPhone(e.target.value) },
    ];

    return (
        <AuthForm
            title="Register"
            fields={fields}
            handleSubmit={handleRegister}
            link="Login"
            linkText="Allrady have an account?"
            linkHref="/login"
        />
    );
};

export default Register;
