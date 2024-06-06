import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../LeftSidebar";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://digital-marketing-liart-three.vercel.app/api/user/login", {
        username,
        pw: password
      });
      if (response.data.token) {
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user info if needed
        navigate("/");
      } else {
        setError("Login Unsuccessful");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <LeftSidebar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-semibold mb-8 text-slate-500">Login</h1>
        <div className="w-80">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="bg-blue-500 m-3 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
          <button
            onClick={redirectToRegister}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
