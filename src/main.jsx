import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";




createRoot(document.getElementById("root")).render(
  <StrictMode>
   
      <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>

      </AuthProvider>
        
      
   
  </StrictMode>
);