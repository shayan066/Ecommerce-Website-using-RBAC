import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const UserCart = () => {

  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState("");
  const [data, setData] = useState([])

  useEffect(() => {
    const data = {userId: localStorage.getItem('userId')}
    console.log(data);
    
    axios.post('http://localhost:3000/getCart', data)
    .then((res) => {
      console.log(res.data, "15");
      setData(res.data.data.cart)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])
  

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setDisplayName(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_vyvDNRDuCLARMs",
      amount: Number(data.amount),
      currency: data.currency,
      order_id: data.id,
      name: 'SHOPPING APP',
      description: "XYZ",
      handler: function (response) {
        console.log(response, "34");
        axios.post('http://localhost:3000/verify', {response: response})
        .then((res) => {
          console.log(res, "37");
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handlePayment = (amount) => {
    const _data = {amount: amount}
    axios.post('http://localhost:3000/orders', _data)
    .then((res) => {
      console.log(res.data, "29");
      handleOpenRazorpay(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome to the Store</h1>
          {displayName && <p className="font-medium">Hello, {displayName}</p>}
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
                <button onClick={() => handlePayment(item.price)}>Pay Now</button>
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
  )
}

export default UserCart