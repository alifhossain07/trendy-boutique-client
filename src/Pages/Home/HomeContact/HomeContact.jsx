import React from 'react';
import { FaClock, FaMapMarkedAlt, FaMobile } from 'react-icons/fa';

const HomeContact = () => {
  return (
    <div className="w-full mx-auto py-14 px-6 bg-gray-100 rounded-lg mt-20 mb-20">
      <div className="flex flex-col md:flex-row justify-around items-center gap-12">
        {/* Open Hours */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-14 h-14  bg-blue-700 text-white">
            <FaClock className="text-2xl md:text-3xl" />
          </div>
          <div className="text-gray-900 space-y-2">
            <p className="text-lg font-title tracking-wider">Open Saturday-Friday</p>
            <h3 className="text-xl font-para md:text-2xl font-semibold">
              10:00am - 11:30pm
            </h3>
          </div>
        </div>

        {/* Contact Number */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-14 h-14  bg-blue-700 text-white">
            <FaMobile className="text-2xl md:text-3xl" />
          </div>
          <div className="text-gray-900 space-y-2">
            <p className="text-lg font-title tracking-wider">Wanna know more?</p>
            <h3 className="text-xl font-para md:text-2xl font-semibold">
              +880 454 345 2345
            </h3>
          </div>
        </div>

        {/* Shop Address */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-14 h-14  bg-blue-700 text-white">
            <FaMapMarkedAlt className="text-2xl md:text-3xl" />
          </div>
          <div className="text-gray-900 space-y-2">
            <p className="text-lg font-title tracking-wider">Visit Our Shop</p>
            <h3 className="text-xl font-para md:text-2xl font-semibold">
              Uttara, Dhaka-1230
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
