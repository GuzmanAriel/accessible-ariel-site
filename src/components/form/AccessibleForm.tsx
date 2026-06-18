"use client";
import { useState, useId, useRef, useEffect } from "react";
import type { ReactNode } from "react";

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
        <span id={`${id}-error`} className="validation-demo__error-msg">
          <span aria-hidden="true">⚠</span> {error}
        </span>
      )}
    </div>
  );
}

export default function AccessibleForm() {
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();
  const bioId = useId();
  const agreeId = useId();

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

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
    else if (!/\S+@\S+\.\S+/.test(values.email)) e.email = "Enter a valid email address.";
    if (!values.role) e.role = "Please select your role.";
    if (!values.agree) e.agree = "You must agree to continue.";
    return e;
  }

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    } else {
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      });
    }
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
      {submitted && (
        <div ref={successRef} tabIndex={-1} className="validation-demo__success">
          <div className="validation-demo__success-icon">✓</div>
          <strong className="validation-demo__success-title">Registered successfully!</strong>
          <p className="validation-demo__success-desc">Announced automatically via focus</p>
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
      )}
      <div className="validation-demo__instructions">
        <strong className="validation-demo__instructions-title">Before you begin:</strong>
        <ul className="validation-demo__instructions-list">
          <li>
            Fields marked{" "}
            <span aria-hidden="true" className="validation-demo__required-star">
              *
            </span>
            <span className="sr-only">with an asterisk</span> are required.
          </li>
          <li>
            Email must be a valid address, e.g. <code>you@example.com</code>
          </li>
          <li>Bio is optional — max 200 characters.</li>
        </ul>
      </div>

      {hasErrors && (
        <div ref={errorSummaryRef} tabIndex={-1} className="validation-demo__error-summary">
          <h3 id="err-head" className="validation-demo__error-summary-heading">
            Please fix {Object.keys(errors).length} error
            {Object.keys(errors).length > 1 ? "s" : ""}:
          </h3>
          <ul className="validation-demo__error-summary-list">
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}>
                <a href={`#${fieldAnchors[key]}`} className="validation-demo__error-link">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form noValidate aria-label="Event registration" onSubmit={handleSubmit}>
        <div className="validation-demo__form-body">
          <fieldset className="validation-demo__fieldset">
            <legend className="validation-demo__legend">Personal Information</legend>
            <div className="validation-demo__fields">
              <div className="validation-demo__field">
                <Field label="Full Name" id={nameId} required error={errors.name}>
                  <input
                    id={nameId}
                    required
                    type="text"
                    autoComplete="name"
                    className={`validation-demo__input${errors.name ? " validation-demo__input--error" : ""}`}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${nameId}-error` : undefined}
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  />
                </Field>
              </div>

              <div className="validation-demo__field">
                <Field
                  label="Email Address"
                  id={emailId}
                  required
                  hint="We'll never share your email."
                  error={errors.email}
                >
                  <input
                    id={emailId}
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={[errors.email ? `${emailId}-error` : null, `${emailId}-hint`]
                      .filter(Boolean)
                      .join(" ")}
                    className={`validation-demo__input${errors.email ? " validation-demo__input--error" : ""}`}
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  />
                </Field>
              </div>
            </div>
          </fieldset>

          <fieldset
            className={`validation-demo__fieldset${errors.role ? " validation-demo__fieldset--error" : ""}`}
          >
            <legend
              className={`validation-demo__legend${errors.role ? " validation-demo__legend--error" : ""}`}
            >
              Your Role
              <span aria-hidden="true" className="validation-demo__required-star">
                *
              </span>
              <span className="sr-only"> (required)</span>
            </legend>

            {errors.role && (
              <span
                id={`${roleId}-error`}
                className="validation-demo__error-msg validation-demo__error-msg--inline"
              >
                {errors.role}
              </span>
            )}
            <div className="validation-demo__options">
              {["Developer", "Designer", "Product Manager", "Other"].map((r) => (
                <label key={r} className="validation-demo__option">
                  <input
                    className="validation-demo__radio"
                    type="radio"
                    name="val-role"
                    value={r}
                    checked={values.role === r}
                    onChange={() => setValues((v) => ({ ...v, role: r }))}
                    aria-required="true"
                    aria-describedby={errors.role ? `${roleId}-error` : undefined}
                  />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="validation-demo__field">
            <Field label="Bio" id={bioId} hint="Optional — max 200 characters.">
              <textarea
                value={values.bio}
                id={bioId}
                rows={3}
                className="validation-demo__textarea"
                onChange={(e) => setValues((v) => ({ ...v, bio: e.target.value }))}
                aria-describedby={`${bioId}-hint`}
              />
            </Field>
          </div>

          <div className="validation-demo__agree">
            <div className="validation-demo__agree-row">
              <input
                id={agreeId}
                type="checkbox"
                className="validation-demo__agree-checkbox"
                checked={values.agree}
                aria-required="true"
                aria-invalid={!!errors.agree}
                aria-describedby={errors.agree ? `${agreeId}-error` : undefined}
                onChange={(e) => setValues((v) => ({ ...v, agree: e.target.checked }))}
              />
              <label htmlFor={agreeId} className="validation-demo__agree-label">
                I agree to the{" "}
                <a href="#" className="validation-demo__agree-link">
                  terms and conditions
                </a>
                <span aria-hidden="true" className="validation-demo__agree-star">
                  {""}*
                </span>
                <span className="sr-only"> (required)</span>
              </label>
            </div>

            {errors.agree && (
              <span id={`${agreeId}-error`} className="validation-demo__error-msg">
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
