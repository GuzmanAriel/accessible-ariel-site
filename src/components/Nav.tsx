"use client";

import { useId, useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navId = useId();

  return (
    <header className={`main-nav${open ? " main-nav--visible" : ""}`}>
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
      <button
        type="button"
        className="btn-icon btn-nav"
        aria-haspopup="true"
        aria-controls={navId}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
    </header>
  );
}
