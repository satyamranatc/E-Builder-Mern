import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import PropertyHero from "../assets/Property/property.jpg"; // optional image
const apiUrl = import.meta.env.VITE_API_URL;

export default function Property() {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = id ? `${apiUrl}/property/by/${id}` : `${apiUrl}/property`;
        const response = await axios.get(url);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      
      <motion.div
        className="relative w-full h-[30vw] flex justify-center items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={PropertyHero}
          alt="Property Cover"
          className="absolute inset-0 h-full w-full object-cover brightness-50"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.h1
          className="relative z-10 text-4xl md:text-5xl font-bold text-center leading-snug"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Find Your <span className="text-[#b48b3c]">Dream Property</span> Today
        </motion.h1>
      </motion.div>

      
      <hr className="border-[#b48b3c]/40 my-10 mx-auto w-[85%]" />

      
      <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-5">
        {properties.map((property, index) => (
          <motion.div
            key={property._id}
            className="relative bg-[#111]/80 rounded-xl overflow-hidden shadow-lg border border-[#b48b3c]/30 hover:border-[#b48b3c]/70 backdrop-blur-md transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            
            <div className="relative overflow-hidden">
              <motion.img
                src={property.propertyPoster}
                alt={property.name}
                className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>

            
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-[#b48b3c] mb-2">
                {property.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3">
                🏙️ {property.cityId?.name}
              </p>

              {property.price && (
                <p className="text-lg font-semibold text-white mb-3">
                  ₹{property.price.toLocaleString()}
                </p>
              )}

              {property.type && (
                <p className="text-gray-400 text-sm mb-4">
                  Type: <span className="text-gray-200">{property.type}</span>
                </p>
              )}

              
              <motion.button
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#b48b3c] to-[#a67c2b] text-black font-semibold hover:from-[#cfa84c] hover:to-[#b48b3c] transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                View Details →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      
      {properties.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Loading properties... please wait.
          </motion.p>
        </div>
      )}
    </div>
  );
}
