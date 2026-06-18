"use client";

const letters = [
  { letter: "A", word: "Accessible" },
  { letter: "R", word: "Rich" },
  { letter: "I", word: "Internet" },
  { letter: "A", word: "Applications" },
];

export default function AcronymSection() {
  return (
    <div className="acronym-section">
      <div className="acronym-section__letters" role="list" aria-label="ARIA stands for">
        {letters.map(({ letter, word }, i) => (
          <div
            key={i}
            className="acronym-section__item wow bounceInRight"
            data-wow-duration="0.5s"
            data-wow-delay={`${i * 0.15}s`}
            role="listitem"
          >
            <span className="acronym-section__letter" aria-hidden="true">
              {letter}
            </span>
            <span className="acronym-section__word">{word}</span>
          </div>
        ))}
      </div>
      <p className="acronym-section__subtitle">
        A set of HTML attributes maintained by the W3C — giving assistive technologies more
        information about what&apos;s on the page.
      </p>
    </div>
  );
}
