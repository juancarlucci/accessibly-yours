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
  const impact = (issue.impact?.toLowerCase() || "undefined") as
    | "minor"
    | "moderate"
    | "serious"
    | "critical"
    | "undefined";

  return (
    <article className="themed-bg card">
      <header className="mb-1">
        <h2
          className={`text-lg font-semibold break-all whitespace-pre-wrap max-w-full`}
        >
          {issue.message}
        </h2>
        {issue.impact && <span className="">{issue.impact}</span>}
      </header>
      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 whitespace-pre-wrap">
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
