"use client";

import { useState, useRef, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { useLighthouseScores } from "@/hooks/useLighthouseScores";

interface UrlScannerProps {
  inputRef?: RefObject<HTMLInputElement | null>;
  onScanSuccess?: (url: string) => void;
}

export default function UrlScanner({
  inputRef,
  onScanSuccess,
}: UrlScannerProps): React.JSX.Element {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const localRef = useRef<HTMLInputElement>(null);

  // Only fetch Lighthouse scores if a valid URL is entered
  const { scores, loading, error } = useLighthouseScores(
    url && url !== "Unknown site" ? url : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Scan triggered for URL:", url);
    if (url) {
      const encodedUrl = encodeURIComponent(url);
      router.push(`/results?site=${encodedUrl}`);
      onScanSuccess?.(url);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-w-lg mx-auto mt-12 p-6 rounded-xl shadow-md"
    >
      <label
        htmlFor="url"
        className="block text-xl text-white font-normal my-4"
      >
        Enter a website URL to scan
      </label>
      <input
        id="url"
        type="url"
        required
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        ref={inputRef ?? localRef}
        className="w-full p-3 rounded-lg text-black border border-gray-300 mb-4"
      />
      <button
        type="submit"
        className="bg-white text-black py-2 px-6 rounded-lg transition font-semibold hover:bg-purple-700 hover:text-white"
      >
        🚀 Scan Now
      </button>

      {/* Lighthouse Scores (optional preview before redirect) */}
      {url && (
        <div className="text-center mt-8">
          <h3 className="text-white text-xl font-semibold mb-4">
            Site Quality Snapshot
          </h3>
          {loading ? (
            <p className="text-white">Fetching scores...</p>
          ) : error ? (
            <p className="text-red-300">Error: {error}</p>
          ) : scores ? (
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white text-purple-700 px-4 py-2 rounded-lg shadow">
                Performance: {scores.performance}%
              </div>
              <div className="bg-white text-purple-700 px-4 py-2 rounded-lg shadow">
                Accessibility: {scores.accessibility}%
              </div>
              <div className="bg-white text-purple-700 px-4 py-2 rounded-lg shadow">
                SEO: {scores.seo}%
              </div>
            </div>
          ) : null}
        </div>
      )}
    </form>
  );
}
