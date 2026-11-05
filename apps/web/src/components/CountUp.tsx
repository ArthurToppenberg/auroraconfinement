'use client';

import { useEffect, useRef, useState } from 'react';

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  grouped = false,
  as: Tag = 'strong',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  grouped?: boolean;
  as?: 'strong' | 'span';
}) {
  const element = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const target = element.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (
      !target ||
      reducedMotion.matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (reducedMotion.matches) return;

        const start = performance.now();
        setDisplay(0);
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1000, 1);
          setDisplay(value * progress);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    const stopForReducedMotion = () => {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(frame);
      observer.disconnect();
      setDisplay(value);
    };
    observer.observe(target);
    reducedMotion.addEventListener('change', stopForReducedMotion);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reducedMotion.removeEventListener('change', stopForReducedMotion);
    };
  }, [value]);

  const format = (number: number) =>
    number.toLocaleString('en-US', {
      useGrouping: grouped,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  return (
    <Tag ref={element} aria-label={`${prefix}${format(value)}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {format(display)}
        {suffix}
      </span>
    </Tag>
  );
}
