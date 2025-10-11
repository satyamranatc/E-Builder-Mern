import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CityHome from "../assets/City/City.jpg";

const apiUrl = import.meta.env.VITE_API_URL;

export default function City() {
  const { id } = useParams();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const url = id ? `${apiUrl}/city/by/${id}` : `${apiUrl}/city`;
        const response = await axios.get(url);
        setCities(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }

    fetchCities();
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
          src={CityHome}
          alt="City cover"
          className="absolute inset-0 h-full w-full object-cover brightness-50"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.h1
          className="relative z-10 text-3xl md:text-5xl font-bold text-center leading-snug"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your Next Address is <br />
          Just a{" "}
          <span className="text-[#b48b3c] drop-shadow-md">City</span> Away
        </motion.h1>
      </motion.div>


      <hr className="border-[#b48b3c]/40 my-10 mx-auto w-[85%]" />


      {loading ? (
        <div className="text-center mt-20 text-gray-400">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            loading cities... please wait.
          </motion.p>
        </div>
      ) : cities.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            No cities available.
          </motion.p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pb-5">
          {cities.map((city, index) => (
            <motion.div
              key={city._id}
              className="relative bg-[#111]/80 rounded-xl overflow-hidden shadow-lg border border-[#b48b3c]/30 hover:border-[#b48b3c]/70 backdrop-blur-md transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -10, scale: 1.02 }}
            >

              <div className="relative overflow-hidden">
                <motion.img
                  src={city.cityPoster}
                  alt={city.name}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              </div>


              <div className="p-5">
                <h2 className="text-2xl font-semibold text-[#b48b3c] mb-2">
                  {city.name}
                </h2>
                <p className="text-gray-400 text-sm mb-5 italic">
                  {city.stateId?.stateName} | {city.stateId?.countyName}
                </p>


                <motion.button
                  onClick={() => navigate(`/Properties/by/${city._id}`)}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#b48b3c] to-[#a67c2b] text-black font-semibold hover:from-[#cfa84c] hover:to-[#b48b3c] transition-all duration-300 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Properties →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
