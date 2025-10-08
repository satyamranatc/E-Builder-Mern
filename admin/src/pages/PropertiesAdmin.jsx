import React, {useState, useEffect } from 'react';
import axios from 'axios';

export default function PropertyAdmin() {
  const [Property, setProperty] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5500/api/property");
        setProperty(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Propertys:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []); // Add empty dependency array to avoid infinite loop

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-indigo-600 font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div id="HeaderSection" className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Property Admin</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Add</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="text-left py-2 px-4">Property Name</th>
              <th className="text-left py-2 px-4">Property Type</th>
              <th className="text-left py-2 px-4">Property Poster</th>
              <th className="text-left py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {Property.map((item) => (
              <tr key={item._id} className="border-b hover:bg-indigo-50 transition">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.propertyType}</td>
                <td className="py-2 px-4">
                  <img src={item.PropertyPoster} alt={item.name} className="h-12 w-20 object-cover rounded" />
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition">Update</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
