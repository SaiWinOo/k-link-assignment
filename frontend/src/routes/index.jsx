import {createBrowserRouter} from "react-router-dom";
import Login from "../Pages/Login.jsx";
import App from "../App.jsx";
import Home from "../Pages/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>
            }
        ],
    },
])

export default router;