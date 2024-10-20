import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";

const Checkout = () => {
    const { user } = useContext(AuthContext); // Access user from AuthContext
    const userEmail = user ? user.email : "";

    

    const location = useLocation();
    const { totalPrice = 0, quantities = {} } = location.state || {}; // Ensure quantities is always an object

    const [formData, setFormData] = useState({
        fullName: "",
        userEmail: userEmail,
        userAddress: "",
        userCity: "",
        zipCode: "",
        phoneNumber: "", // Add phoneNumber to form data
        cardNumber: "",
        cardExpiryDate: "",
        cardCVV: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Fetch cart items using TanStack Query
    const { data: cartItems = [], isLoading } = useQuery({
        queryKey: ["cartItems", userEmail],
        queryFn: async () => {
            const res = await axios.get(`https://trendy-boutique-server.vercel.app/cart/${userEmail}`);
            return res.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;

    const shippingFee = 8.0; // Change this value if necessary
    const total = totalPrice + shippingFee;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedTotalPrice = total.toFixed(2);

        if (!cartItems || cartItems.length === 0) {
            console.error("Cart items are empty or not defined");
            return;
        }

        const orderData = {
            fullName: formData.fullName,
            email: formData.userEmail,
            address: formData.userAddress,
            city: formData.userCity,
            zipCode: formData.zipCode,
            phoneNumber: formData.phoneNumber, // Include phone number here
            cardDetails: {
                number: formData.cardNumber,
                expiryDate: formData.cardExpiryDate,
                cvv: formData.cardCVV,
            },
            totalPrice: formattedTotalPrice,
            products: cartItems.map((item) => ({
                productId: item._id,
                quantity: quantities[item._id] || 0,
            })),
        };

        console.log("Checkout form data with total price and product quantities:", orderData);

        // try {
        //     const response = await fetch("https://trendy-boutique-server.vercel.app/order", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(orderData),
        //     });

        //     const result = await response.json();

        //     if (result.paymentUrl) {
        //         // Redirect to the payment URL
        //         window.location.href = result.paymentUrl; // Use the key returned from server
        //     } else {
        //         console.error("Payment URL not received:", result);
        //     }
        // } catch (error) {
        //     console.error("Error creating payment:", error);
        // }
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
                                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-6">Checkout</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Billing Details */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fullName">
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
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="userEmail">
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
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="userAddress">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="userCity">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="zipCode">
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

                    {/* New Phone Number Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Payment Details */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardNumber">
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
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardExpiryDate">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                name="cardExpiryDate"
                                id="cardExpiryDate"
                                value={formData.cardExpiryDate}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardCVV">
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

                <button type="submit" className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                    Place Order
                </button>
            </form>

            <div className="mt-6">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <p className="mt-2">Total Price: <span className="font-bold">${total.toFixed(2)}</span></p>
                <p className="mt-2">Shipping Fee: <span className="font-bold">${shippingFee.toFixed(2)}</span></p>
            </div>
        </div>
    );
};

export default Checkout;
