import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { formLabels, getSubmission, isFormKey, prisma } from '@aurora/db';
import { pageMetadata } from '@/lib/metadata';
import { fakeSubmission } from '@/lib/admin/fake-data';
import { sessionCookie, verifySession } from '@/lib/admin/session';
import { adminDate, words } from '@/lib/admin/format';

export const metadata: Metadata = pageMetadata({
  title: 'Admin submission',
  description: 'Restricted area.',
  path: '/admin/',
  noindex: true,
});

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ form: string; id: string }>;
  searchParams: Promise<{ fake?: string }>;
}) {
  if (!verifySession((await cookies()).get(sessionCookie)?.value))
    redirect('/admin/login/');
  const { form, id } = await params;
  if (!isFormKey(form)) notFound();
  const onlyFake =
    process.env.NODE_ENV !== 'production' && (await searchParams).fake === '1';

  const row = onlyFake
    ? fakeSubmission(form, id)
    : await getSubmission(prisma, form, id).catch(() => null);
  if (!row) notFound();

  const fields: [string, string | null][] = [
    ['Received', adminDate(row.createdAt)],
    ['Name', row.name],
    ['Email', row.email],
    ['Organisation', row.organisation],
    ['Role', row.role],
    ['Interest', row.interest && words(row.interest)],
    ['Timeframe', row.timeframe && words(row.timeframe)],
    ['Intended application', row.intendedApplication],
    ['Message', row.message],
    ['ID', row.id],
  ];

  return (
    <section className="admin-page">
      <div className="shell">
        <header className="admin-header">
          <div>
            <p className="eyebrow">
              <Link href={`/admin/${form}/${onlyFake ? '?fake=1' : ''}`}>
                ← {formLabels[form]}
              </Link>
            </p>
            <h1>{row.name}</h1>
            <p className="admin-note">
              Non-binding expression of interest. Contains personal data.
            </p>
          </div>
        </header>
        <dl className="admin-panel admin-detail">
          {fields.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value ?? '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
