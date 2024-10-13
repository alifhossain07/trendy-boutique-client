import React from "react";
import Marquee from "react-fast-marquee";
import { Card } from "flowbite-react";

const testimonials = [
  {
    name: "Ethan Mitchell",
    position: "Fashion Blogger",
    testimony:
      "Classy Boutique offers the best styles for modern men. The quality and fit of their clothing are unmatched.",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sophia Taylor",
    position: "Stylist at Fashion Forward",
    testimony:
      "Their women's collection is simply stunning. I recommend it to all my clients for the latest trends in fashion.",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Liam Johnson",
    position: "Retail Expert",
    testimony:
      "Their accessories are a game-changer! The perfect mix of style and functionality.",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Olivia Brown",
    position: "Influencer",
    testimony:
      "I can't stop talking about their elegant dresses. Perfect for every occasion!",
    image: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Michael Wilson",
    position: "Men's Fashion Enthusiast",
    testimony:
      "The quality of men's shirts and trousers from this store is remarkable. Top-notch designs!",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Emma Thompson",
    position: "CEO of Trendsetters Inc.",
    testimony:
      "Amazing accessories collection that complements every outfit perfectly. Highly recommended!",
    image: "https://i.pravatar.cc/100?img=6",
  },
];

const Testimonial = () => {
  return (
    <div className="w-11/12 mx-auto py-20">
      <h1 className="text-3xl font-title tracking-wider font-bold mb-20">
        What Our <span className="text-blue-600">Clients</span> Say
      </h1>

      {/* Marquee Slider */}
      <Marquee speed={60} pauseOnHover={false} gradient={true} gradientWidth={100}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-96 mx-2"> {/* Reduced horizontal margin */}
            <Card className="shadow-lg p-10 h-80 flex flex-col justify-between"> {/* Set fixed height */}
              <div className="flex flex-col flex-grow "> {/* Center alignment */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 shadow-md"
                />
                <p className=" font-para mb-4 text-gray-700 flex-grow"> {/* Added flex-grow for even spacing */}
                  "{testimonial.testimony}"
                </p>
              </div>
              <div className="">
                <h3 className="font-title font-bold text-lg">{testimonial.name}</h3>
                <span className="font-para text-blue-700">{testimonial.position}</span>
              </div>
            </Card>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Testimonial;
