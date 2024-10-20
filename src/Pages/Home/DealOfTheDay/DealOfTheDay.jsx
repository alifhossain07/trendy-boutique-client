import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DealOfTheDay = () => {
  const calculateTimeLeft = () => {
    const dealEndTime = new Date("2024-11-31T23:59:59").getTime(); // Set your deal end time here
    const now = new Date().getTime();
    const difference = dealEndTime - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row justify-center  items-center py-10 lg:py-20 px-4">
      <div className="flex flex-col space-y-5 items-center justi text-center lg:text-left lg:items-start">
        <h1 className="text-2xl lg:text-3xl font-title tracking-wider font-bold">
          Deal of the Day
        </h1>
        <p className="text-lg lg:text-xl tracking-wider font-para">
          Get 40% on All Items if you buy more than $200 worth of items
        </p>
        <div className="text-lg lg:text-2xl tracking-wider font-para mb-4 mt-6 lg:mt-10">
          Hurry up! Sale ends in:
        </div>

        <div className="flex space-x-2 lg:space-x-4 text-center">
          <div className="flex flex-col bg-blue-600 text-white p-2 lg:p-4 rounded-lg">
            <span className="text-3xl lg:text-4xl font-bold">
              {timeLeft.days || "00"}
            </span>
            <span className="text-sm lg:text-lg">Days</span>
          </div>

          <div className="flex flex-col bg-blue-600 text-white p-2 lg:p-4 rounded-lg">
            <span className="text-3xl lg:text-4xl font-bold">
              {timeLeft.hours || "00"}
            </span>
            <span className="text-sm lg:text-lg">Hours</span>
          </div>

          <div className="flex flex-col bg-blue-600 text-white p-2 lg:p-4 rounded-lg">
            <span className="text-3xl lg:text-4xl font-bold">
              {timeLeft.minutes || "00"}
            </span>
            <span className="text-sm lg:text-lg">Minutes</span>
          </div>

          <div className="flex flex-col bg-blue-600 text-white p-2 lg:p-4 rounded-lg">
            <span className="text-3xl lg:text-4xl font-bold">
              {timeLeft.seconds || "00"}
            </span>
            <span className="text-sm lg:text-lg">Seconds</span>
          </div>
        </div>

        <div className="mt-8 lg:mt-10">
          <Link to="/shop">
            <Button className="bg-blue-500 hover:!bg-blue-400 px-8 lg:px-10 mt-6 lg:mt-10 !text-lg lg:!text-xl">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-8 lg:mt-0">
        <img
          src="https://i.ibb.co.com/PD6GcvL/DOTD.png"
          alt=""
          className="w-64 lg:w-auto"
        />
      </div>
    </div>
  );
};

export default DealOfTheDay;
