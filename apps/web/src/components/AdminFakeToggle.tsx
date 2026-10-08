import Link from 'next/link';

/** Local-only switch (plain link, no JS) that limits admin views to seeded test rows. */
export default function AdminFakeToggle({
  path,
  active,
}: {
  path: string;
  active: boolean;
}) {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <Link
      className="admin-toggle"
      href={active ? path : `${path}?fake=1`}
      role="switch"
      aria-checked={active}
    >
      <span className="admin-toggle-track" aria-hidden="true" />
      Show only fake data
    </Link>
  );
}
