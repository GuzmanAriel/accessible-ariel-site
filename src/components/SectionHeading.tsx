import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  heading: string;
  subheading: ReactNode;
};

export default function SectionHeading({ id, heading, subheading }: SectionHeadingProps) {
  return (
    <>
      <h2 id={id} className="section__heading">
        {heading}
      </h2>
      <p className="section__subheading">{subheading}</p>
    </>
  );
}
