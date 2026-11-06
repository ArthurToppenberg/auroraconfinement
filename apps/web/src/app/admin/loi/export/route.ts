import { cookies } from 'next/headers';
import { exportRows, prisma } from '@aurora/db';
import type { ExportRow } from '@aurora/db';
import { toCsv } from '@/lib/admin/csv';
import { sessionCookie, verifySession } from '@/lib/admin/session';
import { letterToPlainText } from '@/lib/loi/letter';
import type { Letter } from '@/lib/loi/letter';

export const dynamic = 'force-dynamic';

const columns: (keyof ExportRow)[] = [
  'reference',
  'confirmedAt',
  'status',
  'fullName',
  'email',
  'phone',
  'role',
  'organisation',
  'department',
  'country',
  'capacity',
  'product',
  'interestTypes',
  'timing',
  'budgetStatus',
  'sharingPermitted',
  'followUp',
  'source',
  'letter',
];

/**
 * ?scope=internal (default): every letter, with email and phone.
 * ?scope=investor: only confirmed letters whose registrant allowed sharing, with no
 * email address or phone number. Both exports are recorded in each letter's audit trail.
 */
export async function GET(request: Request): Promise<Response> {
  if (!verifySession((await cookies()).get(sessionCookie)?.value))
    return new Response('Unauthorized', { status: 401 });

  const scope =
    new URL(request.url).searchParams.get('scope') === 'investor'
      ? 'investor'
      : 'internal';
  let rows: ExportRow[];
  try {
    rows = await exportRows(prisma, scope, (letter) =>
      letterToPlainText(letter as Letter),
    );
  } catch (error) {
    console.error(
      'admin export failed:',
      error instanceof Error ? error.name : 'unknown',
    );
    return new Response('Export unavailable', { status: 500 });
  }
  const body = toCsv(rows as unknown as Record<string, string>[], columns);
  return new Response(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="loi-${scope}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
