import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example endpoint for login
      // const data = {name: username, password: password}
      const response = await axios.post("http://localhost:3000/signup", {
        name: username,
        password: password,
        type: type,
      });

      // Assuming the server responds with a success message or token
      setSuccess("Login successful!");
      setError(""); // Clear any previous errors
      console.log("Response:", response.data);
      if (response.data.code == 200) {
        navigate("/login");
      }
    } catch (err) {
      setError("Invalid username or password.");
      setSuccess(""); // Clear success message
      console.error("Error:", err.response?.data || err.message); // Log the error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Create Your Account
        </h1>
        <p className="text-gray-500 text-center mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">
              Username:
            </label>
            <input
              id="email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="p-3 border rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-700 font-medium mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="type" className="text-gray-700 font-medium mb-2">
              Type:
            </label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-3 border rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              placeholder="Enter user type"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition-transform duration-300 transform hover:scale-105 font-bold shadow-md"
          >
            Submit
          </button>
        </form>
        {success && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {success}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
