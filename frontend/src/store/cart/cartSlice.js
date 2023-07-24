import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products : [],
};

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            state.products = action.payload;
        },
        removeFromCart(state, action){
            state.products.filter((product) => product.id !== action.payload)
        },
    }
});

export const {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;