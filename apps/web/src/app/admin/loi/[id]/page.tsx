import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getLoi, loiFollowUps, prisma } from '@aurora/db';
import LetterPreview from '@/components/LetterPreview';
import {
  changeLoiSharing,
  updateLoiFollowUp,
  withdrawLoi,
} from '@/lib/admin/actions';
import { adminDate, words } from '@/lib/admin/format';
import { sessionCookie, verifySession } from '@/lib/admin/session';
import type { Letter } from '@/lib/loi/letter';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Admin letter',
  description: 'Restricted area.',
  path: '/admin/loi/',
  noindex: true,
});

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!verifySession((await cookies()).get(sessionCookie)?.value))
    redirect('/admin/login/');
  const { id } = await params;
  const loi = await getLoi(prisma, id).catch(() => null);
  if (!loi) notFound();

  const record: [string, string][] = [
    ['Reference', loi.reference],
    ['Status', words(loi.status)],
    ['Version', String(loi.version)],
    ['Received', adminDate(loi.createdAt)],
    ['Confirmed', adminDate(loi.confirmedAt)],
    ['Email (not verified)', loi.email],
    ['Phone', loi.phone ?? '—'],
    ['Capacity', words(loi.capacity)],
    [
      'Role in purchase decision',
      loi.procurementRole ? words(loi.procurementRole) : '—',
    ],
    ['Source', loi.source ?? '—'],
    ['Template version', loi.templateVersion],
    ['Confirmation wording', loi.confirmationWordingVersion],
    ['Sharing wording', loi.sharingWordingVersion],
    ['Sharing permitted', loi.sharingPermitted ? 'Yes' : 'No'],
    ['Sharing last changed', adminDate(loi.sharingChangedAt)],
  ];

  return (
    <section className="admin-page">
      <div className="shell">
        <header className="admin-header">
          <div>
            <p className="eyebrow">
              <Link href="/admin/loi/">← Letters</Link>
            </p>
            <h1>{loi.fullName}</h1>
            <p className="admin-note">
              Non-binding expression of interest, confirmed by the registrant.
              The email address is not verified. Contains personal data.
            </p>
          </div>
        </header>

        <h2>Confirmed letter</h2>
        <p className="admin-note">
          The exact statement the registrant confirmed.
        </p>
        <LetterPreview letter={loi.letterText as Letter} as="h3" />

        <h2>Record</h2>
        <dl className="admin-panel admin-detail">
          {record.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <h2>Follow-up (internal)</h2>
        <form className="admin-actions" action={updateLoiFollowUp}>
          <input type="hidden" name="id" value={loi.id} />
          <label>
            Commercial follow-up
            <select name="followUp" defaultValue={loi.followUp}>
              {loiFollowUps.map((value) => (
                <option key={value} value={value}>
                  {words(value)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Internal notes (never part of the registrant’s statement)
            <textarea
              name="notes"
              rows={4}
              maxLength={4000}
              defaultValue={loi.internalNotes ?? ''}
            />
          </label>
          <button className="button primary" type="submit">
            Save follow-up
          </button>
        </form>

        <h2>Sharing and withdrawal</h2>
        <div className="admin-actions">
          <form action={changeLoiSharing}>
            <input type="hidden" name="id" value={loi.id} />
            <input
              type="hidden"
              name="permitted"
              value={loi.sharingPermitted ? 'no' : 'yes'}
            />
            <button className="button" type="submit">
              {loi.sharingPermitted
                ? 'Record sharing withdrawn'
                : 'Record sharing permitted'}
            </button>
          </form>
          {loi.status === 'confirmed' && (
            <form action={withdrawLoi}>
              <input type="hidden" name="id" value={loi.id} />
              <button className="button" type="submit">
                Mark letter withdrawn
              </button>
            </form>
          )}
        </div>
        <p className="admin-note">
          Changes apply to future exports only. Record the registrant’s written
          request before changing sharing or withdrawing.
        </p>

        <h2>History</h2>
        <ul className="admin-panel admin-history">
          {loi.events.map((event) => (
            <li key={event.id}>
              <span className="muted">{adminDate(event.at)}</span>{' '}
              {words(event.kind)}
              {event.detail ? ` ${JSON.stringify(event.detail)}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
