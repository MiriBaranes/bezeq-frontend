import {Badge, Button} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const CartButton = ()=>{
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const navigate = useNavigate();
    return(
        <Button
            color="inherit"
            onClick={() => navigate('/cart')}
            startIcon={
                <Badge badgeContent={totalQuantity} color="error">
                    <ShoppingCartIcon />
                </Badge>
            }
            sx={{ px: 2 }}
        >
            Cart
        </Button>
    )
}
export default CartButton;
