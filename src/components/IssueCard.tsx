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
    minor: "text-yellow-700 border-yellow-700",
    moderate: "text-orange-700 border-orange-700",
    serious: "text-red-700 border-red-700",
    critical: "text-purple-700 border-purple-700",
    undefined: "text-gray-700 border-gray-700",
  };

  const badgeStyle =
    colors[issue.impact as keyof typeof colors] ||
    "text-gray-700 border-gray-700";

  return (
    <article
      className={`rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md overflow-hidden border-l-4 ${badgeStyle}`}
    >
      <header className="mb-1">
        <h2 className="text-lg font-semibold text-purple-700 break-all whitespace-pre-wrap max-w-full">
          {issue.message}
        </h2>
        {issue.impact && (
          <span
            className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded bg-gray-100 ${badgeStyle}`}
          >
            {issue.impact}
          </span>
        )}
      </header>
      <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">
        {issue.code}
      </p>

      <a
        href={
          issue.helpUrl || "https://www.w3.org/WAI/standards-guidelines/wcag/"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 underline hover:text-blue-800"
      >
        Learn more
      </a>

      <div className="mt-2 text-xs text-gray-500 break-all">
        <strong>Selector:</strong> {issue.selector}
      </div>
    </article>
  );
}
