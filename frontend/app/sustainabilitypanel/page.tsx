"use client"
import MaterialsSelectionList from '@/components/MaterialSelector'
import WasteManagementOptions from "@/components/WasteManagement"
import React from 'react'

const Panel = () => {
  return (
    <div className="h-screen flex flex-col top-0 w-full dark:bg-backblue bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.1] justify-start items-center">
      <div className="pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className='font-bold text-5xl mt-5'>Generate your Event Layout!</div>
      <div className='flex flex-row gap-6 mt-6'>
      <div className='mt-5'>
        <MaterialsSelectionList />
      </div>
      <div className='mt-5'>
        <WasteManagementOptions />
      </div>
      </div>
      <button className="inline-flex mt-6 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Generate your layout
      </button>
    </div>
  )
}

export default Panel