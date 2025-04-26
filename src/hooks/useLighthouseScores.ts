"use client";

import { useEffect, useState } from "react";

export function useLighthouseScores(siteUrl: string | number | boolean) {
  const [scores, setScores] = useState<{
    performance: number;
    accessibility: number;
    seo: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteUrl) return; // Skip if siteUrl is not ready

    async function fetchScores() {
      setLoading(true);
      setError(null);

      // ✅ Check localStorage first
      const cachedScores = localStorage.getItem(`lighthouse-${siteUrl}`);
      if (cachedScores) {
        console.log("Loaded Lighthouse scores from cache");
        setScores(JSON.parse(cachedScores));
        setLoading(false);
        return;
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

        // ✅ Cache the results
        localStorage.setItem(`lighthouse-${siteUrl}`, JSON.stringify(data));
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
