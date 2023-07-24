import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./auth/authSlice.js";
import productReducer from "./products/productSlice.js";
import cartReducer from "./cart/cartSlice.js";



const store = configureStore({
    reducer : {
        user : userReducer,
        products : productReducer,
        cart : cartReducer,
    }
})


export default store;