import type { TutorialMetadata } from "@/types/tutorial";

type TutorialHeaderProps = {
  metadata: TutorialMetadata;
};

export default function TutorialHeader({ metadata }: TutorialHeaderProps) {
  return (
    <header className="tutorial__header">
      <div className="tutorial__header-design">
        <div className="tutorial__header-design--back" aria-hidden="true" />
        <div className="tutorial__header-design--front" aria-hidden="true" />
      </div>

      <div className="container">
        <p className="tutorial__header-eyebrow text-eyebrow">Accessible Ariel</p>

        <h1 className="tutorial__header-title">{metadata.title}</h1>

        {metadata.subtitle && <p className="tutorial__header-subtitle">{metadata.subtitle}</p>}

        <p className="tutorial__header-desc">{metadata.description}</p>

        {metadata.youTubeLink && (
          <div className="tutorial__header-actions">
            <a
              className="btn btn-s"
              href={metadata.youTubeLink.href}
              aria-label={metadata.youTubeLink.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Tutorial
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
