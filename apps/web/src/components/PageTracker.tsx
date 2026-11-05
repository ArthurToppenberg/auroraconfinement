'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Stop = { id: string; label: string };
const pageNames: Record<string, string> = {
  '/': 'Home',
  '/about': 'Team',
  '/model': 'Exhibition model',
  '/research-platform': 'Research platform',
  '/roadmap': 'Roadmap',
  '/contact': 'Contact',
  '/nff': 'Nordic Fusion Forum',
  '/news': 'News',
  '/vision': 'Vision',
  '/technology': 'Technology',
  '/join': 'Join',
  '/privacy': 'Privacy',
  '/accessibility': 'Accessibility',
  '/brief': 'Project brief',
};

function headingLabel(element: Element | null | undefined): string {
  if (!element) return '';
  const copy = element.cloneNode(true) as Element;
  copy
    .querySelectorAll('br')
    .forEach((lineBreak) => lineBreak.replaceWith(' '));
  copy.querySelectorAll('span').forEach((span) => span.append(' '));
  return (copy.textContent || '').replace(/\s+/g, ' ').trim();
}

export default function PageTracker() {
  const pathname = usePathname() ?? '/';
  const path = pathname.replace(/\/$/, '') || '/';
  const [stops, setStops] = useState<Stop[]>([]);
  const [active, setActive] = useState(0);
  const [articleName, setArticleName] = useState('Page');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    if (path.startsWith('/admin')) return;
    const main = document.getElementById('main-content');
    if (!main) return;
    let targets: HTMLElement[] = [];
    let frame = 0;
    let hideTimer: number | undefined;
    setScrolling(false);

    const update = () => {
      frame = 0;
      let current = 0;
      targets.forEach((target, index) => {
        if (target.getBoundingClientRect().top <= window.innerHeight * 0.35)
          current = index;
      });
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      )
        current = Math.max(0, targets.length - 1);
      setActive(current);
      const sampleY = matchMedia('(min-width: 64rem)').matches
        ? window.innerHeight / 2
        : window.innerHeight - 32;
      const footer = document.querySelector<HTMLElement>('.site-footer');
      const surfaces = footer ? [...targets, footer] : targets;
      let surface: HTMLElement | null =
        surfaces.find((element) => {
          const rect = element.getBoundingClientRect();
          return rect.top <= sampleY && rect.bottom > sampleY;
        }) ||
        targets[current] ||
        main;
      while (surface) {
        const values = getComputedStyle(surface)
          .backgroundColor.match(/[\d.]+/g)
          ?.map(Number);
        if (
          values &&
          values.length >= 3 &&
          (values.length < 4 || values[3] > 0.5)
        ) {
          const brightness =
            values[0] * 0.299 + values[1] * 0.587 + values[2] * 0.114;
          setTheme(brightness < 145 ? 'dark' : 'light');
          break;
        }
        surface = surface.parentElement;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const collect = () => {
      const sections = Array.from(
        main.querySelectorAll<HTMLElement>('section'),
      ).filter(
        (section) =>
          !section.parentElement?.closest('section') &&
          section.getClientRects().length > 0,
      );
      targets = sections.length ? sections : [main];
      const next = targets.map((target, index) => {
        if (!target.id) {
          let id = `page-section-${index + 1}`;
          while (document.getElementById(id)) id += '-nav';
          target.id = id;
        }
        const heading = target.querySelector('h1, h2, h3');
        const labelledBy = target.getAttribute('aria-labelledby');
        const label =
          headingLabel(
            labelledBy ? document.getElementById(labelledBy) : heading,
          ) ||
          target.getAttribute('aria-label') ||
          `Section ${index + 1}`;
        return { id: target.id, label };
      });
      setStops((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
      setArticleName(headingLabel(main.querySelector('h1')) || 'Page');
      schedule();
    };
    const onScroll = () => {
      schedule();
      setScrolling(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setScrolling(false), 900);
    };
    collect();
    const observer = new MutationObserver(collect);
    observer.observe(main, { childList: true, subtree: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(hideTimer);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [path]);

  if (path.startsWith('/admin') || !stops.length) return null;
  const pageName = pageNames[path] || articleName;
  const jump = (index: number) => {
    const target = document.getElementById(stops[index]?.id ?? '');
    if (!target) return;
    const focusTarget =
      target.querySelector<HTMLElement>('h1, h2, h3') || target;
    focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  };

  return (
    <nav
      className="page-tracker"
      data-theme={theme}
      data-scrolling={scrolling}
      aria-label={`${pageName}: section navigation`}
    >
      <p className="sr-only">{pageName}</p>
      <button
        type="button"
        onClick={() => jump(active - 1)}
        disabled={active === 0}
        aria-label="Previous section"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 14 6-6 6 6" />
        </svg>
      </button>
      <ol className="page-tracker-dots">
        {stops.map((stop, index) => (
          <li key={stop.id}>
            <a
              href={`#${stop.id}`}
              aria-label={stop.label}
              aria-current={index === active ? 'location' : undefined}
              className={index <= active ? 'page-tracker-reached' : undefined}
              onClick={(event) => {
                event.preventDefault();
                jump(index);
              }}
            >
              <span className="page-tracker-dot" aria-hidden="true" />
              <span className="page-tracker-tooltip" aria-hidden="true">
                {stop.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => jump(active + 1)}
        disabled={active === stops.length - 1}
        aria-label="Next section"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 10 6 6 6-6" />
        </svg>
      </button>
    </nav>
  );
}
