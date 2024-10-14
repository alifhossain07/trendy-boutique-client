import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "flowbite-react"; // Import Flowbite modal and button
import 'flowbite'; // Ensure Flowbite is imported
import { AuthContext } from "../../Providers/AuthProvider";


const Shop = () => {
    const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isStockFilter, setIsStockFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
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

  // Filter products based on selected filters
  const applyFilters = () => {
    let filtered = products;

    // Category Filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Subcategory Filter
    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    // Price Filter
    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Stock Filter
    if (isStockFilter) {
      filtered = filtered.filter(product => isStockFilter === "in" ? product.isStock : !product.isStock);
    }

    // Apply sorting based on selected sort order
    if (sortOrder === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "alphabetical") {
      filtered.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    setFilteredProducts(filtered);
  };

  // Call `applyFilters` whenever a filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedSubcategory, priceRange, isStockFilter, sortOrder]);

  // Handle modal opening
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  // Handle clicking on "All Products"
  const showAllProducts = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setIsStockFilter(""); // Reset stock filter to show all products regardless of stock status
  };

  const addToCart = async (product) => {
    if (!user || !user.email) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/cart", {
        productName: product.productName,
        price: product.price,
        image: product.image,
        userEmail: user.email, // Pass the user's email
      });
      console.log("Item added to cart:", response.data);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
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
        <div className=" bg-gray-100  w-1/4 p-4">
          <h2 className="font-title text-2xl mb-4">Categories</h2>
          <div className="flex flex-col mb-4">
            <button
              onClick={showAllProducts}
              className="py-2 px-4 font-para tracking-wider text-left hover:bg-gray-200"
            >
              All Products
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className="py-2 px-4 font-para tracking-wider text-left hover:bg-gray-200"
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
                onClick={() => setSelectedSubcategory(subcategory)}
                className="py-2 px-4 font-para tracking-wider text-left hover:bg-gray-200"
              >
                {subcategory}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <h2 className="font-title text-2xl mb-4">Price</h2>
          <div className="flex flex-col mb-4">
            <label className="font-para tracking-wider">Min Price: ${priceRange.min}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="mb-4"
            />
            <label className="font-para tracking-wider">Max Price: ${priceRange.max}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="mb-4"
            />
          </div>

          {/* Stock Availability Filter */}
          <h2 className="font-title text-2xl mb-4">Availability</h2>
          <div className="flex flex-col mb-4">
            <button
              onClick={() => setIsStockFilter("in")}
              className={`py-2 px-4 font-para tracking-wider text-left ${isStockFilter === "in" ? "bg-gray-300" : ""} hover:bg-gray-200`}
            >
              In Stock
            </button>
            <button
              onClick={() => setIsStockFilter("out")}
              className={`py-2 px-4 font-para tracking-wider text-left ${isStockFilter === "out" ? "bg-gray-300" : ""} hover:bg-gray-200`}
            >
              Out of Stock
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className=" w-9/12 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-title text-2xl">Products</h2>
            {/* Sorting Dropdown */}
            <select
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="alphabetical">Alphabetical: A-Z</option>
            </select>
          </div>

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
            {filteredProducts.map((product, index) => (
              <div key={index} className="border p-4 rounded-md shadow-md relative">
                {product.isDiscount && (
                  <span className="absolute top-2 right-2  bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    {product.discount}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.productName}
                  className="h-60 w-full object-cover rounded-md mb-2"
                />
                <h3 className="font-title text-lg">{product.productName}</h3>
                <p className="font-para text-lg font-semibold">Price: ${product.price}</p>
                <button
                  onClick={() => openProductModal(product)} // Open the modal with the selected product
                  className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 font-para"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <Modal dismissible show={openModal} onClose={closeModal}>
          <Modal.Header className="font-title">{selectedProduct.productName}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.productName}
                className="h-5/6 w-full object-cover rounded-md mb-4"
              />
              <p className="text-base  font-para leading-relaxed text-gray-500 dark:text-gray-400">
                Price: ${selectedProduct.price}
              </p>
              <p className="text-base leading-relaxed font-para text-gray-500 dark:text-gray-400">
                Rating: {selectedProduct.rating}
              </p>
              <p className="text-base leading-relaxed font-para text-gray-500 dark:text-gray-400 mb-4">
                {selectedProduct.details}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <Button className="bg-blue-500 hover:!bg-blue-400 font-para" onClick={() => addToCart(selectedProduct)}>
    Add to Cart
</Button>
            <Button className="bg-orange-500 hover:!bg-orange-300 font-para" onClick={() => { closeModal(); /* Add to cart functionality */ }}>
              Add to Wishlist
            </Button>
            <Button  className=" font-para" color="gray" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Shop;
