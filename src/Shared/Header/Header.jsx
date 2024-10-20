import React, { useState, useEffect, useContext } from "react";
import { Avatar, Dropdown, Navbar, Button, Drawer } from "flowbite-react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { AuthContext } from "./../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Header = () => {
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  
 
  // Fetch cart items using TanStack Query
  const {
    data: cartItems = [],
    refetch: refetchCart,
    error: cartError,
  } = useQuery({
    queryKey: ["cartItems", user?.email], // Unique key for the query
    queryFn: async () => {
      if (user?.email) {
        const response = await axios.get("http://localhost:5000/cart", {
          params: { userEmail: user.email },
        });
        return response.data;
      }
      return []; // Return an empty array if the user is not logged in
    },
    enabled: !!user, // Only run the query if the user is logged in
  });
  useEffect(() => {
    if (cartItems.length > 0) {
      const initialQuantities = cartItems.reduce((acc, item) => {
        acc[item._id] = item.quantity || 1; // Initialize quantity for each item
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cartItems]);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => {
    const quantity = quantities[item._id] || 1;
    return acc + item.price * quantity;
  }, 0);

  // Handle increasing the quantity
  const handleIncreaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  // Handle decreasing the quantity
  const handleDecreaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(prev[productId] - 1, 1), // Ensure quantity doesn't go below 1
    }));
  };
  // Fetch wishlist items using TanStack Query
  const {
    data: wishlistItems = [],
    refetch,
    error: wishlistError,
  } = useQuery({
    queryKey: ["wishlistItems", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const response = await axios.get("http://localhost:5000/wishlist", {
          params: { userEmail: user.email },
        });
        return response.data;
      }
      return []; // Return an empty array if the user is not logged in
    },
    enabled: !!user, // Only run the query if the user is logged in
  });

  useEffect(() => {
    if (cartError) {
      console.error("Error fetching cart items:", cartError);
    }
    if (wishlistError) {
      console.error("Error fetching wishlist items:", wishlistError);
    }
  }, [cartError, wishlistError]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/cart", {
        params: { userEmail: user.email, productId: productId },
      });
      refetchCart(); // Refetch cart items after removal
      Swal.fire("Removed!", "Item removed from cart.", "success");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      Swal.fire("Error", "Could not remove the item from cart.", "error");
    }
  };
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/wishlist", {
        params: { userEmail: user.email, productId: productId },
      });
      refetchWishlist(); // Refetch wishlist items after removal
      Swal.fire("Removed!", "Item removed from wishlist.", "success");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      Swal.fire("Error", "Could not remove the item from wishlist.", "error");
    }
  };

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
      cancelButtonText: "No, keep me signed in",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            console.log("User signed out");
            Swal.fire(
              "Signed Out!",
              "You have been successfully signed out.",
              "success"
            );
            navigate("/");
          })
          .catch((error) => {
            console.error("Sign-Out Error:", error);
          });
      }
    });
  };

  const handleProceedToCheckout = () => {

    const checkoutData = {
      totalPrice,
      quantities,
    };
    navigate('/checkout',  { state: checkoutData});
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const handleCartDrawerToggle = () => {
    setIsCartDrawerOpen((prev) => !prev);
    refetchCart(); // Refetch cart items when the drawer is opened
  };

  const handleWishlistDrawerToggle = () => {
    setIsWishlistDrawerOpen((prev) => !prev);
    refetchWishlist(); // Refetch wishlist items when the drawer is opened
  };

  return (
    <div className="shadow-xl fixed w-full z-50">
      <Navbar fluid rounded>
        <Navbar.Brand
          className="flex items-center font-title"
          
        >
          <img
            src="https://i.ibb.co/drCQPSv/mlogo1.png"
            className="mr-10 text-center mb-4 w-36"
            alt="Flowbite React Logo"
          />
          <Navbar.Collapse className="md:flex md:space-x-4">
            <Link to="/">Home</Link>
            <Link to="/aboutus">About</Link>
            <Link to="/shop">Shop</Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar.Brand>

        <div className="flex items-center md:order-2">
          {/* Search Bar for Larger Screens */}
          <div className="relative lg:mr-6 hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:border-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaSearch className="text-lg" />
            </div>
          </div>

          {/* Search Button for Small Screens */}
          <Dropdown
            className="mt-4 ml-36"
            arrowIcon={false}
            inline
            label={
              <button>
                <IoSearch className="text-2xl mr-4 lg:hidden" />
              </button>
            }
          >
            <Dropdown.Item>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg py-2 pl-3 pr-3 w-full focus:outline-none focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Dropdown.Item>
          </Dropdown>

          {/* Wishlist and Cart */}
          <button onClick={handleWishlistDrawerToggle}>
            <FaRegHeart className="mr-3 text-2xl lg:mr-6" />
          </button>

          <button
            onClick={handleCartDrawerToggle}
            className="relative bg-white flex items-center px-2 py-2 text-black mr-3 lg:mr-8"
          >
            <AiOutlineShoppingCart className="text-3xl" />
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-black rounded-full">
              {cartItems.length} {/* Show the number of items in the cart */}
            </span>
          </button>

          {/* User Authentication Dropdown */}
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                className=""
                alt="User settings"
                img={user?.photoURL || "https://i.ibb.co/KyWtrr4/avatar.jpg"}
                rounded
              />
            }
          >
            {user ? (
              <>
                <Dropdown.Header>
                  <span className="block text-sm">{user.displayName}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>
                {user.email === "alifhossain56782@gmail.com" && (
        <Link to="/admindashboard/dashboardhome">
          <Dropdown.Item>Dashboard</Dropdown.Item>
        </Link>
      )}  
                <div className="lg:hidden md:hidden">
                <Link to="/">
                  <Dropdown.Item>Home</Dropdown.Item>
                </Link>
                <Link to="/aboutus">
                  <Dropdown.Item>About</Dropdown.Item>
                </Link>
                <Link to="/shop">
                  <Dropdown.Item>Shop</Dropdown.Item>
                </Link>
                </div>

                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Dropdown.Item>Login</Dropdown.Item>
                </Link>
                <Link to="/register">
                  <Dropdown.Item>Register</Dropdown.Item>
                </Link>
              </>
            )}
          </Dropdown>
        </div>
      </Navbar>

      {/* Cart Drawer Implementation */}
      <Drawer open={isCartDrawerOpen} onClose={handleCartDrawerToggle} position="right">
  <div className="flex flex-col h-full">
    {/* Fixed header with title */}
    <Drawer.Header title="Your Cart" className="bg-white" />

    {/* Scrollable items area */}
    <div className="flex-1 overflow-auto px-4">
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Your shopping cart items go here.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="rounded-lg border border-gray-200 space-y-2 bg-white p-4"
            >
              <img className="h-32" src={item.image} alt="" />
              <h3 className="font-semibold">{item.productName}</h3>
              <p>Price: ${item.price}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecreaseQuantity(item._id)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{quantities[item._id]}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item._id)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
              <Button className="bg-blue-700 hover:!bg-blue-500" onClick={() => handleRemoveFromCart(item._id)}>
                Remove
              </Button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>

    {/* Fixed total price and checkout section */}
    <div className="border-t p-4 bg-white sticky bottom-0 w-full">
      <h3 className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
      <Button
        onClick={handleProceedToCheckout}
        className="mt-4 bg-green-600 hover:bg-green-500 w-full"
      >
        Proceed to Checkout
      </Button>
    </div>
  </div>
</Drawer>



      {/* Wishlist Drawer Implementation */}
      <Drawer
        open={isWishlistDrawerOpen}
        onClose={handleWishlistDrawerToggle}
        position="right"
      >
        <Drawer.Header title="Your Wishlist" />
        <Drawer.Items>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Your wishlist items go here.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <div
                  key={item._id}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <h3 className="font-semibold">{item.productName}</h3>
                  <Button onClick={() => handleRemoveFromWishlist(item._id)}>
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p>Your wishlist is empty.</p>
            )}
          </div>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default Header;
