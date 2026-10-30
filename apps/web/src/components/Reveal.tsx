'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Staggered entrance for the parts of every section. Content stays visible
// without script or with reduced motion: nothing is hidden until this runs.
const targets = [
  'main section:not(.page-hero):not(.home-hero):not(.products-intro) .shell > *',
  'main .product-grid > *',
  'main .grid-3 > *',
  'main .nff-product-grid > *',
  'main .fact-strip > *',
  'main .barrier-list > *',
  'main .team-grid > *',
  'main .event-pair > *',
  'main .proof-grid > *',
].join(', ');

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll(targets));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    for (const element of elements) {
      element.classList.add('reveal');
      observer.observe(element);
    }
    root.classList.add('reveal-ready');

    return () => {
      observer.disconnect();
      for (const element of elements) {
        element.classList.remove('reveal', 'is-in');
      }
      root.classList.remove('reveal-ready');
    };
  }, [pathname]);

  return null;
}
