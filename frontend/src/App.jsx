import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setToken, setUser} from "./store/auth/authSlice.js";
import axios from "axios";
import {useEffect} from "react";

const App = () => {
    axios.defaults.baseURL = 'https://coireader.linmathematics.com/api/';
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(()=> {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    },[user]);

    useEffect(()=> {
        if(localStorage.getItem('token') && localStorage.getItem('user')){
            dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
            dispatch(setToken(localStorage.getItem('token')));
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
    },[])

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default App;