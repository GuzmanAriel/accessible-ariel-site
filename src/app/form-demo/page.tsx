import AccessibleForm from "@/components/form/AccessibleForm";

export default function FormDemoPage() {
  return (
    <div className="tutorial__wrapper">
      <header className="tutorial__header">
        <div className="container">
          <p className="tutorial__header-eyebrow text-eyebrow">Code-Along</p>
          <h1 className="tutorial__header-title">Accessible Form</h1>
          <p className="tutorial__header-desc">
            Building an accessible form from scratch — validation, error handling, and ARIA.
          </p>
        </div>
        <div className="tutorial__header-design tutorial__header-design--back" aria-hidden="true" />
        <div
          className="tutorial__header-design tutorial__header-design--front"
          aria-hidden="true"
        />
      </header>

      <main className="container">
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 24,
            marginTop: 40,
          }}
        >
          <AccessibleForm />
        </div>
      </main>
    </div>
  );
}
