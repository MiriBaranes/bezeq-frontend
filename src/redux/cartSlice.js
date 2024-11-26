import { createSlice } from '@reduxjs/toolkit';


const savedCart = JSON.parse(localStorage.getItem('cart')) || {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: savedCart,
    reducers: {
        addItemToCart: (state, action) => {
            const { productId, name, price } = action.payload;
            const existingItem = state.items.find((item) => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice += price;
            } else {
                state.items.push({
                    productId,
                    name,
                    price,
                    quantity: 1,
                    totalPrice: price,
                });
            }

            state.totalQuantity += 1;
            state.totalPrice += price;

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeItemFromCart: (state, action) => {
            const { productId } = action.payload;
            const existingItem = state.items.find((item) => item.productId === productId);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.totalPrice;
                state.items = state.items.filter((item) => item.productId !== productId);
            } else {
                alert('Item not exists');
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
