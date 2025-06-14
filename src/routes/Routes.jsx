import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AddPost from "../pages/Home/AddPost";
import AllPosts from "../pages/Home/AllPosts";
import MyPosts from "../pages/Home/MyPosts";
import PostDetails from "../pages/Home/PostDetails";
import PrivateRoute from "../components/PrivateRoute";
import UpdatePost from "../pages/Home/UpdatePost";
import ErrorPage from "../components/ErrorPage";
import Spinner from "../components/Spinner";
import MyRequests from "../pages/Home/MyRequests";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        hydrateFallbackElement:Spinner,
        loader: () => fetch("https://assingment-11-server-iota.vercel.app/posts/limited"),
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/add-post",
        element: (
          <PrivateRoute>
            <AddPost></AddPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/posts/:id",
        element: (
          <PrivateRoute>
            <PostDetails></PostDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-post",
        Component: AllPosts,
      },
      {
        path: "/my-post",
        element: (
          <PrivateRoute>
            <MyPosts></MyPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-request",
        element: (
          <PrivateRoute>
            <MyRequests></MyRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-post/:id",
        element: (
          <PrivateRoute>
            <UpdatePost></UpdatePost>
          </PrivateRoute>
        ),
      },
      
    ],
  },
]);

export default router;
