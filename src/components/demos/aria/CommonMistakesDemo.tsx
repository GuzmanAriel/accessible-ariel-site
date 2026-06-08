"use client";

import CodeBlock from "@/components/utility/CodeBlock";

const mistakes = [
  {
    id: "bad-html",
    label: "Don't use ARIA to fix bad HTML",
    bad: "Slapping roles onto div soup",
    good: "Write semantic HTML first",
    code: `// ✗ Don't do this
<div role="list">
  <div role="listitem">Item 1</div>
  <div role="listitem">Item 2</div>
</div>

// ✓ Just use the right element
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>`,
  },
  {
    id: "duplicate",
    label: "Don't duplicate semantics",
    bad: "Redundant roles that already exist on native elements",
    good: "Trust the native element's built-in semantics",
    code: `// ✗ Redundant — <button> is already role="button"
<button role="button">Submit</button>

// ✗ Redundant — <h1> is already role="heading"
<h1 role="heading" aria-level="1">Title</h1>

// ✓ Just use the element
<button>Submit</button>
<h1>Title</h1>`,
  },
  {
    id: "aria-hidden",
    label: "Never aria-hidden a focusable element",
    bad: "Keyboard users can still reach it — SR users can't",
    good: "Only aria-hidden decorative, non-focusable content",
    code: `// ✗ Focus still lands here — SR skips it — confusing
<button aria-hidden="true">Submit</button>

// ✓ aria-hidden is fine on decorative SVGs
<svg aria-hidden="true" focusable="false">
  <!-- decorative icon -->
</svg>

// ✓ To truly hide from everyone, use hidden
<button hidden>Submit</button>`,
  },
  {
    id: "stale-state",
    label: "Keep aria state in sync",
    bad: "aria-expanded stays 'false' after the menu opens",
    good: "Update aria state whenever visual state changes",
    code: `const [open, setOpen] = useState(false);

// ✗ aria-expanded hardcoded — always wrong after first click
<button aria-expanded="false" onClick={() => setOpen(o => !o)}>
  Menu
</button>

// ✓ aria-expanded mirrors state
<button aria-expanded={open} onClick={() => setOpen(o => !o)}>
  Menu
</button>`,
  },
];

export default function CommonMistakesDemo() {
  return (
    <div className="mistakes-demo">
      {mistakes.map(({ id, label, bad, good, code }) => (
        <div key={id} className="mistakes-demo__item">
          <div className="mistakes-demo__header">
            <span className="mistakes-demo__icon" aria-hidden="true">✗</span>
            <h3 className="mistakes-demo__label">{label}</h3>
          </div>
          <div className="mistakes-demo__badges">
            <span className="mistakes-demo__badge mistakes-demo__badge--bad">
              <span aria-hidden="true">✗</span> {bad}
            </span>
            <span className="mistakes-demo__badge mistakes-demo__badge--good">
              <span aria-hidden="true">✓</span> {good}
            </span>
          </div>
          <CodeBlock>{code}</CodeBlock>
        </div>
      ))}
    </div>
  );
}
