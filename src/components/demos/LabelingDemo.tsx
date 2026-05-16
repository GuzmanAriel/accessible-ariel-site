'use client'

import { useId } from "react";
import type { CSSProperties } from "react";

const labelStyle: CSSProperties = {
  fontFamily: "Syne, sans-serif",
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--brand-blue)",
};

const inputStyle = (hasErr?: boolean): CSSProperties => ({
  padding: "10px 14px",
  borderRadius: 7,
  border: `1.5px solid ${hasErr ? "#c47d00" : "var(--border)"}`,
  background: "#fff",
  fontFamily: "DM Sans, sans-serif",
  fontSize: 14,
  color: "var(--ink)",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
});

export default function LabelingDemo() {
  const goodId = useId();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ background: "#eef4ff", border: "1.5px solid var(--brand-blue)", borderRadius: 8, padding: 16 }}>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "var(--brand-blue)", fontStyle: "normal", fontWeight: 700, margin: "0 0 10px" }}>✓ Correct</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label htmlFor={goodId} style={labelStyle}>Email address</label>
          <input id={goodId} type="email" autoComplete="email" style={inputStyle()} placeholder="you@example.com" />
        </div>
      </div>
      <div style={{ background: "#fff8f0", border: "1.5px solid #c47d00", borderRadius: 8, padding: 16 }}>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#c47d00", fontStyle: "normal", fontWeight: 700, margin: "0 0 10px" }}>✗ No label</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ height: 21 }} aria-hidden="true" />
          <input
            type="email"
            placeholder="Email address (placeholder only)"
            style={{ ...inputStyle(), border: "1.5px solid #c47d00" }}
            aria-label="bad example input"
          />
        </div>
      </div>
    </div>
  );
}
