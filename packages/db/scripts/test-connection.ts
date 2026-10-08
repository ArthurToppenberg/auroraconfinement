import { prisma } from '../src/index.ts';

try {
  const [row] = await prisma.$queryRaw<{ ok: number }[]>`SELECT 1 AS ok`;
  console.log(
    row?.ok === 1
      ? 'Database connection OK'
      : 'Unexpected response from database',
  );
} catch (error) {
  console.error(
    'Database connection FAILED:',
    error instanceof Error ? error.message : error,
  );
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
