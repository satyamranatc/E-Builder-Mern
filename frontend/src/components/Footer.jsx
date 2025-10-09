import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-[#0b0b0b] text-gray-300 font-playfair"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Gradient accent line */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#b48b3c] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo / Branding */}
        <div>
          <h1 className="text-2xl font-bold text-[#b48b3c] mb-4">E-Builder</h1>
          <p className="text-gray-400 max-w-sm">
            Discover and explore luxury properties across India. Your dream home awaits!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {["Home", "State", "City", "Properties"].map((link) => (
              <li key={link}>
                <Link
                  className="hover:text-[#b48b3c] transition-colors duration-300"
                  to={link === "Home" ? "/" : `/${link}`}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>
          <p className="mb-2">Email: info@ebuilder.com</p>
          <p className="mb-4">Phone: +91 9999999999</p>

          <div className="flex gap-4 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="text-gray-300 hover:text-[#b48b3c] transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} E-Builder. All rights reserved.
      </div>
    </motion.footer>
  );
}
