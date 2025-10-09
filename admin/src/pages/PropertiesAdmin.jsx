import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Added framer-motion import

export default function PropertyAdmin() {
  const [Property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [change, setChange] = useState(true); // Added change state for re-fetch
  const [showForm, setShowForm] = useState(false); // Added showForm state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5500/api/property");
        setProperty(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Propertys:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [change]); // Dependency updated to 'change' for data refresh

  if (isLoading) {
    return (
      <motion.div // Added motion
        className="flex justify-center items-center h-screen text-indigo-600 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        Loading...
      </motion.div>
    );
  }

  // --- Core Logic Functions ---

  async function deleteProperty(id) {
    // NOTE: Switched from window.confirm to a safe, custom approach if this were a real app,
    // but retaining original pattern for consistency with previous user code.
    let confrm = confirm("Are you sure you want to delete this property?");
    if (confrm) {
      setChange(true);
      await axios.delete(`http://localhost:5500/api/property/${id}`);
      setProperty(Property.filter((item) => item._id !== id));
      setChange(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setChange(true);
    // Assuming 5 form inputs: Name, Type, Poster, Price, CityId
    await axios.post("http://localhost:5500/api/property", {
      name: e.target[0].value,
      propertyType: e.target[1].value,
      PropertyPoster: e.target[2].value,
      price: e.target[3].value, // Example field
      cityId: e.target[4].value, // Example field
    });
    setChange(false);
    setShowForm(false);
  }

  // --- JSX Rendering with Styling and Motion ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      {showForm ? (
        <motion.div // Form container with entry animation
          id="AddFormSection"
          className="flex flex-col justify-center mb-6"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Add New Property Listing
            </h2>
            <p className="text-gray-500 mt-2">
              Enter the required details for the new real estate listing.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100 w-full max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Property Name"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Property Poster URL"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Property Type (e.g., House, Condo)"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              />
              <input
                type="text"
                placeholder="City ID"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="mt-6 flex justify-center">
              <motion.button // Submit button with hover effects
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 8px 20px rgba(0, 128, 0, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Create Listing</span>
                </div>
              </motion.button>
            </div>
          </form>
        </motion.div>
      ) : null}

      <motion.div // Main header container with entry animation
        id="HeaderSection"
        className="flex justify-between items-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Property Admin
        </h1>
        <motion.button // Add/Close button with hover effects
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          {showForm ? "✕ Close" : "+ Add"}
        </motion.button>
      </motion.div>

      <motion.div // Table container with entry animation and centering
        className="flex justify-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}>
        <table className="w-full max-w-5xl bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="text-center py-4 px-6 font-semibold w-1/4">
                Property Name
              </th>
              <th className="text-center py-4 px-6 font-semibold w-1/4">
                Property Type
              </th>
              <th className="text-center py-4 px-6 font-semibold w-1/4">
                Property Poster
              </th>
              <th className="text-center py-4 px-6 font-semibold w-1/4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Property.map((item, index) => (
              <motion.tr // Table row with fade-in animation
                key={item._id}
                className="border-b hover:bg-indigo-50 transition-colors duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}>
                <td className="py-4 px-6 text-center font-medium text-gray-800">
                  {item.name}
                </td>
                <td className="py-4 px-6 text-center font-medium text-gray-800">
                  {item.propertyType}
                </td>
                <td className="py-4 px-6 text-center">
                  <img
                    src={item.PropertyPoster}
                    alt={item.name}
                    className="h-16 w-24 object-cover rounded-lg shadow-md mx-auto"
                  />
                </td>
                <td className="py-4 px-6 space-x-3 text-center">
                  <motion.button // Update button
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Update
                  </motion.button>
                  <motion.button // Delete button with delete action
                    onClick={() => deleteProperty(item._id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
