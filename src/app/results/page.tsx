"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import IssueCard from "@/components/IssueCard";
import Controls from "@/components/Controls";
import ExportButtons from "@/components/ExportButtons";
import Link from "next/link";
import { getFromCache } from "@/utils/cache";

// Define the Issue type according to your API response structure
type Issue = {
  code: string;
  message: string;
  selector: string;
  impact?: string;
  [key: string]: unknown;
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get("site");
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: issues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["audit", site],
    queryFn: async () => {
      if (!site) throw new Error("No URL provided");
      const cachedIssues = getFromCache<Issue[]>(`pa11y-${site}`, 5);
      if (cachedIssues) return cachedIssues;
      const response = await fetch(
        `https://audit-api-fly-01.fly.dev/audit?url=${encodeURIComponent(site)}`
      );
      if (response.status === 429) throw new Error("Too many requests");
      const jsonData = await response.json();
      const issues = Array.isArray(jsonData.issues) ? jsonData.issues : [];
      localStorage.setItem(
        `pa11y-${site}`,
        JSON.stringify({ data: issues, timestamp: Date.now() })
      );
      return issues;
    },
    enabled: !!site,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const filteredIssues: Issue[] = (issues || []).filter((issue: Issue) => {
    const matchesImpact: boolean =
      selectedImpact === "all" || issue.impact === selectedImpact;
    const matchesSearch: boolean =
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
            Scanned URL: <strong>{site || "N/A"}</strong>
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <Link href="/" className="btn btn-secondary px-3 py-2">
            ← Back to Home
          </Link>
        </div>
        <div className="shadow-2xl rounded-3xl p-10">
          {error ? (
            <p className="text-red-600 font-semibold text-center">
              {error.message}
            </p>
          ) : isLoading ? (
            <div className="text-center flex flex-col items-center gap-6 text-purple-700">
              <svg className="animate-spin h-12 w-12 text-purple-500" /* ... */>
                {/* SVG content */}
              </svg>
              <p className="text-lg font-medium">
                Running accessibility audit for <strong>{site}</strong>...
              </p>
            </div>
          ) : issues && issues.length > 0 ? (
            <>
              <Controls
                selectedImpact={selectedImpact}
                searchTerm={searchTerm}
                setSelectedImpact={setSelectedImpact}
                setSearchTerm={setSearchTerm}
              />
              <ExportButtons issues={filteredIssues} />
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
