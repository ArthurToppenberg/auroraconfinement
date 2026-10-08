import { formLabels, formKeys } from '@aurora/db';
import type { FormKey, FormStats, Submission } from '@aurora/db';

// Static, in-memory test data for the admin views. Local development only:
// nothing here touches the database, and the pages ignore it in production.

const day = 86_400_000;

const people = [
  ['Ingrid Larsen', 'Nordic Energy Lab', 'Head of Research'],
  ['Mikkel Holm', 'Fjord Capital', 'Investment Associate'],
  ['Sofia Andersson', 'Example Plasma Group', 'PhD Student'],
  ['Jonas Eriksen', 'Brightwave Industries', 'CTO'],
  ['Amara Okafor', 'Science Museum Network', 'Exhibitions Lead'],
  ['Lars Pedersen', 'Kattegat Grid', 'Strategy Director'],
  ['Elena Rossi', 'Example Fusion Centre', 'Postdoc'],
  ['Henrik Dahl', 'Dahl Advisory', 'Founder'],
] as const;

const applications = [
  'Public engagement exhibit for a science centre.',
  'Teaching tool for an undergraduate plasma physics course.',
  'Exploring joint research on stellarator optimisation.',
  'Early-stage evaluation for a pilot demonstration.',
  'General interest in the roadmap and timelines.',
];
const timeframes = [
  'AS_SOON_AS_AVAILABLE',
  'WITHIN_12_MONTHS',
  'WITHIN_1_TO_3_YEARS',
  'EXPLORING_FUTURE',
];
const productAreas = [
  'EXHIBITION_MODEL',
  'RESEARCH_PLATFORM',
  'BOTH_PRODUCT_DIRECTIONS',
];
const collaborationAreas = ['RESEARCH_COLLABORATION', 'INVESTMENT_PARTNERSHIP'];
const nffAreas = [
  'EXHIBITION_MODEL',
  'RESEARCH_PLATFORM',
  'PILOT_DEMONSTRATION',
  'RESEARCH_COLLABORATION',
  'INVESTMENT_PARTNERSHIP',
];

const counts: Record<FormKey, number> = {
  'contact-product-interest': 18,
  'contact-collaboration': 9,
  'contact-general-enquiry': 12,
  'nff-interest': 31,
};

function build(key: FormKey, index: number): Submission[] {
  // Deterministic pseudo-random sequence, so the page looks the same on reload.
  let seed = 42 + index;
  const rand = () => (seed = (seed * 1664525 + 1013904223) % 2 ** 32) / 2 ** 32;
  const pick = <T>(items: readonly T[]): T =>
    items[Math.floor(rand() * items.length)]!;
  const now = Date.now();

  return Array.from({ length: counts[key] }, (_, n) => {
    const [name, organisation, role] = pick(people);
    const message = rand() > 0.4 ? 'Fake test message. Please ignore.' : null;
    const base = {
      id: `fake-${key}-${n}`,
      // Skewed towards recent days, spread over 45 days.
      createdAt: new Date(now - rand() ** 2 * 45 * day).toISOString(),
      name,
      email: `${name.toLowerCase().replace(/\W+/g, '.')}.${n}@example.invalid`,
    };
    const none = {
      organisation: null,
      role: null,
      interest: null,
      intendedApplication: null,
      timeframe: null,
    };
    // Each form collects different fields (see packages/db/prisma/schema.prisma).
    if (key === 'contact-general-enquiry')
      return { ...base, ...none, message: message ?? 'Fake enquiry.' };
    if (key === 'contact-collaboration')
      return {
        ...base,
        ...none,
        organisation: rand() > 0.3 ? organisation : null,
        role: rand() > 0.3 ? role : null,
        interest: pick(collaborationAreas),
        message: message ?? 'Fake collaboration request.',
      };
    return {
      ...base,
      organisation,
      role,
      interest: pick(key === 'nff-interest' ? nffAreas : productAreas),
      intendedApplication: pick(applications),
      timeframe: pick(timeframes),
      message,
    };
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const fakeSubmissions = (key: FormKey): Submission[] =>
  build(key, formKeys.indexOf(key));

export const fakeSubmission = (key: FormKey, id: string) =>
  fakeSubmissions(key).find((row) => row.id === id) ?? null;

function tally(values: (string | null)[]) {
  const result: Record<string, number> = {};
  for (const value of values)
    if (value) result[value] = (result[value] ?? 0) + 1;
  return result;
}

export function fakeStats(): FormStats[] {
  const now = Date.now();
  const todayStart = Math.floor(now / day) * day;
  return formKeys.map((key) => {
    const rows = fakeSubmissions(key);
    const age = (row: Submission) => now - new Date(row.createdAt).getTime();
    const collects = (field: 'interest' | 'timeframe') =>
      rows.some((row) => row[field] !== null);
    const daily = new Array<number>(30).fill(0);
    for (const row of rows) {
      const i =
        29 -
        Math.floor(
          (todayStart -
            Math.floor(new Date(row.createdAt).getTime() / day) * day) /
            day,
        );
      if (i >= 0 && i < 30) daily[i] = (daily[i] ?? 0) + 1;
    }
    return {
      key,
      label: formLabels[key],
      total: rows.length,
      last7Days: rows.filter((r) => age(r) < 7 * day).length,
      last30Days: rows.filter((r) => age(r) < 30 * day).length,
      prev7Days: rows.filter((r) => age(r) >= 7 * day && age(r) < 14 * day)
        .length,
      daily,
      latest: rows[0]?.createdAt ?? null,
      byInterest: collects('interest')
        ? tally(rows.map((r) => r.interest))
        : null,
      byTimeframe: collects('timeframe')
        ? tally(rows.map((r) => r.timeframe))
        : null,
    };
  });
}
