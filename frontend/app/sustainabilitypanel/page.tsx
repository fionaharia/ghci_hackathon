"use client"
import MaterialsSelectionList from '@/components/MaterialSelector'
import WasteManagementOptions from "@/components/WasteManagement"
import React from 'react'

const Panel = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-2 gap-8">
        <MaterialsSelectionList />
        <WasteManagementOptions />
      </div>
    </div>
  )
}

export default Panel