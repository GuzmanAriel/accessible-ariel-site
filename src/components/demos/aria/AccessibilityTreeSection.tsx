"use client";

const visualItems = [
  { label: "Welcome", type: "heading" },
  { label: "nav: Home  About  Blog", type: "nav" },
  { label: "Article text goes here...", type: "text" },
  { label: "Submit", type: "button" },
];

const treeItems = [
  { text: 'heading "Welcome"', indent: false },
  { text: "nav", indent: false },
  { text: 'link "Home"', indent: true },
  { text: 'link "About"', indent: true },
  { text: 'link "Blog"', indent: true },
  { text: "article", indent: false },
  { text: 'text "Article text…"', indent: true },
  { text: 'button "Submit"', indent: false },
];

export default function AccessibilityTreeSection() {
  return (
    <div className="a11y-tree-section">
      <div className="a11y-tree-section__panels">
        {/* Visual Page */}
        <div className="a11y-tree-section__panel wow bounceInRight" data-wow-duration="0.5s">
          <div className="a11y-tree-section__panel-header" aria-hidden="true">
            Visual Page
          </div>
          <div className="a11y-tree-section__visual" aria-hidden="true">
            {visualItems.map(({ label, type }) => (
              <div key={label} className={`a11y-tree-section__visual-item a11y-tree-section__visual-item--${type}`}>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="a11y-tree-section__arrow" aria-hidden="true">→</div>

        {/* Accessibility Tree */}
        <div
          className="a11y-tree-section__panel a11y-tree-section__panel--tree wow bounceInRight"
          data-wow-duration="0.5s"
          data-wow-delay="0.2s"
        >
          <div className="a11y-tree-section__panel-header">Accessibility Tree</div>
          <ul className="a11y-tree-section__tree" role="list">
            {treeItems.map(({ text, indent }) => (
              <li
                key={text}
                className={`a11y-tree-section__tree-item${indent ? " a11y-tree-section__tree-item--indent" : ""}`}
              >
                <code>{text}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="a11y-tree-section__caption">
        ARIA lets you influence the accessibility tree directly.
      </p>
    </div>
  );
}
