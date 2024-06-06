import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSidebar from "./LeftSidebar";

const Services = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8585/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8585/api/services/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setServices(services.filter((service) => service._id !== id));
      setMessage("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service", error);
      alert("Failed to delete service");
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setServiceData({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:8585/api/services/update/${id}`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setServices(
        services.map((service) =>
          service._id === id ? { ...serviceData, _id: id } : service
        )
      );
      setEditingService(null);
      setServiceData({ title: "", description: "", icon: "" });
      alert("Service updated successfully");
    } catch (error) {
      console.error("Error updating service", error);
      alert("Failed to update service");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  return (
    <div>
      <LeftSidebar />
      <section className="container pt-[80px] mx-auto p-4">
        <h2 className="text-5xl font-bold mb-6 text-center">Our Services</h2>
        {message && <p className="mt-4 text-lg text-center">{message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white shadow-lg rounded-lg p-4"
            >
              <img
                className="w-full h-40 object-cover rounded-t-lg"
                src={service.icon}
                alt={service.title}
              />
              <div className="p-4">
                {editingService && editingService._id === service._id ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={serviceData.title}
                      onChange={handleChange}
                      className="mb-2 p-2 w-full border rounded"
                    />
                    <input
                      type="text"
                      name="description"
                      value={serviceData.description}
                      onChange={handleChange}
                      className="mb-2 p-2 w-full border rounded"
                    />
                    <input
                      type="text"
                      name="icon"
                      value={serviceData.icon}
                      onChange={handleChange}
                      className="mb-2 p-2 w-full border rounded"
                    />
                    <button
                      onClick={() => handleUpdate(service._id)}
                      className="w-full bg-indigo-600 text-white p-2 rounded mt-2"
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-700 mb-2">{service.description}</p>
                    {!localStorage.getItem("user") ||
                    localStorage.getItem("user").length < 10 ? (
                      <>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(service)}
                          className="w-full bg-yellow-500 text-white p-2 rounded mt-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="w-full bg-red-500 text-white p-2 rounded mt-2"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {/* <button
                      onClick={() => handleEdit(service)}
                      className="w-full bg-yellow-500 text-white p-2 rounded mt-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="w-full bg-red-500 text-white p-2 rounded mt-2"
                    >
                      Delete
                    </button> */}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
