"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cover } from "@/components/ui/cover";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Spotlight } from "@/components/ui/Spotlight";
import { PlaceholdersAndVanishInputDemo } from "@/components/Placeholders";

const Homepage = () => {
  return (
    <div className="h-screen flex flex-col w-full dark:bg-black bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.1] relative items-center justify-center">
      <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Spotlight />
      <div className="flex flex-col  pb-32 justify-between items-top text-center">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Celebrations that Shine 
          Without the <Cover>Footprint</Cover>
        </h1>
        {/* Placeholders directly below the H1 */}
        <div className="mt-4"> {/* Added margin-top for spacing */}
          <PlaceholdersAndVanishInputDemo />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-1/2 w-1/2 text-center">
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default Homepage;
