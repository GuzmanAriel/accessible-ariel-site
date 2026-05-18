"use client";

import { useState, useId } from "react";
import type { EpisodeRule } from "@/types/episode";
import RuleBadges from "@/components/RuleBadges";
import CodeBlock from "@/components/utility/CodeBlock";

function AccordionItem({ label, good, bad, code }: EpisodeRule) {
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
        {open && (
          <div>
            <RuleBadges good={good} bad={bad} />
            <CodeBlock>{code}</CodeBlock>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Accordion({ rules }: { rules: EpisodeRule[] }) {
  return (
    <div className="accordion">
      {rules.map((rule) => (
        <AccordionItem key={rule.label} {...rule} />
      ))}
    </div>
  );
}
