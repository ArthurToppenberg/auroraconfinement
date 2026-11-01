import HeroPlasma from '@/components/HeroPlasma';
import { conceptCaption } from '@/content/site';

// Pre-generated WebP renditions of the desktop-model concept illustration
// (original in assets/images/). The exported site cannot resize images at
// request time, so the responsive set is committed under public/.
const widths = [360, 560, 760, 1000] as const;
const intrinsicSize = 1000;
const aspect = 1287 / 1222;

// The animated plasma torus with the desktop stellarator model sitting inside
// it. The plasma is drawn first and faded, so it stays behind the model.
export default function HeroVisual() {
  const base = '/images/concepts/desktop';
  return (
    <figure className="hero-visual">
      <div className="hero-visual-stage">
        <HeroPlasma />
        <img
          className="hero-model"
          src={`${base}-${intrinsicSize}.webp`}
          srcSet={widths
            .map((width) => `${base}-${width}.webp ${width}w`)
            .join(', ')}
          alt="Concept illustration of a desktop stellarator model in an open flight case, with purple plasma glowing inside a ring of magnet coils."
          sizes="(min-width: 60rem) 24rem, 0px"
          loading="lazy"
          decoding="async"
          width={intrinsicSize}
          height={Math.round(intrinsicSize / aspect)}
        />
      </div>
      <figcaption>{conceptCaption}</figcaption>
    </figure>
  );
}
