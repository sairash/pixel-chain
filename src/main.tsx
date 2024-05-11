import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SecondPage from "./pages/SecondPage.tsx";
import ScanQrPage from "./pages/ScanQrPage.tsx";
import IndEvents from "./pages/IndEvents.tsx";
import GenerateQr from "./pages/GenerateQr.tsx";
import Camera from "./pages/Camera.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/events", element: <SecondPage /> },
  { path: "/events/:id", element: <IndEvents /> },
  { path: "scan", element: <ScanQrPage /> },
  { path: "/generateQr", element: <GenerateQr /> },
  { path: "/camera", element: <Camera /> },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
