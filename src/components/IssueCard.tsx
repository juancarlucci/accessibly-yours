import React from "react";

// Define the Issue interface
export interface Issue {
  id: string;
  description: string;
  helpUrl: string;
  selector: string;
  code: string;
  message: string;
  impact?: string;
}

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({
  issue,
}: IssueCardProps): React.JSX.Element {
  // * Map impact level to color classes
  const colors = {
    minor: "bg-yellow-100 text-yellow-700",
    moderate: "bg-orange-100 text-orange-700",
    serious: "bg-red-100 text-red-700",
    critical: "bg-purple-100 text-purple-700",
    undefined: "bg-gray-100 text-gray-700",
  };

  const badgeStyle =
    colors[issue.impact as keyof typeof colors] || "bg-gray-100 text-gray-700";

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md overflow-hidden">
      <header className="mb-1">
        <h2 className="text-lg font-semibold text-purple-700 break-all whitespace-pre-wrap max-w-full">
          {issue.code}
        </h2>
        {issue.impact && (
          <span
            className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${badgeStyle}`}
          >
            {issue.impact}
          </span>
        )}
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
  );
}
