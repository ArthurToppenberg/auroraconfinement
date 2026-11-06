import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { listLois, loiStatuses, prisma } from '@aurora/db';
import type { LoiFilters } from '@aurora/db';
import { adminDate, words } from '@/lib/admin/format';
import { sessionCookie, verifySession } from '@/lib/admin/session';
import { pageMetadata } from '@/lib/metadata';
import {
  budgetStatuses,
  capacities,
  interestTypes,
  labels,
  products,
  timings,
} from '@/lib/loi/schema';

export const metadata: Metadata = pageMetadata({
  title: 'Admin letters',
  description: 'Restricted area.',
  path: '/admin/loi/',
  noindex: true,
});

export const dynamic = 'force-dynamic';

const filterKeys = [
  'product',
  'status',
  'capacity',
  'interestType',
  'timing',
  'budgetStatus',
  'country',
  'q',
] as const;

function Select({
  name,
  label,
  values,
  current,
}: {
  name: string;
  label: string;
  values: readonly string[];
  current: string;
}) {
  return (
    <label>
      {label}
      <select name={name} defaultValue={current}>
        <option value="">Any</option>
        {values.map((value) => (
          <option key={value} value={value}>
            {words(value)}
          </option>
        ))}
      </select>
    </label>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!verifySession((await cookies()).get(sessionCookie)?.value))
    redirect('/admin/login/');
  const query = await searchParams;
  const filters: LoiFilters = {};
  for (const key of filterKeys) {
    const value = query[key];
    if (typeof value === 'string' && value.trim())
      filters[key] = value.trim().slice(0, 100);
  }

  let rows = null;
  try {
    rows = await listLois(prisma, filters);
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
              <Link href="/admin/">← Admin</Link>
            </p>
            <h1>Letters</h1>
            <p className="admin-note">
              {rows ? `${rows.length} newest matching letters. ` : ''}Contains
              personal data. Times are UTC.
            </p>
          </div>
          <div className="admin-header-actions">
            <a className="button" href="/admin/loi/export/?scope=internal">
              Export CSV (internal)
            </a>
            <a className="button" href="/admin/loi/export/?scope=investor">
              Export CSV (investor, permitted only)
            </a>
          </div>
        </header>

        <form className="admin-filters" method="get">
          <Select
            name="product"
            label="Product"
            values={products}
            current={filters.product ?? ''}
          />
          <Select
            name="status"
            label="Status"
            values={loiStatuses}
            current={filters.status ?? ''}
          />
          <Select
            name="capacity"
            label="Capacity"
            values={capacities}
            current={filters.capacity ?? ''}
          />
          <Select
            name="interestType"
            label="Interest type"
            values={interestTypes}
            current={filters.interestType ?? ''}
          />
          <Select
            name="timing"
            label="Timing"
            values={timings}
            current={filters.timing ?? ''}
          />
          <Select
            name="budgetStatus"
            label="Budget"
            values={budgetStatuses}
            current={filters.budgetStatus ?? ''}
          />
          <label>
            Country
            <input name="country" defaultValue={filters.country ?? ''} />
          </label>
          <label>
            Name or organisation
            <input name="q" defaultValue={filters.q ?? ''} />
          </label>
          <button className="button primary" type="submit">
            Filter
          </button>
          <Link className="button" href="/admin/loi/">
            Clear
          </Link>
        </form>

        {!rows ? (
          <p role="alert">Letters are unavailable.</p>
        ) : rows.length === 0 ? (
          <p>No letters match.</p>
        ) : (
          <div className="admin-panel">
            <table className="admin-table">
              <caption className="sr-only">Letters of Interest</caption>
              <thead>
                <tr>
                  <th scope="col">Received</th>
                  <th scope="col">Name</th>
                  <th scope="col">Organisation</th>
                  <th scope="col">Country</th>
                  <th scope="col">Product</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Timing</th>
                  <th scope="col">Status</th>
                  <th scope="col">Sharing</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="muted">{adminDate(row.createdAt)}</td>
                    <th scope="row">
                      <Link href={`/admin/loi/${row.id}/`}>{row.fullName}</Link>
                    </th>
                    <td>
                      {row.organisation}
                      {row.department ? `, ${row.department}` : ''}
                    </td>
                    <td>{row.country}</td>
                    <td>
                      {labels.product[
                        row.product as keyof typeof labels.product
                      ] ?? words(row.product)}
                    </td>
                    <td>{words(row.capacity)}</td>
                    <td>{words(row.timing)}</td>
                    <td>{words(row.status)}</td>
                    <td>{row.sharingPermitted ? 'Allowed' : 'No'}</td>
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
