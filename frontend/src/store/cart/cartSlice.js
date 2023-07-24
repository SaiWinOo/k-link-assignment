import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    subTotal : 0,
    total : 0,
    tax : 0,
    products : [],
    cartOpen : false,
};


const calculateCost = (state) => {
    state.subTotal = state.products.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0);
    state.tax = state.subTotal * 0.05;
    state.total = state.subTotal + state.tax;
};
const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart(state, action) {
            const productToAdd = action.payload;
            const existingProductIndex = state.products.findIndex(item => item.id === productToAdd.id);

            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].quantity += 1;
            } else {
                state.products.push({
                    ...productToAdd,
                    quantity: 1,
                });
            }
            calculateCost(state);
        },
        removeFromCart(state, action){
            state.products = state.products.filter((product) => product.id !== action.payload)
            calculateCost(state);
        },
        payNow(state){
          state.products = [];
          calculateCost(state);
        },
        toggleCartState(state){
            state.cartOpen = !state.cartOpen;
        },
        decreaseQuantity(state, action){
            state.products.map(p => {
                if(p.id === action.payload){
                    if(p.quantity === 1){
                        console.log(p.quantity)
                        state.products = state.products.filter((product) => product.id !== action.payload);
                    }else{
                        p.quantity -= 1;
                    }
                }
                return p;
            })
            calculateCost(state);
        },
        increaseQuantity(state, action){
            state.products.map(p => {
                if(p.id === action.payload){
                    p.quantity += 1;
                }
                return p;
            })
            calculateCost(state);
        },

    }
});

export const {addToCart, removeFromCart, increaseQuantity, toggleCartState, decreaseQuantity, payNow} = cartSlice.actions;

export default cartSlice.reducer;