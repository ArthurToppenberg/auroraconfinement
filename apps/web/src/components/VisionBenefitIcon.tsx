const paths = {
  co2: 'M5 16H4a3 3 0 0 1-1-5.8A5 5 0 0 1 12 6a4 4 0 0 1 7 3 3.5 3.5 0 0 1 1 6.9H8 M3 21 21 3',
  fuel: 'M6 4s-4 5-4 8a4 4 0 0 0 8 0C10 9 6 4 6 4Z M22 14a6 2.4 0 1 1-12 0 6 2.4 0 1 1 12 0 M19 8.8a2.4 6-30 1 1-6 10.4 2.4 6-30 1 1 6-10.4 M13 8.8a2.4 6 30 1 1 6 10.4 2.4 6 30 1 1-6-10.4',
  reuse:
    'M7 10h10v10H7Z M10 10v4h4v-4 M3 12a9 9 0 0 1 15-7 M18 2v4h-4 M21 12a9 9 0 0 1-3 7 M3 20v-4h4',
  steady:
    'M4 3v2 M1 8h2 M7 5l1-1 M6 8a2 2 0 1 1-4 0 2 2 0 1 1 4 0 M11 7h8a2 2 0 1 0-2-2 M10 11h10a2 2 0 0 1 0 4 M2 20h20',
  pylon:
    'M4 22 9 2l5 20 M6 14h6 M3 7h12 M2 11h14 M5 22l7-8 M13 22l-7-8 M20 5l-4 8h4l-2 7 6-10h-4l2-5Z',
  generator:
    'M3 8h18v11H3Z M6 8V5h6v3 M6 19v2 M18 19v2 M6 12h4 M6 15h4 M14 11v5 M17 11v5',
  family:
    'M10 5a3 3 0 1 1-6 0 3 3 0 1 1 6 0 M3 12q4-3 8 0l2 5 M3 12l-2 6 M5 15l-1 7 M9 15l1 7 M21 10a2 2 0 1 1-4 0 2 2 0 1 1 4 0 M16 16h6 M17 16l-2 6 M21 16l2 6 M16 17l-5-4',
  shield: 'M12 2 21 6v6c0 5-5 9-9 10-4-1-9-5-9-10V6l9-4Z M7 12l3 3 7-7',
  atom: 'M22 12a10 3.5 0 1 1-20 0 10 3.5 0 1 1 20 0 M17 3.34a3.5 10-30 1 1-10 17.32 3.5 10-30 1 1 10-17.32 M7 3.34a3.5 10 30 1 1 10 17.32 3.5 10 30 1 1-10-17.32 M12 11.5v1',
} as const;

export default function VisionBenefitIcon({
  kind,
}: {
  kind: keyof typeof paths;
}) {
  return (
    <svg
      className="vision-benefit-icon"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[kind]} />
      {kind === 'co2' && (
        <text
          x="11.5"
          y="12.5"
          fontSize="5.5"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
        >
          CO₂
        </text>
      )}
    </svg>
  );
}
