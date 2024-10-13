
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Shared/Login/Login";
import Register from "../Shared/Register/Register";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Shop from "../Pages/Shop/Shop";



const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,       
      },
      {
        path: "/login",
        element: <Login></Login>,       
      },
      {
        path: "/register",
        element: <Register></Register>,       
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,       
      },
      {
        path: "/shop",
        element: <Shop></Shop>,       
      },
      
    ]
      
  },
]);

export default routes;
