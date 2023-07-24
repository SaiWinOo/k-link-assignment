import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    products: [],
    last_page: null,
    current_page: 1,
    current_tag: 'all',
    tags: [],
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            if (action.payload.replace === true) {
                state.products = action.payload.products;
            } else {
                state.products = [...state.products, ...action.payload.products];
            }
        },
        setLastPage: (state, action) => {
            state.last_page = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.current_page = parseInt(action.payload);
        },
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setCurrentTag : (state, action) => {
            state.current_tag = action.payload;
        }
    }
})

export const {setProducts, setLastPage, setCurrentPage, setTags, setCurrentTag} = productSlice.actions;
export default productSlice.reducer;