"use client";

import React from "react";

interface HeroSectionProps {
  onCallToAction?: () => void;
}

export default function HeroSection({
  onCallToAction,
}: HeroSectionProps): React.JSX.Element {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
        Build for Everyone
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8">
        Accessibility isn’t an afterthought—it’s a foundation. Discover issues.
        Learn. Fix. Repeat.
      </p>
      <button
        onClick={onCallToAction}
        className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
      >
        Audit My Site
      </button>
    </section>
  );
}
