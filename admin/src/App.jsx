import React from 'react'
import NavBar from "./components/Navbar.jsx"

import StateAdmin from "./pages/StateAdmin.jsx"
import CityAdmin from "./pages/CityAdmin.jsx"
import PropertiesAdmin from "./pages/PropertiesAdmin.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      
      <BrowserRouter>
      <NavBar/>
      <Routes>

        <Route path="/" element={<StateAdmin/>} />
        <Route path="/State" element={<StateAdmin/>} />
        <Route path="/City" element={<CityAdmin/>} />
        <Route path="/Properties" element={<PropertiesAdmin/>} />

      </Routes>
      
      </BrowserRouter>
    </div>
  )
}
