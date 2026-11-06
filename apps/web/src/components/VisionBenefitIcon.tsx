const paths = {
  smoke:
    'M5 21v-6h5v6 M7 15v-2c0-2 3-2 3-4 M10 9C6 10 4 7 6 5c0-3 5-4 7-2 3-2 7 0 6 3 4 0 4 6 0 6h-5 M3 21h10',
  fuel: 'M12 8s-3 4-3 6a3 3 0 0 0 6 0c0-2-3-6-3-6Z M2 13h4 M4 11l2 2-2 2 M22 13h-4 M20 11l-2 2 2 2',
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
  warning: 'M12 3 22 21H2L12 3Z M12 9v5 M12 17v0.5',
} as const;

export type VisionBenefitKind = keyof typeof paths;

export default function VisionBenefitIcon({
  kind,
}: {
  kind: VisionBenefitKind;
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
    </svg>
  );
}
