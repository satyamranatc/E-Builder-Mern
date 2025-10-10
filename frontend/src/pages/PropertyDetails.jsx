import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaHome, FaArrowLeft, FaRupeeSign } from "react-icons/fa";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await axios.get(`${apiURL}/property/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Error fetching property details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#d4af37] text-lg font-semibold bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-400 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
        <p className="text-lg">Property not found!</p>
        <Link
          to="/Properties"
          className="mt-4 bg-[#b48b3c] text-black px-5 py-2 rounded-lg hover:bg-[#cfa84c] transition-all font-semibold"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] min-h-screen text-white font-inter py-8">

      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <Link
          to="/Properties"
          className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#ffcc4d] font-medium transition-all text-sm sm:text-base"
        >
          <FaArrowLeft /> Back to Properties
        </Link>
      </div>

      
      <motion.div
        className="max-w-6xl mx-auto bg-[#121212]/80 border border-[#d4af37]/20 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.1)] backdrop-blur-lg overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        <div className="relative overflow-hidden">
          <motion.img
            src={property.propertyPoster}
            alt={property.name}
            className="w-full h-[300px] sm:h-[400px] md:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-5 left-5 bg-[#d4af37]/90 text-black px-4 py-2 rounded-lg font-semibold shadow-md text-sm sm:text-base">
            {property.propertyType}
          </div>
        </div>

        
        <div className="p-5 sm:p-8 md:p-12">
          
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#d4af37] tracking-wide mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {property.name}
          </motion.h1>

          
          <motion.div
            className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-300 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FaMapMarkerAlt className="text-[#d4af37]" />
              <p>{property.cityId?.name || "Unknown City"}</p>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FaHome className="text-[#d4af37]" />
              <p>{property.cityId?.stateId?.stateName || "Unknown State"}</p>
            </div>
          </motion.div>

          
          <motion.p
            className="text-gray-400 leading-relaxed text-base sm:text-lg border-t border-[#d4af37]/20 pt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {property.description}
          </motion.p>

          
          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#d4af37] flex items-center gap-2">
              <FaRupeeSign className="text-xl sm:text-2xl" />
              {property.price.toLocaleString("en-IN")}
            </h2>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffcc4d" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#d4af37] to-[#b48b3c] text-black px-8 sm:px-10 py-3 rounded-xl font-semibold shadow-md hover:from-[#ffcc4d] hover:to-[#d4af37] transition-all w-full sm:w-auto text-center"
            >
              Contact Seller
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
