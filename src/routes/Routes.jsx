import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
        }
    ]
  },    
]);
export default router