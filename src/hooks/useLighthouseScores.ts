"use client";

import { useEffect, useState } from "react";
import { getFromCache } from "@/utils/cache";

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

    // TEMP DISABLE
    console.log("[Lighthouse] Skipping fetch for now.");
    return;
    async function fetchScores() {
      setLoading(true);
      setError(null);

      // ✅ Check localStorage for Lighthouse with expiry
      const cachedScores = getFromCache<{
        performance: number;
        accessibility: number;
        seo: number;
      }>(`lighthouse-${siteUrl}`, 5);
      if (cachedScores) {
        console.log("Loaded Lighthouse scores from cache");
        setScores(cachedScores);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/check-lighthouse?url=${encodeURIComponent(siteUrl || "")}`
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
