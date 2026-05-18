"use client";

import { useState, useId } from "react";

export default function GroupingDemo() {
  const [format, setFormat] = useState("txt");
  const [notif, setNotif] = useState<Record<string, boolean>>({
    newsletter: false,
    offers: false,
    partners: false,
  });
  const courseId = useId();

  return (
    <div className="grouping-demo">
      {/* Radio group */}
      <div>
        <p className="grouping-demo__hint">
          Radio buttons → &lt;fieldset&gt; + &lt;legend&gt;
        </p>
        <fieldset className="grouping-demo__fieldset">
          <legend className="grouping-demo__legend">Output format</legend>
          <div className="grouping-demo__options">
            {[
              ["txt", "Text file"],
              ["csv", "CSV file"],
              ["html", "HTML file"],
            ].map(([val, lbl]) => (
              <label key={val} className="grouping-demo__option">
                <input
                  className="grouping-demo__control"
                  type="radio"
                  name="fmt"
                  value={val}
                  checked={format === val}
                  onChange={() => setFormat(val)}
                />
                {lbl}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Checkbox group */}
      <div>
        <p className="grouping-demo__hint">
          Checkboxes — also need &lt;fieldset&gt; + &lt;legend&gt;
        </p>
        <fieldset className="grouping-demo__fieldset">
          <legend className="grouping-demo__legend">I want to receive</legend>
          <div className="grouping-demo__options">
            {[
              ["newsletter", "The weekly newsletter"],
              ["offers", "Offers from the company"],
              ["partners", "Partner offers"],
            ].map(([key, lbl]) => (
              <label key={key} className="grouping-demo__option">
                <input
                  className="grouping-demo__control"
                  type="checkbox"
                  checked={notif[key]}
                  onChange={(e) =>
                    setNotif((n) => ({ ...n, [key]: e.target.checked }))
                  }
                />
                {lbl}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* optgroup select */}
      <div>
        <p className="grouping-demo__hint">Select with &lt;optgroup&gt;</p>
        <div className="grouping-demo__field">
          <label className="grouping-demo__label" htmlFor={courseId}>
            Choose a course
          </label>
          <select className="grouping-demo__select" id={courseId}>
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
        <p className="grouping-demo__hint">
          Related text fields → role=&quot;group&quot; + aria-labelledby
        </p>
        <div className="grouping-demo__address-grid">
          {[
            ["shipping", "Shipping Address"],
            ["billing", "Billing Address"],
          ].map(([key, legend]) => (
            <div
              key={key}
              className="grouping-demo__address-group"
              role="group"
              aria-labelledby={`${key}-head`}
            >
              <div id={`${key}-head`} className="grouping-demo__address-title">
                {legend}
              </div>
              <div className="grouping-demo__address-fields">
                <div className="grouping-demo__address-field">
                  <label
                    className="grouping-demo__address-label"
                    htmlFor={`${key}-name`}
                  >
                    <span className="sr-only">{legend} </span>Name
                  </label>
                  <input
                    className="grouping-demo__input"
                    id={`${key}-name`}
                    type="text"
                    autoComplete={`${key} name`}
                  />
                </div>
                <div className="grouping-demo__address-field">
                  <label
                    className="grouping-demo__address-label"
                    htmlFor={`${key}-street`}
                  >
                    Street
                  </label>
                  <input
                    className="grouping-demo__input"
                    id={`${key}-street`}
                    type="text"
                    autoComplete={`${key} street-address`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
