'use client'

import { useState, useId } from "react";

export default function CustomControlsDemo() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [toggle, setToggle] = useState(false);
  const toggleId = useId();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Star rating */}
      <div>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--brand-blue)", fontStyle: "normal", fontWeight: 700, margin: "0 0 10px" }}>
          Star rating → role=&quot;radiogroup&quot; + role=&quot;radio&quot; + arrow key navigation
        </p>
        <div role="radiogroup" aria-label="Rate your experience" style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4, 5].map(n => {
            const isFilled = (hovered || rating) >= n;
            return (
              <button
                key={n}
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                onKeyDown={e => {
                  if (e.key === "ArrowRight" && rating < 5) setRating(r => r + 1);
                  if (e.key === "ArrowLeft" && rating > 1) setRating(r => r - 1);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 30,
                  color: isFilled ? "var(--brand-yellow)" : "var(--border)",
                  padding: 2,
                  lineHeight: 1,
                  transition: "color 0.1s",
                  outline: "none",
                }}
              >
                ★
              </button>
            );
          })}
        </div>
        <p
          role="status"
          aria-live="polite"
          style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "var(--brand-blue)", marginTop: 6, minHeight: 20 }}
        >
          {rating > 0 ? `You rated: ${rating} star${rating > 1 ? "s" : ""}` : ""}
        </p>
      </div>

      {/* Toggle switch */}
      <div>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--brand-blue)", fontStyle: "normal", fontWeight: 700, margin: "0 0 10px" }}>
          Toggle switch → role=&quot;switch&quot; + aria-checked
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            id={toggleId}
            role="switch"
            aria-checked={toggle}
            onClick={() => setToggle(t => !t)}
            style={{
              position: "relative",
              width: 48,
              height: 26,
              borderRadius: 13,
              background: toggle ? "var(--brand-blue)" : "var(--border)",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 3,
                left: toggle ? 25 : 3,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s",
                display: "block",
              }}
            />
            <span className="sr-only">{toggle ? "On" : "Off"}</span>
          </button>
          <label htmlFor={toggleId} style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--ink)", cursor: "pointer" }}>
            Dark mode {toggle ? "(enabled)" : "(disabled)"}
          </label>
        </div>
      </div>
    </div>
  );
}
