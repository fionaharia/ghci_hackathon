"use client";
import { NextUIProvider } from "@nextui-org/system";
import Navbar from "@/components/Navbar";
import HeroPage from "./hero/page";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background pt-20"> {/* Add padding top */}
        <Navbar className="top-2" />
        <HeroPage />
      </main>
    </NextUIProvider>
  );
}
