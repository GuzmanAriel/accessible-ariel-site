"use client";

export default function AriaIntroSection() {
  const topics = [
    { num: 1, label: "What is ARIA?", highlight: false },
    { num: 2, label: "When you need it", highlight: false },
    { num: 3, label: "When you don't", highlight: true },
  ];

  return (
    <div className="aria-intro-section wow bounceInRight" data-wow-duration="0.6s">
      <h2 className="aria-intro-section__title">What is ARIA?</h2>
      <div className="aria-intro-section__divider" aria-hidden="true" />
      <ul className="aria-intro-section__list" role="list">
        {topics.map(({ num, label, highlight }) => (
          <li key={num} className="aria-intro-section__item">
            <span className="aria-intro-section__num" aria-hidden="true">
              {num}
            </span>
            <span
              className={`aria-intro-section__label${highlight ? " aria-intro-section__label--highlight" : ""}`}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
