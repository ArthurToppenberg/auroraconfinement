import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFormStats, prisma } from '@aurora/db';
import { pageMetadata } from '@/lib/metadata';
import AdminFakeToggle from '@/components/AdminFakeToggle';
import AdminStats from '@/components/AdminStats';
import { fakeStats } from '@/lib/admin/fake-data';
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ fake?: string }>;
}) {
  // The proxy already redirects visitors without a session; check again here so
  // the page can never render (or query the database) without one.
  if (!verifySession((await cookies()).get(sessionCookie)?.value))
    redirect('/admin/login/');
  const onlyFake =
    process.env.NODE_ENV !== 'production' && (await searchParams).fake === '1';

  let forms = null;
  try {
    forms = (await onlyFake) ? fakeStats() : await getFormStats(prisma);
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
            <h1>Submissions</h1>
            <p className="admin-note">
              Aggregate counts from the site&apos;s four forms. No personal data
              is shown. Times are UTC.
            </p>
          </div>
          <div className="admin-header-actions">
            <AdminFakeToggle path="/admin/" active={onlyFake} />
            <form action={logout}>
              <button className="button" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </header>
        {forms ? (
          <AdminStats forms={forms} onlyFake={onlyFake} />
        ) : (
          <p role="alert">
            Stats are unavailable. The database could not be reached.
          </p>
        )}
      </div>
    </section>
  );
}
