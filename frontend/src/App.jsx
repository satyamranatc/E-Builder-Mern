import React from 'react'

import {BrowserRouter, Routes, Route, } from "react-router-dom";

import Navbar from "./components/Navbar.jsx"

import Home from "./pages/Home.jsx"
import State from "./pages/State.jsx"
import City from "./pages/City.jsx"
import Properties from "./pages/Properties.jsx"




export default function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/State" element={<State/>} />
        <Route path="/City" element={<City/>} />
        <Route path="/City/by/:id" element={<City/>} />
        <Route path="/Properties" element={<Properties/>} />
        <Route path="/Properties/by/:id" element={<Properties/>} />

      </Routes>
      
      </BrowserRouter>

    </div>
  )
}
