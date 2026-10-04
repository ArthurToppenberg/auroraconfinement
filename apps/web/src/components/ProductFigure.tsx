import { conceptCaption } from '@/content/site';

interface ProductFigureProps {
  kind: 'tabletop' | 'research';
  eager?: boolean;
}

// Pre-generated WebP renditions of the approved concept illustrations
// (originals live in assets/images/). The exported site cannot resize images
// at request time, so the responsive set is committed under public/.
const widths = [360, 560, 760, 1080] as const;
const intrinsicSize = 1254;

const alts = {
  tabletop:
    'Concept illustration of a tabletop stellarator exhibition model with visible plasma geometry.',
  research:
    'Concept illustration of an experimental stellarator research platform with an enclosed plasma vessel.',
} as const;

export default function ProductFigure({
  kind,
  eager = false,
}: ProductFigureProps) {
  const base = `/images/concepts/${kind}`;
  return (
    <figure className="product-figure">
      <img
        src={`${base}-${intrinsicSize}.webp`}
        srcSet={widths
          .map((width) => `${base}-${width}.webp ${width}w`)
          .join(', ')}
        alt={alts[kind]}
        sizes="(min-width: 64rem) 48vw, (min-width: 48rem) 70vw, 100vw"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        width={intrinsicSize}
        height={intrinsicSize}
      />
      <figcaption>{conceptCaption}</figcaption>
    </figure>
  );
}
