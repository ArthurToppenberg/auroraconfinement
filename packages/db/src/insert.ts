import type { PrismaClient } from './generated/client.ts';
import {
  CollaborationArea,
  ContactProductArea,
  InterestTimeframe,
  NffInterestArea,
} from './generated/enums.ts';

// The site's form values are kebab-case ("research-platform"); Prisma's enum keys
// are SCREAMING_SNAKE ("RESEARCH_PLATFORM"). Each map is also that form's allowlist.
function enumMap<T extends string>(values: Record<string, T>) {
  const byForm = new Map<string, T>(
    Object.values(values).map((value) => [
      value.toLowerCase().replace(/_/g, '-'),
      value,
    ]),
  );
  return (formValue: string): T => {
    const value = byForm.get(formValue);
    if (!value) throw new InvalidChoiceError();
    return value;
  };
}

/** A structured choice outside the form's allowlist reached the database layer. */
export class InvalidChoiceError extends Error {
  override name = 'InvalidChoiceError';
}

const contactArea = enumMap(ContactProductArea);
const collaborationArea = enumMap(CollaborationArea);
const nffArea = enumMap(NffInterestArea);
const timeframe = enumMap(InterestTimeframe);

const optional = (value: string) => value || null;

/** Already normalised and validated by the caller. */
export interface SubmissionInput {
  name: string;
  email: string;
  organisation: string;
  role: string;
  interest: string;
  intendedApplication: string;
  timeframe: string;
  message: string;
}

// Each insert writes only the columns its form collects; the honeypot never arrives here.

export async function createContactProductInterest(
  prisma: PrismaClient,
  input: SubmissionInput,
): Promise<void> {
  await prisma.contactProductInterest.create({
    data: {
      name: input.name,
      email: input.email,
      organisation: input.organisation,
      role: input.role,
      interest: contactArea(input.interest),
      intendedApplication: input.intendedApplication,
      timeframe: timeframe(input.timeframe),
      message: optional(input.message),
    },
    select: { id: true },
  });
}

export async function createContactCollaboration(
  prisma: PrismaClient,
  input: SubmissionInput,
): Promise<void> {
  await prisma.contactCollaboration.create({
    data: {
      name: input.name,
      email: input.email,
      organisation: optional(input.organisation),
      role: optional(input.role),
      interest: collaborationArea(input.interest),
      message: input.message,
    },
    select: { id: true },
  });
}

export async function createContactGeneralEnquiry(
  prisma: PrismaClient,
  input: SubmissionInput,
): Promise<void> {
  await prisma.contactGeneralEnquiry.create({
    data: { name: input.name, email: input.email, message: input.message },
    select: { id: true },
  });
}

export async function createNffInterest(
  prisma: PrismaClient,
  input: SubmissionInput,
): Promise<void> {
  await prisma.nffInterest.create({
    data: {
      name: input.name,
      email: input.email,
      organisation: input.organisation,
      role: input.role,
      interest: nffArea(input.interest),
      intendedApplication: input.intendedApplication,
      timeframe: timeframe(input.timeframe),
      message: optional(input.message),
    },
    select: { id: true },
  });
}
