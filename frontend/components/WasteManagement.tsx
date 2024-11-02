"use client"
import React, { useState } from 'react';
import { wasteOptions,wasteReductionTips } from '@/data';


const WasteManagementOptions = () => {
  const [selectedOption, setSelectedOption] = useState(wasteOptions[0]);

  return (
    <div className="border-2 border-white p-6 rounded-lg text-gray-200">
      <h2 className="text-2xl font-semibold mb-2">Waste Management Options</h2>
      <p className="text-sm text-gray-400 mb-4">
        Guidance on sustainable waste disposal practices.
      </p>

      {/* Waste Disposal Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Select Disposal Method:</label>
        <select 
          onChange={(e) => setSelectedOption(wasteOptions[e.target.selectedIndex])} 
          className="w-full px-3 py-2 border border-gray-600 bg-black text-gray-200 rounded"
        >
          {wasteOptions.map((option, index) => (
            <option key={index} value={option.method}>{option.method}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <p className="font-medium">Environmental Impact:</p>
        <p className="text-gray-400">{selectedOption.impact}</p>
      </div>

      <div className="mb-6">
        <p className="font-medium">Estimated Cost:</p>
        <p className="text-gray-400">{selectedOption.estimatedCost}</p>
      </div>

      <div>
        <p className="font-medium">Waste Reduction Tips:</p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          {wasteReductionTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WasteManagementOptions;
