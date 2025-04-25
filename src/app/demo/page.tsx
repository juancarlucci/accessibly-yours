// src/pages/demo.tsx
"use client";

import React, { useState, useMemo } from "react";
import IssueCard, { Issue } from "@/components/IssueCard";
import Controls from "@/components/Controls";
import Link from "next/link";

export default function DemoResultsPage(): React.JSX.Element {
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [uiState, setUiState] = useState<
    "normal" | "empty" | "loading" | "error"
  >("normal");

  const allIssues: Issue[] = useMemo(
    () => [
      {
        id: "1",
        code: "WCAG2AA.1.1.1.H37",
        message: "Image element missing alt attribute.",
        selector: "img.logo",
        helpUrl:
          "https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI",
        description: "Add meaningful alt text to images.",
        impact: "critical",
      },
      {
        id: "2",
        code: "WCAG2AA.1.3.1.F68",
        message: "Form field missing label.",
        selector: "input#email",
        helpUrl:
          "https://dequeuniversity.com/rules/axe/4.8/label?application=axeAPI",
        description: "Ensure all form fields have associated labels.",
        impact: "serious",
      },
      {
        id: "3",
        code: "WCAG2AA.1.4.3.G18",
        message: "Text does not meet contrast ratio requirements.",
        selector: ".low-contrast",
        helpUrl:
          "https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI",
        description: "Adjust color contrast to meet WCAG standards.",
        impact: "moderate",
      },
      {
        id: "4",
        code: "WCAG2AA.2.4.4.H77",
        message: "Link text is not descriptive.",
        selector: "a.more-info",
        helpUrl:
          "https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI",
        description: "Make link text meaningful.",
        impact: "minor",
      },
      {
        id: "5",
        code: "CUSTOM.ARIA.ROLE",
        message: "Custom component uses an invalid ARIA role.",
        selector: "x-foo[role=magic]",
        helpUrl:
          "https://dequeuniversity.com/rules/axe/4.8/aria-roles?application=axeAPI",
        description: "Use valid ARIA roles only.",
        impact: "undefined",
      },
    ],
    []
  );

  const filteredIssues = useMemo(() => {
    const dataset = uiState === "normal" ? allIssues : [];
    return dataset.filter((issue) => {
      const matchesImpact =
        selectedImpact === "all" || issue.impact === selectedImpact;
      const matchesSearch =
        issue.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.selector.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesImpact && matchesSearch;
    });
  }, [allIssues, selectedImpact, searchTerm, uiState]);

  function handleDownloadCSV() {
    if (!filteredIssues.length) return;
    const header = Object.keys(filteredIssues[0]).join(",");
    const rows = filteredIssues.map((issue) =>
      Object.values(issue)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\n");
    downloadFile("issues.csv", csv);
  }

  function handleDownloadJSON() {
    const json = JSON.stringify(filteredIssues, null, 2);
    downloadFile("issues.json", json);
  }

  function downloadFile(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <main className="bg-gray-50 text-gray-800 px-6 py-16 min-h-screen">
      {/* Back to Home Button */}
      <div className="mb-6">
        <Link href="/">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm">
            ← Back to Home
          </button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        🧪 Explore Accessibility Issues Your Way
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl">
        Dive into a sample scan and discover how small changes can make a big
        impact—filter, export, and learn at your own pace.
      </p>

      {/* UI State Toggle Buttons */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {["normal", "empty", "loading", "error"].map((state) => (
          <button
            key={state}
            onClick={() => setUiState(state as typeof uiState)}
            className={`px-3 py-1 rounded text-sm border transition ${
              uiState === state
                ? "bg-purple-100 text-purple-700 border-purple-300"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {state}
          </button>
        ))}
      </div>

      {/* Export Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleDownloadCSV}
          className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700 text-sm"
        >
          Export CSV
        </button>
        <button
          onClick={handleDownloadJSON}
          className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 text-sm"
        >
          Export JSON
        </button>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Severity legend:</strong>
        </p>
        <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
          <li className="[&::marker]:text-purple-700">
            <strong>Critical:</strong> Major blockers (e.g., no alt text, no
            keyboard access)
          </li>
          <li className="[&::marker]:text-red-700">
            <strong>Serious:</strong> Severe usability issues (e.g., missing
            labels)
          </li>
          <li className="[&::marker]:text-orange-700">
            <strong>Moderate:</strong> Impacts some users (e.g., contrast
            issues)
          </li>
          <li className="[&::marker]:text-yellow-700">
            <strong>Minor:</strong> Small enhancements (e.g., link clarity)
          </li>
          <li className="[&::marker]:text-gray-700">
            <strong>Undefined:</strong> Issue doesn’t have a severity assigned
          </li>
        </ul>

        <Controls
          selectedImpact={selectedImpact}
          searchTerm={searchTerm}
          setSelectedImpact={setSelectedImpact}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Loading/Error/Empty States */}
      {uiState === "loading" ? (
        <p className="text-gray-500">🔄 Loading simulated results...</p>
      ) : uiState === "error" ? (
        <p className="text-red-600 font-semibold">
          ❌ Simulated error fetching issues. Please try again.
        </p>
      ) : filteredIssues.length === 0 ? (
        <p className="text-green-600 font-semibold">
          ✅ No issues to display (simulated empty state).
        </p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </section>
      )}
    </main>
  );
}
