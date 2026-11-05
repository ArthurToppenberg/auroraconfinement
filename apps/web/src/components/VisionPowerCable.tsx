'use client';

import { useEffect, useRef, useState } from 'react';

// Route cables between the actual drawing ports as the cards reflow.
export default function VisionPowerCable() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawing, setDrawing] = useState<{
    width: number;
    height: number;
    paths: string[];
  }>({ width: 1, height: 1, paths: [] });

  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root) return;
    let frame = 0;
    const measure = () => {
      const bounds = root.getBoundingClientRect();
      const ports = [
        'plant',
        'tower',
        'mast-out',
        'transformer-in',
        'transformer',
        'house',
      ].map((name) => {
        const element = root.querySelector(`[data-cable-port="${name}"]`);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          x: Math.round((rect.x + rect.width / 2 - bounds.x) * 100) / 100,
          y: Math.round((rect.y + rect.height / 2 - bounds.y) * 100) / 100,
        };
      });
      const [plant, tower, mastOut, transformerIn, transformer, house] = ports;
      if (
        !plant ||
        !tower ||
        !mastOut ||
        !transformerIn ||
        !transformer ||
        !house
      )
        return;
      const cards = root.querySelectorAll('.fusion-vision-card');
      const horizontal =
        Math.abs(
          cards[0].getBoundingClientRect().top -
            cards[1].getBoundingClientRect().top,
        ) < 8;
      const connect = (
        from: { x: number; y: number },
        to: { x: number; y: number },
        index: number,
      ) => {
        if (horizontal) {
          const distance = to.x - from.x;
          if (index === 0) {
            return `M${from.x} ${from.y} C${from.x + distance * 0.12} ${from.y + 6},${from.x + distance * 0.32} ${from.y + 8},${from.x + distance * 0.39} ${from.y} C${from.x + distance * 0.56} ${from.y - 6},${from.x + distance * 0.45} ${to.y - 14},${from.x + distance * 0.8} ${to.y - 5} S${to.x - 12} ${to.y},${to.x} ${to.y}`;
          }
          const buried = Math.max(from.y, to.y) + Math.min(24, distance * 0.09);
          return `M${from.x} ${from.y} C${from.x + distance * 0.12} ${from.y},${from.x + distance * 0.17} ${buried},${from.x + distance * 0.28} ${buried} H${from.x + distance * 0.7} C${from.x + distance * 0.82} ${buried},${to.x - distance * 0.16} ${to.y},${to.x - distance * 0.05} ${to.y} H${to.x}`;
        }
        const outside = bounds.width + 10;
        if (index === 1) {
          const buried = to.y + 42;
          return `M${from.x} ${from.y} C${outside} ${from.y},${outside} ${from.y + 12},${outside} ${from.y + 30} V${buried - 12} Q${outside} ${buried},${outside - 12} ${buried} H${to.x - 10} Q${to.x - 22} ${buried},${to.x - 22} ${buried - 12} V${to.y + 12} Q${to.x - 22} ${to.y},${to.x} ${to.y}`;
        }
        return `M${from.x} ${from.y} C${outside} ${from.y},${outside} ${from.y + 12},${outside} ${from.y + 30} V${to.y - 22} Q${outside} ${to.y},${outside - 22} ${to.y} H${to.x}`;
      };
      const scale = (transformerIn.y - mastOut.y) / 43;
      const leadIn = transformerIn.y - 24 * scale;
      const middleCable = `M${mastOut.x} ${mastOut.y} Q${mastOut.x + (transformerIn.x - mastOut.x) * 0.46} ${mastOut.y + 36 * scale},${transformerIn.x} ${leadIn} V${transformerIn.y}`;
      const next = {
        width: Math.round(bounds.width * 100) / 100,
        // Keep the overlay independent of the expandable copy below the art.
        height: Math.ceil(Math.max(...ports.map((port) => port?.y ?? 0)) + 60),
        paths: [
          connect(plant, tower, 0),
          middleCable,
          connect(transformer, house, 1),
        ],
      };
      setDrawing((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    const contentObserver = new MutationObserver((records) => {
      if (
        records.some(
          (record) =>
            !(
              record.target instanceof Element &&
              record.target.closest('.vision-power-cable')
            ),
        )
      )
        schedule();
    });
    observer.observe(root);
    contentObserver.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['cx', 'cy', 'viewBox', 'd'],
    });
    window.addEventListener('resize', schedule);
    root.addEventListener('toggle', measure, true);
    measure();
    document.fonts.ready.then(schedule);
    return () => {
      observer.disconnect();
      contentObserver.disconnect();
      window.removeEventListener('resize', schedule);
      root.removeEventListener('toggle', measure, true);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="vision-power-cable"
      width={drawing.width}
      height={drawing.height}
      viewBox={`0 0 ${drawing.width} ${drawing.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {drawing.paths.map((path, index) => (
        <g
          key={index}
          data-cable-run={
            ['plant-to-mast', 'mast-to-transformer', 'transformer-to-house'][
              index
            ]
          }
        >
          <path className="vision-cable-sheath" d={path} />
          <path className="vision-cable-light" d={path} />
          <path className="vision-cable-current" d={path} />
        </g>
      ))}
    </svg>
  );
}
