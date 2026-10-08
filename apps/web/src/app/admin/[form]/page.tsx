import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { formLabels, isFormKey, listSubmissions, prisma } from '@aurora/db';
import AdminFakeToggle from '@/components/AdminFakeToggle';
import { pageMetadata } from '@/lib/metadata';
import { fakeSubmissions } from '@/lib/admin/fake-data';
import { sessionCookie, verifySession } from '@/lib/admin/session';
import { adminDate, words } from '@/lib/admin/format';

export const metadata: Metadata = pageMetadata({
  title: 'Admin submissions',
  description: 'Restricted area.',
  path: '/admin/',
  noindex: true,
});

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ form: string }>;
  searchParams: Promise<{ fake?: string }>;
}) {
  if (!verifySession((await cookies()).get(sessionCookie)?.value))
    redirect('/admin/login/');
  const { form } = await params;
  if (!isFormKey(form)) notFound();
  const onlyFake =
    process.env.NODE_ENV !== 'production' && (await searchParams).fake === '1';

  let rows = null;
  try {
    rows = (await onlyFake)
      ? fakeSubmissions(form)
      : await listSubmissions(prisma, form);
  } catch (error) {
    console.error(
      'admin list failed:',
      error instanceof Error ? error.name : error,
    );
  }

  return (
    <section className="admin-page">
      <div className="shell">
        <header className="admin-header">
          <div>
            <p className="eyebrow">
              <Link href={onlyFake ? '/admin/?fake=1' : '/admin/'}>
                ← Admin
              </Link>
            </p>
            <h1>{formLabels[form]}</h1>
            <p className="admin-note">
              {rows ? `${rows.length} newest submissions. ` : ''}Contains
              personal data. Times are UTC.
            </p>
          </div>
          <AdminFakeToggle path={`/admin/${form}/`} active={onlyFake} />
        </header>
        {!rows ? (
          <p role="alert">Submissions are unavailable.</p>
        ) : rows.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <div className="admin-panel">
            <table className="admin-table">
              <caption className="sr-only">Submissions</caption>
              <thead>
                <tr>
                  <th scope="col">Received</th>
                  <th scope="col">Name</th>
                  <th scope="col">Organisation</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Timeframe</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="muted">{adminDate(row.createdAt)}</td>
                    <th scope="row">
                      <Link
                        href={`/admin/${form}/${row.id}/${onlyFake ? '?fake=1' : ''}`}
                      >
                        {row.name}
                      </Link>
                    </th>
                    <td>{row.organisation ?? '—'}</td>
                    <td>{row.interest ? words(row.interest) : '—'}</td>
                    <td>{row.timeframe ? words(row.timeframe) : '—'}</td>
                    <td className="muted">{row.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
