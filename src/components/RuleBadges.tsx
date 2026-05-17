type RuleBadgesProps = {
  good: string;
  bad: string;
};

export default function RuleBadges({ good, bad }: RuleBadgesProps) {
  return (
    <div className="rule-badge">
      <span className="rule-badge__good">✓ {good}</span>
      <span className="rule-badge__bad">✗ {bad}</span>
    </div>
  );
}
