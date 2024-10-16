import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Checkout = () => {
  const userEmail = "alifhossain56782@gmail.com"; // Replace with the logged-in user's email

  // Fetch cart items using TanStack Query
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cartItems", userEmail],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/cart/${userEmail}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const location = useLocation();
  const { totalPrice, quantities } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    userEmail: userEmail, // Set the logged-in user's email here
    userAddress: "",
    userCity: "",
    zipCode: "",
    cardNumber: "",
    cardExpiryDate: "",
    cardCVV: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Define shipping fee
  const shippingFee = 8.0; // Change this value if necessary
  // Calculate total dynamically
  const total = totalPrice + shippingFee;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the total price to two decimal places
    const formattedTotalPrice = total.toFixed(2);

    // Check cartItems to ensure it has quantities
    if (!cartItems || cartItems.length === 0) {
      console.error("Cart items are empty or not defined");
      return; // Prevent submission if cart is empty
    }

    // Include the formatted total price and product IDs with their quantities in the form data
    const orderData = {
      fullName: formData.fullName,
      email: formData.userEmail,
      address: formData.userAddress,
      city: formData.userCity,
      zipCode: formData.zipCode,
      cardDetails: {
        number: formData.cardNumber,
        expiryDate: formData.cardExpiryDate,
        cvv: formData.cardCVV,
      },
      totalPrice: formattedTotalPrice,
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: quantities[item._id] || 0, // Get quantity from the quantities passed from the Header
      })), // Now capturing product ID and quantity
    };

    // Log the complete order data, including product quantities
    console.log("Checkout form data with total price and product quantities:", orderData);

    // Example of sending the order data to a server
    fetch("YOUR_API_ENDPOINT_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-2xl font-bold mb-6">Checkout Page</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Your Cart Items</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between py-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <span className="font-medium text-gray-800">
                    {item.productName}
                  </span>
                </div>
                <div className="text-gray-600">
                  {quantities[item._id] || 0} x{" "}
                  <span className="font-semibold">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-6">Checkout</h2>

      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Billing Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="userEmail"
            >
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              required
              readOnly // Make the email field read-only if desired
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="userAddress"
            >
              Address
            </label>
            <input
              type="text"
              name="userAddress"
              id="userAddress"
              value={formData.userAddress}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="userCity"
              >
                City
              </label>
              <input
                type="text"
                name="userCity"
                id="userCity"
                value={formData.userCity}
                onChange={handleChange}
                className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="zipCode"
              >
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Payment Details</h3>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="cardExpiryDate"
              >
                Expiry Date
              </label>
              <input
                type="text"
                name="cardExpiryDate"
                id="cardExpiryDate"
                placeholder="MM/YY"
                value={formData.cardExpiryDate}
                onChange={handleChange}
                className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="cardCVV"
              >
                CVV
              </label>
              <input
                type="text"
                name="cardCVV"
                id="cardCVV"
                value={formData.cardCVV}
                onChange={handleChange}
                className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

       

        {/* Order Summary */}
        <div className="col-span-1 md:col-span-2 mt-6 bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Shipping Fee:</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
         {/* Place Order Button */}
         <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
