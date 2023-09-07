import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./pages/AppLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Playlist from "./pages/Playlist.jsx";

import "./styles/main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Index page</p>,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "playlist/:id",
        element: <Playlist />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
