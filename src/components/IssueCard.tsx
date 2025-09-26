import clsx from "clsx";

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
  const impactClass = clsx({
    "border-yellow-500": issue.impact === "minor",
    "border-orange-500": issue.impact === "moderate",
    "border-red-500": issue.impact === "serious",
    "border-purple-500": issue.impact === "critical",
    "border-gray-500": !issue.impact,
  });

  return (
    <article
      className={clsx(
        "themed-bg card w-full max-w-full min-w-[150px]",
        impactClass
      )}
    >
      <header className="mb-1">
        <h2
          className={`text-lg font-semibold break-all whitespace-pre-wrap max-w-full`}
        >
          {issue.message}
        </h2>
        {issue.impact && <span className="">{issue.impact}</span>}
      </header>
      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 break-words whitespace-pre-wrap">
        {issue.code}
      </p>

      <a
        href={
          issue.helpUrl || "https://www.w3.org/WAI/standards-guidelines/wcag/"
        }
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
      >
        Learn more
      </a>

      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 break-all">
        <strong>Selector:</strong> {issue.selector}
      </div>
    </article>
  );
}
