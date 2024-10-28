"use client";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";


export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Green venue suggestions near me!",
    "Transport options to reduce emissions?",
    "What's the carbon footprint of my event?",
    "Can you suggest local eco-vendors?",
    "Need help with zero-waste decorations!",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
