import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AuthForm = ({ title, fields, handleSubmit, link, linkText, linkHref }) => {
    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
            <Typography variant="h5" align="center" gutterBottom>
                {title}
            </Typography>
            {fields.map(({ label, value, onChange, type = 'text' }, index) => (
                <TextField
                    key={index}
                    fullWidth
                    label={label}
                    value={value}
                    onChange={onChange}
                    type={type}
                    sx={{ mb: 2 }}
                />
            ))}
            <Button variant="contained" fullWidth onClick={handleSubmit}>
                {title}
            </Button>
            {link && (
                <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                    {linkText} <a href={linkHref}>{link}</a>
                </Typography>
            )}
        </Box>
    );
};

export default AuthForm;
