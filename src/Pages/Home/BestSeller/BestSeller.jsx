import React from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const products = [
    {
      name: "Men's Casual Shirt",
      image: "https://i.ibb.co/KNzNY7n/Men-Shirt2.jpg",
      price: "$45.99",
    },
    {
      name: "Men's Ripped Jeans",
      image: "https://i.ibb.co/VvDsJvg/men-Jeans2.png",
      price: "$55.00",
    },
    {
      name: "Women's Evening Gown",
      image: "https://i.ibb.co/d58nS8G/woman-Evening1.png",
      price: "$120.00",
    },
    {
      name: "Women's Skinny Jeans",
      image: "https://i.ibb.co/8j01s4x/woman-Skinny.png",
      price: "$55.00",
    },
  ];

  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-xl lg:text-3xl font-title uppercase tracking-wider font-bold mb-16">
        Our Best <span className="text-blue-700">Sellers</span>
      </h1>

      {/* Best Seller Showing Cards */}
      <div className="flex gap-8 w-11/12 mx-auto flex-col md:flex-row justify-between">
        {/* Left Column */}
        <div className=" w-full md:w-1/2 p-2">
          <img
            src="https://i.ibb.co.com/4grnrTj/fashonable-Men.png"
            alt="Fashion Men"
            className="w-full shadow-xl h-1/2 object-cover  mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.slice(0, 2).map((product, index) => (
              <Card key={index} className="!p-0 overflow-hidden mt-7 ">
                {/* Background Image */}
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-title font-bold">{product.name}</h3>
                  <p className="font-para text-lg text-blue-700">{product.price}</p>
                </div>
                <Link to='/shop'>
                <Button className="bg-blue-500 hover:!bg-blue-400 w-full">Buy now</Button>
                </Link>
                
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className=" w-full md:w-1/2 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.slice(2).map((product, index) => (
              <Card key={index} className="!p-0 overflow-hidden ">
                {/* Background Image */}
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-title font-bold">{product.name}</h3>
                  <p className="font-para text-lg text-blue-700">{product.price}</p>
                </div>
                <Link to='/shop'>
                <Button className="bg-blue-500 hover:!bg-blue-400 w-full">Buy now</Button>
                </Link>
              </Card>
            ))}
          </div>
          <img
            src="https://i.ibb.co.com/1mmH6VF/fashion-Women.jpg"
            alt="Fashion Men"
            className="w-full h-1/2 object-cover shadow-xl  mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
