import React from 'react';
import { Sidebar, Navbar } from 'flowbite-react';
import { HiOutlineChartBar, HiOutlineUsers, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear tokens, user data)
    navigate('/'); // Redirect to home or login page after logout
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar className="lg:h-screen lg:w-64 bg-gray-800 text-white">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} to="/admindashboard/dashboardhome" icon={HiOutlineChartBar}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/admindashboard/products" icon={HiOutlineCog}>
              Manage Products
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/admindashboard/addproduct" icon={HiOutlineUsers}>
              Add Product
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/admindashboard/usermanagement" icon={HiOutlineUsers}>
              Manage Users
            </Sidebar.Item>
            <Sidebar.Item onClick={handleLogout} icon={HiOutlineLogout}>
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className="flex-1 p-6">
        {/* This is where the nested route components will render */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
