'use client';

import { useEffect, useRef } from 'react';

// Decorative plasma for the home hero: charged particles streaming along the
// twisting field lines of a stellarator-style torus, with the vessel outline
// drawn faintly behind them. Colours come from the hero's own CSS variables so
// every palette works. Paused offscreen and in hidden tabs; reduced motion
// gets a single still frame.
const majorRadius = 1;
const minorRadius = 0.36;
const ellipticity = 0.55;
// Even, so the ellipse returns to its starting orientation and field lines close.
const fieldPeriods = 4;
// A whole number of poloidal turns per toroidal turn, so each field line closes.
const iota = 2;
const tilt = 0.62;
const turnDuration = 48000;
const lineSteps = 180;
const tailSteps = 10;
const tailLength = 0.5;
const particlesPerLine = 3;

type FieldLine = { theta: number; fraction: number };

type Particle = {
  line: FieldLine;
  phi: number;
  speed: number;
};

type Vec = { x: number; y: number; depth: number };

function makeLines(count: number): FieldLine[] {
  return Array.from({ length: count }, (_, index) => ({
    theta: (index / count) * Math.PI * 2 * 5.3,
    fraction: 0.3 + 0.7 * ((index * 0.618) % 1) ** 0.7,
  }));
}

function makeParticles(lines: FieldLine[]): Particle[] {
  return lines.flatMap((line, lineIndex) =>
    Array.from({ length: particlesPerLine }, () => ({
      line,
      phi: Math.random() * Math.PI * 2,
      speed: (0.8 + Math.random() * 0.6) * (lineIndex % 2 ? 1 : -1) * 0.0011,
    })),
  );
}

// A point on the twisted, elliptical flux surface, in torus space.
function surface(phi: number, theta: number, fraction: number) {
  const twist = (fieldPeriods * phi) / 2;
  const cosT = Math.cos(theta);
  const sinT = ellipticity * Math.sin(theta);
  const reach = minorRadius * fraction;
  const radial =
    majorRadius +
    reach * (cosT * Math.cos(twist) - sinT * Math.sin(twist)) +
    reach * 0.12 * Math.cos(fieldPeriods * phi);
  const height = reach * (cosT * Math.sin(twist) + sinT * Math.cos(twist));
  return { x: radial * Math.cos(phi), y: height, z: radial * Math.sin(phi) };
}

