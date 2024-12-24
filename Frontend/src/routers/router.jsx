import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../../../Web-Blog/src/pages/Register";
import Layout from "../Layouts/Layout";
import App from "../App";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: "", element: <Home />},
            { path: "login", element: <Login />},
            { path: "register", element: <Register />},
            { path: "app", element: <App />},
        ],
    },
]);
export default router;