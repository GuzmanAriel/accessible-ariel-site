"use client";

import { useState, useRef } from "react";
import CodeBlock from "@/components/utility/CodeBlock";

const ALL_RESULTS = [
  "aria-expanded",
  "aria-hidden",
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-live",
  "aria-atomic",
  "aria-required",
  "aria-invalid",
  "aria-checked",
  "aria-selected",
  "aria-haspopup",
  "aria-controls",
  "aria-disabled",
];

const code = `// polite — waits for current speech to finish
<div role="status" aria-live="polite" aria-atomic="true">
  {count !== null && \`Showing \${count} results\`}
</div>

// assertive — interrupts immediately (use sparingly)
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>`;

export default function LiveRegionDemo() {
  const [query, setQuery] = useState("");
  const [announced, setAnnounced] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = query.trim()
    ? ALL_RESULTS.filter((r) => r.includes(query.toLowerCase().trim()))
    : ALL_RESULTS;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const count = val.trim()
        ? ALL_RESULTS.filter((r) => r.includes(val.toLowerCase().trim())).length
        : ALL_RESULTS.length;
      setAnnounced(`Showing ${count} result${count !== 1 ? "s" : ""}`);
    }, 400);
  }

  return (
    <div className="live-region-demo">
      <div className="live-region-demo__panels">
        {/* Live demo */}
        <div className="live-region-demo__panel">
          <p className="live-region-demo__panel-label">Live demo — type to filter</p>

          <div className="live-region-demo__search-wrap">
            <label htmlFor="aria-search" className="live-region-demo__search-label">
              Search ARIA attributes
            </label>
            <input
              id="aria-search"
              type="search"
              className="live-region-demo__search-input"
              value={query}
              onChange={handleChange}
              placeholder="e.g. label"
              autoComplete="off"
            />
          </div>

          {/* The live region — screen readers will announce changes here */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="live-region-demo__status"
          >
            {announced}
          </div>

          <ul className="live-region-demo__results" role="list">
            {filtered.length > 0 ? (
              filtered.map((r) => (
                <li key={r} className="live-region-demo__result">
                  <code>{r}</code>
                </li>
              ))
            ) : (
              <li className="live-region-demo__result live-region-demo__result--empty">
                No results
              </li>
            )}
          </ul>

          {/* Visual indicator of what's being announced */}
          <div className="live-region-demo__indicator">
            <span className="live-region-demo__indicator-dot" aria-hidden="true" />
            <span className="live-region-demo__indicator-label">
              aria-live region will announce:{" "}
              <strong>{announced || "—"}</strong>
            </span>
          </div>
        </div>

        {/* Code */}
        <div className="live-region-demo__panel">
          <p className="live-region-demo__panel-label">The markup</p>
          <CodeBlock>{code}</CodeBlock>
          <div className="live-region-demo__note">
            <span aria-hidden="true">💡</span> Use a screen reader to hear the announcement as
            you type. The result count is read aloud without you navigating to it.
          </div>
        </div>
      </div>
    </div>
  );
}
