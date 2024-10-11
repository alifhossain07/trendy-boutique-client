import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Label, TextInput, Button, Checkbox, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext); // Access createUser from AuthContext
  const navigate = useNavigate(); // Hook for navigation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Call createUser with email and password
      await createUser(data.email, data.password, data.name, data.photoURL);
      console.log("User created:", data); // You can log the data or handle further actions

      // Here you can handle saving photoURL to the user's profile
      // For example, you might want to save the user's info in your database

      // Show SweetAlert for successful registration
      await Swal.fire({
        title: "Registration Successful!",
        text: "Welcome to Trendy Boutique!",
        icon: "success",
        confirmButtonText: "Continue",
      });

      // Navigate to the desired page after successful registration (e.g., home or dashboard)
      navigate("/"); // Redirect to home or any other page
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (you can show an alert or error message to the user)
      Swal.fire({
        title: "Registration Failed!",
        text: error.message || "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const password = watch("password", "");

  return (
    <div className="flex flex-col justify-center items-center py-20 bg-gray-100">
      <h1 className="lg:text-3xl text-2xl font-title font-bold text-center tracking-wider uppercase text-gray-900 mb-16">
        New to Trendy <span className="text-blue-700">Boutique</span>? Register
        Here!
      </h1>
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-title tracking-wider font-semibold text-center text-gray-700">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <Label
              htmlFor="name"
              className="block mb-4 tracking-wider font-para"
            >
              Your Name
            </Label>
            <TextInput
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              color={errors.name ? "failure" : "gray"}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <Alert color="failure">{errors.name.message}</Alert>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label
              htmlFor="email"
              className="block mb-4 tracking-wider font-para"
            >
              Your Email
            </Label>
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
              color={errors.email ? "failure" : "gray"}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <Alert color="failure">{errors.email.message}</Alert>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label
              htmlFor="password"
              className="block mb-4 tracking-wider font-para"
            >
              Your Password
            </Label>
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              color={errors.password ? "failure" : "gray"}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <Alert color="failure">{errors.password.message}</Alert>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <Label
              htmlFor="confirmPassword"
              className="block mb-4 tracking-wider font-para"
            >
              Confirm Password
            </Label>
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              color={errors.confirmPassword ? "failure" : "gray"}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <Alert color="failure">{errors.confirmPassword.message}</Alert>
            )}
          </div>

          {/* Photo URL Field */}
          <div>
            <Label
              htmlFor="photoURL"
              className="block mb-4 tracking-wider font-para"
            >
              Profile Photo URL
            </Label>
            <TextInput
              id="photoURL"
              type="text"
              placeholder="https://example.com/your-photo.jpg"
              {...register("photoURL", {
                required: "Profile photo URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                  message: "Enter a valid image URL (jpg, png, etc.)",
                },
              })}
              color={errors.photoURL ? "failure" : "gray"}
              aria-invalid={errors.photoURL ? "true" : "false"}
            />
            {errors.photoURL && (
              <Alert color="failure">{errors.photoURL.message}</Alert>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
            />
            <Label htmlFor="terms">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
            </Label>
          </div>
          {errors.terms && (
            <Alert color="failure">{errors.terms.message}</Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:!bg-blue-400"
          >
            Register
          </Button>

          {/* Login Redirect */}
          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
