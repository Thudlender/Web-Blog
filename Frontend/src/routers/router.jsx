import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Layout from "../components/Layout";
import Create from "../Pages/Create";
import Edit from "../Pages/Edit";
import PostDetail from "../Pages/PostDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "create", element: <Create /> },
      { path: "edit/:id", element: <Edit /> },
      { path: "post/:id", element: <PostDetail /> },
    ],
  },
]);
export default router;
