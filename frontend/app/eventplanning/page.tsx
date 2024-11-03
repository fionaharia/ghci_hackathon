"use client"
import React, { useState } from "react";
import { occasionType } from "@/data";
import HereMap from "@/components/HereMap"

const EventPlanning = () => {
  const [formData, setFormData] = useState({
    area: "",
    occasion: occasionType[0],
    people: "",
    budget: ""
  });

  const [showMarkers, setShowMarkers] = useState(false);

  // Test venues near Mumbai
  const venues = [
    { lat: 19.0760, lng: 72.8777, name: "Venue 1" }, // Mumbai
    { lat: 19.0830, lng: 72.8823, name: "Venue 2" },
    { lat: 19.0895, lng: 72.8656, name: "Venue 3" },
    { lat: 19.0760, lng: 72.8422, name: "Venue 4" },
    { lat: 19.1071, lng: 72.8227, name: "Venue 5" },
    { lat: 19.1239, lng: 72.8553, name: "Venue 6" }
  ];

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    console.log('Search clicked');
    setShowMarkers(false); // Reset markers
    setTimeout(() => {
      setShowMarkers(true); // Add markers after a brief delay
    }, 100);
  };

  return (
    <div className="flex flex-row ml-20 mt-20 min-h-screen text-white">
      {/* Form section */}
      <div className="w-1/2 pr-6">
        <div className="grid grid-cols-2 gap-4 p-10 border-2 border-white rounded-md shadow-lg">
          <div>
            <label className="block font-semibold focus:text-green-600">
              Area
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="Mumbai"
              className="w-full p-2 mt-1 border text-black rounded-md focus:border-green-600 focus:border-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold">Occasion</label>
            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              className="w-full p-2 text-black mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            >
              {occasionType.map((occasion, index) => (
                <option key={index} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">Number of People</label>
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleInputChange}
              placeholder="50"
              className="w-full text-black p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold">Total event budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="£30 - £100,000"
              className="w-full text-black p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="justify-center flex mt-5 items-center">
          <button 
            className="p-[3px] relative"
            onClick={handleSearch}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              SEARCH
            </div>
          </button>
        </div>
      </div>

      {/* Map section */}
      <div className="w-1/2 pl-6" style={{ minHeight: '500px' }}>
        <HereMap venues={venues} showMarkers={showMarkers} />
      </div>
    </div>
  );
};

export default EventPlanning;