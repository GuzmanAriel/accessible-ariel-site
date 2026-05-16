'use client'

import { useState, useId } from "react";
import type { EpisodeRule } from "@/types/episode";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      style={{
        background: "var(--ink)",
        borderLeft: "3px solid var(--brand-yellow)",
        padding: "12px 16px",
        borderRadius: 6,
        fontSize: 14,
        fontFamily: "var(--font-mono)",
        color: "#e8f0ff",
        overflowX: "auto",
        lineHeight: 1.7,
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

export default function RuleCard({ label, good, bad, code }: EpisodeRule) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={bodyId}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "13px 18px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--ink)",
        }}
      >
        <span>{label}</span>
        <span
          aria-hidden="true"
          style={{
            fontSize: 26,
            color: "var(--brand-yellow)",
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "rotate(0)",
          }}
        >
          +
        </span>
      </button>

      <div id={bodyId} hidden={!open}>
        {open && (
          <div
            style={{
              padding: "0 18px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  background: "var(--brand-blue)",
                  color: "#fff",
                  fontSize: 13,
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "2px 8px",
                  borderRadius: 20,
                }}
              >
                ✓ {good}
              </span>
              <span
                style={{
                  background: "#c47d00",
                  color: "#fff",
                  fontSize: 13,
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "2px 8px",
                  borderRadius: 20,
                }}
              >
                ✗ {bad}
              </span>
            </div>
            <CodeBlock>{code}</CodeBlock>
          </div>
        )}
      </div>
    </div>
  );
}
