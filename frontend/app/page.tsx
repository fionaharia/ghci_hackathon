"use client";
import { NextUIProvider } from "@nextui-org/system";
import Navbar from "@/components/Navbar";
import HeroPage from "./hero/page";
import Panel from "./sustainabilitypanel/page";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background"> 
        <Navbar className="top-2" />
        <HeroPage />
      </main>
    </NextUIProvider>
  );
}
