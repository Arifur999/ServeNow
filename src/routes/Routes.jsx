import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AddPost from "../pages/Home/AddPost";
import AllPosts from "../pages/Home/AllPosts";
import MyPosts from "../pages/Home/MyPosts";
import PostDetails from "../pages/Home/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
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
        Component: AddPost,
      },
      {
        path: "/posts/:id",
        Component: PostDetails,
      },
      {
        path: "/all-post",
        Component: AllPosts,
      },
      {
        path: "/my-post",
        Component: MyPosts,
      },
    ],
  },
]);

export default router;
