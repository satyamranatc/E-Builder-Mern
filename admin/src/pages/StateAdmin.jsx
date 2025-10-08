import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StateAdmin() {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [change, setChange] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5500/api/state");
        setState(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [change]); // Add empty dependency array to avoid infinite loop

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-indigo-600 font-semibold">Loading...</div>;
  }

  async function deleteState(id) 
  {
    let confrm = confirm("Are you sure you want to delete this state?");
    if(confrm)
    {
      setChange(true);
      await axios.delete(`http://localhost:5500/api/state/${id}`);
      setState(state.filter((item) => item._id !== id));
      setChange(false);
    }
    
  }

  async  function handleSubmit(e)
  {
    e.preventDefault();
    setChange(true);
    await axios.post("http://localhost:5500/api/state",{
      stateName: e.target[0].value,
      countyName: e.target[1].value,
      statePoster: e.target[2].value
    });
    setChange(false);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-white p-6">

    {showForm?<>
    <div id="HeaderSection" className="flex justify-between items-center mb-6">
       <form onSubmit={handleSubmit}>
        <input type="text" placeholder="State Name" className="border border-gray-300 rounded px-4 py-2" />
        <input type="text" placeholder="Country Name" className="border border-gray-300 rounded px-4 py-2" />
        <input type="text" placeholder="State Poster" className="border border-gray-300 rounded px-4 py-2" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Add</button>
       </form>
      </div>
    </>:null}



      <div id="HeaderSection" className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">State Admin</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Add</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="text-left py-2 px-4">State Name</th>
              <th className="text-left py-2 px-4">State Poster</th>
              <th className="text-left py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item) => (
              <tr key={item._id} className="border-b hover:bg-indigo-50 transition">
                <td className="py-2 px-4">{item.stateName}</td>
                <td className="py-2 px-4">
                  <img src={item.statePoster} alt={item.stateName} className="h-12 w-20 object-cover rounded" />
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition">Update</button>
                  <button onClick={()=>deleteState(item._id)}  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