export default function HeroPlasma() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const ctx: CanvasRenderingContext2D = context;
    const surfaceEl: HTMLCanvasElement = canvas;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lines: FieldLine[] = [];
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let onscreen = true;
    let colours = { ink: '#000', deep: '#000', paper: '#fff' };
    let colourAge = 0;

    function readColours() {
      const style = getComputedStyle(surfaceEl);
      const read = (name: string, fallback: string) =>
        style.getPropertyValue(name).trim() || fallback;
      colours = {
        ink: read('--ink', colours.ink),
        deep: read('--deep', colours.deep),
        paper: read('--paper', colours.paper),
      };
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = surfaceEl.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      surfaceEl.width = Math.round(width * ratio);
      surfaceEl.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      lines = makeLines(width < 520 ? 14 : 26);
      particles = makeParticles(lines);
      readColours();
      if (!animating()) draw(0);
    }

    function animating() {
      return !reducedMotion.matches && onscreen && !document.hidden;
    }

    function draw(time: number) {
      const yaw = (time / turnDuration) * Math.PI * 2 + 0.6;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const extent = majorRadius + minorRadius * 1.25;
      const scale = Math.min(width / (extent * 2.15), height / (extent * 1.5));
      const cx = width / 2;
      const cy = height / 2;

      function project(p: { x: number; y: number; z: number }): Vec {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const perspective = 1 / (1 - z2 * 0.18);
        return {
          x: cx + x1 * scale * perspective,
          y: cy + y2 * scale * perspective,
          depth: Math.min(1, Math.max(0, (z2 / extent + 1) / 2)),
        };
      }

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * extent);
      glow.addColorStop(0, withAlpha(colours.paper, 0.32));
      glow.addColorStop(1, withAlpha(colours.paper, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Field lines, batched by depth so the near side reads brighter.
      const bins: Path2D[] = [new Path2D(), new Path2D(), new Path2D()];
      for (const line of lines) {
        const phi0 = line.theta * 0.5;
        let previous: Vec | null = null;
        for (let step = 0; step <= lineSteps; step += 1) {
          const phi = phi0 + (step / lineSteps) * Math.PI * 2;
          const point = project(
            surface(phi, iota * phi + line.theta, line.fraction),
          );
          if (previous) {
            const path = bins[Math.min(2, Math.floor(point.depth * 3))]!;
            path.moveTo(previous.x, previous.y);
            path.lineTo(point.x, point.y);
          }
          previous = point;
        }
      }
      ctx.lineCap = 'round';
      ctx.lineWidth = 1;
      ctx.strokeStyle = withAlpha(colours.ink, 0.22);
      ctx.stroke(bins[0]!);
      ctx.strokeStyle = withAlpha(colours.deep, 0.5);
      ctx.stroke(bins[1]!);
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = withAlpha(colours.ink, 0.8);
      ctx.stroke(bins[2]!);

      // Hot plasma: bright comet tails running along the field lines.
      const glowBins = [new Path2D(), new Path2D(), new Path2D()];
      const coreBins = [new Path2D(), new Path2D(), new Path2D()];
      const heads = new Path2D();
      for (const particle of particles) {
        const { line } = particle;
        const direction = Math.sign(particle.speed);
        let previous: Vec | null = null;
        for (let step = 0; step <= tailSteps; step += 1) {
          const phi =
            particle.phi - direction * (step / tailSteps) * tailLength;
          const point = project(
            surface(phi, iota * phi + line.theta, line.fraction),
          );
          if (previous) {
            const fade = Math.min(
              2,
              Math.floor(((tailSteps - step) / tailSteps) * 3),
            );
            glowBins[fade]!.moveTo(previous.x, previous.y);
            glowBins[fade]!.lineTo(point.x, point.y);
            coreBins[fade]!.moveTo(previous.x, previous.y);
            coreBins[fade]!.lineTo(point.x, point.y);
          } else {
            heads.moveTo(point.x + 2.4, point.y);
            heads.arc(point.x, point.y, 2.4, 0, Math.PI * 2);
          }
          previous = point;
        }
      }
      const alphas = [0.3, 0.55, 0.85];
      for (let fade = 0; fade < 3; fade += 1) {
        ctx.lineWidth = 6;
        ctx.strokeStyle = withAlpha(colours.paper, alphas[fade]! * 0.45);
        ctx.stroke(glowBins[fade]!);
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = withAlpha(colours.ink, alphas[fade]!);
        ctx.stroke(coreBins[fade]!);
      }
      ctx.fillStyle = withAlpha(colours.paper, 1);
      ctx.fill(heads);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = withAlpha(colours.ink, 1);
      ctx.stroke(heads);
    }

    function tick(now: number) {
      const delta = last ? Math.min(now - last, 64) : 16;
      last = now;
      elapsed += delta;
      for (const particle of particles) {
        particle.phi += particle.speed * delta;
      }
      colourAge += 1;
      if (colourAge > 45) {
        colourAge = 0;
        readColours();
      }
      draw(elapsed);
      frame = window.requestAnimationFrame(tick);
    }

    function sync() {
      window.cancelAnimationFrame(frame);
      last = 0;
      if (animating()) frame = window.requestAnimationFrame(tick);
      else draw(elapsed);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surfaceEl);
    const visibility = new IntersectionObserver(([entry]) => {
      onscreen = entry?.isIntersecting ?? true;
      sync();
    });
    visibility.observe(surfaceEl);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    resize();
    sync();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-plasma" aria-hidden="true" />;
}

// Applies an alpha to a #rgb / #rrggbb / rgb() colour read from CSS.
function withAlpha(colour: string, alpha: number) {
  if (colour.startsWith('#')) {
    const hex =
      colour.length === 4
        ? colour
            .slice(1)
            .split('')
            .map((c) => c + c)
            .join('')
        : colour.slice(1, 7);
    const value = Number.parseInt(hex, 16);
    return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
  }
  const channels = colour.match(/[\d.]+/g);
  if (channels && channels.length >= 3) {
    return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`;
  }
  return colour;
}
