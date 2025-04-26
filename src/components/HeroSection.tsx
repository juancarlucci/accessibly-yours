"use client";

import React from "react";

interface HeroSectionProps {
  onCallToAction?: () => void;
}

export default function HeroSection({
  onCallToAction,
}: HeroSectionProps): React.JSX.Element {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
        Create What Everyone Wants
      </h1>
      <p className="text-lg md:text-xl readable-width">
        Accessibility lets you design experiences users truly crave.
      </p>
      <p className="text-lg md:text-xl readable-width mb-8">
        Explore. Learn. Improve—on your terms.
      </p>
      <button
        onClick={onCallToAction}
        aria-label="Scroll to website scanner input"
        className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Audit My Site
      </button>
    </section>
  );
}
