import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode, ComponentType } from "react";

import type { Tutorial, DemoKey } from "@/types/tutorial";
import Accordion from "@/components/Accordion";
import TutorialHeader from "@/components/TutorialHeader";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/utility/Divider";

// Forms demos
import LabelingDemo from "@/components/demos/LabelingDemo";
import GroupingDemo from "@/components/demos/GroupingDemo";
import CustomControlsDemo from "@/components/demos/CustomControlsDemo";
import ValidationDemo from "@/components/demos/ValidationDemo";

// ARIA — visual explainer sections
import AriaIntroSection from "@/components/demos/aria/AriaIntroSection";
import AcronymSection from "@/components/demos/aria/AcronymSection";
import AccessibilityTreeSection from "@/components/demos/aria/AccessibilityTreeSection";
import RolesPropertiesStatesSection from "@/components/demos/aria/RolesPropertiesStatesSection";
import GoldenRuleSection from "@/components/demos/aria/GoldenRuleSection";
import DivVsButtonSection from "@/components/demos/aria/DivVsButtonSection";

// ARIA — interactive demos
import CustomDropdownDemo from "@/components/demos/aria/CustomDropdownDemo";
import LiveRegionDemo from "@/components/demos/aria/LiveRegionDemo";
import IconButtonDemo from "@/components/demos/aria/IconButtonDemo";
import CommonMistakesDemo from "@/components/demos/aria/CommonMistakesDemo";

export const dynamicParams = false;

