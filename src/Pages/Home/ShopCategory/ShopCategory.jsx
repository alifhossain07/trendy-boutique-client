import React from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const ShopCategory = () => {
  const categories = [
    {
      name: "Men's Clothing",
      image: "https://i.ibb.co/kgDsdBn/mclothing.jpg",
    },
    {
      name: "Women's Clothing",
      image: "https://i.ibb.co/xLLqKnP/wclothing.jpg",
    },
    {
      name: "Accessories",
      image: "https://i.ibb.co/nfxLypR/accessori.png",
    },
  ];

  return (
    <div className="w-11/12 mx-auto py-20">
      <h1 className="text-2xl lg:text-3xl font-title uppercase tracking-wider font-bold">
        Shop By <span className="text-blue-700">Categories</span>
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {categories.map((category, index) => (
          <div key={index} className="relative group">
            <Card className="!p-0 overflow-hidden h-[600px] rounded-lg">
              {/* Background Image */}
              <div
                className="absolute inset-0 z-0 w-full h-full bg-cover bg-center object-cover"
                style={{
                  backgroundImage: `url(${category.image})`,
                }}
              />

              {/* Bottom to Middle Black Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 transition-opacity duration-500"></div>

              {/* Content (Bottom-Centered) */}
              <div className="absolute bottom-0 z-10 flex flex-col items-center justify-center text-white text-center p-5 pr-16 mx-auto w-full">
                <h3 className=" font-title tracking-wider text-2xl font-bold mb-4 z-20">{category.name}</h3>
                <Link to='/shop'><Button
                  
                  className="bg-white text-black hover:!bg-blue-300 z-20"
                >
                  Shop Now
                </Button></Link>
                
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
