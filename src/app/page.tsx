//* src/app/page.tsx
"use client";
import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import HeroAccessibilityScene from "@/components/HeroAccessibilityScene";
import ScannYours from "@/components/ScannYours";

export default function HomePage(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCallToAction = () => {
    if (inputRef.current) {
      const element = inputRef.current;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const offset = 80;
      
      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth"
      });
      
      setTimeout(() => element.focus(), 500);
    }
  };
  return (
    <>
      {/* Hero Intro */}
      <section className="min-h-screen">
        <HeroSection onCallToAction={handleCallToAction} />
      </section>
      {/* Scroll-Activated Clarity */}
      <section className="min-h-screen">
        <HeroAccessibilityScene />
      </section>
      {/* Interaction Zone */}
      <section className="min-h-screen">
        <ScannYours inputRef={inputRef} />
      </section>
    </>
  );
}
