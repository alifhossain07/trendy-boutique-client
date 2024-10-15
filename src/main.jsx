import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from "./Providers/CartContext";


// Create a new QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
      
        <RouterProvider router={routes}></RouterProvider>
        
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
