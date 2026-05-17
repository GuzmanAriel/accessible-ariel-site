"use client";

import { useState, useId } from "react";
import type { ReactNode } from "react";

export type AccordionItem = {
  label: string;
  children: ReactNode;
};

function AccordionItem({ label, children }: AccordionItem) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <div className="accordion__item">
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

export default function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="accordion">
      {items.map(({ label, children }) => (
        <AccordionItem key={label} label={label}>
          {children}
        </AccordionItem>
      ))}
    </div>
  );
}
