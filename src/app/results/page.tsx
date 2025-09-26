"use client";

import React, { useEffect, useState } from "react";
import IssueCard, { Issue } from "@/components/IssueCard";
import Controls from "@/components/Controls";
import ExportButtons from "@/components/ExportButtons";
import Link from "next/link";
import { getFromCache } from "@/utils/cache";

export default function ResultsPage() {
  const [url, setUrl] = useState<string>("");
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const site = params.get("site");

    if (!site) {
      console.warn("No URL provided for audit.");
      setLoading(false);
      return;
    }

    setUrl(site);

    //* Check localStorage for cached WCAG audit with expiry
    const cachedIssues = getFromCache<Issue[]>(`pa11y-${site}`, 5);
    if (cachedIssues) {
      console.log("Loaded WCAG audit from cache");
      setIssues(cachedIssues);
      setLoading(false);
      return;
    }
    //* 2. If not cached, fetch audit
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

        //* Save to cache with timestamp
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
    <main className="themed-bg min-h-screen px-6 py-16 pt-24">
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
          <Link href="/" className="btn-subtle">
            ← Back to Home
          </Link>
        </div>
        <div className="shadow-2xl rounded-3xl p-10">
          {urlError ? (
            <p className="text-red-600 font-semibold text-center">{urlError}</p>
          ) : loading ? (
            <div className="text-center flex flex-col items-center gap-6 text-purple-700">
              <svg
                className="animate-spin h-12 w-12 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <p className="text-lg font-medium">
                Running accessibility audit for <strong>{url}</strong>...
              </p>
              <p className="text-sm text-gray-600 max-w-md">
                This real-time audit uses a headless browser to simulate user
                interaction and may take up to 45 seconds.
              </p>
            </div>
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
