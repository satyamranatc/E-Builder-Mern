import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function StateAdmin() {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [change, setChange] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5500/api/state");
        setState(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [change]);

  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen text-indigo-600 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        Loading...
      </motion.div>
    );
  }

  async function deleteState(id) {
    let confrm = confirm("Are you sure you want to delete this state?");
    if (confrm) {
      setChange(true);
      await axios.delete(`http://localhost:5500/api/state/${id}`);
      setState(state.filter((item) => item._id !== id));
      setChange(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setChange(true);
    await axios.post("http://localhost:5500/api/state", {
      stateName: e.target[0].value,
      countyName: e.target[1].value,
      statePoster: e.target[2].value,
    });
    setChange(false);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      {showForm ? (
        <motion.div
          id="HeaderSection"
          className="flex flex-col justify-center mb-6"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Add a New State
            </h2>
            <p className="text-gray-500 mt-2">
              Fill out the details below to add a new state to the database.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100 w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="State Name"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Country Name"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="State Poster URL"
                className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-all duration-300 w-full"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <motion.button
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
                  <span>Add State</span>
                </div>
              </motion.button>
            </div>
          </form>
        </motion.div>
      ) : null}

      <motion.div
        id="HeaderSection"
        className="flex justify-between items-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          State Admin
        </h1>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          {showForm ? "✕ Close" : "+ Add"}
        </motion.button>
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}>
        <table className="w-full max-w-4xl bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="text-center py-4 px-6 font-semibold w-1/3">
                State Name
              </th>
              <th className="text-center py-4 px-6 font-semibold w-1/3">
                State Poster
              </th>
              <th className="text-center py-4 px-6 font-semibold w-1/3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {state.map((item, index) => (
              <motion.tr
                key={item._id}
                className="border-b hover:bg-indigo-50 transition-colors duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}>
                <td className="py-4 px-6 font-medium text-gray-800 text-center">
                  {item.stateName}
                </td>
                <td className="py-4 px-6 text-center">
                  <img
                    src={item.statePoster}
                    alt={item.stateName}
                    className="h-16 w-24 object-cover rounded-lg shadow-md mx-auto"
                  />
                </td>
                <td className="py-4 px-6 space-x-3 text-center">
                  <motion.button
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Update
                  </motion.button>
                  <motion.button
                    onClick={() => deleteState(item._id)}
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
