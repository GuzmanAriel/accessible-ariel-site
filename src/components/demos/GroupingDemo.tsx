'use client'

import { useState, useId } from "react";
import type { CSSProperties } from "react";

const labelStyle: CSSProperties = {
  fontFamily: "var(--font-heading)",
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
  fontFamily: "var(--font-body)",
  fontSize: 14,
  color: "var(--ink)",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
});

const sectionHintStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 12,
  color: "var(--brand-blue)",
  fontStyle: "normal",
  fontWeight: 700,
  margin: "0 0 8px",
};

const fieldsetStyle: CSSProperties = {
  border: `1.5px solid var(--border)`,
  borderRadius: 8,
  padding: "14px 18px",
  margin: 0,
};

export default function GroupingDemo() {
  const [format, setFormat] = useState("txt");
  const [notif, setNotif] = useState<Record<string, boolean>>({
    newsletter: false,
    offers: false,
    partners: false,
  });
  const courseId = useId();

  return (
    <div className="demo__grouping" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Radio group */}
      <div>
        <p style={sectionHintStyle}>Radio buttons → &lt;fieldset&gt; + &lt;legend&gt;</p>
        <fieldset style={fieldsetStyle}>
          <legend style={labelStyle}>Output format</legend>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {[["txt", "Text file"], ["csv", "CSV file"], ["html", "HTML file"]].map(([val, lbl]) => (
              <label key={val} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", fontSize: 14, cursor: "pointer" }}>
                <input
                  type="radio"
                  name="fmt"
                  value={val}
                  checked={format === val}
                  onChange={() => setFormat(val)}
                  style={{ accentColor: "var(--brand-blue)", width: 16, height: 16 }}
                />
                {lbl}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Checkbox group */}
      <div>
        <p style={sectionHintStyle}>Checkboxes — also need &lt;fieldset&gt; + &lt;legend&gt;</p>
        <fieldset style={fieldsetStyle}>
          <legend style={labelStyle}>I want to receive</legend>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {[["newsletter", "The weekly newsletter"], ["offers", "Offers from the company"], ["partners", "Partner offers"]].map(([key, lbl]) => (
              <label key={key} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", fontSize: 14, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={notif[key]}
                  onChange={e => setNotif(n => ({ ...n, [key]: e.target.checked }))}
                  style={{ accentColor: "var(--brand-blue)", width: 16, height: 16 }}
                />
                {lbl}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* optgroup select */}
      <div>
        <p style={sectionHintStyle}>Select with &lt;optgroup&gt;</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label htmlFor={courseId} style={labelStyle}>Choose a course</label>
          <select id={courseId} style={{ ...inputStyle(), appearance: "auto" }}>
            <optgroup label="Physics I: Classical Mechanics">
              <option>Lecture 01: Powers of Ten</option>
              <option>Lecture 02: 1D Kinematics</option>
            </optgroup>
            <optgroup label="Physics II: Electricity">
              <option>Lecture 01: Electric Field</option>
              <option>Lecture 02: Electric Flux</option>
            </optgroup>
            <optgroup label="Physics III: Waves">
              <option>Lecture 01: Periodic Phenomenon</option>
              <option>Lecture 02: Beats</option>
            </optgroup>
          </select>
        </div>
      </div>

      {/* role="group" for related text fields */}
      <div>
        <p style={sectionHintStyle}>Related text fields → role=&quot;group&quot; + aria-labelledby</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[["shipping", "Shipping Address"], ["billing", "Billing Address"]].map(([key, legend]) => (
            <div
              key={key}
              role="group"
              aria-labelledby={`${key}-head`}
              style={{ border: `1.5px solid var(--border)`, borderRadius: 8, padding: "14px 16px" }}
            >
              <div id={`${key}-head`} style={{ ...labelStyle, marginBottom: 12 }}>{legend}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label htmlFor={`${key}-name`} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)" }}>
                    <span className="sr-only">{legend} </span>Name
                  </label>
                  <input id={`${key}-name`} type="text" autoComplete={`${key} name`} style={inputStyle()} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label htmlFor={`${key}-street`} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)" }}>Street</label>
                  <input id={`${key}-street`} type="text" autoComplete={`${key} street-address`} style={inputStyle()} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
