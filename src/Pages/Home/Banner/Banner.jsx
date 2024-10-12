import React from 'react';
import { Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className=" mb-10">
      <div className="h-[650px]">
        <Carousel slideInterval={5000}  >
          {/* Slide 1 */}
          <div className="relative h-full">
            {/* Background Image */}
            <img
              src="https://i.ibb.co.com/ystyGHM/menB.png"
              alt="Banner 1"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
           
          </div>

          {/* Slide 2 */}
          <div className="relative h-full">
            <img
              src="https://i.ibb.co.com/82FnqXc/womenB.png"
              alt="Banner 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
           
          </div>

          {/* Slide 3 */}
          <div className="relative h-full">
            <img
              src="https://i.ibb.co.com/n75ddGV/accessories-B.png"
              alt="Banner 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            
          </div>
        </Carousel>
      </div>
    </div>
    );
};

export default Banner;