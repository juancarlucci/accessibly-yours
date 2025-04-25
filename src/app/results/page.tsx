"use client";

import React, { useEffect, useState } from "react";
import IssueCard, { Issue } from "@/components/IssueCard";
import Controls from "@/components/Controls";
import ExportButtons from "@/components/ExportButtons";
import Link from "next/link";

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
