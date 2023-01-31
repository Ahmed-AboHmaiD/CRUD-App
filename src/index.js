import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Add from "./pages/Add";
import Edit from "./pages/Edit";
import RootLayout from "./pages/RootLayout";
import Details from "./pages/Details";
import Home from "./pages/Home";
import NotFound from "./pages/ErrorPage";

const router = createBrowserRouter([
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
        path: "post/:id/details",
        element: <Details />,
        loader: ({ params }) => {
          if (isNaN(params.id)) {
            throw new Response("Bad Request", { statusText:"Please make sure to insert the correct post id", status: 400 });
          }
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
