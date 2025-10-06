import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // 👈 External CSS file import

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">E-Builder</div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/State">State</Link></li>
        <li><Link to="/City">City</Link></li>
        <li><Link to="/Properties">Properties</Link></li>
      </ul>
    </nav>
  );
}
