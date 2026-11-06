// Database access for Letters of Interest (LOI). One row per letter version; the
// confirmed letter (letterText) is a snapshot and is never edited in place.
import type { PrismaClient } from './generated/client.ts';
import {
  LoiBudgetStatus,
  LoiCapacity,
  LoiFollowUp,
  LoiInterestType,
  LoiProcurementRole,
  LoiProduct,
  LoiStatus,
  LoiTiming,
} from './generated/enums.ts';
import type { InputJsonValue } from './generated/internal/prismaNamespace.ts';

// The site's values are kebab-case ("research-platform"); Prisma's enum keys are
// SCREAMING_SNAKE ("RESEARCH_PLATFORM"). Each map doubles as that field's allowlist.
const toKebab = (value: string) => value.toLowerCase().replace(/_/g, '-');

function enumMap<T extends string>(values: Record<string, T>) {
  const byForm = new Map<string, T>(
    Object.values(values).map((value) => [toKebab(value), value]),
  );
  return (formValue: string): T => {
    const value = byForm.get(formValue);
    if (!value) throw new InvalidChoiceError();
    return value;
  };
}

/** A structured choice outside the allowlist reached the database layer. */
export class InvalidChoiceError extends Error {
  override name = 'InvalidChoiceError';
}

const capacity = enumMap(LoiCapacity);
const procurementRole = enumMap(LoiProcurementRole);
const product = enumMap(LoiProduct);
const interestType = enumMap(LoiInterestType);
const timing = enumMap(LoiTiming);
const budgetStatus = enumMap(LoiBudgetStatus);
const status = enumMap(LoiStatus);
const followUp = enumMap(LoiFollowUp);

export const loiStatuses = Object.values(LoiStatus).map(toKebab);
export const loiFollowUps = Object.values(LoiFollowUp).map(toKebab);

/** Already normalised and validated by the caller. Optional answers are ''. */
export interface LoiInput {
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  organisation: string;
  organisationKey: string;
  department: string;
  country: string;
  capacity: string;
  procurementRole: string;
  product: string;
  interestTypes: string[];
  timing: string;
  budgetStatus: string;
  sections: unknown;
  letterText: unknown;
  templateVersion: string;
  confirmationWordingVersion: string;
  confirmedAt: Date;
  sharingPermitted: boolean;
  sharingWordingVersion: string;
  source: string;
}

const optional = (value: string) => value || null;

/** Saves a confirmed letter and its CREATED audit event together. Returns the id. */
export async function createLoi(
  prisma: PrismaClient,
  input: LoiInput,
): Promise<string> {
  const row = await prisma.letterOfInterest.create({
    data: {
      reference: input.reference,
      fullName: input.fullName,
      email: input.email,
      phone: optional(input.phone),
      role: input.role,
      organisation: input.organisation,
      organisationKey: input.organisationKey,
      department: optional(input.department),
      country: input.country,
      capacity: capacity(input.capacity),
      procurementRole: input.procurementRole
        ? procurementRole(input.procurementRole)
        : null,
      product: product(input.product),
      interestTypes: input.interestTypes.map(interestType),
      timing: timing(input.timing),
      budgetStatus: input.budgetStatus
        ? budgetStatus(input.budgetStatus)
        : null,
      sections: input.sections as InputJsonValue,
      letterText: input.letterText as InputJsonValue,
      templateVersion: input.templateVersion,
      confirmationWordingVersion: input.confirmationWordingVersion,
      confirmedAt: input.confirmedAt,
      status: 'CONFIRMED',
      sharingPermitted: input.sharingPermitted,
      sharingWordingVersion: input.sharingWordingVersion,
      sharingChangedAt: input.confirmedAt,
      source: optional(input.source),
      events: {
        create: {
          kind: 'CREATED',
          detail: { version: 1, templateVersion: input.templateVersion },
        },
      },
    },
    select: { id: true },
  });
  return row.id;
}

// ------------------------------------------------------------------- reading

