import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPublicPostApi } from '../services/fetchPublicApi';
import { loginSuccess } from '../redux/userSlice';
import {validateEmail} from "../services/validation";

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleRegister = async () => {
        if (!validate()) return;

        try {
            const response = await fetchPublicPostApi('Auth/register', formData);
            const { token } = response.data;

            dispatch(loginSuccess({ user: { email: formData.email }, token }));
            alert('Registration successful!');
            navigate('/cart');
        } catch (error) {
            console.log(error.response?.data?.errors)
            const errorResponse = error.response?.data?.errors || [];
            setServerErrors(errorResponse);
        }
    };

    const fields = [
        { label: 'First Name', value: formData.firstName, field: 'firstName' },
        { label: 'Last Name', value: formData.lastName, field: 'lastName' },
        { label: 'Email', value: formData.email, field: 'email' },
        { label: 'Password', value: formData.password, field: 'password', type: 'password' },
        { label: 'Address', value: formData.address, field: 'address' },
        { label: 'Phone', value: formData.phone, field: 'phone' },
    ];

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            <Grid container spacing={2}>
                {fields.map(({ label, value, field, type = 'text' }) => (
                    <Grid item xs={12} key={field}>
                        <TextField
                            fullWidth
                            label={label}
                            type={type}
                            value={value}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            error={!!errors[field]}
                            helperText={errors[field] || ' '}
                            InputProps={{
                                endAdornment: !!errors[field] && (
                                    <Typography color="error" variant="body2">
                                        ❌
                                    </Typography>
                                ),
                            }}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
                        Register
                    </Button>
                </Grid>
            </Grid>
            {Object.keys(serverErrors).length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography color="error">Validation Errors:</Typography>
                    <ul>
                        {(serverErrors).map((item, index) => (
                            <li key={index}>
                                <strong>{item.description}:</strong>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
            <Typography sx={{ marginTop: 2 }}>
                Already have an account? <a href="/login">Login</a>
            </Typography>
        </Box>
    );
};

export default Register;
