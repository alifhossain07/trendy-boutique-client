import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, TextInput, Checkbox, Spinner } from 'flowbite-react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Fetch products function
const fetchProducts = async () => {
  const { data } = await axios.get('https://trendy-boutique-server.vercel.app/products');
  return data;
};

// Update product function
const updateProduct = async ({ productId, updatedProduct }) => {
  const { data } = await axios.put(`https://trendy-boutique-server.vercel.app/products/${productId}`, updatedProduct);
  return data;
};

// Delete product function
const deleteProduct = async (productId) => {
  await axios.delete(`https://trendy-boutique-server.vercel.app/products/${productId}`);
};

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({
    productName: '',
    image: '',
    category: '',
    subcategory: '',
    price: '',
    discount: '',
    rating: '',
    details: '',
    isStock: false,
    productQuantity: '',
    isDiscount: false,
    adminEmail: 'alifhossain56782@gmail.com', // Assuming this is static
  });
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setLoading(false); // Set loading to false once data is fetched
    };
    loadProducts();
  }, []);

  // Handle update button click
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProductData({
      productName: product.productName,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      details: product.details,
      isStock: product.isStock,
      productQuantity: product.productQuantity,
      isDiscount: product.isDiscount,
      adminEmail: product.adminEmail,
    });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updateProduct({
      productId: selectedProduct._id,
      updatedProduct: updatedProductData,
    });
    // Update local state after successful update
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === selectedProduct._id ? { ...product, ...updatedProductData } : product
      )
    );
    setIsModalOpen(false);

    // Show SweetAlert notification
    Swal.fire({
      title: 'Success!',
      text: 'Product updated successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  // Handle delete button click
  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      await deleteProduct(productId);
      // Update local state after successful deletion
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));

      // Show SweetAlert notification
      Swal.fire({
        title: 'Deleted!',
        text: 'Product has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <div className="relative lg:h-[20rem] text-white py-1 lg:px-16 text-center bg-cover bg-center" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://i.ibb.co.com/XL1fLXm/about-Us-Trendy.png')",
      }}>
        <div className="lg:max-w-5xl mx-auto lg:mt-14 p-10 rounded-lg">
          <h1 className="text-3xl lg:text-5xl uppercase font-title tracking-wider text-white font-bold lg:leading-tight">
            Trendy <span className="text-blue-400">Boutique</span>
          </h1>
          <p className="text-lg lg:text-2xl font-para tracking-wider mt-6 max-w-3xl mx-auto">
            Products Management
          </p>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        {loading ? ( // Show spinner while loading
          <div className="flex justify-center items-center h-48">
            <Spinner color="purple" aria-label="Loading..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Serial No</Table.HeadCell>
                <Table.HeadCell>Product Name</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Rating</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Sub Category</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {products.map((product, index) => (
                  <Table.Row key={product._id} className="bg-white">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                      {product.productName}
                    </Table.Cell>
                    <Table.Cell>${product.price}</Table.Cell>
                    <Table.Cell>{product.rating}</Table.Cell>
                    <Table.Cell>{product.category}</Table.Cell>
                    <Table.Cell>{product.subcategory}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button size="xs" className="bg-blue-500 text-white" onClick={() => handleUpdateClick(product)}>
                          Update
                        </Button>
                        <Button size="xs" className="bg-red-500 text-white" onClick={() => handleDelete(product._id)}>
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>

      {/* Update Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Update Product</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSubmit}>
            <div className="space-y-4">
              <TextInput name="productName" label="Product Name" value={updatedProductData.productName} onChange={handleInputChange} />
              <TextInput name="image" label="Image URL" value={updatedProductData.image} onChange={handleInputChange} />
              <TextInput name="category" label="Category" value={updatedProductData.category} onChange={handleInputChange} />
              <TextInput name="subcategory" label="Subcategory" value={updatedProductData.subcategory} onChange={handleInputChange} />
              <TextInput name="price" label="Price" type="number" value={updatedProductData.price} onChange={handleInputChange} />
              <TextInput name="discount" label="Discount" value={updatedProductData.discount} onChange={handleInputChange} />
              <TextInput name="rating" label="Rating" type="number" step="0.1" value={updatedProductData.rating} onChange={handleInputChange} />
              <TextInput name="details" label="Details" value={updatedProductData.details} onChange={handleInputChange} />
              <TextInput name="productQuantity" label="Product Quantity" type="number" value={updatedProductData.productQuantity} onChange={handleInputChange} />
              <div className="flex items-center">
                <Checkbox name="isStock" checked={updatedProductData.isStock} onChange={handleCheckboxChange} />
                <label className="ml-2">In Stock</label>
              </div>
              <div className="flex items-center">
                <Checkbox name="isDiscount" checked={updatedProductData.isDiscount} onChange={handleCheckboxChange} />
                <label className="ml-2">Discount Available</label>
              </div>
            </div>
            <div className="mt-4">
              <Button type="submit" color="success">
                Update Product
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductsManagement;
