import { cn } from "@/utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid"
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export function BentoGridSecondDemo() {
  return (
    <div className="h-screen flex flex-col top-0 md:flex-row w-full dark:bg-black bg-white dark:bg-grid-white/[0.09] bg-grid-black/[0.1] justify-center">
      <div className="pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
            backgroundImage={item.backgroundImage}  // Pass background image
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const Skeleton = ({ backgroundImage }: { backgroundImage?: string }) => (
  <div
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"
    style={{
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  ></div>
);

const items = [
  {
    title: "Venue Finder with Map Integration",
    description: "Easily search and filter based on sustainability credentials, renewable energy access, and other green criteria.",
    header: <Skeleton backgroundImage="/map.jpg" />,  
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    backgroundImage: "/map.jpg"
  },
  {
    title: "Materials Selection",
    description: "Choose sustainable decor and furniture, each rated for eco-friendliness.",
    header: <Skeleton backgroundImage="/mat.jpg" />,  
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    backgroundImage: "/map.jpg"
  },
  {
    title: "Waste Management Options",
    description: "Select waste disposal methods like recycling or composting, complete with environmental impact insights.",
    header: <Skeleton backgroundImage="/waste.jpg" />,  
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    backgroundImage: "/map.jpg"
  },
  {
    title: "Energy Source Selector",
    description:
      "Opt for renewable energy sources such as solar or wind based on venue location, with estimates for cost savings and environmental impact.",
    header: <Skeleton backgroundImage="/energy.png" />,  
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    backgroundImage: "/map.jpg"
  },
];
