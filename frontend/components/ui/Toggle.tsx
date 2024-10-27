"use client";
import React from "react";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

const Toggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button className="border-2 border-black dark:border-white rounded-full p-[6px]"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}>
      {theme === "light" ? (
        <RiMoonLine/>
      ) : (
        <RiSunLine/>
      )}
    </button>
  );
};

export default Toggle;