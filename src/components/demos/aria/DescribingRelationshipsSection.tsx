"use client";

import { useState } from "react";
import CodeBlock from "@/components/utility/CodeBlock";

const code = `<input
  type="password"
  aria-describedby="pw-hint"
/>
<p id="pw-hint">
  Must be at least 8 characters and include a number.
</p>`;

export default function DescribingRelationshipsSection() {
  const [focused, setFocused] = useState(false);

  return (
    <div className="describedby-demo">
      <div className="describedby-demo__video-wrap">
        <iframe
          src="https://www.youtube.com/embed/T-37JIwbLbY"
          title="aria-describedby: Describing Relationships"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="describedby-demo__panels">
        {/* Live demo */}
        <div className="describedby-demo__panel">
          <p className="describedby-demo__panel-label">Live demo</p>
          <div className="describedby-demo__field">
            <label htmlFor="pw-demo" className="describedby-demo__label">
              Password
            </label>
            <input
              id="pw-demo"
              type="password"
              className="describedby-demo__input"
              aria-describedby="pw-hint-demo"
              placeholder="••••••••"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <p id="pw-hint-demo" className="describedby-demo__hint">
              Must be at least 8 characters and include a number.
            </p>
          </div>
          <p
            className={`describedby-demo__announcement${focused ? " describedby-demo__announcement--active" : ""}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {focused ? (
              <>
                Screen reader announces:{" "}
                <strong>
                  &ldquo;Password. Must be at least 8 characters and include a
                  number.&rdquo;
                </strong>
              </>
            ) : (
              "Focus the input above to see what a screen reader would announce."
            )}
          </p>
        </div>

        {/* Code */}
        <div className="describedby-demo__panel">
          <p className="describedby-demo__panel-label">The markup</p>
          <CodeBlock>{code}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
