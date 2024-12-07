import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GetProductById = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const id = params.id; // Extract `id` from `params`
    axios
      .get(`http://localhost:3000/get-product/${id}`)
      .then((res) => {
        console.log("Response:", res.data.data);
        setImage(res.data.data.url)
        setName(res.data.data.name)
        setCategory(res.data.data.category)
        setSeller(res.data.data.seller)
        setPrice(res.data.data.price)
      })
      .catch((err) => {
        console.error("Error:", err); // Use console.error for errors
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({id: params.id, url:image, name, category, seller, price: Number(price)});

    const data = {id: params.id, url:image, name, category, seller, price: Number(price)}
    axios.post('http://localhost:3000/edit-products', data)
    .then((res) => {
      console.log(res.data, "res");
      if (res.data.code == 200){
        navigate('/get/products')
      }
    })
    .catch((err) => {
      console.log(err, "err");
    })
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Product Details
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

export default GetProductById;
