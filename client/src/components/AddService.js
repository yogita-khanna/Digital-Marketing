import React, { useState } from "react";
import axios from "axios";
import LeftSidebar from "./LeftSidebar";
import Login from "./Login/Login";

const AddService = () => {
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const [message, setMessage] = useState("");
  console.log(localStorage.getItem("user"));
  if ((!localStorage.getItem("user") || localStorage.getItem("user").length<10)) {
    
    return (
      <div>
        <Login />
      </div>
    );
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    let newServiceData = {...serviceData,token:localStorage.getItem("jwt") }
    try {
      await axios.post("https://digital-marketing-liart-three.vercel.app/api/services/add", newServiceData);
      setMessage("Service added successfully");
      setServiceData({ title: "", description: "", icon: "" });
    } catch (error) {
      console.error("Error adding service", error);
      setMessage("Failed to add service");
    }
  };

  return (
    <div>
      <LeftSidebar />
      <div className="container pt-[80px] mx-auto p-4">
        <div className="flex justify-center"><h2 className="text-4xl font-bold mb-4">Admin Dashboard</h2></div>
        {message && <p className="mb-4 text-lg">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={serviceData.title}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={serviceData.description}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-gray-700"
            >
              Icon URL
            </label>
            <input
              type="text"
              name="icon"
              id="icon"
              value={serviceData.icon}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
          </div>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
