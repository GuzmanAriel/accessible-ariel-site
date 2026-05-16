'use client'

import { useState, useId, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

// ─── Shared styles ───────────────────────────────────────────────────────────

const labelStyle: CSSProperties = {
  fontFamily: "Syne, sans-serif",
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--brand-blue)",
};

const hintStyle: CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: 12,
  color: "var(--muted)",
  fontStyle: "italic",
};

const errorStyle: CSSProperties = {
  fontFamily: "DM Sans, sans-serif",
  fontSize: 12,
  color: "#c47d00",
  display: "flex",
  alignItems: "center",
  gap: 4,
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

// ─── Field ───────────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  id: string;
  children: ReactNode;
}

function Field({ label, hint, error, required, children, id }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
        {required && <span aria-hidden="true" style={{ color: "var(--brand-yellow)", marginLeft: 4 }}>*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && <span id={`${id}-hint`} style={hintStyle}>{hint}</span>}
      {children}
      {error && (
        <span id={`${id}-error`} role="alert" style={errorStyle}>
          <span aria-hidden="true">⚠ </span> {error}
        </span>
      )}
    </div>
  );
}

// ─── ValidationDemo ──────────────────────────────────────────────────────────

export default function ValidationDemo() {
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();
  const bioId = useId();
  const agreeId = useId();

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLFieldSetElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState({ name: "", email: "", role: "", bio: "", agree: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Full name is required.";
    if (!values.email.trim()) e.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(values.email)) e.email = "Enter a valid email address.";
    if (!values.role) e.role = "Please select your role.";
    if (!values.agree) e.agree = "You must agree to continue.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    } else {
      setTimeout(() => {
        errorSummaryRef.current?.focus();
        const scrollTarget =
          errs.name ? nameRef.current :
          errs.email ? emailRef.current :
          errs.role ? roleRef.current :
          agreeRef.current;
        scrollTarget?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{ padding: 24, background: "#eef4ff", border: "1.5px solid var(--brand-blue)", borderRadius: 10, fontFamily: "DM Sans, sans-serif", color: "var(--ink)", textAlign: "center" }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
        <strong style={{ fontFamily: "Syne, sans-serif" }}>Registered successfully!</strong>
        <p style={{ margin: "8px 0 16px", color: "var(--muted)", fontSize: 13 }}>
          Announced automatically via <code>role=&quot;status&quot;</code> + <code>aria-live=&quot;polite&quot;</code>.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setValues({ name: "", email: "", role: "", bio: "", agree: false });
            setErrors({});
          }}
          style={{ background: "var(--brand-blue)", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 6, cursor: "pointer", fontFamily: "Syne, sans-serif", fontWeight: 700 }}
        >
          Reset
        </button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;
  const fieldAnchors: Record<string, string> = { name: nameId, email: emailId, role: roleId, agree: agreeId };

  return (
    <>
      {/* Overall instructions — OUTSIDE the form element */}
      <div style={{ background: "#eef4ff", border: `1px solid var(--border)`, borderRadius: 8, padding: "12px 16px", marginBottom: 14, fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "var(--ink)", lineHeight: 1.6 }}>
        <strong style={{ fontFamily: "Syne, sans-serif", display: "block", marginBottom: 4 }}>Before you begin:</strong>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Fields marked <span aria-hidden="true" style={{ color: "var(--brand-yellow)", fontWeight: 700 }}>*</span><span className="sr-only">with an asterisk</span> are required.</li>
          <li>Email must be a valid address, e.g. <code>you@example.com</code></li>
          <li>Bio is optional — max 200 characters.</li>
        </ul>
      </div>

      {/* Error summary — focus target on failed submit */}
      {hasErrors && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="err-head"
          style={{ background: "#fff8f0", border: "1.5px solid #c47d00", borderRadius: 8, padding: "12px 16px", marginBottom: 14, outline: "none" }}
        >
          <h3 id="err-head" style={{ fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 800, color: "#c47d00", margin: "0 0 8px" }}>
            ⚠ Please fix {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? "s" : ""}:
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", fontFamily: "DM Sans, sans-serif", fontSize: 13, display: "flex", flexDirection: "column", gap: 4 }}>
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}><a href={`#${fieldAnchors[key]}`} style={{ color: "#c47d00" }}>{msg}</a></li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label="Event registration">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Personal info fieldset */}
          <fieldset style={{ border: `1.5px solid var(--border)`, borderRadius: 8, padding: "14px 18px", margin: 0 }}>
            <legend style={labelStyle}>Personal Information</legend>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
              <Field label="Full Name" id={nameId} required error={errors.name}>
                <input
                  ref={nameRef}
                  id={nameId}
                  type="text"
                  required
                  autoComplete="name"
                  aria-required="true"
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                  aria-invalid={!!errors.name}
                  value={values.name}
                  onChange={e => setValues(v => ({ ...v, name: e.target.value }))}
                  style={inputStyle(!!errors.name)}
                />
              </Field>
              <Field label="Email Address" id={emailId} required hint="We'll never share your email." error={errors.email}>
                <input
                  ref={emailRef}
                  id={emailId}
                  type="email"
                  required
                  autoComplete="email"
                  aria-required="true"
                  aria-describedby={[errors.email ? `${emailId}-error` : null, `${emailId}-hint`].filter(Boolean).join(" ")}
                  aria-invalid={!!errors.email}
                  value={values.email}
                  onChange={e => setValues(v => ({ ...v, email: e.target.value }))}
                  style={inputStyle(!!errors.email)}
                />
              </Field>
            </div>
          </fieldset>

          {/* Role fieldset — radio buttons */}
          <fieldset
            ref={roleRef}
            style={{ border: `1.5px solid ${errors.role ? "#c47d00" : "var(--border)"}`, borderRadius: 8, padding: "14px 18px", margin: 0 }}
          >
            <legend style={{ ...labelStyle, color: errors.role ? "#c47d00" : "var(--brand-blue)" }}>
              Your Role
              <span aria-hidden="true" style={{ color: "var(--brand-yellow)", marginLeft: 4 }}>*</span>
              <span className="sr-only"> (required)</span>
            </legend>
            {errors.role && (
              <span id={`${roleId}-error`} role="alert" style={{ ...errorStyle, marginBottom: 8 }}>
                <span aria-hidden="true">⚠ </span> {errors.role}
              </span>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              {["Developer", "Designer", "Product Manager", "Other"].map(r => (
                <label key={r} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "DM Sans, sans-serif", fontSize: 14, cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="val-role"
                    value={r}
                    aria-required="true"
                    aria-describedby={errors.role ? `${roleId}-error` : undefined}
                    checked={values.role === r}
                    onChange={() => setValues(v => ({ ...v, role: r }))}
                    style={{ accentColor: "var(--brand-blue)", width: 16, height: 16 }}
                  />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Bio — optional */}
          <Field label="Bio" id={bioId} hint="Optional — max 200 characters.">
            <textarea
              id={bioId}
              maxLength={200}
              rows={3}
              aria-describedby={`${bioId}-hint`}
              value={values.bio}
              onChange={e => setValues(v => ({ ...v, bio: e.target.value }))}
              style={{ ...inputStyle(), resize: "vertical" }}
            />
          </Field>

          {/* Agreement checkbox */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <input
                ref={agreeRef}
                id={agreeId}
                type="checkbox"
                aria-required="true"
                aria-invalid={!!errors.agree}
                aria-describedby={errors.agree ? `${agreeId}-error` : undefined}
                checked={values.agree}
                onChange={e => setValues(v => ({ ...v, agree: e.target.checked }))}
                style={{ marginTop: 3, accentColor: "var(--brand-blue)", width: 16, height: 16 }}
              />
              <label htmlFor={agreeId} style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--ink)", lineHeight: 1.5 }}>
                I agree to the <a href="#" style={{ color: "var(--brand-blue)" }}>terms and conditions</a>
                <span aria-hidden="true" style={{ color: "var(--brand-yellow)" }}> *</span>
              </label>
            </div>
            {errors.agree && (
              <span id={`${agreeId}-error`} role="alert" style={errorStyle}>
                <span aria-hidden="true">⚠ </span> {errors.agree}
              </span>
            )}
          </div>

          <button
            type="submit"
            style={{ background: "var(--brand-blue)", color: "#fff", border: "none", padding: "13px 24px", borderRadius: 8, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", letterSpacing: "0.03em" }}
          >
            Register →
          </button>
        </div>
      </form>
    </>
  );
}
