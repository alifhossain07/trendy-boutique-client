import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Label, TextInput, Button, Checkbox, Alert } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const { signIn } = useContext(AuthContext); // Access signIn from AuthContext
  const navigate = useNavigate(); // Hook for navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Call signIn with email and password
      await signIn(data.email, data.password);
      
      // Show SweetAlert for successful login
      await Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back to Trendy Boutique!',
        icon: 'success',
        confirmButtonText: 'Continue',
      });

      // Navigate to the desired page after successful login (e.g., home or dashboard)
      navigate('/'); // Redirect to home or any other page
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (you can show an alert or error message to the user)
      Swal.fire({
        title: 'Login Failed!',
        text: error.message || 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-20 bg-gray-100">
      <h1 className="lg:text-3xl text-2xl font-title font-bold text-center tracking-wider uppercase text-gray-900 mb-16">
        Welcome to Trendy <span className='text-blue-700'>Boutique</span>
      </h1>

      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-title tracking-wider font-semibold text-center mb-14 text-gray-700">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="block font-para tracking-wider mb-4">
              Your Email
            </Label>
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              color={errors.email ? 'failure' : 'gray'}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <Alert color="failure">{errors.email.message}</Alert>}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="block font-para tracking-wider mb-4">
              Your Password
            </Label>
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              color={errors.password ? 'failure' : 'gray'}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && <Alert color="failure">{errors.password.message}</Alert>}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox id="remember" {...register('remember')} />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-500 hover:!bg-blue-400">
            Sign In
          </Button>

          {/* Forgot Password and Register Links */}
          <div className="text-sm text-center">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>
          <div className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
