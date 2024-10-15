import { Navbar } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const HomeDashboard = () => {
    return (
        <div>
        <div
        className="relative lg:h-[20rem] text-white py-1 lg:px-16 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://i.ibb.co.com/XL1fLXm/about-Us-Trendy.png')",
        }}
      >
        <div className="lg:max-w-5xl mx-auto lg:mt-14 p-10 rounded-lg">
          <h1 className="text-3xl lg:text-5xl uppercase font-title tracking-wider text-white font-bold lg:leading-tight">
           Trendy <span className="text-blue-400">Boutique</span>
          </h1>
          <p className="text-lg lg:text-2xl font-para tracking-wider mt-6 max-w-3xl mx-auto">
            ADMIN PANEL
          </p>
        </div>
      </div>
        <div className="flex-1 p-6">
        

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Welcome, Admin!</h2>
          <p className="mt-2 text-gray-600">Manage your products and users from here.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* Card for Products */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-2xl font-bold">120</p>
              <Link to="/admindashboard/products" className="mt-2 inline-block text-blue-600">Manage Products</Link>
            </div>

            {/* Card for Users */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">45</p>
              <Link to="/admindashboard/users" className="mt-2 inline-block text-blue-600">Manage Users</Link>
            </div>

            {/* Card for Statistics or other functionality */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Site Statistics</h3>
              <p className="text-2xl font-bold">Analytics here</p>
              <Link to="/admindashboard/statistics" className="mt-2 inline-block text-blue-600">View Stats</Link>
            </div>
            
          </div>
        </div>
      </div>
        </div>
    );
};

export default HomeDashboard;