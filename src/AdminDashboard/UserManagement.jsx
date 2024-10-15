import React from 'react';

const UserManagement = () => {
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
            User Management
          </p>
        </div>
      </div>
            This is User Management
        </div>
    );
};

export default UserManagement;