import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaTrash, FaEdit } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL;

export default function StateAdmin() {
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    stateName: "",
    countyName: "",
    statePoster: "",
  });


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${apiURL}/state`);
        setStates(res.data);
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [refresh]);

  function reset() {
    setFormData({
      stateName: "",
      countyName: "",
      statePoster: "",
    });
  }

  async function deleteState(id) {
    if (confirm("Are you sure you want to delete this state?")) {
      try {
        await axios.delete(`${apiURL}/state/${id}`);
        setStates(states.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  }

  function handleEdit(state) {
    setEditingId(state._id);
    setFormData({
      stateName: state.stateName,
      countyName: state.countyName,
      statePoster: state.statePoster,
    });
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${apiURL}/state/${editingId}`, formData);
      } else {
        await axios.post(`${apiURL}/state`, formData);
      }
      reset();
      setEditingId(null);
      setShowForm(false);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Error saving state:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 p-4 sm:p-6 font-inter">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-500 bg-clip-text text-transparent drop-shadow-sm text-center sm:text-left">
          State Administration
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="🔍 Search State"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none w-full sm:w-auto"
          />
          <motion.button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) setEditingId(null);
              reset();
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all w-full sm:w-auto mt-2 sm:mt-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showForm ? <FaTimes /> : <FaPlus />}{" "}
            {showForm ? "Close" :  "Add State"}
          </motion.button>
        </div>
      </motion.div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-teal-100 mb-6 w-full max-w-3xl mx-auto"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-4 text-center sm:text-left">
              {editingId ? "Edit State" : "Add New State"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="State Name"
                value={formData.stateName}
                onChange={(e) =>
                  setFormData({ ...formData, stateName: e.target.value })
                }
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none w-full"
              />
              <input
                type="text"
                placeholder="Country Name"
                value={formData.countyName}
                onChange={(e) =>
                  setFormData({ ...formData, countyName: e.target.value })
                }
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none w-full"
              />
            </div>
            <input
              type="text"
              placeholder="State Poster URL"
              value={formData.statePoster}
              onChange={(e) =>
                setFormData({ ...formData, statePoster: e.target.value })
              }
              required
              className="border border-gray-300 rounded-lg px-4 py-3 mt-4 w-full focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <motion.button
              type="submit"
              className="mt-6 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto block mx-auto sm:mx-0"
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(16, 185, 129, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              {editingId ? "Update State" : "Add State"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 text-teal-600 font-semibold">
          Loading states...
        </div>
      ) : states.length === 0 ? (
        <div className="text-center text-gray-500 mt-16 text-lg">
          No states found. Click “Add State” to create one.
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <table className="w-full min-w-[600px] max-w-6xl mx-auto bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">State</th>
                <th className="py-3 px-4 text-left font-semibold">Country</th>
                <th className="py-3 px-4 text-left font-semibold">Poster</th>
                <th className="py-3 px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {states
                .filter((s) =>
                  s.stateName.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b hover:bg-cyan-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {item.stateName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.countyName}</td>
                    <td className="py-3 px-4">
                      <img
                        src={item.statePoster}
                        alt={item.stateName}
                        className="h-16 w-24 sm:w-28 object-cover rounded-lg shadow-sm border mx-auto"
                      />
                    </td>
                    <td className="py-3 px-4 text-center space-x-2 sm:space-x-3 flex flex-col sm:flex-row justify-center items-center gap-2">
                      <motion.button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEdit /> Update
                      </motion.button>
                      <motion.button
                        onClick={() => deleteState(item._id)}
                        className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition-all w-full sm:w-auto justify-center"
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
