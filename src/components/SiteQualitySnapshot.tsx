"use client";

import React from "react";
import AnimatedCounter from "./AnimatedCounter";

interface SiteQualitySnapshotProps {
  scores: {
    performance: number;
    accessibility: number;
    seo: number;
  } | null;
  loading: boolean;
  error: string | null;
}

export default function SiteQualitySnapshot({
  scores,
  loading,
  error,
}: SiteQualitySnapshotProps): React.JSX.Element | null {
  if (loading) {
    return (
      <div className="text-center my-10">
        <p className="text-gray-500">Fetching Lighthouse scores...</p>
      </div>
    );
  }

  return (
    <div className="text-center my-12">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Site Quality Snapshot
      </h2>
      {error || !scores ? (
        <p className="text-gray-400">
          Site Quality Snapshot unavailable at this time.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {/* Performance */}
          <div
            className={`px-6 py-4 rounded-2xl shadow-lg text-lg font-bold transition ${
              scores.performance > 90
                ? "bg-green-100 text-green-800 animate-pulse"
                : "bg-white text-purple-700"
            }`}
          >
            Performance: <AnimatedCounter to={scores.performance} />
          </div>

          {/* Accessibility */}
          <div
            className={`px-6 py-4 rounded-2xl shadow-lg text-lg font-bold transition ${
              scores.accessibility > 90
                ? "bg-green-100 text-green-800 animate-pulse"
                : "bg-white text-purple-700"
            }`}
          >
            Accessibility: <AnimatedCounter to={scores.accessibility} />
          </div>

          {/* SEO */}
          <div
            className={`px-6 py-4 rounded-2xl shadow-lg text-lg font-bold transition ${
              scores.seo > 90
                ? "bg-green-100 text-green-800 animate-pulse"
                : "bg-white text-purple-700"
            }`}
          >
            SEO: <AnimatedCounter to={scores.seo} />
          </div>
        </div>
      )}
    </div>
  );
}
