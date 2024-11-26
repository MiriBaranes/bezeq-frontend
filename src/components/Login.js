import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPublicPostApi } from '../services/fetchPublicApi';
import { loginSuccess } from '../redux/userSlice';
import {validateEmail} from "../services/validation";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleLogin = async () => {
        if (!validate()) return;

        try {
            const response = await fetchPublicPostApi('Auth/login', { email, password });
            const { token } = response.data;

            dispatch(loginSuccess({ user: { email }, token }));
            document.cookie = `token=${token}; path=/`;
            alert('Login successful!');
            navigate('/cart');
        } catch (error) {
            setServerError(error.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email || ' '}
                        InputProps={{
                            endAdornment: !!errors.email && (
                                <Typography color="error" variant="body2">
                                    ❌
                                </Typography>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password || ' '}
                        InputProps={{
                            endAdornment: !!errors.password && (
                                <Typography color="error" variant="body2">
                                    ❌
                                </Typography>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Login
                    </Button>
                </Grid>
            </Grid>
            {serverError && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                    {serverError}
                </Typography>
            )}
            <Typography sx={{ marginTop: 2 }}>
                Don't have an account? <a href="/register">Register</a>
            </Typography>
        </Box>
    );
};

export default Login;
