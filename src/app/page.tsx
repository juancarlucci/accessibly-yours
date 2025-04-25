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
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => inputRef.current?.focus(), 500);
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