const contentDir = join(process.cwd(), "src/content");

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  const { tutorials } = JSON.parse(readFileSync(join(contentDir, "tutorials.json"), "utf-8")) as {
    tutorials: { rulesLink: { href: string } }[];
  };
  return tutorials.map(({ rulesLink }) => ({
    slug: rulesLink.href.split("/").pop() as string,
  }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = join(contentDir, `${slug}.json`);
  if (!existsSync(filePath)) return {};
  const { metadata } = JSON.parse(readFileSync(filePath, "utf-8")) as Tutorial;
  return { title: metadata.title, description: metadata.description };
}

// ─── Demo map ─────────────────────────────────────────────────────────────────

type DemoEntry = {
  dividerLabel: string;
  heading: string;
  description: ReactNode;
  Component: ComponentType;
  card?: boolean;
};

const demoMap: Record<DemoKey, DemoEntry> = {
  // ── Forms ──────────────────────────────────────────────────────────────────
  labeling: {
    dividerLabel: "Demo: Labeling Controls",
    heading: "Labeling Controls",
    description: (
      <>
        A visible <code>&lt;label&gt;</code> linked with <code>htmlFor</code> gives every input an
        accessible name. Placeholders are never a substitute.
      </>
    ),
    Component: LabelingDemo,
  },
  grouping: {
    dividerLabel: "Demo: Grouping Controls",
    heading: "Grouping Controls",
    description:
      "Radios, checkboxes, and related fields need semantic grouping so screen readers announce the group name alongside each control.",
    Component: GroupingDemo,
  },
  customControls: {
    dividerLabel: "Demo: Custom Controls",
    heading: "Custom Controls",
    description: (
      <>
        When native elements won&apos;t do, add <code>role</code>, <code>aria-checked</code>, and
        keyboard handlers so custom widgets behave like their native counterparts.
      </>
    ),
    Component: CustomControlsDemo,
  },
  validation: {
    dividerLabel: "Demo: Instructions + Validation + Notifications",
    heading: "Full Form — All Together",
    description: (
      <>
        Pre-form instructions, fieldset grouping, inline hints, <code>aria-invalid</code>, a
        focusable error summary, and a live-region success message. Submit empty to see validation
        in action.
      </>
    ),
    Component: ValidationDemo,
    card: true,
  },

  // ── ARIA — visual explainers ───────────────────────────────────────────────
  ariaIntro: {
    dividerLabel: "In This Tutorial",
    heading: "What We'll Cover",
    description: "A quick overview of the three concepts ARIA gives you control over.",
    Component: AriaIntroSection,
  },
  acronym: {
    dividerLabel: "Breaking Down the Name",
    heading: "ARIA Stands For…",
    description:
      "Accessible Rich Internet Applications — a W3C specification for enriching the accessibility tree.",
    Component: AcronymSection,
  },
  accessibilityTree: {
    dividerLabel: "How Screen Readers See Your Page",
    heading: "The Accessibility Tree",
    description:
      "Screen readers don't see your page visually. They navigate a parallel structure called the accessibility tree.",
    Component: AccessibilityTreeSection,
  },
  rolesPropertiesStates: {
    dividerLabel: "The Three ARIA Concepts",
    heading: "Roles, Properties & States",
    description: "Everything ARIA can do falls into one of these three categories.",
    Component: RolesPropertiesStatesSection,
  },
  goldenRule: {
    dividerLabel: "The Most Important Rule",
    heading: "The First Rule of ARIA",
    description:
      "Native HTML elements already carry roles, properties, and states for free. Prefer them.",
    Component: GoldenRuleSection,
  },
  divVsButton: {
    dividerLabel: "ARIA Adds Semantics, Not Behavior",
    heading: "div[role=button] vs <button>",
    description:
      "Using ARIA on a div doesn't give it keyboard support. You still have to wire everything yourself.",
    Component: DivVsButtonSection,
  },

  // ── ARIA — interactive demos ───────────────────────────────────────────────
  customDropdown: {
    dividerLabel: "Demo: Custom Interactive Components",
    heading: "Custom Dropdown",
    description: (
      <>
        No native HTML element covers a styled listbox. Use <code>aria-haspopup</code>,{" "}
        <code>aria-expanded</code>, and <code>role=&quot;listbox&quot;</code> to describe the
        pattern — then watch the state inspector as you interact.
      </>
    ),
    Component: CustomDropdownDemo,
  },
  liveRegion: {
    dividerLabel: "Demo: Dynamic Content Updates",
    heading: "Live Regions",
    description: (
      <>
        When content changes without a page reload, use <code>aria-live</code> so screen readers
        announce the update. Type in the search box — a screen reader would announce the result
        count automatically.
      </>
    ),
    Component: LiveRegionDemo,
  },
  iconButton: {
    dividerLabel: "Demo: Labeling Icon-Only Controls",
    heading: "Icon Button Labels",
    description: (
      <>
        An icon button with no visible text needs <code>aria-label</code>. Without it, a screen
        reader just says &ldquo;button&rdquo; with no context.
      </>
    ),
    Component: IconButtonDemo,
  },
  commonMistakes: {
    dividerLabel: "Common Mistakes to Avoid",
    heading: "What Not to Do",
    description:
      "Four rapid-fire patterns that break accessibility — with the correct alternative for each.",
    Component: CommonMistakesDemo,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const filePath = join(contentDir, `${slug}.json`);
  if (!existsSync(filePath)) notFound();

  const tutorial = JSON.parse(readFileSync(filePath, "utf-8")) as Tutorial;
  const { metadata, rules, checklist, demos } = tutorial;

  return (
    <div className="tutorial__wrapper">
      <TutorialHeader metadata={metadata} />

      {/* ── Main ── */}
      <main className="container">
        {/* Rules accordion */}
        <section aria-labelledby="rules-h" className="section__intro">
          <SectionHeading
            id="rules-h"
            heading="The Rules"
            subheading="Click any rule to expand it. Tags show which W3C WAI section it covers."
          />
          <Accordion rules={rules} />
        </section>

        {/* Demo sections — driven by the demos array in the JSON */}
        {demos.map((key) => {
          const { dividerLabel, heading, description, Component, card } = demoMap[key];
          const inner = <Component />;
          return (
            <div key={key}>
              <Divider label={dividerLabel} />
              <section aria-labelledby={`${key}-h`}>
                <SectionHeading id={`${key}-h`} heading={heading} subheading={description} />
                {card ? (
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: 24,
                    }}
                  >
                    {inner}
                  </div>
                ) : (
                  inner
                )}
              </section>
            </div>
          );
        })}

        {/* Checklist */}
        <Divider label="Full ARIA Checklist" />
        <section aria-labelledby="check-h">
          <SectionHeading
            id="check-h"
            heading="Full ARIA Checklist"
            subheading="Every rule from this tutorial, mapped to the pattern it covers."
          />
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--ink)",
            }}
          >
            {checklist.map(({ item }) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
