import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode, ComponentType } from "react";

import type { Episode, DemoKey } from "@/types/episode";
import Accordion from "@/components/Accordion";
import EpisodeHeader from "@/components/EpisodeHeader";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/utility/Divider";
import LabelingDemo from "@/components/demos/LabelingDemo";
import GroupingDemo from "@/components/demos/GroupingDemo";
import CustomControlsDemo from "@/components/demos/CustomControlsDemo";
import ValidationDemo from "@/components/demos/ValidationDemo";

export const dynamicParams = false;

const contentDir = join(process.cwd(), "src/content");

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return readdirSync(contentDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ slug: f.replace(/\.json$/, "") }));
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
  const { metadata } = JSON.parse(readFileSync(filePath, "utf-8")) as Episode;
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
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const filePath = join(contentDir, `${slug}.json`);
  if (!existsSync(filePath)) notFound();

  const episode = JSON.parse(readFileSync(filePath, "utf-8")) as Episode;
  const { metadata, rules, checklist, demos } = episode;

  return (
    <div className="episode__wrapper">
      <EpisodeHeader metadata={metadata} />

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
        <Divider label="Full WAI Checklist" />
        <section aria-labelledby="check-h">
          <SectionHeading
            id="check-h"
            heading="Full WAI Checklist"
            subheading="Every requirement from the W3C WAI Forms Tutorial, mapped to code patterns."
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
