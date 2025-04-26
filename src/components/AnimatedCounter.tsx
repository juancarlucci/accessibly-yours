"use client";

import { useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 1.2,
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, { duration });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, to, duration]);

  return <span>{display}%</span>;
}
