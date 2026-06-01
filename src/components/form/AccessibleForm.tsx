"use client";
import { useState, useId, useRef } from "react";

export default function AccessibleForm() {
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();
  const bioId = useId();
  const agreeId = useId();

  const errorSummaryRef = useRef<HTMLDivElement>(null);

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

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    console.log("%csrc/components/form/AccessibleForm.tsx:39 errs", "color: #007acc;", errs);
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
                <label className="validation-demo__label" htmlFor={nameId}>
                  Full Name
                </label>
                <input
                  id={nameId}
                  type="text"
                  autoComplete="name"
                  className="validation-demo__input"
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                />
              </div>

              <div className="validation-demo__field">
                <label className="validation-demo__label" htmlFor={emailId}>
                  Email Address
                </label>
                <input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  className="validation-demo__input"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="validation-demo__fieldset">
            <legend className="validation-demo__legend">Your Role</legend>
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
                  />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="validation-demo__field">
            <label className="validation-demo__label" htmlFor={bioId}>
              Bio
            </label>
            <textarea
              value={values.bio}
              id={bioId}
              rows={3}
              className="validation-demo__textarea"
              onChange={(e) => setValues((v) => ({ ...v, bio: e.target.value }))}
            />
          </div>

          <div className="validation-demo__agree">
            <div className="validation-demo__agree-row">
              <input
                id={agreeId}
                type="checkbox"
                className="validation-demo__agree-checkbox"
                checked={values.agree}
                onChange={(e) => setValues((v) => ({ ...v, agree: e.target.checked }))}
              />
              <label htmlFor={agreeId} className="validation-demo__agree-label">
                I agree to the{" "}
                <a href="#" className="validation-demo__agree-link">
                  terms and conditions
                </a>
              </label>
            </div>
          </div>

          <button type="submit" className="validation-demo__submit">
            Register →
          </button>
        </div>
      </form>
    </>
  );
}
