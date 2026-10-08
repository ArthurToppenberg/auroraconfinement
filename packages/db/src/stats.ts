import type { PrismaClient } from './generated/client.ts';

export interface FormStats {
  /** Stable key for the form, e.g. "contact-product-interest". */
  key: string;
  label: string;
  total: number;
  last7Days: number;
  last30Days: number;
  /** Submissions in the 7 days before the last 7 (for week-over-week change). */
  prev7Days: number;
  /** Submissions per UTC day for the last 30 days, oldest first. */
  daily: number[];
  latest: string | null;
  /** Null when the form has no such field. */
  byInterest: Record<string, number> | null;
  byTimeframe: Record<string, number> | null;
}

const day = 24 * 60 * 60 * 1000;
const DAILY_WINDOW = 30;

function tally(
  rows: { _count: { _all: number }; [key: string]: unknown }[],
  field: string,
) {
  return Object.fromEntries(
    rows.map((row) => [String(row[field]), row._count._all]),
  );
}

/** Aggregate counts only: no names, emails or messages ever leave the database. */
export async function getFormStats(prisma: PrismaClient): Promise<FormStats[]> {
  const scope = {};
  const now = Date.now();
  const since7 = new Date(now - 7 * day);
  const since14 = new Date(now - 14 * day);
  const todayStart = Math.floor(now / day) * day;
  const sinceDaily = new Date(todayStart - (DAILY_WINDOW - 1) * day);
  const since30 = new Date(now - 30 * day);

  // The form models share their core columns, so one helper builds each report.
  async function report(
    key: string,
    label: string,
    /** Columns this form's table has to break down by. */
    breakdowns: ('interest' | 'timeframe')[],
    delegate: {
      count(args?: { where?: object }): Promise<number>;
      findMany(args: {
        where: object;
        select: { createdAt: true };
      }): Promise<{ createdAt: Date }[]>;
      findFirst(args: {
        where: object;
        orderBy: { createdAt: 'desc' };
        select: { createdAt: true };
      }): Promise<{ createdAt: Date } | null>;
      groupBy(args: {
        where: object;
        by: ['interest'] | ['timeframe'];
        _count: { _all: true };
      }): Promise<never[]>;
    },
  ): Promise<FormStats> {
    const [
      total,
      last7Days,
      last14Days,
      last30Days,
      recent,
      latest,
      interest,
      timeframe,
    ] = await Promise.all([
      delegate.count({ where: scope }),
      delegate.count({ where: { ...scope, createdAt: { gte: since7 } } }),
      delegate.count({ where: { ...scope, createdAt: { gte: since14 } } }),
      delegate.count({ where: { ...scope, createdAt: { gte: since30 } } }),
      // Timestamps only, bucketed into days below.
      delegate.findMany({
        where: { ...scope, createdAt: { gte: sinceDaily } },
        select: { createdAt: true },
      }),
      delegate.findFirst({
        where: scope,
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      }),
      breakdowns.includes('interest')
        ? delegate.groupBy({
            where: scope,
            by: ['interest'],
            _count: { _all: true },
          })
        : [],
      breakdowns.includes('timeframe')
        ? delegate.groupBy({
            where: scope,
            by: ['timeframe'],
            _count: { _all: true },
          })
        : [],
    ]);
    const daily = new Array<number>(DAILY_WINDOW).fill(0);
    for (const { createdAt } of recent) {
      const index =
        DAILY_WINDOW -
        1 -
        Math.floor(
          (todayStart - Math.floor(createdAt.getTime() / day) * day) / day,
        );
      if (index >= 0 && index < DAILY_WINDOW)
        daily[index] = (daily[index] ?? 0) + 1;
    }
    return {
      key,
      label,
      total,
      last7Days,
      last30Days,
      prev7Days: last14Days - last7Days,
      daily,
      latest: latest?.createdAt.toISOString() ?? null,
      byInterest: breakdowns.includes('interest')
        ? tally(interest, 'interest')
        : null,
      byTimeframe: breakdowns.includes('timeframe')
        ? tally(timeframe, 'timeframe')
        : null,
    };
  }

  return Promise.all([
    report(
      'contact-product-interest',
      'Contact: product interest',
      ['interest', 'timeframe'],
      prisma.contactProductInterest as never,
    ),
    report(
      'contact-collaboration',
      'Contact: collaboration',
      ['interest'],
      prisma.contactCollaboration as never,
    ),
    report(
      'contact-general-enquiry',
      'Contact: general enquiry',
      [],
      prisma.contactGeneralEnquiry as never,
    ),
    report(
      'nff-interest',
      'Nordic Fusion Forum 2026',
      ['interest', 'timeframe'],
      prisma.nffInterest as never,
    ),
  ]);
}
