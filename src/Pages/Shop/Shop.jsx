import React, { useEffect, useState } from "react";
import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
        // Get unique categories and subcategories
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        const uniqueSubcategories = [...new Set(response.data.map(product => product.subcategory))];
        setCategories(uniqueCategories);
        setSubcategories(uniqueSubcategories);
        setFilteredProducts(response.data); // Initialize with all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category and subcategory
  const handleCategoryChange = (category) => {
    if (category === "All Products") {
      setSelectedCategory("");
      setSelectedSubcategory("");
      setFilteredProducts(products); // Show all products
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory("");
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setFilteredProducts(products.filter(product => product.subcategory === subcategory));
  };

  return (
    <div>
      {/* Introduction Section */}
      <div
        className="relative lg:h-[34rem] text-white py-20 lg:px-16 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://i.ibb.co.com/0XFzk1S/shop-Banner-11zon.png')",
        }}
      >
        <div className="lg:max-w-5xl mx-auto lg:mt-14 p-10 rounded-lg">
          <h1 className="text-3xl lg:text-5xl uppercase font-title tracking-wider text-white font-bold lg:leading-tight">
            Get Your Desired <span className="text-blue-400">Attire</span>
          </h1>
          <p className="text-lg lg:text-2xl font-para tracking-wider mt-6 max-w-3xl mx-auto">
            Dedicated to providing the best in men’s and women’s clothing and
            accessories.
          </p>
        </div>
      </div>

      {/* Shopping Section */}
      <div className="flex w-11/12 mx-auto py-20">
        {/* Filter Section */}
        <div className="border border-gray-500 w-1/4 p-4">
          <h2 className="font-title text-2xl mb-4">Categories</h2>
          <div className="flex flex-col mb-4">
            <button
              onClick={() => handleCategoryChange("All Products")}
              className="py-2 px-4 text-left hover:bg-gray-200"
            >
              All Products
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category)}
                className="py-2 px-4 text-left hover:bg-gray-200"
              >
                {category}
              </button>
            ))}
          </div>
          <h2 className="font-title text-2xl mb-4">Subcategories</h2>
          <div className="flex flex-col mb-4">
            {subcategories.map((subcategory, index) => (
              <button
                key={index}
                onClick={() => handleSubcategoryChange(subcategory)}
                className="py-2 px-4 text-left hover:bg-gray-200"
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="border w-9/12 border-gray-500 p-4">
          <h2 className="font-title text-2xl mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(selectedCategory || selectedSubcategory ? filteredProducts : products).map((product, index) => (
              <div key={index} className="border p-4 rounded-md shadow-md">
                <img src={product.image} alt={product.productName} className="h-40 object-cover rounded-md mb-2" />
                <h3 className="font-title text-lg">{product.productName}</h3>
                <p className="font-para">Price: ${product.price}</p>
                <p className="font-para">Discount: {product.discount}</p>
                <p className="font-para">Rating: {product.rating}</p>
                <p className="font-para">{product.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
