import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages";
import AdminLeagues from "./pages/admin/leagues";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/:role/:id",
    element: <Home/>,
  },
  {
    path: "/:role/:id/leagues",
    element: <AdminLeagues/>,
  },
]);

export default function () {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
