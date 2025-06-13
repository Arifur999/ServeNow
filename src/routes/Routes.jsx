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

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        hydrateFallbackElement:Spinner,
        loader: () => fetch("http://localhost:3000/posts/limited"),
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
