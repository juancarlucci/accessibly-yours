"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroAccessibilityScene(): React.JSX.Element {
  // * Create ref for scroll tracking target
  const ref = useRef(null);

  // * Track scroll progress relative to the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 40%"],
  });

  // * Animate combined filter: blur + contrast
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(18px) contrast(0.6)", "blur(0px) contrast(1.2)"]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-400"
    >
      <motion.h1
        style={{ filter, opacity }}
        className="text-6xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight max-w-4xl px-4"
      >
        Accessibility is <br /> about clarity
      </motion.h1>

      <motion.p className="mt-8 text-xl md:text-2xl text-white/70 font-medium max-w-xl px-6">
        Scroll down to remove the blur and reveal what everyone deserves: clear,
        inclusive experiences.
      </motion.p>

      {/* Wavy SVG divider at the bottom */}
      <svg
        className="absolute bottom-0 w-full h-24 text-white"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,160C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
    </section>
  );
}
