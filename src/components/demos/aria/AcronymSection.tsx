"use client";

import { useState } from "react";

const letters = [
  { letter: "A", word: "Accessible" },
  { letter: "R", word: "Rich" },
  { letter: "I", word: "Internet" },
  { letter: "A", word: "Applications" },
];

export default function AcronymSection() {
  const [revealed, setRevealed] = useState(0);

  const handleClick = () => {
    if (revealed < letters.length) setRevealed((n) => n + 1);
  };

  return (
    <div
      className="acronym-section"
      onClick={handleClick}
      style={{ cursor: revealed < letters.length ? "pointer" : "default" }}
    >
      <div className="acronym-section__letters" role="list" aria-label="ARIA stands for">
        {letters.map(({ letter, word }, i) => {
          if (i >= revealed) return null;
          const isNew = i === revealed - 1;
          return (
            <div
              key={i}
              className={`acronym-section__item${isNew ? " animated fadeInRight" : ""}`}
              role="listitem"
            >
              <span className="acronym-section__letter" aria-hidden="true">
                {letter}
              </span>
              <span className="acronym-section__word">{word}</span>
            </div>
          );
        })}
      </div>
      <p className="acronym-section__subtitle">
        A set of HTML attributes maintained by the W3C — giving assistive technologies more
        information about what&apos;s on the page.
      </p>
    </div>
  );
}
