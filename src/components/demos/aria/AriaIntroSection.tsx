"use client";

import { useState } from "react";

export default function AriaIntroSection() {
  const topics = [
    { num: 1, label: "What is ARIA?", highlight: false },
    { num: 2, label: "When you need it", highlight: false },
    { num: 3, label: "When you don't", highlight: true },
  ];

  const [revealed, setRevealed] = useState(0);

  const handleClick = () => {
    if (revealed < topics.length) setRevealed((n) => n + 1);
  };

  return (
    <div
      className="aria-intro-section"
      onClick={handleClick}
      style={{ cursor: revealed < topics.length ? "pointer" : "default" }}
    >
      <h2 className="aria-intro-section__title">What is ARIA?</h2>
      <div className="aria-intro-section__divider" aria-hidden="true" />
      <ul className="aria-intro-section__list" role="list">
        {topics.map(({ num, label, highlight }, i) => {
          if (i >= revealed) return null;
          const isNew = i === revealed - 1;
          return (
            <li
              key={num}
              className={`aria-intro-section__item${isNew ? " animated fadeInRight" : ""}`}
            >
              <span className="aria-intro-section__num" aria-hidden="true">
                {num}
              </span>
              <span
                className={`aria-intro-section__label${highlight ? " aria-intro-section__label--highlight" : ""}`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
