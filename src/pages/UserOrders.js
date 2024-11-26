
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    Paper,
    Avatar,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {protectedApiCall} from "../services/protectedApi";

const UserOrders = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            const fetchOrders = async () => {
                setLoading(true);
                setError('');
                try {
                    const data = await protectedApiCall('http://localhost:5258/api/Orders');
                    setOrders(data);
                } catch (err) {
                    console.error('Error fetching orders:', err);
                    setError('Failed to fetch orders. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };

            fetchOrders();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <Typography variant="h6" align="center">
                Please log in to view your orders.
            </Typography>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                My Orders
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body1" color="error" align="center">
                    {error}
                </Typography>
            ) : orders.length > 0 ? (
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <List>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.orderId}>
                                <ListItem alignItems="flex-start">
                                    <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2 }}>
                                        <ShoppingCartIcon />
                                    </Avatar>
                                    <ListItemText
                                        primary={`Order #${index + 1}`}
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="text.primary">
                                                    Date: {new Date(order.orderDate).toLocaleString()}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary">
                                                    Total Amount: ₪{order.totalAmount.toFixed(2)}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary">
                                                    Products:
                                                </Typography>
                                                {order.orderDetails.map((item, i) => (
                                                    <Typography
                                                        key={i}
                                                        variant="body2"
                                                        sx={{ marginLeft: 2 }}
                                                    >
                                                        - {item.productName}, Quantity: {item.quantity}, Subtotal: ₪
                                                        {item.subTotal.toFixed(2)}
                                                    </Typography>
                                                ))}
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            ) : (
                <Typography variant="body1" align="center">
                    No orders found.
                </Typography>
            )}
        </Box>
    );
};

export default UserOrders;
