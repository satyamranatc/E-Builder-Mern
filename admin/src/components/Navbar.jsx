import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h2 className="text-2xl font-bold">E-Builder</h2>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/"
            className="hover:text-indigo-200 transition font-medium"
          >
            State
          </Link>
        </li>
        <li>
          <Link
            to="/City"
            className="hover:text-indigo-200 transition font-medium"
          >
            City
          </Link>
        </li>
        <li>
          <Link
            to="/Properties"
            className="hover:text-indigo-200 transition font-medium"
          >
            Properties
          </Link>
        </li>
      </ul>
    </nav>
  );
}
