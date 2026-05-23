"use client";

export default function AccessibleForm() {
  return (
    <form noValidate aria-label="Event registration">
      <div className="validation-demo__form-body">

        <fieldset className="validation-demo__fieldset">
          <legend className="validation-demo__legend">Personal Information</legend>
          <div className="validation-demo__fields">

            <div className="validation-demo__field">
              <label className="validation-demo__label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="validation-demo__input"
              />
            </div>

            <div className="validation-demo__field">
              <label className="validation-demo__label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="validation-demo__input"
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
                />
                {r}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="validation-demo__field">
          <label className="validation-demo__label" htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows={3}
            className="validation-demo__textarea"
          />
        </div>

        <div className="validation-demo__agree">
          <div className="validation-demo__agree-row">
            <input
              id="agree"
              type="checkbox"
              className="validation-demo__agree-checkbox"
            />
            <label htmlFor="agree" className="validation-demo__agree-label">
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
  );
}
