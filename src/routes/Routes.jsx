import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AddPost from "../pages/Home/AddPost";
import AllPosts from "../pages/Home/AllPosts";
import MyPosts from "../pages/Home/MyPosts";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
            path:"/login",
            Component:Login,
        },
        {
            path:"/register",
            Component:Register,
        },
        {
            path:"/add-post",
            Component:AddPost,
        },
        {
            path:"/all-post",
            Component:AllPosts,
        },
        {
            path:"/my-post",
            Component:MyPosts,
        },
    ]
  },    
]);
export default router