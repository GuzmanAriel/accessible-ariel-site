"use client";

const nativeExamples = [
  { el: "<button>", label: 'Announced as "button"' },
  { el: '<input type="checkbox">', label: "Has checked state built in" },
  { el: "<h2>", label: "Signals heading level 2" },
];

export default function GoldenRuleSection() {
  return (
    <div className="golden-rule-section">
      {/* Rule card */}
      <div className="golden-rule-section__card wow bounceInRight" data-wow-duration="0.6s">
        <p className="golden-rule-section__eyebrow">The First Rule of ARIA</p>
        <p className="golden-rule-section__rule">
          Don&apos;t use ARIA
          <br />
          if you don&apos;t have to.
        </p>
      </div>

      {/* Native HTML proof points */}
      <ul className="golden-rule-section__list" role="list">
        {nativeExamples.map(({ el, label }, i) => (
          <li
            key={el}
            className="golden-rule-section__item wow bounceInRight"
            data-wow-duration="0.5s"
            data-wow-delay={`${i * 0.12}s`}
          >
            <span className="golden-rule-section__check" aria-hidden="true">✓</span>
            <code className="golden-rule-section__code">{el}</code>
            <span className="golden-rule-section__label">→&nbsp;&nbsp;{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
