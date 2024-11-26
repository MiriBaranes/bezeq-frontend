import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/cartSlice';
import { Card, CardContent, CardActions, Button, Typography, Box, Divider, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.cart.items.find(item => item.productId === product.productId));

    const handleAddToCart = () => {
        dispatch(
            addItemToCart({
                productId: product.productId,
                name: product.name,
                price: product.price,
            })
        );
    };

    const handleRemoveFromCart = () => {
        if (cartItem && cartItem.quantity > 0) {
            dispatch(removeItemFromCart({ productId: product.productId }));
        }
    };

    const handleRemoveItem = () => {
        dispatch(removeItemFromCart({ productId: product.productId }));
    };

    return (
        <Card sx={{ maxWidth: 350, margin: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.name}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Price: ₪{product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    Quantity in Cart: {cartItem ? cartItem.quantity : 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Total Price: ₪{cartItem ? cartItem.totalPrice.toFixed(2) : '0.00'}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
                <IconButton
                    size="small"
                    color="secondary"
                    onClick={handleRemoveFromCart}
                    disabled={!cartItem || cartItem.quantity === 0}
                >
                    <RemoveIcon />
                </IconButton>
                <IconButton
                    size="small"
                    color="primary"
                    onClick={handleAddToCart}
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    size="small"
                    color="error"
                    onClick={handleRemoveItem}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
