'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

// Content is always visible; only the decorative SVG strokes/components animate.
export default function RoadmapMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current;
    if (!container || !('IntersectionObserver' in window)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scenes = container.querySelectorAll<SVGSVGElement>('.roadmap-scene');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const scene = entry.target as SVGSVGElement;
          scene.dataset['visible'] = String(
            entry.isIntersecting && !document.hidden,
          );
          if (entry.isIntersecting && !reduced.matches)
            scene.dataset['entered'] = 'true';
        }
      },
      { threshold: 0.25 },
    );
    scenes.forEach((scene) => observer.observe(scene));
    const pauseWhenHidden = () => {
      scenes.forEach((scene) => {
        scene.dataset['visible'] = 'false';
        observer.unobserve(scene);
        observer.observe(scene);
      });
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, []);
  return (
    <div ref={root} className="roadmap-board">
      {children}
    </div>
  );
}
