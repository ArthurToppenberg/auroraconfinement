import assert from 'node:assert/strict';
import { test } from 'node:test';
import { exportRows } from './loi.ts';

const row = {
  id: 'test-record',
  reference: 'LOI-TEST',
  confirmedAt: new Date('2026-11-06T12:00:00Z'),
  status: 'CONFIRMED',
  fullName: 'Example Contact',
  email: 'person@example.org',
  phone: '+4512345678',
  role: 'Lecturer',
  organisation: 'Example University',
  department: null,
  country: 'Denmark',
  capacity: 'PERSONAL',
  product: 'EXHIBITION_MODEL',
  interestTypes: ['DEMONSTRATION'],
  timing: 'WITHIN_12_MONTHS',
  budgetStatus: null,
  sharingPermitted: true,
  followUp: 'QUALIFIED',
  source: 'nff2026',
  letterText: { title: 'Test letter' },
};

for (const scope of ['investor', 'internal'] as const) {
  test(`${scope} export respects its data boundary and records its scope`, async () => {
    let filter: unknown;
    let audit: unknown;
    const fake = {
      letterOfInterest: {
        findMany: async (query: unknown) => {
          filter = query;
          return [row];
        },
      },
      letterOfInterestEvent: {
        createMany: async (query: unknown) => {
          audit = query;
        },
      },
    } as unknown as Parameters<typeof exportRows>[0];
    const [result] = await exportRows(fake, scope, () => 'Letter text');
    assert.ok(result);
    assert.equal(result.letter, 'Letter text');
    assert.equal(result.email, scope === 'investor' ? '' : row.email);
    assert.equal(result.phone, scope === 'investor' ? '' : row.phone);
    assert.equal(result.followUp, scope === 'investor' ? '' : 'qualified');
    assert.equal(result.source, scope === 'investor' ? '' : 'nff2026');
    assert.deepEqual(filter, {
      where:
        scope === 'investor'
          ? { status: 'CONFIRMED', sharingPermitted: true }
          : {},
      orderBy: { createdAt: 'desc' },
    });
    assert.deepEqual(audit, {
      data: [{ loiId: row.id, kind: 'EXPORTED', detail: { scope } }],
    });
  });
}
