"use client";

import React, { useEffect, useState } from "react";

export default function ResultsPage(): React.JSX.Element {
  const [url, setUrl] = useState<string>("Unknown site");
  interface Issue {
    id: string;
    description: string;
    helpUrl: string;
    selector: string;
    code: string;
    message: string;
  }

  const [issues, setIssues] = useState<Issue[] | null>(null);

  useEffect(() => {
    //* In static environments (like GH Pages), we access query params from window
    const params = new URLSearchParams(window.location.search);
    const site = params.get("site") || "Unknown site";
    setUrl(site);

    async function fetchData() {
      try {
        const result = await fetch(
          `https://audit-api-fly-01.fly.dev/audit?url=${encodeURIComponent(
            site
          )}`
        );
        const jsonData = await result.json();
        setIssues(jsonData.issues || jsonData);
      } catch (err) {
        console.error("Error fetching audit results:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        🧪 Accessibility Audit Results
      </h1>
      <p className="text-lg mb-8">
        Scanned URL: <strong>{url}</strong>
      </p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-500">
          {issues && issues.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <h2 className="text-lg font-semibold text-purple-700 mb-1">
                    {issue.code}
                  </h2>
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
                </div>
              ))}
            </div>
          )}
        </p>
      </div>
    </main>
  );
}
