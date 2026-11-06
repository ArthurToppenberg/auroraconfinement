import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLoiStats, prisma } from '@aurora/db';
import { pageMetadata } from '@/lib/metadata';
import AdminStats from '@/components/AdminStats';
import { logout } from '@/lib/admin/actions';
import { sessionCookie, verifySession } from '@/lib/admin/session';

export const metadata: Metadata = pageMetadata({
  title: 'Admin',
  description: 'Restricted area.',
  path: '/admin/',
  noindex: true,
});

// Rendered on the server for every request, so the stats are always current.
export const dynamic = 'force-dynamic';

export default async function Page() {
  // The proxy already redirects visitors without a session; check again here so
  // the page can never render (or query the database) without one.
  if (!verifySession((await cookies()).get(sessionCookie)?.value))
    redirect('/admin/login/');

  let stats = null;
  try {
    stats = await getLoiStats(prisma);
  } catch (error) {
    console.error(
      'admin stats failed:',
      error instanceof Error ? error.name : error,
    );
  }

  return (
    <section className="admin-page">
      <div className="shell">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Letters of Interest</h1>
            <p className="admin-note">
              Non-binding expressions of interest, confirmed by the registrant.
              Email addresses are not verified. Not orders, contracted revenue
              or a guaranteed pipeline. Aggregate counts only; times are UTC.
            </p>
          </div>
          <div className="admin-header-actions">
            <Link className="button" href="/admin/loi/">
              View letters
            </Link>
            <form action={logout}>
              <button className="button" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </header>
        {stats ? (
          <AdminStats stats={stats} />
        ) : (
          <p role="alert">
            Stats are unavailable. The database could not be reached.
          </p>
        )}
      </div>
    </section>
  );
}
