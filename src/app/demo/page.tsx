"use client";

import React, { useState, useMemo } from "react";

export default function DemoResultsPage(): React.JSX.Element {
  const [selectedImpact, setSelectedImpact] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [uiState, setUiState] = useState<
    "normal" | "empty" | "loading" | "error"
  >("normal");

  const allIssues = useMemo(
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

  const colors = {
    minor: "bg-yellow-100 text-yellow-700",
    moderate: "bg-orange-100 text-orange-700",
    serious: "bg-red-100 text-red-700",
    critical: "bg-purple-100 text-purple-700",
    undefined: "bg-gray-100 text-gray-700",
  };

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

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        🧪 Accessibility Demo Panel
      </h1>

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

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Severity legend:</strong>
        </p>
        <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
          <li>
            <strong>Critical:</strong> Major blockers (e.g., no alt text, no
            keyboard access)
          </li>
          <li>
            <strong>Serious:</strong> Severe usability issues (e.g., missing
            labels)
          </li>
          <li>
            <strong>Moderate:</strong> Impacts some users (e.g., contrast
            issues)
          </li>
          <li>
            <strong>Minor:</strong> Small enhancements (e.g., link clarity)
          </li>
          <li>
            <strong>Undefined:</strong> Issue doesn’t have a severity assigned
          </li>
        </ul>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
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
        <section className="grid gap-4 md:grid-cols-2">
          {filteredIssues.map((issue, idx) => (
            <article
              key={idx}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md overflow-hidden"
            >
              <header className="mb-1 break-words">
                <h2 className="text-lg font-semibold text-purple-700 break-all max-w-full whitespace-pre-wrap">
                  {issue.code}
                </h2>
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${
                    colors[issue.impact as keyof typeof colors] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {issue.impact}
                </span>
              </header>
              <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">
                {issue.message}
              </p>

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
      )}
    </main>
  );
}
