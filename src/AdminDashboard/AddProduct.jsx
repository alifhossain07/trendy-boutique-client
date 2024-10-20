import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, TextInput, Label, Textarea, Checkbox } from "flowbite-react";
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      const response = await axios.post(
        "https://trendy-boutique-server.vercel.app/products",
        newProduct
      );
      return response.data;
    },
    onSuccess: () => {
      // Show success message and reset form after successful submission
      Swal.fire({
        title: 'Success!',
        text: 'Product added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      reset();
    },
    onError: (error) => {
      // Show error message if there's an issue
      Swal.fire({
        title: 'Error!',
        text: 'Error adding product: ' + error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });

  const onSubmit = (data) => {
    const newProduct = {
      ...data,
      isStock: data.isStock === "on", // convert to boolean
      isDiscount: data.isDiscount === "on", // convert to boolean
      adminEmail: "alifhossain56782@gmail.com", // Your email from context
    };
    mutation.mutate(newProduct);
  };

  return (
    <div>
      <div
        className="relative lg:h-[20rem] text-white py-1 lg:px-16 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://i.ibb.co.com/XL1fLXm/about-Us-Trendy.png')",
        }}
      >
        <div className="lg:max-w-5xl mx-auto lg:mt-14 p-10 rounded-lg">
          <h1 className="text-3xl lg:text-5xl uppercase font-title tracking-wider text-white font-bold lg:leading-tight">
            Trendy <span className="text-blue-400">Boutique</span>
          </h1>
          <p className="text-lg lg:text-2xl font-para tracking-wider mt-6 max-w-3xl mx-auto">
            Add Product
          </p>
        </div>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="productName" value="Product Name" />
            <TextInput
              id="productName"
              placeholder="Name of your product"
              {...register("productName", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="image" value="Image URL" />
            <TextInput
              id="image"
              placeholder="https://i.ibb.co/..."
              {...register("image", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="category" value="Category" />
            <TextInput
              id="category"
              placeholder="product category"
              {...register("category", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="subcategory" value="Sub Category" />
            <TextInput
              id="subcategory"
              placeholder="Sub Category"
              {...register("subcategory", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="price" value="Price" />
            <TextInput
              id="price"
              type="number"
              step="0.01"
              placeholder="Product Price"
              {...register("price", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="discount" value="Discount (%)" />
            <TextInput
              id="discount"
              placeholder="Input Discount (%)"
              {...register("discount")}
            />
          </div>

          <div>
            <Label htmlFor="rating" value="Rating" />
            <TextInput
              id="rating"
              type="number"
              step="0.1"
              placeholder="Rate Your Product"
              {...register("rating", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="details" value="Details" />
            <Textarea
              id="details"
              placeholder="Product description..."
              {...register("details", { required: true })}
            />
          </div>

          <div className="flex items-center gap-4">
            <Checkbox id="isStock" {...register("isStock")} />
            <Label htmlFor="isStock" value="In Stock" />
          </div>

          <div className="flex items-center gap-4">
            <Checkbox id="isDiscount" {...register("isDiscount")} />
            <Label htmlFor="isDiscount" value="Has Discount" />
          </div>

          <div>
            <Label htmlFor="productQuantity" value="Product Quantity" />
            <TextInput
              id="productQuantity"
              type="number"
              placeholder="How Many Products"
              {...register("productQuantity", { required: true })}
            />
          </div>

          <Button type="submit" className="bg-blue-500 text-white">
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
