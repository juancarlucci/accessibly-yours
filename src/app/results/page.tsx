"use client";

import React, { useEffect, useState } from "react";
import IssueCard, { Issue } from "@/components/IssueCard";
import Controls from "@/components/Controls";
import ExportButtons from "@/components/ExportButtons";

export default function ResultsPage(): React.JSX.Element {
  const [url, setUrl] = useState<string>("Unknown site");

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

    async function fetchData() {
      try {
        const result = await fetch(
          `https://audit-api-fly-01.fly.dev/audit?url=${encodeURIComponent(
            site || ""
          )}`
        );

        if (result.status === 429) {
          //* Rate limit response from backend
          setUrlError(
            "🚫 Too many requests. Please wait a few minutes before trying again."
          );
          setLoading(false);
          return;
        }

        const jsonData = await result.json();
        setIssues(Array.isArray(jsonData.issues) ? jsonData.issues : []);
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
        ) : issues && issues.length > 0 ? (
          <>
            <div className="mb-6">
              <Controls
                selectedImpact={selectedImpact}
                searchTerm={searchTerm}
                setSelectedImpact={setSelectedImpact}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <ExportButtons issues={filteredIssues} />
            <section className="mt-6 grid gap-4 md:grid-cols-2">
              {filteredIssues.map((issue, idx) => (
                <IssueCard key={idx} issue={issue} />
              ))}
            </section>
          </>
        ) : (
          <p className="text-green-600 font-semibold">
            ✅ No accessibility issues detected or no results to show.
          </p>
        )}
      </div>
    </main>
  );
}
