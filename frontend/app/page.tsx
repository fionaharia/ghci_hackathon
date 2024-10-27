"use client";
import { NextUIProvider } from "@nextui-org/system";
import Navbar from "@/components/Navbar";
import Homepage from "./homepage/page";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background pt-20"> {/* Add padding top */}
        <Navbar className="top-2" />
        <Homepage />
      </main>
    </NextUIProvider>
  );
}
