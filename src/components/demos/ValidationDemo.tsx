"use client";

import { useState, useId, useRef } from "react";
import type { ReactNode } from "react";

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
    <div className="validation-demo__field">
      <label className="validation-demo__label" htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className="validation-demo__required-star">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="validation-demo__hint">
          {hint}
        </span>
      )}
      {children}
      {error && (
        <span id={`${id}-error`} role="alert" className="validation-demo__error-msg">
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

  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Full name is required.";
    if (!values.email.trim()) e.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(values.email))
      e.email = "Enter a valid email address.";
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
        const scrollTarget = errs.name
          ? nameRef.current
          : errs.email
            ? emailRef.current
            : errs.role
              ? roleRef.current
              : agreeRef.current;
        scrollTarget?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  }

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="validation-demo__success">
        <div className="validation-demo__success-icon">✓</div>
        <strong className="validation-demo__success-title">
          Registered successfully!
        </strong>
        <p className="validation-demo__success-desc">
          Announced automatically via <code>role=&quot;status&quot;</code> +{" "}
          <code>aria-live=&quot;polite&quot;</code>.
        </p>
        <button
          className="validation-demo__reset"
          onClick={() => {
            setSubmitted(false);
            setValues({ name: "", email: "", role: "", bio: "", agree: false });
            setErrors({});
          }}
        >
          Reset
        </button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;
  const fieldAnchors: Record<string, string> = {
    name: nameId,
    email: emailId,
    role: roleId,
    agree: agreeId,
  };

  return (
    <>
      {/* Overall instructions */}
      <div className="validation-demo__instructions">
        <strong className="validation-demo__instructions-title">
          Before you begin:
        </strong>
        <ul className="validation-demo__instructions-list">
          <li>
            Fields marked{" "}
            <span aria-hidden="true" className="validation-demo__required-star">
              *
            </span>
            <span className="sr-only">with an asterisk</span> are required.
          </li>
          <li>
            Email must be a valid address, e.g.{" "}
            <code>you@example.com</code>
          </li>
          <li>Bio is optional — max 200 characters.</li>
        </ul>
      </div>

      {/* Error summary */}
      {hasErrors && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="err-head"
          className="validation-demo__error-summary"
        >
          <h3
            id="err-head"
            className="validation-demo__error-summary-heading"
          >
            ⚠ Please fix {Object.keys(errors).length} error
            {Object.keys(errors).length > 1 ? "s" : ""}:
          </h3>
          <ul className="validation-demo__error-summary-list">
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}>
                <a
                  href={`#${fieldAnchors[key]}`}
                  className="validation-demo__error-link"
                >
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label="Event registration">
        <div className="validation-demo__form-body">
          {/* Personal info fieldset */}
          <fieldset className="validation-demo__fieldset">
            <legend className="validation-demo__legend">
              Personal Information
            </legend>
            <div className="validation-demo__fields">
              <Field
                label="Full Name"
                id={nameId}
                required
                error={errors.name}
              >
                <input
                  ref={nameRef}
                  id={nameId}
                  type="text"
                  required
                  autoComplete="name"
                  aria-required="true"
                  aria-describedby={
                    errors.name ? `${nameId}-error` : undefined
                  }
                  aria-invalid={!!errors.name}
                  value={values.name}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, name: e.target.value }))
                  }
                  className={`validation-demo__input${errors.name ? " validation-demo__input--error" : ""}`}
                />
              </Field>
              <Field
                label="Email Address"
                id={emailId}
                required
                hint="We'll never share your email."
                error={errors.email}
              >
                <input
                  ref={emailRef}
                  id={emailId}
                  type="email"
                  required
                  autoComplete="email"
                  aria-required="true"
                  aria-describedby={[
                    errors.email ? `${emailId}-error` : null,
                    `${emailId}-hint`,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-invalid={!!errors.email}
                  value={values.email}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, email: e.target.value }))
                  }
                  className={`validation-demo__input${errors.email ? " validation-demo__input--error" : ""}`}
                />
              </Field>
            </div>
          </fieldset>

          {/* Role fieldset */}
          <fieldset
            ref={roleRef}
            className={`validation-demo__fieldset${errors.role ? " validation-demo__fieldset--error" : ""}`}
          >
            <legend
              className={`validation-demo__legend${errors.role ? " validation-demo__legend--error" : ""}`}
            >
              Your Role
              <span
                aria-hidden="true"
                className="validation-demo__required-star"
              >
                *
              </span>
              <span className="sr-only"> (required)</span>
            </legend>
            {errors.role && (
              <span
                id={`${roleId}-error`}
                role="alert"
                className="validation-demo__error-msg validation-demo__error-msg--inline"
              >
                <span aria-hidden="true">⚠ </span> {errors.role}
              </span>
            )}
            <div className="validation-demo__options">
              {["Developer", "Designer", "Product Manager", "Other"].map(
                (r) => (
                  <label key={r} className="validation-demo__option">
                    <input
                      className="validation-demo__radio"
                      type="radio"
                      name="val-role"
                      value={r}
                      aria-required="true"
                      aria-describedby={
                        errors.role ? `${roleId}-error` : undefined
                      }
                      checked={values.role === r}
                      onChange={() =>
                        setValues((v) => ({ ...v, role: r }))
                      }
                    />
                    {r}
                  </label>
                )
              )}
            </div>
          </fieldset>

          {/* Bio */}
          <Field label="Bio" id={bioId} hint="Optional — max 200 characters.">
            <textarea
              id={bioId}
              maxLength={200}
              rows={3}
              aria-describedby={`${bioId}-hint`}
              value={values.bio}
              onChange={(e) =>
                setValues((v) => ({ ...v, bio: e.target.value }))
              }
              className="validation-demo__textarea"
            />
          </Field>

          {/* Agreement */}
          <div className="validation-demo__agree">
            <div className="validation-demo__agree-row">
              <input
                ref={agreeRef}
                id={agreeId}
                type="checkbox"
                aria-required="true"
                aria-invalid={!!errors.agree}
                aria-describedby={
                  errors.agree ? `${agreeId}-error` : undefined
                }
                checked={values.agree}
                onChange={(e) =>
                  setValues((v) => ({ ...v, agree: e.target.checked }))
                }
                className="validation-demo__agree-checkbox"
              />
              <label
                htmlFor={agreeId}
                className="validation-demo__agree-label"
              >
                I agree to the{" "}
                <a href="#" className="validation-demo__agree-link">
                  terms and conditions
                </a>
                <span
                  aria-hidden="true"
                  className="validation-demo__agree-star"
                >
                  {" "}
                  *
                </span>
              </label>
            </div>
            {errors.agree && (
              <span
                id={`${agreeId}-error`}
                role="alert"
                className="validation-demo__error-msg"
              >
                <span aria-hidden="true">⚠ </span> {errors.agree}
              </span>
            )}
          </div>

          <button type="submit" className="validation-demo__submit">
            Register →
          </button>
        </div>
      </form>
    </>
  );
}
