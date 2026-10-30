interface PageHeroProps {
  title: string;
  intro: string;
  compact?: boolean;
  field?: 'night' | 'deep' | 'cyan' | 'ice' | 'magenta';
}

export default function PageHero({
  title,
  intro,
  compact = false,
  field = 'cyan',
}: PageHeroProps) {
  return (
    <section className={`page-hero field-${field}${compact ? ' compact' : ''}`}>
      <div className="shell page-hero-inner">
        <h1>{title}</h1>
        <p className="lede">{intro}</p>
      </div>
    </section>
  );
}
