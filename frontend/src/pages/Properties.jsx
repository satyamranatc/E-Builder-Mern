import React,{useproperty,useEffect, useState} from "react";
const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios";

export default function property() {
  let [property,setproperty]= useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/property`);
        setproperty(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    
  },[])
  return (
    <div>
      <center>
        <h1>property</h1>
      </center>
      <hr />
     <div className="flex flex-wrap" >
       {
        property.map((property) => (
          <div className="bg-slate-100 text-black rounded-2xl m-2 w-1/4" key={property._id}>
            <img className="w-full h-40"  src={property.propertyPoster} alt="" />
            <h2>{property.name}</h2>
            <p>{property.cityId.name}</p>
            <button className="bg-blue-500 text-white p-2" >Details</button>
          </div>
        ))
      }
     </div>
    </div>
  );
}
