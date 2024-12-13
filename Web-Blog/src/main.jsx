import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from "./routers/router";
import { RouterProvider } from 'react-router';
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./Context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>
);
