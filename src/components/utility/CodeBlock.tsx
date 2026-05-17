export default function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      style={{
        background: "var(--ink)",
        borderLeft: "3px solid var(--brand-yellow)",
        padding: "12px 16px",
        borderRadius: 6,
        fontSize: 14,
        fontFamily: "var(--font-mono)",
        color: "#e8f0ff",
        overflowX: "auto",
        lineHeight: 1.7,
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      <code>{children}</code>
    </pre>
  );
}
