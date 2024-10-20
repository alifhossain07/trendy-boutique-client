import React from "react";
import { Carousel } from "flowbite-react";

const Banner = () => {
  return (
    <div className="mb-10">
      <div className="lg:h-[650px]">
        <Carousel
          slideInterval={5000}
          theme={{
            root: {
              base: "relative lg:h-full w-full",
              leftControl:
                "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
              rightControl:
                "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
            },
            indicators: {
              active: {
                off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
                on: "bg-blue-500 dark:bg-gray-800",
              },
              base: "h-3 w-3 rounded-full",
              wrapper:
                "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
            },
            item: {
              base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
              wrapper: {
                off: "w-full flex-shrink-0 transform cursor-default snap-center",
                on: "w-full flex-shrink-0 transform cursor-grab snap-center",
              },
            },
            control: {
              base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-700 group-focus:outline-none group-focus:ring-4 group-focus:ring-blue-300 sm:h-10 sm:w-10", // Make the control buttons blue
              icon: "h-5 w-5 text-white sm:h-6 sm:w-6",
            },
            scrollContainer: {
              base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
              snap: "snap-x",
            },
          }}
        >
          {/* Slide 1 */}
          <div className="relative lg:h-full">
            <img
              src="https://i.ibb.co.com/ystyGHM/menB.png"
              alt="Banner 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>

          {/* Slide 2 */}
          <div className="relative lg:h-full">
            <img
              src="https://i.ibb.co.com/82FnqXc/womenB.png"
              alt="Banner 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>

          {/* Slide 3 */}
          <div className="relative lg:h-full">
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
