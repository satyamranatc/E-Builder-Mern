import React,{usecity,useEffect, useState} from "react";
const apiUrl = import.meta.env.VITE_API_URL
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function city() {
  let { id } = useParams();
  let [city,setcity]= useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if(id){
          const response = await axios.get(`${apiUrl}/city/by/${id}`);
          setcity(response.data);
        }
        else
        {
          const response = await axios.get(`${apiUrl}/city`);
        setcity(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    
  },[])
  return (
    <div>
      <center>
        <h1>city</h1>
      </center>
      <hr />
     <div className="flex flex-wrap" >
       {
        city.map((city) => (
          <div className="bg-slate-100 text-black rounded-2xl m-2 w-1/4" key={city._id}>
            <img className="w-full h-40"  src={city.cityPoster} alt="" />
            <h2>{city.name}</h2>
            <p>{city.stateId.stateName} | {city.stateId.countyName}</p>
            <button
              onClick={()=>{
                navigate(`/Properties/by/${city._id}`)
              }}
             className="bg-blue-500 text-white p-2" 
            >Details</button>
          </div>
        ))
      }
     </div>
    </div>
  );
}
