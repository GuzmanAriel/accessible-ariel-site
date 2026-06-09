export type DemoKey = "labeling" | "grouping" | "customControls" | "validation";

export interface TutorialRule {
  label: string;
  good: string;
  bad: string;
  code: string;
}

export interface TutorialChecklistItem {
  item: string;
}

export interface TutorialMetadata {
  title: string;
  subtitle?: string;
  description: string;
  youTubeLink?: {
    href: string;
    ariaLabel: string;
  };
}

export interface Tutorial {
  metadata: TutorialMetadata;
  rules: TutorialRule[];
  checklist: TutorialChecklistItem[];
  demos: DemoKey[];
}
