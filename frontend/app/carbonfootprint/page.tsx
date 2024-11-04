"use client";
import { lifecycleImpact } from "@/data"; // Make sure this array is correctly exported from "@/data"
import { useState } from "react";

const CarbonFootprint = () => {
  const [travelDistance, setTravelDistance] = useState("");
  const [modeOfTransport, setModeOfTransport] = useState("car");
  const [cateringType, setCateringType] = useState("meat-based");
  const [materialsUsed, setMaterialsUsed] = useState("");
  const [lifecycleitemImpact, setLifecycleitemImpact] = useState<string[]>([]);
  const [cert, setCert] = useState("LEED");
  const [carbonFootprintVisible, setCarbonFootprintVisible] = useState(false); // New state variable for visibility

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/sustainability_report.pdf"; // Path to your PDF in the public folder
    link.download = "analysis_report.pdf"; // Desired name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShowCarbonFootprint = () => {
    setCarbonFootprintVisible(true); // Show the carbon footprint when the button is clicked
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const travelDetails = {
      travelDistance,
      modeOfTransport,
      cateringType,
      materialsUsed,
      lifecycleitemImpact,
      cert,
    };
    console.log(travelDetails);
    // You can add additional logic to handle the travel details (e.g., sending to an API)
  };

  return (
    <div className="h-screen flex flex-col top-0 w-full dark:bg-backblue bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.1] justify-start items-center">
      <div className="pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="font-bold text-5xl mt-5">Carbon Footprint Calculator</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-5 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-white" htmlFor="travelDistance">
            Travel Distance (in miles):
          </label>
          <input
            type="number"
            id="travelDistance"
            value={travelDistance}
            onChange={(e) => setTravelDistance(e.target.value)}
            required
            className="w-full p-2 text-black border border-white rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white" htmlFor="modeOfTransport">
            Mode of Transport:
          </label>
          <select
            id="modeOfTransport"
            value={modeOfTransport}
            onChange={(e) => setModeOfTransport(e.target.value)}
            required
            className="w-full p-2 text-black border border-white rounded"
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="plane">Plane</option>
            <option value="train">Train</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white" htmlFor="cateringType">
            Catering Type:
          </label>
          <select
            id="cateringType"
            value={cateringType}
            onChange={(e) => setCateringType(e.target.value)}
            required
            className="w-full p-2 border text-black border-white rounded"
          >
            <option value="meat-based">Meat-based</option>
            <option value="plant-based">Plant-based</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white" htmlFor="materialsUsed">
            Amount of Materials Used (in kg):
          </label>
          <input
            type="number"
            id="materialsUsed"
            value={materialsUsed}
            onChange={(e) => setMaterialsUsed(e.target.value)}
            required
            className="w-full p-2 border text-black border-white rounded"
          />
        </div>

        {!carbonFootprintVisible && ( // Only show the button if carbon footprint is not visible
          <button
            type="button" // Change type to button to prevent form submission
            onClick={handleShowCarbonFootprint} // Call the function to show carbon footprint
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            SHOW CARBON FOOTPRINT
          </button>
        )}

        {carbonFootprintVisible && ( // Show the carbon footprint when visible
          <div className="font-extrabold text-center text-white text-xl mb-8">
            YOUR CARBON FOOTPRINT: 67%
          </div>
        )}

        <div className="font-bold text-5xl mt-5 text-center mb-8">
          Lifecycle Impact
        </div>

        <div className="mb-4">
          <label className="block text-white" htmlFor="lifecycleImpact">
            Choose the Cutlery
          </label>
          <select
            id="lifecycleImpact"
            multiple
            value={lifecycleitemImpact} // lifecycleitemImpact should be an array to store multiple values
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setLifecycleitemImpact(selectedOptions); // Update state with array of selected values
            }}
            required
            className="w-full p-2 border text-black border-white rounded"
          >
            {lifecycleImpact.map((impact, index) => (
              <option key={index} value={impact}>
                {impact}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white" htmlFor="cert">
            Certification:
          </label>
          <select
            id="cert"
            value={cert}
            onChange={(e) => setCert(e.target.value)}
            required
            className="w-full p-2 border text-black border-white rounded"
          >
            <option value="ISO 20121">ISO 20121</option>
            <option value="LEED">LEED</option>
          </select>
        </div>

        <button
          type="button" // Change type to button to prevent form submission
          onClick={handleDownload} // Call the download function on click
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          DOWNLOAD ANALYSIS REPORT
        </button>
      </form>
    </div>
  );
};

export default CarbonFootprint;
