"use client"
import React from 'react'
import { Spotlight } from '@/components/ui/Spotlight'
import { Cover } from '@/components/ui/cover'
import Globe from 'react-globe.gl'
import { PlaceholdersAndVanishInputDemo } from '@/components/Placeholders'

const HeroPage = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row w-full dark:bg-black bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.1]  justify-center">
      <div className=" pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex w-full h-full">
        <div className="w-1/2 flex flex-col justify-start mt-32 items-center px-8 ">
          <h1 className="text-4xl z-100 md:text-4xl lg:text-6xl font-semibold text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Celebrations that Shine, <br />
            Without the <Cover>Footprint</Cover>
          </h1>
          <div className='w-full mt-10'>
            <PlaceholdersAndVanishInputDemo />
          </div>
        </div>
        
        <div className="w-1/2 ml-24 pb-32 flex justify-start items-center px-8">
        <Globe
            height={700}
            width={700}
            backgroundColor="rgba(0, 0, 0, 0)"
            showAtmosphere
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            labelsData={[
              { lat: 40, lng: -100, text: "Rjieka, Croatia", color: "white", size: 15 }
            ]}
          />
        </div>
      </div>
    </div>    
  )
}

export default HeroPage
