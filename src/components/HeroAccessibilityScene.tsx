"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroAccessibilityScene(): React.JSX.Element {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 20%"],
  });

  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(38px) contrast(0.6)", "blur(0px) contrast(1.2)"]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <div ref={ref}>
      {/* Section 1: High-Contrast/Clarity */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500">
        <motion.h1
          style={{ filter, opacity }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight max-w-4xl px-4"
        >
          Accessibility is <br /> about clarity
        </motion.h1>
        <motion.p
          style={{ filter, opacity }}
          className="mt-8 text-xl md:text-2xl text-white/70 font-medium max-w-xl px-6"
        >
          Keep scrolling to see how clarity empowers every choice.
        </motion.p>
      </section>
    </div>
  );
}
