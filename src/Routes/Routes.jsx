import Add from "../pages/Add";
import Edit from "../pages/Edit";
import RootLayout from "../pages/RootLayout";
import Details from "../pages/Details";
import Home from "../pages/Home";
import NotFound from "../pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "post", element: <Home /> },
      { path: "post/add", element: <Add /> },
      { path: "post/:id/edit", element: <Edit /> },
      {
        path: "post/:id",
        element: <Details />,
        loader: ({ params }) => {
          if (isNaN(params.id)) {
            throw new Response("Bad Request", {
              statusText: "Please make sure to insert the correct post id",
              status: 400,
            });
          }
        },
      },
    ],
  },
]);
