import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaTrash, FaEdit } from "react-icons/fa";

export default function PropertyAdmin() {
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    propertyPoster: "",
    propertyType: "",
    cityId: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [propertyRes, cityRes] = await Promise.all([
          axios.get("http://localhost:5500/api/property"),
          axios.get("http://localhost:5500/api/city"),
        ]);
        setProperties(propertyRes.data);
        setCities(cityRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [refresh]);

  function reset() {
    setFormData({
      name: "",
      propertyPoster: "",
      propertyType: "",
      cityId: ""
    })
  }

  async function deleteProperty(id) {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`http://localhost:5500/api/property/${id}`);
        setProperties(properties.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Error deleting property:", err);
      }
    }
  }

  function handleUpdate(property) {
    setEditingId(property._id); // mark which property is being edited
    setFormData({
      name: property.name,
      propertyPoster: property.propertyPoster,
      propertyType: property.propertyType,
      cityId: property.cityId?._id || "",
    });
    setShowForm(true); // open form
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing property
        await axios.put(`http://localhost:5500/api/property/${editingId}`, formData);
      } else {
        // Add new property
        await axios.post("http://localhost:5500/api/property", formData);
      }
      setFormData({ name: "", propertyPoster: "", propertyType: "", cityId: "" });
      setEditingId(null);
      setShowForm(false);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Error saving property:", err);
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 p-6 font-inter">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-500 bg-clip-text text-transparent">
          Property Administration
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="🔍 Search Property"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          <motion.button
            onClick={() => {setShowForm(!showForm); reset()}}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showForm ? <FaTimes /> : <FaPlus />}{" "}
            {showForm ? "Close" : "Add Property"}
          </motion.button>
        </div>
      </motion.div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100 mb-8 w-full max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-4">
              {editingId ? "Edit Property" : "Add New Property"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Property Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="text"
                placeholder="Property Poster URL"
                value={formData.propertyPoster}
                onChange={(e) =>
                  setFormData({ ...formData, propertyPoster: e.target.value })
                }
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <select
                value={formData.propertyType}
                onChange={(e) =>
                  setFormData({ ...formData, propertyType: e.target.value })
                }
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">Select Property Type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            <select
              value={formData.cityId}
              onChange={(e) =>
                setFormData({ ...formData, cityId: e.target.value })
              }
              required
              className="border border-gray-300 rounded-lg px-4 py-3 mt-4 w-full focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>

            <motion.button
              type="submit"
              className="mt-6 bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(16, 185, 129, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              {editingId ? "Update Property" : "Add Property"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 text-teal-600 font-semibold">
          Loading properties...
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center text-gray-500 mt-16 text-lg">
          No properties found. Click “Add Property” to create one.
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <table className="w-full max-w-6xl mx-auto bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">Name</th>
                <th className="py-4 px-6 text-left font-semibold">Poster</th>
                <th className="py-4 px-6 text-left font-semibold">Type</th>
                <th className="py-4 px-6 text-left font-semibold">City</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties
                .filter((p) => p.name.toLowerCase().includes(search))
                .map((item, index) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b hover:bg-cyan-50 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-gray-800 font-medium">{item.name}</td>
                    <td className="py-4 px-6">
                      <img
                        src={item.propertyPoster}
                        alt={item.name}
                        className="h-16 w-28 object-cover rounded-lg shadow-sm border mx-auto"
                      />
                    </td>
                    <td className="py-4 px-6 text-gray-600">{item.propertyType}</td>
                    <td className="py-4 px-6 text-gray-600">{item.cityId?.name || "—"}</td>
                    <td className="py-4 px-6 text-center space-x-3">
                      <motion.button
                        onClick={() => handleUpdate(item)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEdit /> Update
                      </motion.button>
                      <motion.button
                        onClick={() => deleteProperty(item._id)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTrash /> Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
