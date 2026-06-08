"use client";

import { useState, useRef, useEffect, useId } from "react";
import CodeBlock from "@/components/utility/CodeBlock";

const OPTIONS = ["Option A", "Option B", "Option C"];

const code = `<button
  aria-haspopup="listbox"
  aria-expanded={open}
  aria-controls={listboxId}
>
  Choose an option
</button>

<ul
  id={listboxId}
  role="listbox"
  aria-labelledby={buttonId}
  hidden={!open}
>
  <li role="option" aria-selected={selected === "Option A"}>
    Option A
  </li>
</ul>`;

export default function CustomDropdownDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonId = useId();
  const listboxId = useId();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Arrow key navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    const items = listRef.current?.querySelectorAll('[role="option"]');
    if (!items) return;
    const arr = Array.from(items) as HTMLElement[];
    const idx = arr.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      arr[Math.min(idx + 1, arr.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      arr[Math.max(idx - 1, 0)]?.focus();
    } else if (e.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
    }
  }

  function pick(opt: string) {
    setSelected(opt);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className="custom-dropdown-demo">
      <div className="custom-dropdown-demo__panels">
        {/* Live demo */}
        <div className="custom-dropdown-demo__panel">
          <p className="custom-dropdown-demo__panel-label">Live demo</p>
          <div className="custom-dropdown-demo__widget" onKeyDown={handleKeyDown}>
            <button
              id={buttonId}
              ref={buttonRef}
              className="custom-dropdown-demo__trigger"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={listboxId}
              onClick={() => setOpen((o) => !o)}
            >
              <span>{selected ?? "Choose an option"}</span>
              <span
                className="custom-dropdown-demo__chevron"
                aria-hidden="true"
                style={{ transform: open ? "rotate(180deg)" : undefined }}
              >
                ▾
              </span>
            </button>

            <ul
              id={listboxId}
              ref={listRef}
              role="listbox"
              aria-labelledby={buttonId}
              className="custom-dropdown-demo__listbox"
              hidden={!open}
            >
              {OPTIONS.map((opt) => (
                <li
                  key={opt}
                  role="option"
                  aria-selected={selected === opt}
                  tabIndex={0}
                  className={`custom-dropdown-demo__option${selected === opt ? " custom-dropdown-demo__option--selected" : ""}`}
                  onClick={() => pick(opt)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pick(opt);
                    }
                  }}
                >
                  {selected === opt && (
                    <span aria-hidden="true" className="custom-dropdown-demo__check">
                      ✓
                    </span>
                  )}
                  {opt}
                </li>
              ))}
            </ul>
          </div>

          {/* State inspector */}
          <div className="custom-dropdown-demo__state" aria-live="polite" aria-atomic="true">
            <span className="custom-dropdown-demo__state-item">
              <code>aria-expanded</code>
              <span
                className={`custom-dropdown-demo__badge custom-dropdown-demo__badge--${open ? "true" : "false"}`}
              >
                {String(open)}
              </span>
            </span>
            <span className="custom-dropdown-demo__state-item">
              <code>aria-selected</code>
              <span className="custom-dropdown-demo__badge custom-dropdown-demo__badge--neutral">
                {selected ? `"${selected}"` : "none"}
              </span>
            </span>
          </div>
        </div>

        {/* Code */}
        <div className="custom-dropdown-demo__panel">
          <p className="custom-dropdown-demo__panel-label">The markup</p>
          <CodeBlock>{code}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
