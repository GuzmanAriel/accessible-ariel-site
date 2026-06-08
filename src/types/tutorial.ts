export type DemoKey =
  // Forms
  | "labeling"
  | "grouping"
  | "customControls"
  | "validation"
  // ARIA — visual explainers
  | "ariaIntro"
  | "acronym"
  | "accessibilityTree"
  | "rolesPropertiesStates"
  | "goldenRule"
  | "divVsButton"
  // ARIA — interactive demos
  | "customDropdown"
  | "liveRegion"
  | "iconButton"
  | "commonMistakes";

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
}

export interface Tutorial {
  metadata: TutorialMetadata;
  rules: TutorialRule[];
  checklist: TutorialChecklistItem[];
  demos: DemoKey[];
}
