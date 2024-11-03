"use client";
import MaterialsSelectionList from '@/components/MaterialSelector';
import WasteManagementOptions from "@/components/WasteManagement";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter

const Panel = () => {
  const router = useRouter(); // Initialize router
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateLayout = () => {
    setIsLoading(true); // Show loading indicator

    // Simulate a 2-second loading time before displaying the image
    setTimeout(() => {
      setGeneratedImage("/generated_layout.png"); // Set image path
      setIsLoading(false); // Hide loading indicator
    }, 2000);
  };

  const handleCarbonFootprintClick = () => {
    router.push("/carbonfootprint"); // Navigate to /carbonfootprint page
  };

  return (
    <div className="h-screen flex flex-col top-0 w-full dark:bg-backblue bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.1] justify-start items-center">
      <div className="pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="font-bold text-5xl mt-5">Generate your Event Layout!</div>
      <div className="flex flex-row gap-6 mt-6">
        {generatedImage ? (
          // Display the image if generatedImage is set
          <>
            <Image 
              src={generatedImage} 
              alt="Generated Event Layout" 
              width={500} 
              height={500} 
              className="mt-5"
            />
            {/* "Check Your Carbon Footprint" button below the image */}
            <button
              onClick={handleCarbonFootprintClick}
              className="inline-flex mt-4 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Check Your Carbon Footprint
            </button>
          </>
        ) : (
          // Display the selection components if the image is not generated yet
          <>
            <div className="mt-5">
              <MaterialsSelectionList />
            </div>
            <div className="mt-5">
              <WasteManagementOptions />
            </div>
          </>
        )}
      </div>
      
      {isLoading ? (
        // Loading spinner
        <div className="mt-6 w-12 h-12 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
      ) : (
        !generatedImage && (
          // Generate layout button, shown only when image is not generated
          <button
            onClick={handleGenerateLayout}
            className="inline-flex mt-6 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Generate your layout
          </button>
        )
      )}
    </div>
  );
};

export default Panel;
