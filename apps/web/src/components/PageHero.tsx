interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  compact?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  intro,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={compact ? 'page-hero compact' : 'page-hero'}>
      <div className="shell page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{intro}</p>
      </div>
    </section>
  );
}
