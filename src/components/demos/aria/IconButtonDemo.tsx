"use client";

import CodeBlock from "@/components/utility/CodeBlock";

const codeBad = `// ✗ No label — SR just says "button"
<button>
  <svg aria-hidden="true">
    <!-- × icon -->
  </svg>
</button>`;

const codeGood = `// ✓ aria-label — SR says "Close dialog, button"
<button aria-label="Close dialog">
  <svg aria-hidden="true">
    <!-- × icon -->
  </svg>
</button>`;

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L16 16M16 2L2 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function IconButtonDemo() {
  return (
    <div className="icon-button-demo">
      <div className="icon-button-demo__panels">
        {/* Bad */}
        <div className="icon-button-demo__panel icon-button-demo__panel--bad">
          <p className="icon-button-demo__status icon-button-demo__status--bad">✗ No label</p>
          <div className="icon-button-demo__preview">
            <button className="icon-button-demo__btn" tabIndex={-1} aria-hidden="true">
              <CloseIcon />
            </button>
          </div>
          <p className="icon-button-demo__sr-announcement">
            Screen reader announces: <strong>&ldquo;button&rdquo;</strong>
          </p>
          <CodeBlock>{codeBad}</CodeBlock>
        </div>

        {/* Good */}
        <div className="icon-button-demo__panel icon-button-demo__panel--good">
          <p className="icon-button-demo__status icon-button-demo__status--good">✓ aria-label</p>
          <div className="icon-button-demo__preview">
            <button
              className="icon-button-demo__btn icon-button-demo__btn--good"
              aria-label="Close dialog"
            >
              <CloseIcon />
            </button>
          </div>
          <p className="icon-button-demo__sr-announcement">
            Screen reader announces:{" "}
            <strong>&ldquo;Close dialog, button&rdquo;</strong>
          </p>
          <CodeBlock>{codeGood}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
