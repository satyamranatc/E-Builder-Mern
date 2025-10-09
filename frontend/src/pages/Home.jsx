import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section
      className="relative h-[91vh] w-full bg-cover bg-center text-gray-100 font-playfair"
      style={{
        backgroundImage: "url('/HomeBackGroundImage.png')",
      }}
    >
      
      <div className="absolute inset-0 bg-black/10" />

      
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          The ultimate in <br />
          <span className="text-[#b48b3c]">luxury real estate</span>
        </h1>

        <p className="mt-6 text-lg md:text-2xl font-medium">
          I want to <span className="text-[#b48b3c]">buy</span> a{" "}
          <span className="text-[#b48b3c]">house/apartment</span> <br />
          in <span className="text-[#b48b3c]">“select a location”</span>
        </p>

        <Link to="/Properties">
          <button className="mt-10 px-8 py-3 bg-[#b48b3c] hover:bg-[#a07b2e] transition-all duration-300 text-white text-lg font-medium rounded-full shadow-md">
            FIND A PROPERTY
          </button>
        </Link>
      </div>
    </section>
  );
}
