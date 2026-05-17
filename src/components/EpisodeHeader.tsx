import type { EpisodeMetadata } from "@/types/episode";

type EpisodeHeaderProps = {
  metadata: EpisodeMetadata;
};

export default function EpisodeHeader({ metadata }: EpisodeHeaderProps) {
  return (
    <header className="episode__header">
      <div className="episode__header-design">
        <div className="episode__header-design--back" aria-hidden="true" />
        <div className="episode__header-design--front" aria-hidden="true" />
      </div>

      <div className="container">
        <p className="episode__header-eyebrow text-eyebrow">Accessible Ariel</p>

        <h1 className="episode__header-title">{metadata.title}</h1>

        {metadata.subtitle && (
          <p className="episode__header-subtitle">{metadata.subtitle}</p>
        )}

        <p className="episode__header-desc">{metadata.description}</p>
      </div>
    </header>
  );
}
