"use client";

import { useId } from "react";

export default function LabelingDemo() {
  const goodId = useId();
  return (
    <div className="labeling-demo">
      <div className="labeling-demo__panel labeling-demo__panel--correct">
        <p className="labeling-demo__status labeling-demo__status--correct">✓ Correct</p>
        <div className="labeling-demo__field">
          <label className="labeling-demo__label" htmlFor={goodId}>
            Email address
          </label>
          <input
            className="labeling-demo__input"
            id={goodId}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="labeling-demo__panel labeling-demo__panel--incorrect">
        <p className="labeling-demo__status labeling-demo__status--incorrect">✗ No label</p>
        <div className="labeling-demo__field">
          <div className="labeling-demo__spacer" aria-hidden="true" />
          <input
            className="labeling-demo__input labeling-demo__input--error"
            type="email"
            placeholder="Email address (placeholder only)"
            aria-label="bad example input"
          />
        </div>
      </div>
    </div>
  );
}
