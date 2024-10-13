import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";

const DealOfTheDay = () => {
  const calculateTimeLeft = () => {
    const dealEndTime = new Date("2024-10-31T23:59:59").getTime(); // Set your deal end time here
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

    <div className="bg-gray-100 flex justify-center gap-20 items-center py-20">
    <div className=" flex flex-col space-y-5 items-center ">
      <h1 className="text-3xl font-title tracking-wider font-bold ">Deal of the Day</h1>
      <p className="text-xl tracking-wider font-para">Get 40% on All Items if you buy more than $200 worth items</p>
      <div className="text-2xl tracking-wider font-para mb-4 mt-10 py-5">
        Hurry up! Sale ends in:
      </div>

      <div className="flex space-x-4 text-center">
        <div className="flex flex-col bg-blue-600 text-white p-4 rounded-lg">
          <span className="text-4xl font-bold">{timeLeft.days || "00"}</span>
          <span className="text-lg">Days</span>
        </div>

        <div className="flex flex-col bg-blue-600 text-white p-4 rounded-lg">
          <span className="text-4xl font-bold">{timeLeft.hours || "00"}</span>
          <span className="text-lg">Hours</span>
        </div>

        <div className="flex flex-col bg-blue-600 text-white p-4 rounded-lg">
          <span className="text-4xl font-bold">{timeLeft.minutes || "00"}</span>
          <span className="text-lg">Minutes</span>
        </div>

        <div className="flex flex-col bg-blue-600 text-white p-4 rounded-lg">
          <span className="text-4xl font-bold">{timeLeft.seconds || "00"}</span>
          <span className="text-lg">Seconds</span>
        </div>
      </div>

      <div className="mt-10">
      <Button className="bg-blue-500 hover:!bg-blue-400 px-10 mt-10 !text-xl">Shop Now</Button>
      </div>
    </div>
        <div>
            <img src="https://i.ibb.co.com/PD6GcvL/DOTD.png" alt="" />
        </div>
    </div>
    
  );
};

export default DealOfTheDay;
