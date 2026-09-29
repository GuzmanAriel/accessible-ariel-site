"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Escape" && open) {
      setOpen(false);
      buttonRef.current?.focus(); // return focus to the toggle — the part everyone forgets
    }
  }

  return (
    <header className={`main-nav ${open ? "main-nav--visible" : ""}`} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        className="btn-icon btn-nav"
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
      <nav id={navId} inert={!open}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/#tutorials">Tutorials</a>
          </li>
          <li>
            <a href="/portfolio">Ariel's Portfolio</a>
          </li>
          <li>
            <a href="/portfolio/#skills">Ariel's Skills</a>
          </li>
          <li>
            <a href="/portfolio/#projects">Ariel's Projects</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
