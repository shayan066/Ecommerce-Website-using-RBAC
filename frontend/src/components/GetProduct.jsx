import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GetProduct = () => {
  const navigate = useNavigate();
  const rights = JSON.parse(localStorage.getItem('rights'))[0].permissions
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {Authorization: localStorage.getItem('token')}
        const response = await axios.get("http://localhost:3000/get-products", {headers});
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleDelete = () => {
    axios
      .post("http://localhost:3000/delete-products", deleteData)
      .then((response) => {
        if (response.data.code === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleAddToCart = (productId) => {
    const userId = localStorage.getItem("userId");
    const data = { productId, userId };

    axios
      .post("http://localhost:3000/addToCart", data)
      .then((res) => {
        if (res.data.code === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => console.log("Product not Added", err));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">🛒 Product Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
          <Link
            to="/get/cart"
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go to Cart
          </Link>
        </div>
      </header>

      {/* Delete Button */}
      {deleteData.length > 0 && (
        <div className="flex justify-end mb-6">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Delete Selected Items
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-300"
            >
              {/* Product Image */}
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />

              {/* Product Details */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </h2>
                <p className="text-md text-gray-600 mt-2 font-medium">
                  ${item.price}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded-full shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Add to Cart
                </button>

                {/* Edit and Select Options */}
                <div className="flex justify-between items-center mt-4">
                  {rights.indexOf('edit-product') !== -1 &&  <button
                    onClick={() => navigate(`/get/product/${item._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Edit
                  </button>}
                  <div className="flex items-center space-x-2">
                    { rights.indexOf('delete-products') !== -1 && <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDeleteData([...deleteData, item._id]);
                        } else {
                          setDeleteData(
                            deleteData.filter((id) => id !== item._id)
                          );
                        }
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GetProduct;
