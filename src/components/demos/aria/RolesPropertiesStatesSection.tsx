"use client";

const cards = [
  {
    title: "Roles",
    subtitle: "What is this element?",
    examples: ['role="dialog"', 'role="tab"', 'role="listbox"'],
    modifier: "roles",
  },
  {
    title: "Properties",
    subtitle: "What are its characteristics?",
    examples: ['aria-required="true"', 'aria-haspopup="true"', 'aria-label="Close"'],
    modifier: "properties",
  },
  {
    title: "States",
    subtitle: "What's its current condition?",
    examples: ['aria-expanded="false"', 'aria-checked="true"', 'aria-disabled="true"'],
    modifier: "states",
  },
];

export default function RolesPropertiesStatesSection() {
  return (
    <div className="rps-section">
      <div className="rps-section__cards">
        {cards.map(({ title, subtitle, examples, modifier }, i) => (
          <div
            key={title}
            className={`rps-section__card rps-section__card--${modifier} wow bounceInRight`}
            data-wow-duration="0.5s"
            data-wow-delay={`${i * 0.15}s`}
          >
            <div className="rps-section__card-header">
              <h3 className="rps-section__card-title">{title}</h3>
            </div>
            <p className="rps-section__card-subtitle">{subtitle}</p>
            <ul className="rps-section__examples" role="list">
              {examples.map((ex) => (
                <li key={ex} className="rps-section__example">
                  <code>{ex}</code>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="rps-section__footer" aria-label="Summary: Roles, Properties, States">
        Roles&nbsp;&nbsp;·&nbsp;&nbsp;Properties&nbsp;&nbsp;·&nbsp;&nbsp;States
      </p>
    </div>
  );
}
