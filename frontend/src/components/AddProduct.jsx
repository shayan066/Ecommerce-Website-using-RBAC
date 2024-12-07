import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission

    const data = {
      image,
      name,
      category,
      seller,
      price,
    };

    console.log({url:image, name, category, seller, price});
    
    try {
      const response = await axios.post(
        "http://localhost:3000/add-product",
        data
      );
      console.log("Product added successfully:", response.data);
      if (response.data == 'saved'){
        navigate('/get/products');
      }
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Product Details
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Image URL:
          </label>
          <input
            className="block w-full text-gray-700 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Name:
          </label>
          <input
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Category:
          </label>
          <input
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Seller:
          </label>
          <input
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            placeholder="Enter seller name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Price:
          </label>
          <input
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
