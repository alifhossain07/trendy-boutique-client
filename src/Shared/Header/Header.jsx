import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button } from "flowbite-react";
import { FaRegHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="p-2 shadow-xl">
      <Navbar fluid rounded>
        <Navbar.Brand className="flex items-center font-title" href="https://flowbite-react.com">
          <img
            src="https://i.ibb.co/drCQPSv/mlogo1.png"
            className="mr-10 mb-4 w-36 "
            alt="Flowbite React Logo"
          />
          <Navbar.Collapse className="md:flex md:space-x-4">
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar.Brand>
        <div className="flex items-center md:order-2">
        <div className="relative mr-6">
            <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:border-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaSearch className="text-lg" />
            </div>
        </div>
        <button>
        <FaRegHeart className="text-2xl mr-8" />
        </button>
        
        
        <button className="relative bg-white flex items-center px-2 py-2   text-black mr-8">
            <AiOutlineShoppingCart className="text-3xl" />
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-black rounded-full">
                +99
            </span>
        </button>
        

          
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
              className=""
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
