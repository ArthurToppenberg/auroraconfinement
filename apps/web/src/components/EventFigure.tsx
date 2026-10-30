interface EventFigureProps {
  name: 'lecture-hall' | 'lecture-wide' | 'nff-panel' | 'nff-team';
  alt: string;
  caption: string;
  height: number;
  sizes: string;
  eager?: boolean;
}

// Renditions of the team's own event photographs, resized and stripped of
// metadata (public/images/events). The export cannot resize at request time.
const widths = [640, 1024, 1600] as const;
const intrinsicWidth = 1600;

export default function EventFigure({
  name,
  alt,
  caption,
  height,
  sizes,
  eager = false,
}: EventFigureProps) {
  const base = `/images/events/${name}`;
  return (
    <figure className="event-figure">
      <img
        src={`${base}-1024.webp`}
        srcSet={widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')}
        sizes={sizes}
        alt={alt}
        width={intrinsicWidth}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
