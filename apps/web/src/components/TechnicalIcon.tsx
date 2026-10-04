import type { ReactNode } from 'react';

export type TechnicalIconName =
  | 'access'
  | 'collaboration'
  | 'communication'
  | 'education'
  | 'experiment'
  | 'industry'
  | 'investment'
  | 'model'
  | 'research'
  | 'training'
  | 'visibility';

const paths = {
  access: <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />,
  collaboration: (
    <>
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="m8 11 8-4M8 13l8 4" />
    </>
  ),
  communication: (
    <>
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  education: (
    <>
      <path d="m3 8 9-4 9 4-9 4-9-4Z" />
      <path d="M7 10.5V15c2.5 2 7.5 2 10 0v-4.5M21 8v6" />
    </>
  ),
  experiment: (
    <>
      <path d="M9 3v4.5l-4 7A3 3 0 0 0 7.6 19h8.8a3 3 0 0 0 2.6-4.5l-4-7V3" />
      <path d="M8 12h8M8 3h8" />
    </>
  ),
  industry: (
    <>
      <path d="M3 20V9l6 3V8l6 4V5h3v15H3Z" />
      <path d="M7 16h2M12 16h2M17 16h1" />
    </>
  ),
  investment: (
    <>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19V3" />
      <path d="M2 19h22" />
    </>
  ),
  model: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  research: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m14.5 14.5 5 5M10 7v6M7 10h6" />
    </>
  ),
  training: (
    <>
      <path d="M5 4h14v16H5zM8 8h8M8 12h5M8 16h3" />
    </>
  ),
  visibility: (
    <>
      <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
} satisfies Record<TechnicalIconName, ReactNode>;

export default function TechnicalIcon({ name }: { name: TechnicalIconName }) {
  return (
    <svg
      aria-hidden="true"
      className="technical-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
