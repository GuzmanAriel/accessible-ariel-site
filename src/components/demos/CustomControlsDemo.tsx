"use client";

import { useState, useId } from "react";

export default function CustomControlsDemo() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [toggle, setToggle] = useState(false);
  const toggleId = useId();

  return (
    <div className="custom-controls-demo">
      {/* Star rating */}
      <div>
        <p className="custom-controls-demo__hint">
          Star rating → role=&quot;radiogroup&quot; + role=&quot;radio&quot; +
          arrow key navigation
        </p>
        <div
          className="custom-controls-demo__rating"
          role="radiogroup"
          aria-label="Rate your experience"
        >
          {[1, 2, 3, 4, 5].map((n) => {
            const isFilled = (hovered || rating) >= n;
            return (
              <button
                key={n}
                className="custom-controls-demo__star"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" && rating < 5)
                    setRating((r) => r + 1);
                  if (e.key === "ArrowLeft" && rating > 1)
                    setRating((r) => r - 1);
                }}
                style={{ color: isFilled ? "var(--brand-yellow)" : "var(--border)" }}
              >
                ★
              </button>
            );
          })}
        </div>
        <p
          className="custom-controls-demo__live"
          role="status"
          aria-live="polite"
        >
          {rating > 0 ? `You rated: ${rating} star${rating > 1 ? "s" : ""}` : ""}
        </p>
      </div>

      {/* Toggle switch */}
      <div>
        <p className="custom-controls-demo__hint">
          Toggle switch → role=&quot;switch&quot; + aria-checked
        </p>
        <div className="custom-controls-demo__toggle-row">
          <button
            id={toggleId}
            className="custom-controls-demo__toggle"
            role="switch"
            aria-checked={toggle}
            onClick={() => setToggle((t) => !t)}
            style={{ background: toggle ? "var(--brand-blue)" : "var(--border)" }}
          >
            <span
              className="custom-controls-demo__toggle-thumb"
              style={{ left: toggle ? 25 : 3 }}
            />
            <span className="sr-only">{toggle ? "On" : "Off"}</span>
          </button>
          <label
            className="custom-controls-demo__toggle-label"
            htmlFor={toggleId}
          >
            Dark mode {toggle ? "(enabled)" : "(disabled)"}
          </label>
        </div>
      </div>
    </div>
  );
}
