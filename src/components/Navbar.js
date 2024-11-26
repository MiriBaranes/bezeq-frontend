import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Badge,
    IconButton,
    Divider,
    Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import {clearCart} from "../redux/cartSlice";
import CartButton from "./CartButton";

const Navbar = () => {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearCart());
        dispatch(logout());
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        alert('Logged out successfully');
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* שם החנות */}
                <Typography variant="h6">My Shop</Typography>

                {/* כפתורים */}
                <Box display="flex" alignItems="center" gap={2}>
                    <CartButton/>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white' }} />
                    <Button color="inherit" onClick={() => navigate('/')}>
                        Store
                    </Button>

                    {isAuthenticated && (
                        <>
                            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white' }} />
                            <Button color="inherit" onClick={() => navigate('/orders')}>
                                My Orders
                            </Button>
                        </>
                    )}

                    <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white' }} />

                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
