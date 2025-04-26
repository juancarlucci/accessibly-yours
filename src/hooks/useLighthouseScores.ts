"use client";

import { useEffect, useState } from "react";

export function useLighthouseScores(siteUrl: string | null) {
  const [scores, setScores] = useState<{
    performance: number;
    accessibility: number;
    seo: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteUrl) return;

    async function fetchScores() {
      setLoading(true);
      setError(null);

      // ✅ Check localStorage for Lighthouse with expiry
      const cached = localStorage.getItem(`lighthouse-${siteUrl}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        const ageMs = Date.now() - parsed.timestamp;
        const ageDays = ageMs / (1000 * 60 * 60 * 24);

        if (ageDays < 5) {
          console.log("Loaded Lighthouse scores from cache");
          setScores(parsed.data);
          setLoading(false);
          return;
        } else {
          console.log("Cached Lighthouse scores expired, refetching...");
        }
      }

      try {
        const res = await fetch(
          `/api/check-lighthouse?url=${encodeURIComponent(siteUrl)}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch Lighthouse scores");
        }
        const data = await res.json();
        setScores(data);

        // ✅ Save to cache with timestamp
        const now = Date.now();
        localStorage.setItem(
          `lighthouse-${siteUrl}`,
          JSON.stringify({ data, timestamp: now })
        );
      } catch (err: unknown) {
        console.error("Error fetching Lighthouse scores:", err);
        setError("Failed to fetch Lighthouse scores");
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, [siteUrl]);

  return { scores, loading, error };
}
