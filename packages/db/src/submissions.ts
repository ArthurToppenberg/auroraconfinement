import type { PrismaClient } from './generated/client.ts';

export const formKeys = [
  'contact-product-interest',
  'contact-collaboration',
  'contact-general-enquiry',
  'nff-interest',
] as const;
export type FormKey = (typeof formKeys)[number];

export const formLabels: Record<FormKey, string> = {
  'contact-product-interest': 'Contact: product interest',
  'contact-collaboration': 'Contact: collaboration',
  'contact-general-enquiry': 'Contact: general enquiry',
  'nff-interest': 'Nordic Fusion Forum 2026',
};

export const isFormKey = (value: string): value is FormKey =>
  (formKeys as readonly string[]).includes(value);

export interface Submission {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  /** Null when the form does not collect the field (or it was left blank). */
  organisation: string | null;
  role: string | null;
  interest: string | null;
  intendedApplication: string | null;
  timeframe: string | null;
  message: string | null;
}

type Row = Partial<Omit<Submission, 'createdAt'>> &
  Pick<Submission, 'id' | 'name' | 'email'> & { createdAt: Date };

/** The four form models differ only in which optional columns they have. */
interface Delegate {
  findMany(args: {
    where: object;
    orderBy: { createdAt: 'desc' };
    take: number;
  }): Promise<Row[]>;
  findUnique(args: { where: { id: string } }): Promise<Row | null>;
}

const delegate = (prisma: PrismaClient, key: FormKey): Delegate =>
  ({
    'contact-product-interest': prisma.contactProductInterest,
    'contact-collaboration': prisma.contactCollaboration,
    'contact-general-enquiry': prisma.contactGeneralEnquiry,
    'nff-interest': prisma.nffInterest,
  })[key] as unknown as Delegate;

const serialise = (row: Row): Submission => ({
  id: row.id,
  createdAt: row.createdAt.toISOString(),
  name: row.name,
  email: row.email,
  organisation: row.organisation ?? null,
  role: row.role ?? null,
  interest: row.interest ?? null,
  intendedApplication: row.intendedApplication ?? null,
  timeframe: row.timeframe ?? null,
  message: row.message ?? null,
});

/** Newest first. Contains personal data: only call behind the admin session. */
export async function listSubmissions(
  prisma: PrismaClient,
  key: FormKey,
  take = 200,
): Promise<Submission[]> {
  const rows = await delegate(prisma, key).findMany({
    where: {},
    orderBy: { createdAt: 'desc' },
    take,
  });
  return rows.map(serialise);
}

export async function getSubmission(
  prisma: PrismaClient,
  key: FormKey,
  id: string,
): Promise<Submission | null> {
  const row = await delegate(prisma, key).findUnique({ where: { id } });
  return row ? serialise(row) : null;
}
