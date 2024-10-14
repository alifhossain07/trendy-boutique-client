import React, { useState, useContext } from "react";
import { Avatar, Dropdown, Navbar, Button, Drawer } from "flowbite-react"; // Import Drawer
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { AuthContext } from "./../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false); // State for the cart drawer
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false); // State for the wishlist drawer

  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to sign out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sign me out!',
      cancelButtonText: 'No, keep me signed in'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            console.log("User signed out");
            Swal.fire(
              'Signed Out!',
              'You have been successfully signed out.',
              'success'
            );
            navigate("/");
          })
          .catch((error) => {
            console.error("Sign-Out Error:", error);
          });
      }
    });
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const handleCartDrawerToggle = () => {
    setIsCartDrawerOpen((prev) => !prev); // Toggle cart drawer state
  };

  const handleWishlistDrawerToggle = () => {
    setIsWishlistDrawerOpen((prev) => !prev); // Toggle wishlist drawer state
  };

  return (
    <div className="shadow-xl fixed w-full z-50">
      <Navbar fluid rounded>
        <Navbar.Brand className="flex items-center font-title" href="https://github.com/alifhossain07">
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

          <button onClick={handleCartDrawerToggle} className="relative bg-white flex items-center px-2 py-2 text-black mr-3 lg:mr-8">
            <AiOutlineShoppingCart className="text-3xl" />
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-black rounded-full">
              +98
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
                <Link to="/dashboard">
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>
                <Link to="/settings">
                  <Dropdown.Item>Settings</Dropdown.Item>
                </Link>
                <Link to="/earnings">
                  <Dropdown.Item>Earnings</Dropdown.Item>
                </Link>
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
        <Drawer.Header title="Your Cart" />
        <Drawer.Items>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Your shopping cart items go here.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {/* Sample cart item, replace with dynamic data later */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-semibold">Cart Item Name</h3>
              <p>Price: $XX.XX</p>
              <Button onClick={() => alert("Item removed!")}>Remove</Button>
            </div>
            {/* Add more cart items as needed */}
          </div>
        </Drawer.Items>
      </Drawer>

      {/* Wishlist Drawer Implementation */}
      <Drawer open={isWishlistDrawerOpen} onClose={handleWishlistDrawerToggle} position="right">
        <Drawer.Header title="Your Wishlist" />
        <Drawer.Items>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Your wishlist items go here.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {/* Sample wishlist item, replace with dynamic data later */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-semibold">Wishlist Item Name</h3>
              <p>Price: $XX.XX</p>
              <Button onClick={() => alert("Item removed!")}>Remove</Button>
            </div>
            {/* Add more wishlist items as needed */}
          </div>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default Header;
