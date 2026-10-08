import Link from 'next/link';
import type { FormStats } from '@aurora/db';

import { adminDate as utc, words } from '@/lib/admin/format';

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

function Delta({ current, previous }: { current: number; previous: number }) {
  if (current === 0 && previous === 0)
    return <span className="admin-delta">no change</span>;
  const diff = current - previous;
  const sign = diff > 0 ? '+' : diff < 0 ? '−' : '±';
  return (
    <span className={`admin-delta ${diff > 0 ? 'up' : diff < 0 ? 'down' : ''}`}>
      {sign}
      {Math.abs(diff)} vs prior 7d
    </span>
  );
}

/** 30-day bar sparkline; decorative, the numbers are in the adjacent cells. */
function Spark({ daily }: { daily: number[] }) {
  const max = Math.max(1, ...daily);
  const height = 24;
  return (
    <svg
      className="admin-spark"
      viewBox={`0 0 ${daily.length * 4} ${height}`}
      role="img"
      aria-label={`Daily submissions, last ${daily.length} days: ${sum(daily)} in total`}
      preserveAspectRatio="none"
    >
      {daily.map((count, i) => {
        const h = count === 0 ? 1 : Math.max(2, (count / max) * height);
        return (
          <rect
            key={i}
            x={i * 4}
            y={height - h}
            width={3}
            height={h}
            className={count === 0 ? 'zero' : undefined}
          />
        );
      })}
    </svg>
  );
}

function Breakdown({
  title,
  counts,
  total,
}: {
  title: string;
  counts: Record<string, number> | null;
  total: number;
}) {
  if (!counts) return null;
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return (
    <div className="admin-breakdown">
      <h4>{title}</h4>
      {rows.length === 0 ? (
        <p className="admin-empty">No submissions yet.</p>
      ) : (
        <ul>
          {rows.map(([value, count]) => (
            <li key={value}>
              <span className="admin-bar-label">{words(value)}</span>
              <progress
                value={count}
                max={total}
                aria-label={`${words(value)}: ${count} of ${total}`}
              />
              <span className="admin-bar-count">
                {count}
                <small> {Math.round((count / total) * 100)}%</small>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Aggregate counts per form, rendered on the server from the database. */
export default function AdminStats({
  forms,
  onlyFake = false,
}: {
  forms: FormStats[];
  onlyFake?: boolean;
}) {
  const query = onlyFake ? '?fake=1' : '';
  const total = sum(forms.map((f) => f.total));
  const last7 = sum(forms.map((f) => f.last7Days));
  const prev7 = sum(forms.map((f) => f.prev7Days));
  const last30 = sum(forms.map((f) => f.last30Days));
  const latest = forms
    .map((f) => f.latest)
    .filter((v): v is string => v !== null)
    .sort()
    .at(-1);
  const daily = Array.from({ length: forms[0]?.daily.length ?? 0 }, (_, i) =>
    sum(forms.map((f) => f.daily[i] ?? 0)),
  );

  return (
    <div className="admin-stats">
      <dl className="admin-kpis">
        <div>
          <dt>Total submissions</dt>
          <dd>{total}</dd>
          <span className="admin-delta">{forms.length} forms</span>
        </div>
        <div>
          <dt>Last 7 days</dt>
          <dd>{last7}</dd>
          <Delta current={last7} previous={prev7} />
        </div>
        <div>
          <dt>Last 30 days</dt>
          <dd>{last30}</dd>
          <span className="admin-delta">
            {(last30 / 30).toFixed(1)} per day
          </span>
        </div>
        <div>
          <dt>Latest submission</dt>
          <dd className="small">{latest ? utc(latest) : 'None yet'}</dd>
          <Spark daily={daily} />
        </div>
      </dl>

      <div className="admin-panel">
        <table className="admin-table">
          <caption>Submissions per form</caption>
          <thead>
            <tr>
              <th scope="col">Form</th>
              <th scope="col" className="num">
                Total
              </th>
              <th scope="col" className="num">
                7d
              </th>
              <th scope="col" className="num">
                30d
              </th>
              <th scope="col">30-day trend</th>
              <th scope="col">Latest</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.key}>
                <th scope="row">
                  <Link href={`/admin/${form.key}/${query}`}>{form.label}</Link>
                </th>
                <td className="num">{form.total}</td>
                <td className="num">{form.last7Days}</td>
                <td className="num">{form.last30Days}</td>
                <td>
                  <Spark daily={form.daily} />
                </td>
                <td className="muted">
                  {form.latest ? utc(form.latest) : 'None yet'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">All forms</th>
              <td className="num">{total}</td>
              <td className="num">{last7}</td>
              <td className="num">{last30}</td>
              <td>
                <Spark daily={daily} />
              </td>
              <td className="muted">{latest ? utc(latest) : 'None yet'}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="admin-cards">
        {forms.map((form) => (
          <section
            key={form.key}
            className="admin-panel"
            aria-labelledby={`stats-${form.key}`}
          >
            <h3 id={`stats-${form.key}`}>
              <Link href={`/admin/${form.key}/${query}`}>{form.label}</Link>{' '}
              <small>{form.total}</small>
            </h3>
            <Breakdown
              title="By interest"
              counts={form.byInterest}
              total={form.total}
            />
            <Breakdown
              title="By timeframe"
              counts={form.byTimeframe}
              total={form.total}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
