"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-10 flex flex-col inset-x-0  max-w-2xl mx-auto z-50", className)}>
      <div>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Browse Venues">
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Generate Layouts">
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Carbon Footprint Calculator">
        </MenuItem>
      </Menu>
      </div>
      
    </div>
  );
};

export default Navbar;
