import React, { useState } from 'react';
import { FaInfoCircle, FaStar } from 'react-icons/fa';
import {materials} from "../data/index"

const MaterialsSelectionList = () => {
  const [filter, setFilter] = useState('All');

  const filteredMaterials = materials.filter(item => 
    filter === 'All' || item.category === filter || item.ecoScore >= parseInt(filter)
  );

  return (
    <div className="border-2 border-white p-6 rounded-lg text-gray-200">
      <h2 className="text-2xl font-semibold mb-2">Materials Selection</h2>
      <p className="text-sm text-gray-400 mb-4">
        Choose materials based on their sustainability impact and eco-scores.
      </p>

      {/* Filter Options */}
      <div className="flex items-center space-x-4 mb-6">
        <label className="text-gray-300">Filter by:</label>
        <select 
          onChange={(e) => setFilter(e.target.value)} 
          className="px-3 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Decor">Decor</option>
          <option value="Furniture">Furniture</option>
          <option value="Cutlery">Cutlery</option>
          <option value="3">Eco Score 3+</option>
          <option value="4">Eco Score 4+</option>
          <option value="5">Eco Score 5</option>
        </select>
      </div>

      {/* Material Items List */}
      <ul className="space-y-4">
        {filteredMaterials.map((item, index) => (
          <li key={index} className="p-4 bg-gray-700 rounded-lg shadow flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-medium text-gray-100">{item.name}</span>
               
              </div>
              <div className="text-sm text-gray-400">Category: {item.category}</div>
            </div>

            {/* Eco-Score Indicator */}
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`${i < item.ecoScore ? 'text-yellow-500' : 'text-gray-500'}`} 
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="space-x-2">
              <button className="text-sm text-green-500 underline">Alternatives</button>
              <button className="text-sm text-blue-500 underline">Supplier Info</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsSelectionList;