export interface LoiSummary {
  id: string;
  reference: string;
  createdAt: string;
  fullName: string;
  email: string;
  /** Null when the registrant left it blank. */
  phone: string | null;
  organisation: string;
  department: string | null;
  country: string;
  role: string;
  capacity: string;
  product: string;
  interestTypes: string[];
  timing: string;
  budgetStatus: string | null;
  status: string;
  followUp: string;
  sharingPermitted: boolean;
}

export interface LoiDetail extends LoiSummary {
  version: number;
  procurementRole: string | null;
  sections: unknown;
  letterText: unknown;
  templateVersion: string;
  confirmationWordingVersion: string;
  confirmedAt: string;
  sharingWordingVersion: string;
  sharingChangedAt: string;
  source: string | null;
  internalNotes: string | null;
  authorityReview: string | null;
  authorityEvidence: string | null;
  events: { id: string; at: string; kind: string; detail: unknown }[];
}

export interface LoiFilters {
  product?: string;
  status?: string;
  capacity?: string;
  interestType?: string;
  timing?: string;
  budgetStatus?: string;
  country?: string;
  /** Matches name, organisation or department. */
  q?: string;
}

type Row = Awaited<
  ReturnType<PrismaClient['letterOfInterest']['findFirstOrThrow']>
>;

const summarise = (row: Row): LoiSummary => ({
  id: row.id,
  reference: row.reference,
  createdAt: row.createdAt.toISOString(),
  fullName: row.fullName,
  email: row.email,
  phone: row.phone,
  organisation: row.organisation,
  department: row.department,
  country: row.country,
  role: row.role,
  capacity: toKebab(row.capacity),
  product: toKebab(row.product),
  interestTypes: row.interestTypes.map(toKebab),
  timing: toKebab(row.timing),
  budgetStatus: row.budgetStatus ? toKebab(row.budgetStatus) : null,
  status: toKebab(row.status),
  followUp: toKebab(row.followUp),
  sharingPermitted: row.sharingPermitted,
});

/** Filter values that are not on the allowlist match nothing instead of throwing. */
function where(filters: LoiFilters) {
  const attempt = <T>(fn: () => T): T | undefined => {
    try {
      return fn();
    } catch {
      return undefined;
    }
  };
  const never = { id: { in: [] as string[] } };
  const and: object[] = [];
  const add = (value: string | undefined, build: (v: string) => object) => {
    if (value) and.push(attempt(() => build(value)) ?? never);
  };
  add(filters.product, (v) => ({ product: product(v) }));
  add(filters.status, (v) => ({ status: status(v) }));
  add(filters.capacity, (v) => ({ capacity: capacity(v) }));
  add(filters.interestType, (v) => ({
    interestTypes: { has: interestType(v) },
  }));
  add(filters.timing, (v) => ({ timing: timing(v) }));
  add(filters.budgetStatus, (v) => ({ budgetStatus: budgetStatus(v) }));
  add(filters.country, (v) => ({
    country: { contains: v, mode: 'insensitive' },
  }));
  add(filters.q, (v) => ({
    OR: [
      { fullName: { contains: v, mode: 'insensitive' } },
      { organisation: { contains: v, mode: 'insensitive' } },
      { department: { contains: v, mode: 'insensitive' } },
    ],
  }));
  return { AND: and };
}

/** Newest first. Contains personal data: only call behind the admin session. */
export async function listLois(
  prisma: PrismaClient,
  filters: LoiFilters = {},
  take = 200,
): Promise<LoiSummary[]> {
  const rows = await prisma.letterOfInterest.findMany({
    where: where(filters),
    orderBy: { createdAt: 'desc' },
    take,
  });
  return rows.map(summarise);
}

export async function getLoi(
  prisma: PrismaClient,
  id: string,
): Promise<LoiDetail | null> {
  const row = await prisma.letterOfInterest.findUnique({
    where: { id },
    include: { events: { orderBy: { at: 'desc' } } },
  });
  if (!row) return null;
  return {
    ...summarise(row),
    version: row.version,
    procurementRole: row.procurementRole ? toKebab(row.procurementRole) : null,
    sections: row.sections,
    letterText: row.letterText,
    templateVersion: row.templateVersion,
    confirmationWordingVersion: row.confirmationWordingVersion,
    confirmedAt: row.confirmedAt.toISOString(),
    sharingWordingVersion: row.sharingWordingVersion,
    sharingChangedAt: row.sharingChangedAt.toISOString(),
    source: row.source,
    internalNotes: row.internalNotes,
    authorityReview: row.authorityReview,
    authorityEvidence: row.authorityEvidence,
    events: row.events.map((event) => ({
      id: event.id,
      at: event.at.toISOString(),
      kind: event.kind,
      detail: event.detail,
    })),
  };
}

