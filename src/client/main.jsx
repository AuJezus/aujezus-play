import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./pages/AppLayout.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Playlist from "./pages/Playlist.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles/main.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Spinner from "./ui/Spinner.jsx";

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
        index: true,
        // path: "",
        element: <Navigate replace to="playlist/123" />,
      },
      {
        path: "playlist/:id",
        element: <Playlist />,
      },
    ],
  },
]);

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
