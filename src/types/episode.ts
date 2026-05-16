export type DemoKey = "labeling" | "grouping" | "customControls" | "validation";

export interface EpisodeRule {
  label: string;
  good: string;
  bad: string;
  code: string;
}

export interface EpisodeChecklistItem {
  item: string;
}

export interface EpisodeMetadata {
  title: string;
  subtitle?: string;
  description: string;
  accentColor: string;
  bgColor: string;
}

export interface Episode {
  metadata: EpisodeMetadata;
  rules: EpisodeRule[];
  checklist: EpisodeChecklistItem[];
  demos: DemoKey[];
}