// ------------------------------------------------------------------- changes
// Every change writes an audit event in the same transaction.

export async function setSharing(
  prisma: PrismaClient,
  id: string,
  permitted: boolean,
): Promise<void> {
  await prisma.$transaction([
    prisma.letterOfInterest.update({
      where: { id },
      data: { sharingPermitted: permitted, sharingChangedAt: new Date() },
      select: { id: true },
    }),
    prisma.letterOfInterestEvent.create({
      data: { loiId: id, kind: 'SHARING_CHANGED', detail: { permitted } },
    }),
  ]);
}

export async function setStatus(
  prisma: PrismaClient,
  id: string,
  next: 'withdrawn' | 'superseded',
): Promise<void> {
  await prisma.$transaction([
    prisma.letterOfInterest.update({
      where: { id },
      data: { status: status(next) },
      select: { id: true },
    }),
    prisma.letterOfInterestEvent.create({
      data: {
        loiId: id,
        kind: next === 'withdrawn' ? 'WITHDRAWN' : 'SUPERSEDED',
      },
    }),
  ]);
}

export async function setFollowUp(
  prisma: PrismaClient,
  id: string,
  next: string,
  notes: string,
): Promise<void> {
  const value = followUp(next);
  await prisma.$transaction([
    prisma.letterOfInterest.update({
      where: { id },
      data: { followUp: value, internalNotes: optional(notes.slice(0, 4000)) },
      select: { id: true },
    }),
    prisma.letterOfInterestEvent.create({
      data: { loiId: id, kind: 'FOLLOW_UP', detail: { followUp: next } },
    }),
  ]);
}

// -------------------------------------------------------------------- export

export type ExportScope = 'internal' | 'investor';

export interface ExportRow {
  reference: string;
  confirmedAt: string;
  status: string;
  fullName: string;
  /** Empty in the investor scope. */
  email: string;
  /** Empty in the investor scope. */
  phone: string;
  role: string;
  organisation: string;
  department: string;
  country: string;
  capacity: string;
  product: string;
  interestTypes: string;
  timing: string;
  budgetStatus: string;
  sharingPermitted: string;
  followUp: string;
  source: string;
  /** The confirmed letter, as plain text. */
  letter: string;
}

/**
 * The investor scope only ever includes confirmed letters whose registrant allowed
 * sharing, and never includes the email address or phone number. Exports are audited.
 */
export async function exportRows(
  prisma: PrismaClient,
  scope: ExportScope,
  render: (letterText: unknown) => string,
): Promise<ExportRow[]> {
  const rows = await prisma.letterOfInterest.findMany({
    where:
      scope === 'investor'
        ? { status: 'CONFIRMED', sharingPermitted: true }
        : {},
    orderBy: { createdAt: 'desc' },
  });
  if (rows.length > 0)
    await prisma.letterOfInterestEvent.createMany({
      data: rows.map((row) => ({
        loiId: row.id,
        kind: 'EXPORTED' as const,
        detail: { scope },
      })),
    });
  return rows.map((row) => ({
    reference: row.reference,
    confirmedAt: row.confirmedAt.toISOString(),
    status: toKebab(row.status),
    fullName: row.fullName,
    email: scope === 'investor' ? '' : row.email,
    phone: scope === 'investor' ? '' : (row.phone ?? ''),
    role: row.role,
    organisation: row.organisation,
    department: row.department ?? '',
    country: row.country,
    capacity: toKebab(row.capacity),
    product: toKebab(row.product),
    interestTypes: row.interestTypes.map(toKebab).join('; '),
    timing: toKebab(row.timing),
    budgetStatus: row.budgetStatus ? toKebab(row.budgetStatus) : '',
    sharingPermitted: row.sharingPermitted ? 'yes' : 'no',
    followUp: toKebab(row.followUp),
    source: row.source ?? '',
    letter: render(row.letterText),
  }));
}

