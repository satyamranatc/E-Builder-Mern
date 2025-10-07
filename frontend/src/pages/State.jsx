import React,{useState,useEffect} from "react";
const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function State() {
  let navigate = useNavigate();
  let [state,setState]= useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/state`);
        setState(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    
  },[])
  return (
    <div>
      <center>
        <h1>state</h1>
      </center>
      <hr />
     <div className="flex flex-wrap" >
       {
        state.map((state) => (
          <div className="bg-slate-100 text-black rounded-2xl m-2 w-1/4" key={state._id}>
            <img className="w-full h-40"  src={state.statePoster} alt="" />
            <h2>{state.stateName}</h2>
            <p>{state.countyName}</p>
            <button onClick={()=>{
              navigate(`/City/by/${state._id}`)
            }}  className="bg-blue-500 text-white p-2" >Details</button>
          </div>
        ))
      }
     </div>
    </div>
  );
}
