"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Controls from "@/components/Controls";
import IssueCard, { Issue } from "@/components/IssueCard";
import clsx from "clsx";

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
    return dataset.filter(
      (issue) =>
        (selectedImpact === "all" || issue.impact === selectedImpact) &&
        [issue.code, issue.message, issue.selector].some((text) =>
          text.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [allIssues, selectedImpact, searchTerm, uiState]);

  function downloadFile(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <main className="themed-bg px-6 py-16 pt-24">
      <div className="mb-6">
        <Link href="/">
          <button className="btn btn-subtle">← Back to Home</button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-4">
        🧪 Explore Accessibility Issues Your Way
      </h1>
      <p className="text-lg mb-6 max-w-2xl">
        Dive into a sample scan and discover how small changes can make a big
        impact—filter, export, and learn at your own pace.
      </p>

      <div className="mb-6 flex gap-2 flex-wrap">
        {["normal", "empty", "loading", "error"].map((state) => (
          <button
            key={state}
            onClick={() => setUiState(state as typeof uiState)}
            className={clsx(
              uiState === state ? "btn btn-active" : "btn btn-subtle"
            )}
          >
            {state}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => downloadFile("issues.csv", toCSV(filteredIssues))}
          className="btn btn-primary"
        >
          Export CSV
        </button>
        <button
          onClick={() => downloadFile("issues.json", toJSON(filteredIssues))}
          className="btn btn-secondary"
        >
          Export JSON
        </button>
      </div>

      <div className="mb-6">
        <p className="text-sm mb-2">
          <strong>Severity legend:</strong>
        </p>
        <ul className="text-sm list-disc list-inside mb-4">
          <li className="[&::marker]:text-purple-700 dark:[&::marker]:text-purple-300">
            <strong>Critical:</strong> Major blockers (e.g., no alt text)
          </li>
          <li className="[&::marker]:text-red-700 dark:[&::marker]:text-red-400">
            <strong>Serious:</strong> Severe usability issues
          </li>
          <li className="[&::marker]:text-orange-700 dark:[&::marker]:text-orange-400">
            <strong>Moderate:</strong> Contrast or grouping issues
          </li>
          <li className="[&::marker]:text-yellow-700 dark:[&::marker]:text-yellow-300">
            <strong>Minor:</strong> Link clarity, alt extras
          </li>
          <li className="[&::marker]:text-gray-700 dark:[&::marker]:text-gray-400">
            <strong>Undefined:</strong> Custom or unknown checks
          </li>
        </ul>

        <Controls
          selectedImpact={selectedImpact}
          searchTerm={searchTerm}
          setSelectedImpact={setSelectedImpact}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {uiState === "loading" ? (
        <p>🔄 Loading simulated results...</p>
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

  function toCSV(data: Issue[]): string {
    if (!data.length) return "";
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((issue) =>
      Object.values(issue)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    );
    return [header, ...rows].join("\n");
  }

  function toJSON(data: Issue[]): string {
    return JSON.stringify(data, null, 2);
  }
}
