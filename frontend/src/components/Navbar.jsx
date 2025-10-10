import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "State", path: "/State" },
    { name: "City", path: "/City" },
    { name: "Properties", path: "/Properties" },
  ];

  return (
    <nav className="w-full bg-[#0c0c0c]/80 backdrop-blur-md text-white shadow-lg border-b border-[#b48b3c]/40 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🏠 Logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide text-[#b48b3c] hover:text-white transition-all duration-300"
        >
          E-Builder
        </Link>

        {/* 🌐 Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-10 text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`relative group transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-[#b48b3c]"
                    : "text-gray-200 hover:text-[#b48b3c]"
                }`}
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#b48b3c] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}

          {/* Login / Signup */}
          <div className="flex items-center space-x-4 ml-6">
            <Link
              to="/login"
              className="px-4 py-1 border border-[#b48b3c] rounded-full hover:bg-[#b48b3c] hover:text-black transition-all duration-300 text-sm font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-[#b48b3c] text-black rounded-full hover:bg-[#c9a64b] transition-all duration-300 text-sm font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </ul>

        {/* 🍔 Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#b48b3c] hover:text-white transition-all duration-300"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div
          className="md:hidden bg-[#0c0c0c]/95 backdrop-blur-xl border-t border-[#b48b3c]/30 animate-slideDown"
          style={{ animationDuration: "0.4s" }}
        >
          <ul className="flex flex-col items-center space-y-5 py-6 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-[#b48b3c]"
                      : "text-gray-300 hover:text-[#b48b3c]"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <div className="flex flex-col space-y-3 w-40 mt-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-center border border-[#b48b3c] rounded-full py-2 hover:bg-[#b48b3c] hover:text-black transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-center bg-[#b48b3c] text-black rounded-full py-2 hover:bg-[#c9a64b] transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