// --------------------------------------------------------------------- stats

export interface LoiStats {
  /** Confirmed letters (people) and the distinct organisations behind them. */
  confirmedLetters: number;
  uniqueOrganisations: number;
  withdrawn: number;
  last7Days: number;
  prev7Days: number;
  last30Days: number;
  /** Letters per UTC day for the last 30 days, oldest first. */
  daily: number[];
  latest: string | null;
  byProduct: Record<string, number>;
  byCapacity: Record<string, number>;
  byTiming: Record<string, number>;
  byInterestType: Record<string, number>;
  /** Confirmed letters that allow sharing with investors and grant providers. */
  sharingPermitted: number;
}

const day = 24 * 60 * 60 * 1000;
const DAILY_WINDOW = 30;

/** Aggregate counts only: no names, emails or answers ever leave the database. */
export async function getLoiStats(prisma: PrismaClient): Promise<LoiStats> {
  const now = Date.now();
  const todayStart = Math.floor(now / day) * day;
  const confirmed = { status: 'CONFIRMED' as const };
  const since = (days: number) => new Date(now - days * day);

  const tally = (rows: { _count: { _all: number } }[], field: string) =>
    Object.fromEntries(
      rows.map((row) => [
        toKebab(String((row as Record<string, unknown>)[field])),
        row._count._all,
      ]),
    );

  const [
    confirmedLetters,
    organisations,
    withdrawn,
    last7Days,
    last14Days,
    last30Days,
    recent,
    latest,
    product_,
    capacity_,
    timing_,
    interestRows,
    sharingPermitted,
  ] = await Promise.all([
    prisma.letterOfInterest.count({ where: confirmed }),
    prisma.letterOfInterest.findMany({
      where: confirmed,
      distinct: ['organisationKey'],
      select: { organisationKey: true },
    }),
    prisma.letterOfInterest.count({ where: { status: 'WITHDRAWN' } }),
    prisma.letterOfInterest.count({
      where: { ...confirmed, createdAt: { gte: since(7) } },
    }),
    prisma.letterOfInterest.count({
      where: { ...confirmed, createdAt: { gte: since(14) } },
    }),
    prisma.letterOfInterest.count({
      where: { ...confirmed, createdAt: { gte: since(30) } },
    }),
    prisma.letterOfInterest.findMany({
      where: {
        ...confirmed,
        createdAt: { gte: new Date(todayStart - (DAILY_WINDOW - 1) * day) },
      },
      select: { createdAt: true },
    }),
    prisma.letterOfInterest.findFirst({
      where: confirmed,
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    }),
    prisma.letterOfInterest.groupBy({
      by: ['product'],
      where: confirmed,
      _count: { _all: true },
    }),
    prisma.letterOfInterest.groupBy({
      by: ['capacity'],
      where: confirmed,
      _count: { _all: true },
    }),
    prisma.letterOfInterest.groupBy({
      by: ['timing'],
      where: confirmed,
      _count: { _all: true },
    }),
    prisma.letterOfInterest.findMany({
      where: confirmed,
      select: { interestTypes: true },
    }),
    prisma.letterOfInterest.count({
      where: { ...confirmed, sharingPermitted: true },
    }),
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

  const byInterestType: Record<string, number> = {};
  for (const { interestTypes } of interestRows)
    for (const type of interestTypes) {
      const key = toKebab(type);
      byInterestType[key] = (byInterestType[key] ?? 0) + 1;
    }

  return {
    confirmedLetters,
    uniqueOrganisations: organisations.length,
    withdrawn,
    last7Days,
    prev7Days: last14Days - last7Days,
    last30Days,
    daily,
    latest: latest?.createdAt.toISOString() ?? null,
    byProduct: tally(product_, 'product'),
    byCapacity: tally(capacity_, 'capacity'),
    byTiming: tally(timing_, 'timing'),
    byInterestType,
    sharingPermitted,
  };
}
