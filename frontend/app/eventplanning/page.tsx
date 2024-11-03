"use client"
import React, { useState } from "react";
import axios from "axios";
import { occasionType } from "@/data";
import HereMap from "@/components/HereMap";

interface FormData {
  area: string;
  occasion: string;
  num_people: number;
  budget: string;
}

const EventPlanning = () => {
  const [formData, setFormData] = useState<FormData>({
    area: "Mumbai",
    occasion: occasionType[0],
    num_people: 50,
    budget: "£30 - £100,000",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Sending data:", formData);
      const response = await axios.post("http://127.0.0.1:5000/submit_event", formData, {
        headers: { 
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
    } catch (err: any) {  // Type as 'any' for compatibility
      if (err?.response) {
        // Server responded with error
        console.error("Server responded with error:", {
          data: err.response.data,
          status: err.response.status
        });
      } else if (err?.request) {
        // Request was made but no response
        console.error("No response received:", err.request);
      } else {
        // Error setting up the request
        console.error("Error:", err?.message || "An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-row ml-20 mt-20 h-screen text-white">
      <div className="w-1/2">
        <div className="grid grid-cols-2 gap-4 p-10 border-2 border-white rounded-md shadow-lg">
          <div>
            <label className="block font-semibold focus:text-green-600">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Mumbai"
              className="w-full p-2 mt-1 border text-black rounded-md focus:border-green-600 focus:border-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold">Occasion</label>
            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
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
              name="num_people"
              value={formData.num_people}
              onChange={handleChange}
              placeholder="50"
              className="w-full text-black p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold">Total Event Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="£30 - £100,000"
              className="w-full text-black p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="justify-center flex mt-5 items-center">
          <button onClick={handleSubmit} className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              SEARCH
            </div>
          </button>
        </div>
      </div>

      <div className="w-1/2 ml-10 pr-16">
        <HereMap />
      </div>
    </div>
  );
};

export default EventPlanning;