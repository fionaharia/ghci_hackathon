"use client";
import React from "react";
import { Cover } from "@/components/ui/cover";
import Globe from "react-globe.gl";
import { PlaceholdersAndVanishInputDemo } from "@/components/Placeholders";
import { words } from "@/data";
import Link from "next/link";


const HeroPage = () => {
  return (
    <div className="h-screen flex flex-col top-0 md:flex-row w-full dark:bg-black bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.1] justify-center">
      <div className="pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-1/2 flex flex-col justify-start items-center">
          <h1 className="text-5xl 2xl:text-6xl z-100  font-semibold text-left text-white">
            Celebrations that Shine, <br />
            Without the <Cover>Footprint</Cover>
          </h1>
          <div className="w-full mt-10">
            <PlaceholdersAndVanishInputDemo />
          </div>
          <div className="w-full mt-8 flex justify-center items-center">
            <Link href="/eventplanning">
              <button className="h-14 animate-shimmer rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex justify-start items-center px-8">
          <Globe
            height={600}
            width={600}
            backgroundColor="rgba(0, 0, 0, 0)"
            showAtmosphere
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            labelsData={[
              { lat: 40, lng: -100, text: "Rjieka, Croatia", color: "white", size: 15 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
