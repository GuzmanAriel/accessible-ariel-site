"use client";

const rows = [
  { label: "Keyboard focus", div: false, btn: true },
  { label: "Enter / Space handling", div: false, btn: true },
  { label: 'Announced as "button"', div: true, btn: true },
  { label: "Event wiring needed", div: true, btn: false },
  { label: "Free", div: false, btn: true, highlight: true },
];

function Icon({ yes }: { yes: boolean }) {
  return (
    <span className={`dvb-section__icon dvb-section__icon--${yes ? "yes" : "no"}`} aria-hidden="true">
      {yes ? "✓" : "✗"}
    </span>
  );
}

export default function DivVsButtonSection() {
  return (
    <div className="dvb-section wow bounceInRight" data-wow-duration="0.6s">
      {/* Column headers */}
      <div className="dvb-section__headers" aria-hidden="true">
        <div className="dvb-section__col-header dvb-section__col-header--bad">
          <code>{`<div role="button">`}</code>
        </div>
        <div className="dvb-section__col-header dvb-section__col-header--good">
          <code>{`<button>`}</code>
        </div>
      </div>

      {/* Comparison rows */}
      <dl className="dvb-section__rows">
        {rows.map(({ label, div, btn, highlight }, i) => (
          <div
            key={label}
            className={`dvb-section__row${i % 2 === 0 ? " dvb-section__row--alt" : ""}${highlight ? " dvb-section__row--highlight" : ""}`}
          >
            <dt className="dvb-section__row-label">{label}</dt>
            <dd className="dvb-section__row-div">
              <Icon yes={div} />
              <span className="sr-only">{div ? "yes" : "no"}</span>
            </dd>
            <dd className="dvb-section__row-btn">
              <Icon yes={btn} />
              <span className="sr-only">{btn ? "yes" : "no"}</span>
            </dd>
          </div>
        ))}
      </dl>

      {/* Footer rule */}
      <div className="dvb-section__footer">
        Native HTML first&nbsp;&nbsp;·&nbsp;&nbsp;ARIA only when native HTML isn&apos;t enough.
      </div>
    </div>
  );
}
