import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "flowbite-react";
import "flowbite";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Shop = () => {
  const { user } = useContext(AuthContext);
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

  const queryClient = useQueryClient();

  // Fetch products from API using TanStack Query
  const { data: products = [], error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/products");
      return response.data;
    },
  });

  // Fetch cart items
  const { data: cartItems } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      if (!user || !user.email) return [];
      const response = await axios.get(
        `http://localhost:5000/cart?userEmail=${user.email}`
      );
      return response.data;
    },
    enabled: !!user?.email, // Only fetch if user is logged in
  });

  useEffect(() => {
    if (products.length) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      const uniqueSubcategories = [
        ...new Set(products.map((product) => product.subcategory)),
      ];
      setCategories(uniqueCategories);
      setSubcategories(uniqueSubcategories);
      setFilteredProducts(products);
    }
  }, [products]);

  // Filter products based on selected filters
  const applyFilters = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (product) => product.subcategory === selectedSubcategory
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    if (isStockFilter) {
      filtered = filtered.filter((product) =>
        isStockFilter === "in" ? product.isStock : !product.isStock
      );
    }

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
  }, [
    selectedCategory,
    selectedSubcategory,
    priceRange,
    isStockFilter,
    sortOrder,
    products,
  ]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const showAllProducts = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setIsStockFilter("");
  };

  // Mutation for adding to cart using TanStack Query
  const addToCartMutation = useMutation({
    mutationFn: async (product) => {
      if (!user || !user.email) {
        throw new Error("Not logged in");
      }
      return await axios.post("http://localhost:5000/cart", {
        productName: product.productName,
        price: product.price,
        image: product.image,
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refetch products after adding to cart
      queryClient.invalidateQueries(["cart", user.email]); // Refetch cart items after adding
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item Added To Cart!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Item Already in Cart",
          text: "This item is already in your cart.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add item to cart.",
        });
      }
    },
  });

  const addToWishlist = async (product) => {
    if (!user || !user.email) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to add items to the wishlist.",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/wishlist", {
        productName: product.productName,
        price: product.price,
        image: product.image,
        userEmail: user.email,
      });
      console.log("Item added to wishlist:", response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item Added To Wishlist!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Item Already in Wishlist",
          text: "This item is already in your wishlist.",
        });
      } else {
        console.error("Error adding to wishlist:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add item to wishlist.",
        });
      }
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
        <div className="bg-gray-100 w-1/4 p-4">
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
          <h2 className="font-title text-2xl mb-4">Price Range</h2>
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            className="border p-1 mb-2"
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            className="border p-1 mb-2"
            placeholder="Max"
          />
          <h2 className="font-title text-2xl mb-4">Stock</h2>
          <select
            value={isStockFilter}
            onChange={(e) => setIsStockFilter(e.target.value)}
            className="border p-1 mb-4"
          >
            <option value="">All</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
          <h2 className="font-title text-2xl mb-4">Sort By</h2>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-1 mb-4"
          >
            <option value="">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {/* Products Section */}
        <div className="grid grid-cols-3 gap-4 w-3/4">
          {filteredProducts.map((product) => (
            <div
              key={product.productName}
              className="bg-white shadow-lg rounded-lg p-4"
            >
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-96 object-cover rounded-lg"
              />
              <h3 className="font-title text-lg">{product.productName}</h3>
              <p className="font-para">Price: ${product.price}</p>
              <p className="font-para">Rating: {product.rating}</p>
              <Button
                onClick={() => openProductModal(product)}
                className="mt-2"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <Modal show={openModal} onClose={closeModal}>
          <Modal.Header>{selectedProduct.productName}</Modal.Header>
          <Modal.Body>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.productName}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <p className="font-para">Price: ${selectedProduct.price}</p>
            <p className="font-para">Rating: {selectedProduct.rating}</p>
            <p className="font-para">{selectedProduct.details}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => addToCartMutation.mutate(selectedProduct)}>
              Add to Cart
            </Button>
            <Button onClick={() => addToWishlist(selectedProduct)}>
              Add to Wishlist
            </Button>
            <Button color="gray" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Shop;
