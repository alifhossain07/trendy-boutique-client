import React from 'react';
import { useForm } from 'react-hook-form';
import { Label, TextInput, Button, Checkbox, Alert } from 'flowbite-react';


const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data); // Replace with your login function
      };

    return (
        <div className="flex justify-center items-center  py-20 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login to Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="block mb-2">
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
            <Label htmlFor="password" className="block mb-2">
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
          <Button type="submit" className="w-full" color="primary">
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
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </div>
        </form>
      </div>
    </div>
    );
};

export default Login;