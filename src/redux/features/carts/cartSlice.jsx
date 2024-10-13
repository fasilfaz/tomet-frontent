import { updateCart } from "@/lib/cart";
import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {
    cartItems: [], shippingAddress: {}, paymentMethod: "Card",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { user, rating, numReviews, reviews, ...item } = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state, item)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload._id);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
        resetCart: (state, action) => {
            // Reset state to initialState
            state.cartItems = initialState.cartItems;
            state.shippingAddress = initialState.shippingAddress;
            state.paymentMethod = initialState.paymentMethod;
            state.itemsPrice = initialState.itemsPrice;
            state.shippingPrice = initialState.shippingPrice;
            state.taxPrice = initialState.taxPrice;
            state.totalPrice = initialState.totalPrice;
            localStorage.setItem('cart', JSON.stringify(initialState));

        }
    }
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart } = cartSlice.actions;
export default cartSlice.reducer;