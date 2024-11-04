"use client";
import React, { useState } from "react";
import { occasionType } from "@/data";
import HereMap from "@/components/HereMap";
import { useRouter } from "next/navigation"; // Import useRouter


const EventPlanning = () => {
  const [showMarkers, setShowMarkers] = useState(false);
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);
  const [formData, setFormData] = useState({
    area: "",
    occasion: occasionType[0],
    people: "",
    budget: "",
  });
  const router = useRouter(); // Initialize router

  const handleAnalyzeClick = () => {
    router.push("/sustainabilitypanel"); // Navigate to /sustainability page
  };

  const handleSearch = () => {
    setShowMarkers(true);
    setShowAnalyzeButton(true); // Show the Analyze button when search is clicked
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-row ml-20 mt-20 h-screen text-white">
      <div className="w-1/2">
        <div className="grid grid-cols-2 gap-4 p-10 border-2 border-white rounded-md shadow-lg">
          <div>
            <label className="block font-semibold focus:text-green-600">
              Area
            </label>
            <input
              type="text"
              name="area"
              placeholder="Mumbai"
              value={formData.area}
              onChange={handleInputChange}
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
              placeholder="50"
              value={formData.people}
              onChange={handleInputChange}
              className="w-full text-black p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold">Total event budget</label>
            <input
              type="text"
              name="budget"
              placeholder="£30 - £100,000"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full text-black p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="justify-center flex mt-5 items-center">
          <button onClick={handleSearch} className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              SEARCH
            </div>
          </button>
        </div>
        { 
        showAnalyzeButton && (
          <div className="justify-center flex mt-4 items-center">
            <button
              onClick={handleAnalyzeClick}
              className="inline-flex h-12 px-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Analyze the Sustainability
            </button>
          </div>
        )} 
      </div>

      <div className="w-1/2 ml-10 pr-16">
        <HereMap showMarkers={showMarkers} />
      </div>
    </div>
  );
};

export default EventPlanning;
