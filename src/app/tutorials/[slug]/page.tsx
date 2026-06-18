import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ComponentType } from "react";

import type { Tutorial } from "@/types/tutorial";
import Accordion from "@/components/Accordion";
import TutorialHeader from "@/components/TutorialHeader";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/utility/Divider";

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const filePath = join(contentDir, `${slug}.json`);
  if (!existsSync(filePath)) notFound();

  const tutorial = JSON.parse(readFileSync(filePath, "utf-8")) as Tutorial;
  const { metadata, rules, checklist, demos } = tutorial;

  const resolvedDemos = await Promise.all(
    demos.map(async ({ component, ...meta }) => {
      const mod = await import(`@/components/demos/${component}`);
      return { Component: mod.default as ComponentType, ...meta };
    })
  );

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
        {resolvedDemos.map(({ Component, dividerLabel, heading, description, card }) => {
          const inner = <Component />;
          return (
            <div key={dividerLabel} className="tutorial__section">
              <Divider label={dividerLabel} />
              <section aria-labelledby={dividerLabel}>
                <SectionHeading id={dividerLabel} heading={heading} subheading={description} />
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
