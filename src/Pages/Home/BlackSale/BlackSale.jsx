import React, { useState, useEffect } from "react";
import axios from 'axios';



const BlackSale = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        // Fetch products from the API
        axios
          .get("http://localhost:5000/products")
          .then((response) => {
            setProducts(response.data); // Assuming response.data is an array of products
          })
          .catch((error) => {
            console.error("Error fetching the products:", error);
          });
      }, []);
    
      // Pick the first two products from the fetched data
      const featuredProducts = products.slice(12, 14);
    
      return (
        <div className="flex w-10/12 h-[700px] mx-auto flex-col md:flex-row gap-4 py-12 px-6">
          {/* Black Sale Div */}
          <div className="flex-1 bg-black text-white flex flex-col justify-center items-center p-10">
            <h2 className="text-3xl font-bold mb-16">Black Sale Going On!</h2>
            <button className="bg-white text-black hover:bg-blue-400 px-6 py-2 font-semibold rounded">
              Shop Now
            </button>
          </div>
    
          {/* Featured Products */}
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="flex-1 bg-gray-200 shadow-lg p-6 flex-grow rounded-lg"
            >
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-80 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold font-title tracking-wider mb-2">{product.productName}</h3>
              <p className="text-gray-600 font-para mb-10 flex-grow">{product.details}</p>
              <div className="flex justify-between text-xl items-center">
                <span className="text-black font-bold">${product.price}</span>
                <span className="bg-black text-white px-2 py-1  rounded">
                  {product.discount} Off
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    };

export default BlackSale;