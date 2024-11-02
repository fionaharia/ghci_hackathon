import React from 'react'
import { occasionType } from '@/data'
import HereMap from "@/components/HereMap"

const EventPlanning = () => {
  return (
    <div className="flex flex-row ml-20 mt-20 h-screen text-white">
      <div className='w-1/2'>

        <div className="grid grid-cols-2 gap-4 p-10 border-2 border-white rounded-md shadow-lg">

          <div>
            <label className="block font-semibold focus:text-green-600">Area</label>
            <input
              type="text"
              placeholder="Mumbai"
              className="w-full p-2 mt-1 border text-black rounded-md focus:border-green-600 focus:border-2 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold ">Occasion</label>
            <select
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
            <label className="block font-semibold ">Number of People</label>
            <input
              type="number"
              placeholder="50"
              className="w-full text-black p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold">Total event budget</label>
            <input
              type="text"
              placeholder="£30 - £100,000"
              className="w-full text-black p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          
        </div>
      </div>

      <div className='w-1/2 ml-10 pr-16'>
        <HereMap />
      </div>
    </div>
  )
}

export default EventPlanning
