// Single entry point for database access. The app imports from "@aurora/db" only.
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client.ts';

export function createPrismaClient(
  connectionString = process.env['DATABASE_URL'],
): PrismaClient {
  if (!connectionString) throw new Error('DATABASE_URL is not set');
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Created on first use, so importing this package (e.g. during `next build`)
// never needs DATABASE_URL.
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, property) {
    globalForPrisma.prisma ??= createPrismaClient();
    return Reflect.get(globalForPrisma.prisma, property);
  },
});

export { PrismaClient };

export {
  createLoi,
  exportRows,
  getLoi,
  getLoiStats,
  InvalidChoiceError,
  listLois,
  loiFollowUps,
  loiStatuses,
  setFollowUp,
  setSharing,
  setStatus,
} from './loi.ts';
export type {
  ExportRow,
  ExportScope,
  LoiDetail,
  LoiFilters,
  LoiInput,
  LoiStats,
  LoiSummary,
} from './loi.ts';
