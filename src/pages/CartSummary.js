import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { Button, Typography, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {protectedApiCall} from "../services/protectedApi";
import '../ShoppingList.css'
import CartButton from "../components/CartButton";

const CartSummary = () => {
    const { items, totalPrice } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOrder = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            const orderDetails = items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                subTotal: item.totalPrice || item.price * item.quantity,
            }));

            const orderData = {
                orderDate: new Date().toISOString(),
                totalAmount: totalPrice,
                orderDetails,
            };
            const data = await protectedApiCall('http://localhost:5258/api/Orders','POST',orderData)
            console.log(data)
            dispatch(clearCart());
            alert('Order successfully sent!');
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Error... Try again later');
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
               Order Details
            </Typography>

            {items.length === 0 ? (
                <Typography variant="h6" align="center" color="textSecondary" sx={{ mt: 4 }}>
                   No Products Added
                </Typography>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            mt: 4,
                        }}
                    >
                        {items.map((item) => (
                            <Card
                                key={item.productId}
                                sx={{
                                    width: '100%',
                                    maxWidth: 500,
                                    textAlign: 'center',
                                }}
                            >
                                <CardContent>
                                    <ProductCard product={item} />
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    <Box
                        className="cart-button"
                        sx={{
                            position: 'fixed',
                            backgroundColor:'#1976d2',
                            bottom: 20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1000,
                        }}
                    >
                        <Button
                            variant="contained"

                            onClick={handleOrder}
                        >
                            Order Now
                        </Button>
                    </Box>

                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Total Price: {totalPrice.toFixed(2)} ₪
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default CartSummary;
