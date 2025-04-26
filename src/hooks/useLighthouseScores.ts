"use client";

import { useState, useEffect } from "react";

export function useLighthouseScores(
  siteUrl = "https://accessibly-yours.vercel.app"
) {
  const [scores, setScores] = useState<{
    performance: number;
    accessibility: number;
    seo: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch(
          `/api/check-lighthouse?url=${encodeURIComponent(siteUrl)}`
        );
        if (!res.ok) throw new Error("Failed to fetch Lighthouse scores.");
        const data = await res.json();
        setScores(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, [siteUrl]);

  return { scores, loading, error };
}
