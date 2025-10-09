import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const apiUrl = import.meta.env.VITE_API_URL;
import CityHome from "../media/City/City.jpg";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function city() {
  let { id } = useParams();
  let [city, setcity] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const response = await axios.get(`${apiUrl}/city/by/${id}`);
          setcity(response.data);
        } else {
          const response = await axios.get(`${apiUrl}/city`);
          setcity(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <motion.div className="w-full h-[30vw] relative overflow-hidden">
        <motion.img
          src={CityHome}
          alt=""
          className="h-full w-full object-cover brightness-30"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.h1
          className="absolute z-10 top-40 left-1/2 -translate-x-1/2 text-white text-5xl text-center px-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}>
          Your Next Address is Just a City Away
        </motion.h1>
      </motion.div>
      <hr />
      <div className="flex flex-wrap gap-6 p-6">
        {city.map((city, index) => (
          <motion.div
            className="bg-white text-black rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 w-[calc(25%-1.5rem)] overflow-hidden border border-gray-200"
            key={city._id}
            initial={{ y: -80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.03,
              y: -8,
              transition: { duration: 0.3 },
            }}>
            <motion.img
              className="w-full h-40 object-cover"
              src={city.cityPoster}
              alt={city.name}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="p-5">
              <h2 className="font-bold text-xl mb-2 text-gray-800">
                {city.name}
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                {city.stateId.stateName} | {city.stateId.countyName}
              </p>
              <motion.button
                onClick={() => {
                  navigate(`/Properties/by/${city._id}`);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Details
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}>
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
