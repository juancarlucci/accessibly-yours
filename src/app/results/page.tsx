"use client";

import React, { useEffect, useState, useMemo } from "react";

export default function ResultsPage(): React.JSX.Element {
  const [url, setUrl] = useState<string>("Unknown site");

  // Define the structure of each issue returned from the audit API
  interface Issue {
    id: string;
    description: string;
    helpUrl: string;
    selector: string;
    code: string;
    message: string;
    impact?: string; // * optionally present impact level
  }

  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // * loading state
  const [urlError, setUrlError] = useState<string | null>(null); // * error state for invalid URL
  const [selectedImpact, setSelectedImpact] = useState<string>("all"); // * impact filter
  const [searchTerm, setSearchTerm] = useState<string>(""); // * search filter

  // * Basic URL validation function
  function isValidUrl(userInput: string): boolean {
    try {
      new URL(userInput);
      return true;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const site = params.get("site");

    if (!site) {
      console.warn("No URL provided for audit.");
      setLoading(false);
      return;
    }

    if (!isValidUrl(site)) {
      console.warn("Invalid URL:", site);
      setUrlError(
        "❌ The provided URL is not valid. Please check it and try again."
      );
      setLoading(false);
      return;
    }

    setUrl(site);

    async function fetchData() {
      try {
        const result = await fetch(
          `https://audit-api-fly-01.fly.dev/audit?url=${encodeURIComponent(
            site || ""
          )}`
        );
        const jsonData = await result.json();
        console.log("Raw audit response:", jsonData); // * useful for debugging
        setIssues(
          (Array.isArray(jsonData.issues) ? jsonData.issues : []).map((i) => ({
            ...i,
            impact: i.impact || "undefined",
          }))
        );
      } catch (err) {
        console.error("Error fetching audit results:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // * Helper for styled impact badge
  const renderImpactBadge = (impact?: string) => {
    const colors = {
      minor: "bg-yellow-100 text-yellow-700",
      moderate: "bg-orange-100 text-orange-700",
      serious: "bg-red-100 text-red-700",
      critical: "bg-purple-100 text-purple-700",
      undefined: "bg-gray-100 text-gray-700",
    };
    const badgeStyle =
      colors[impact as keyof typeof colors] || "bg-gray-100 text-gray-700";
    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded ${badgeStyle}`}
      >
        {impact}
      </span>
    );
  };

  // * Count summary for each impact level
  const issueCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    (issues || []).forEach((i) => {
      const level = i.impact || "undefined";
      counts[level] = (counts[level] || 0) + 1;
    });
    return counts;
  }, [issues]);

  // * Filtered issues based on selected impact and search
  const filteredIssues = useMemo(() => {
    return (issues || []).filter((issue) => {
      const matchesImpact =
        selectedImpact === "all" || issue.impact === selectedImpact;
      const matchesSearch =
        issue.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.selector.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesImpact && matchesSearch;
    });
  }, [issues, selectedImpact, searchTerm]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        🧪 Accessibility Audit Results
      </h1>
      <p className="text-lg mb-8">
        Scanned URL: <strong>{url}</strong>
      </p>

      <div className="bg-white shadow-md rounded-lg p-6">
        {urlError ? (
          <p className="text-red-600 font-semibold">{urlError}</p>
        ) : loading ? (
          <p className="text-gray-500">Loading results...</p>
        ) : Array.isArray(issues) && issues.length > 0 ? (
          <>
            {/* Filter Controls */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
              <select
                className="border rounded px-3 py-2"
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="serious">Serious</option>
                <option value="moderate">Moderate</option>
                <option value="minor">Minor</option>
                <option value="undefined">Undefined</option>
              </select>
              <input
                type="text"
                className="border rounded px-3 py-2 flex-1"
                placeholder="Search message or selector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Summary Counts */}
            <div className="mb-4 flex flex-wrap gap-2">
              {Object.entries(issueCounts).map(([level, count]) => (
                <span
                  key={level}
                  className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700"
                >
                  {level}: {count}
                </span>
              ))}
            </div>

            {/* Filtered Issues List */}
            <section className="mt-6 grid gap-4 md:grid-cols-2">
              {filteredIssues.map((issue, idx) => (
                <article
                  key={idx}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md overflow-hidden" // Added overflow-hidden
                >
                  <header className="mb-1">
                    <h2 className="text-lg font-semibold text-purple-700 break-all whitespace-pre-wrap max-w-full">
                      {/* Updated classes */}
                      {issue.code}
                    </h2>
                    <div className="mt-1">
                      {renderImpactBadge(issue.impact)}
                    </div>
                  </header>
                  <p className="text-sm text-gray-700 mb-2">{issue.message}</p>

                  {issue.helpUrl && (
                    <a
                      href={issue.helpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      Learn more
                    </a>
                  )}

                  <div className="mt-2 text-xs text-gray-500 break-all">
                    <strong>Selector:</strong> {issue.selector}
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : !loading ? (
          <p className="text-red-600 font-semibold">
            ⚠️ Could not retrieve valid issues. Please check the URL.
          </p>
        ) : null}

        {url === "Unknown site" && !loading && (
          <p className="mt-6 text-red-600 font-semibold">
            ⚠️ No URL provided. Please return to home and enter one.
          </p>
        )}
      </div>
    </main>
  );
}
