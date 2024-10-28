import React from "react";
import { EvervaultCard, Icon } from "./ui/evervault-card"

export function EvervaultCardDemo() {
  return (
    <div className="border-2 border-blue-900 text-center flex mx-auto flex-col items-start w-[20rem] p-2 relative h-[10rem] ">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
      <EvervaultCard text="Get started" />
    </div>
  );
}
