import React from "react";

interface ControlsProps {
  selectedImpact: string;
  searchTerm: string;
  setSelectedImpact: (value: string) => void;
  setSearchTerm: (value: string) => void;
}

export default function Controls({
  selectedImpact,
  searchTerm,
  setSelectedImpact,
  setSearchTerm,
}: ControlsProps): React.JSX.Element {
  return (
    <div className="card p-4 shadow-md mb-6 flex flex-col md:flex-row md:items-center gap-4">
      <label htmlFor="severity-filter" className="sr-only">
        Filter by Severity
      </label>
      <select
        className="btn btn-primary border rounded px-3 py-2"
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
  );
}
