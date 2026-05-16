import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode, ComponentType } from "react";

import type { Episode, DemoKey } from "@/types/episode";
import RuleCard from "@/components/RuleCard";
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
        A visible <code>&lt;label&gt;</code> linked with <code>htmlFor</code>{" "}
        gives every input an accessible name. Placeholders are never a substitute.
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
        When native elements won&apos;t do, add <code>role</code>,{" "}
        <code>aria-checked</code>, and keyboard handlers so custom widgets
        behave like their native counterparts.
      </>
    ),
    Component: CustomControlsDemo,
  },
  validation: {
    dividerLabel: "Demo: Instructions + Validation + Notifications",
    heading: "Full Form — All Together",
    description: (
      <>
        Pre-form instructions, fieldset grouping, inline hints,{" "}
        <code>aria-invalid</code>, a focusable error summary, and a live-region
        success message. Submit empty to see validation in action.
      </>
    ),
    Component: ValidationDemo,
    card: true,
  },
};

// ─── Shared styles ────────────────────────────────────────────────────────────

const sectionHeadStyle = {
  fontFamily:    "Syne, sans-serif",
  fontWeight:    800,
  fontSize:      28,
  color:         "var(--ink)",
  margin:        "0 0 6px",
  letterSpacing: "-0.02em",
} as const;

const subStyle = {
  fontFamily: "DM Sans, sans-serif",
  fontSize:   18,
  color:      "var(--muted)",
  margin:     "0 0 18px",
  lineHeight: 1.6,
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = join(contentDir, `${slug}.json`);
  if (!existsSync(filePath)) notFound();

  const episode = JSON.parse(readFileSync(filePath, "utf-8")) as Episode;
  const { metadata, rules, checklist, demos } = episode;

  return (
    <div className="episode-wrapper">
      {/* ── Header ── */}
      <header className="episode-header">
        {/* Decorative circles */}
        <div
          aria-hidden="true"
          style={{
            position:     "absolute",
            right:        -40,
            top:          -40,
            width:        200,
            height:       200,
            borderRadius: "50%",
            background:   "rgba(255,255,255,0.07)",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position:     "absolute",
            right:        60,
            top:          20,
            width:        80,
            height:       80,
            borderRadius: "50%",
            background:   "var(--brand-yellow)",
            opacity:      0.85,
          }}
        />

        <p
          style={{
            margin:        "0 0 6px",
            fontFamily:    "Syne, sans-serif",
            fontWeight:    800,
            fontSize:      11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "var(--brand-yellow)",
          }}
        >
          Accessible Ariel
        </p>

        <h1
          style={{
            margin:     "0 0 10px",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize:   36,
            color:      "#fff",
            lineHeight: 1.1,
          }}
        >
          {metadata.title}
        </h1>

        {metadata.subtitle && (
          <p
            style={{
              margin:     "0 0 10px",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize:   18,
              color:      "rgba(255,255,255,0.9)",
              lineHeight: 1.2,
            }}
          >
            {metadata.subtitle}
          </p>
        )}

        <p
          style={{
            margin:     0,
            fontFamily: "DM Sans, sans-serif",
            color:      "rgba(255,255,255,0.85)",
            fontSize:   14,
            maxWidth:   400,
          }}
        >
          {metadata.description}
        </p>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px" }}>

        {/* Rules accordion */}
        <section aria-labelledby="rules-h" style={{ marginTop: 36 }}>
          <h2 id="rules-h" style={sectionHeadStyle}>The Rules</h2>
          <p style={subStyle}>
            Click any rule to expand it. Tags show which W3C WAI section it covers.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rules.map((rule) => (
              <RuleCard key={rule.label} {...rule} />
            ))}
          </div>
        </section>

        {/* Demo sections — driven by the demos array in the JSON */}
        {demos.map((key) => {
          const { dividerLabel, heading, description, Component, card } =
            demoMap[key];
          const inner = <Component />;
          return (
            <div key={key}>
              <Divider label={dividerLabel} />
              <section aria-labelledby={`${key}-h`}>
                <h2 id={`${key}-h`} style={sectionHeadStyle}>
                  {heading}
                </h2>
                <p style={subStyle}>{description}</p>
                {card ? (
                  <div
                    style={{
                      background:   "#fff",
                      border:       "1px solid var(--border)",
                      borderRadius: 12,
                      padding:      24,
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
          <h2 id="check-h" style={sectionHeadStyle}>Full WAI Checklist</h2>
          <p style={subStyle}>
            Every requirement from the W3C WAI Forms Tutorial, mapped to code patterns.
          </p>
          <ul
            style={{
              margin:         0,
              padding:        0,
              listStyle:      "none",
              display:        "flex",
              flexDirection:  "column",
              gap:            8,
              fontFamily:     "DM Sans, sans-serif",
              fontSize:       14,
              color:          "var(--ink)",
            }}
          >
            {checklist.map(({ item }) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}
