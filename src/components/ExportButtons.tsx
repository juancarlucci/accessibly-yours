import React from "react";
import { Issue } from "@/components/IssueCard";

interface ExportButtonsProps {
  issues: Issue[];
}

export default function ExportButtons({
  issues,
}: ExportButtonsProps): React.JSX.Element {
  // * Create and trigger a download of a given content as a file
  function downloadFile(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // * Convert issues to CSV format and download
  function handleDownloadCSV() {
    if (!issues.length) return;
    const header = Object.keys(issues[0]).join(",");
    const rows = issues.map((issue) =>
      Object.values(issue)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\n");
    downloadFile("issues.csv", csv);
  }

  // * Convert issues to JSON format and download
  function handleDownloadJSON() {
    const json = JSON.stringify(issues, null, 2);
    downloadFile("issues.json", json);
  }

  return (
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
  );
}
