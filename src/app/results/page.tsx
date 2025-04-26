"use client";

import React, { useEffect, useState } from "react";
import IssueCard, { Issue } from "@/components/IssueCard";
import Controls from "@/components/Controls";
import ExportButtons from "@/components/ExportButtons";
import Link from "next/link";
import { useLighthouseScores } from "@/hooks/useLighthouseScores";
import AnimatedCounter from "@/components/AnimatedCounter";
import { getFromCache } from "@/utils/cache";

export default function ResultsPage(): React.JSX.Element {
  const [url, setUrl] = useState<string>("");
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    scores,
    loading: loadingScores,
    error: scoreError,
  } = useLighthouseScores(url && url !== "Unknown site" ? url : "");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const site = params.get("site");

    if (!site) {
      console.warn("No URL provided for audit.");
      setLoading(false);
      return;
    }

    setUrl(site);

    // 1. Check localStorage for cached WCAG audit results
    // ✅ Check localStorage for cached WCAG audit with expiry
    const cachedIssues = getFromCache<Issue[]>(`pa11y-${site}`, 5);
    if (cachedIssues) {
      console.log("Loaded WCAG audit from cache");
      setIssues(cachedIssues);
      setLoading(false);
      return;
    }
    // 2. If not cached, fetch audit
    async function fetchData() {
      try {
        const result = await fetch(
          `https://audit-api-fly-01.fly.dev/audit?url=${encodeURIComponent(
            site || ""
          )}`
        );
        if (result.status === 429) {
          setUrlError(
            "🚫 Too many requests. Please wait a few minutes before trying again."
          );
          setLoading(false);
          return;
        }
        const jsonData = await result.json();
        const issues = Array.isArray(jsonData.issues) ? jsonData.issues : [];
        setIssues(issues);

        // ✅ Save to cache with timestamp
        const now = Date.now();
        localStorage.setItem(
          `pa11y-${site}`,
          JSON.stringify({ data: issues, timestamp: now })
        );
      } catch (err) {
        console.error("Error fetching audit results:", err);
        setUrlError("❌ An error occurred while fetching the audit.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredIssues = (issues || []).filter((issue) => {
    const matchesImpact =
      selectedImpact === "all" || issue.impact === selectedImpact;
    const matchesSearch =
      issue.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.selector.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesImpact && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-purple-100 text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-purple-800 mb-4">
            🧪 Accessibility Audit Results
          </h1>
          <p className="text-lg text-purple-600">
            Scanned URL: <strong>{url}</strong>
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Site Quality Snapshot */}
        {url && url !== "Unknown site" && (
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Site Quality Snapshot
            </h2>
            {loadingScores ? (
              <p className="text-gray-500">Fetching Lighthouse scores...</p>
            ) : scoreError ? (
              <p className="text-red-600">Error: {scoreError}</p>
            ) : scores ? (
              <div className="flex flex-wrap justify-center gap-4">
                <div
                  className={`px-6 py-3 rounded-xl shadow-lg text-lg font-bold transition ${
                    scores.performance > 90
                      ? "bg-green-100 text-green-800 animate-pulse"
                      : "bg-white text-purple-700"
                  }`}
                >
                  Performance: <AnimatedCounter to={scores.performance} />
                </div>
                <div
                  className={`px-6 py-3 rounded-xl shadow-lg text-lg font-bold transition ${
                    scores.accessibility > 90
                      ? "bg-green-100 text-green-800 animate-pulse"
                      : "bg-white text-purple-700"
                  }`}
                >
                  Accessibility: <AnimatedCounter to={scores.accessibility} />
                </div>
                <div
                  className={`px-6 py-3 rounded-xl shadow-lg text-lg font-bold transition ${
                    scores.seo > 90
                      ? "bg-green-100 text-green-800 animate-pulse"
                      : "bg-white text-purple-700"
                  }`}
                >
                  SEO: <AnimatedCounter to={scores.seo} />
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="bg-white shadow-2xl rounded-3xl p-10">
          {urlError ? (
            <p className="text-red-600 font-semibold text-center">{urlError}</p>
          ) : loading ? (
            <p className="text-gray-500 text-center">Loading results...</p>
          ) : issues && issues.length > 0 ? (
            <>
              <div className="mb-8">
                <Controls
                  selectedImpact={selectedImpact}
                  searchTerm={searchTerm}
                  setSelectedImpact={setSelectedImpact}
                  setSearchTerm={setSearchTerm}
                />
              </div>
              <div className="mb-8">
                <ExportButtons issues={filteredIssues} />
              </div>
              <section className="mt-6 grid gap-6 md:grid-cols-2">
                {filteredIssues.map((issue, idx) => (
                  <IssueCard key={idx} issue={issue} />
                ))}
              </section>
            </>
          ) : (
            <p className="text-green-600 font-semibold text-center">
              ✅ No accessibility issues detected or no results to show.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
