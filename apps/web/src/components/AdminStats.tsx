import type { LoiStats } from '@aurora/db';

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
      aria-label={`Daily letters, last ${daily.length} days: ${sum(daily)} in total`}
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
  counts: Record<string, number>;
  total: number;
}) {
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return (
    <div className="admin-breakdown">
      <h4>{title}</h4>
      {rows.length === 0 ? (
        <p className="admin-empty">No letters yet.</p>
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

/** Aggregate counts only, rendered on the server from the database. */
export default function AdminStats({ stats }: { stats: LoiStats }) {
  return (
    <div className="admin-stats">
      <dl className="admin-kpis">
        <div>
          <dt>Confirmed letters</dt>
          <dd>{stats.confirmedLetters}</dd>
          <span className="admin-delta">{stats.withdrawn} withdrawn</span>
        </div>
        <div>
          <dt>Unique organisations</dt>
          <dd>{stats.uniqueOrganisations}</dd>
          <span className="admin-delta">
            {stats.sharingPermitted} allow sharing
          </span>
        </div>
        <div>
          <dt>Last 7 days</dt>
          <dd>{stats.last7Days}</dd>
          <Delta current={stats.last7Days} previous={stats.prev7Days} />
        </div>
        <div>
          <dt>Latest letter</dt>
          <dd className="small">
            {stats.latest ? utc(stats.latest) : 'None yet'}
          </dd>
          <Spark daily={stats.daily} />
        </div>
      </dl>

      <div className="admin-cards">
        <section className="admin-panel" aria-labelledby="stats-product">
          <h3 id="stats-product">Product</h3>
          <Breakdown
            title="By product"
            counts={stats.byProduct}
            total={stats.confirmedLetters}
          />
          <Breakdown
            title="By capacity"
            counts={stats.byCapacity}
            total={stats.confirmedLetters}
          />
        </section>
        <section className="admin-panel" aria-labelledby="stats-interest">
          <h3 id="stats-interest">Interest</h3>
          <Breakdown
            title="By indicative timing"
            counts={stats.byTiming}
            total={stats.confirmedLetters}
          />
          <Breakdown
            title="By type of interest (multiple allowed)"
            counts={stats.byInterestType}
            total={stats.confirmedLetters}
          />
        </section>
      </div>
    </div>
  );
}
