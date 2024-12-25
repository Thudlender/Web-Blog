import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./Context/AuthContext.jsx";
import router from "./routers/router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </AuthProvider>
  </StrictMode>
);
