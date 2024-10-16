import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Shared/Login/Login";
import Register from "../Shared/Register/Register";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Shop from "../Pages/Shop/Shop";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import ProductsManagement from './../AdminDashboard/ProductsManagement';
import HomeDashboard from './../AdminDashboard/HomeDashboard';
import UserManagement from './../AdminDashboard/UserManagement';
import AddProduct from "../AdminDashboard/AddProduct";
import Checkout from "../Pages/Checkout/Checkout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
    ],
  },
  {
    path: "/admindashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "products", // Relative path for products management
        element: <ProductsManagement />,
      },
      {
        path: "dashboardhome", // Relative path for home dashboard
        element: <HomeDashboard />,
      },
      {
        path: "usermanagement", // Relative path for home dashboard
        element: <UserManagement></UserManagement>,
      },
      {
        path: "addproduct", // Relative path for home dashboard
        element: <AddProduct></AddProduct>,
      },
      // Add other nested routes here as needed
    ],
  },
]);

export default routes;
