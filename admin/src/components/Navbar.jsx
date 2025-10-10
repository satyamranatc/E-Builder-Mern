import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide hover:opacity-90 transition-all duration-300"
        >
          E-Builder
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-lg font-medium">
          {[
            { name: "State", path: "/" },
            { name: "City", path: "/City" },
            { name: "Properties", path: "/Properties" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="relative group transition-all duration-300"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Login / Signup buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-white text-indigo-600 font-semibold hover:bg-indigo-100 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-indigo-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none hover:opacity-80"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600">
          <ul className="flex flex-col items-center space-y-4 py-6 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-indigo-200 transition"
                onClick={() => setIsOpen(false)}
              >
                State
              </Link>
            </li>
            <li>
              <Link
                to="/City"
                className="hover:text-indigo-200 transition"
                onClick={() => setIsOpen(false)}
              >
                City
              </Link>
            </li>
            <li>
              <Link
                to="/Properties"
                className="hover:text-indigo-200 transition"
                onClick={() => setIsOpen(false)}
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-100 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block px-4 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
