import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null,
};

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser : (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        setToken: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.token = action.payload;
        }
    }
})



export const { setUser, setToken} = userSlice.actions;

export default userSlice.reducer;