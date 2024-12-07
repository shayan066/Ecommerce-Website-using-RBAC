import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [data, setData] = useState([
    {
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2lyZWxlc3MlMjBoZWFkcGhvbmV8ZW58MHx8MHx8fDA%3D",
      name: "Wireless Headphones",
      category: "Electronics",
      seller: "Tech Gear Co.",
      price: 79.99,
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1664444389244-13c8020f3522?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHlvZ2ElMjBtYXR8ZW58MHx8MHx8fDA%3D",
      name: "Yoga Mat",
      category: "Fitness",
      seller: "FitFlex Supplies",
      price: 25.99,
    },
    {
      url: "https://images.unsplash.com/photo-1637178627947-52eba699dfbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RXNwcmVzc28lMjBNYWNoaW5lfGVufDB8fDB8fHww",
      name: "Espresso Machine",
      category: "Home Appliances",
      seller: "BrewMasters",
      price: 249.99,
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
      name: "T-Shirt",
      category: "Clothing",
      seller: "StyleHub",
      price: 19.99,
    },
    {
      url: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2FtaW5nJTIwTW91c2V8ZW58MHx8MHx8fDA%3D",
      name: "Gaming Mouse",
      category: "Accessories",
      seller: "GameTech Pro",
      price: 49.99,
    },
    {
      url: "https://images.unsplash.com/photo-1722503585127-f850a5cc7da5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGlwaG9uZSUyMDE1fGVufDB8fDB8fHww",
      name: "Iphone",
      category: "Accessories",
      seller: "GameTech Pro",
      price: 99.99,
    },
  ]);

  // Fetch product data dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products"); // Replace with your API endpoint
        console.log("Fetched products:", response.data);
        setData(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []); // Run only once after component mounts

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setDisplayName(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Welcome to the Store</h1>
          {displayName && <p className="font-medium text-white">Hello, {displayName}</p>}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-500 mb-4">Category: {item.category}</p>
                <p className="text-green-600 font-bold mb-2">
                  Price: ${item.price.toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">Seller: {item.seller}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Stay Connected</h2>
          <p className="text-gray-200 mb-6">
            Join our newsletter for the latest updates and exclusive deals.
          </p>
          <div className="flex justify-center items-center gap-4 mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-1/2 max-w-xs px-4 py-2 rounded focus:outline-none text-gray-800"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="#"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
          <p className="text-gray-300 text-sm">
            &copy; 2024 Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
