"use client";

import { useState, useId } from "react";
import type { ReactNode } from "react";

type AccordionProps = {
  label: string;
  children: ReactNode;
};

export default function Accordion({ label, children }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <div className="accordion">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`accordion__toggle ${open ? "accordion--open" : ""}`}
        aria-expanded={open}
        aria-controls={bodyId}
      >
        <span>{label}</span>
        <span aria-hidden="true" className="accordion__icon">
          +
        </span>
      </button>

      <div id={bodyId} hidden={!open} className="accordion__content">
        {open && <div>{children}</div>}
      </div>
    </div>
  );
}
