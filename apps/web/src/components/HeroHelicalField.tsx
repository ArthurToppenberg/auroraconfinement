'use client';

import { useEffect, useRef } from 'react';

const pointCount = 160;
const turns = 10;
const baseAmplitude = 9;
const phaseDuration = 6000;
const breathingDuration = 5000;

type Point = {
  x: number;
  y: number;
};

const heartPoints = Array.from({ length: pointCount }, (_, index) => {
  const t = (index / pointCount) * Math.PI * 2;
  const sinT = Math.sin(t);
  const x = 240 + 12.5 * 16 * sinT * sinT * sinT;
  const y =
    210 -
    11 *
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));

  return { x, y };
});

function createHelicalPath(phase: number, amplitude: number) {
  const points = heartPoints.map((point, index) => {
    const previous = heartPoints[(index - 1 + pointCount) % pointCount]!;
    const next = heartPoints[(index + 1) % pointCount]!;
    const tangentX = next.x - previous.x;
    const tangentY = next.y - previous.y;
    const tangentLength = Math.hypot(tangentX, tangentY) || 1;
    const normalX = -tangentY / tangentLength;
    const normalY = tangentX / tangentLength;
    const t = (index / pointCount) * Math.PI * 2;
    const offset = amplitude * Math.sin(turns * t - phase);

    return {
      x: point.x + normalX * offset,
      y: point.y + normalY * offset,
    };
  });

  return `${points
    .map(
      (point: Point, index) =>
        `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
    )
    .join(' ')} Z`;
}

const initialPath = createHelicalPath(0, baseAmplitude);

export default function HeroHelicalField() {
  const auraRef = useRef<SVGPathElement>(null);
  const coreRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function draw(elapsed: number) {
      const phase = (elapsed / phaseDuration) * Math.PI * 2;
      const amplitude =
        baseAmplitude *
        (1 + 0.15 * Math.sin((elapsed / breathingDuration) * Math.PI * 2));
      const path = createHelicalPath(phase, amplitude);

      auraRef.current?.setAttribute('d', path);
      coreRef.current?.setAttribute('d', path);
      frame = window.requestAnimationFrame(draw);
    }

    function syncAnimation() {
      window.cancelAnimationFrame(frame);
      if (reducedMotion.matches) {
        auraRef.current?.setAttribute('d', initialPath);
        coreRef.current?.setAttribute('d', initialPath);
        return;
      }
      frame = window.requestAnimationFrame(draw);
    }

    syncAnimation();
    reducedMotion.addEventListener('change', syncAnimation);

    return () => {
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener('change', syncAnimation);
    };
  }, []);

  return (
    <svg
      className="hero-helical-field"
      viewBox="0 0 480 480"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="hero-helical-gradient"
          x1="55"
          y1="75"
          x2="430"
          y2="405"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2dd4bf" />
          <stop offset="0.45" stopColor="#3b82f6" />
          <stop offset="0.78" stopColor="#d946ef" />
          <stop offset="1" stopColor="#2dd4bf" />
        </linearGradient>
      </defs>
      <path ref={auraRef} className="hero-helical-aura" d={initialPath} />
      <path ref={coreRef} className="hero-helical-core" d={initialPath} />
    </svg>
  );
}
