"use client";

import UrlScanner from "./UrlScanner";
import { useState } from "react";
import { useLighthouseScores } from "@/hooks/useLighthouseScores";
import Link from "next/link";
import { RefObject } from "react";

function ScannYours({ inputRef }: { inputRef?: RefObject<HTMLInputElement> }) {
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);
  const { scores, loading, error } = useLighthouseScores(
    scannedUrl ?? "https://accessibly-yours.vercel.app"
  );

  return (
    <section className="min-h-[100vh] bg-white text-gray-800 py-20 px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        See Accessibility Through Your Eyes
      </h2>
      <p className="text-lg max-w-2xl mx-auto mb-2">
        Small choices, like color contrast, shape experiences for millions—over
        8% of men face color vision challenges daily.
      </p>
      <p className="text-lg max-w-2xl mx-auto mb-10">
        Scan your site to uncover opportunities you’ll want to explore.
      </p>

      <div className="max-w-xl mx-auto mb-16">
        <UrlScanner
          inputRef={inputRef}
          onScanSuccess={(url) => setScannedUrl(url)}
        />
      </div>

      {/* Lighthouse Scores */}
      {scannedUrl && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">
            Site Quality Snapshot
          </h3>
          {loading ? (
            <p>Fetching scores...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : scores ? (
            <div className="flex flex-wrap gap-4 justify-center text-lg">
              <div className="bg-purple-100 text-purple-800 rounded-lg px-4 py-2">
                Performance: {scores.performance}%
              </div>
              <div className="bg-purple-100 text-purple-800 rounded-lg px-4 py-2">
                Accessibility: {scores.accessibility}%
              </div>
              <div className="bg-purple-100 text-purple-800 rounded-lg px-4 py-2">
                SEO: {scores.seo}%
              </div>
            </div>
          ) : null}
        </div>
      )}

      <p className="text-base font-medium text-gray-500 mt-16 mb-4">
        Just curious?
      </p>
      <Link href="/demo">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-lg font-medium">
          Try the Demo Now
        </button>
      </Link>
      <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
        Our demo lets you explore a sample scan and see the impact of
        accessibility fixes.
      </p>
    </section>
  );
}

export default ScannYours;
