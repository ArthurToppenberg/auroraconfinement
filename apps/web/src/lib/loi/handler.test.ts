import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { RateLimiter } from '../http.ts';
import { validForm } from './fixtures.ts';
import { handleRegisterPost, maxBodyBytes, newReference } from './handler.ts';
import type { HandlerOptions, StoredLoi } from './handler.ts';

function post(
  body: unknown,
  headers: Record<string, string> = {},
  raw?: string,
): Request {
  return new Request('https://auroraconfinement.com/api/register/', {
    method: 'POST',
    body: raw ?? JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      host: 'auroraconfinement.com',
      origin: 'https://auroraconfinement.com',
      'sec-fetch-site': 'same-origin',
      'cf-connecting-ip': '203.0.113.7',
      ...headers,
    },
  });
}

function setup(overrides: Partial<HandlerOptions> = {}) {
  const stored: StoredLoi[] = [];
  const logs: string[] = [];
  const options: HandlerOptions = {
    insert: async (loi) => {
      stored.push(loi);
    },
    limiter: new RateLimiter(3, 40, 60_000),
    contactEmail: 'contact@auroraconfinement.com',
    logError: (message) => logs.push(message),
    now: () => new Date('2026-11-06T14:03:00.000Z'),
    ...overrides,
  };
  return { stored, logs, options };
}

describe('register endpoint', () => {
  it('stores a valid letter as a snapshot with a reference and timestamp', async () => {
    const { stored, options } = setup();
    const response = await handleRegisterPost(post(validForm()), options);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.match(body.reference, /^LOI-2026-[A-Z0-9]{6}$/);
    assert.equal(stored.length, 1);
    const loi = stored[0]!;
    assert.equal(loi.reference, body.reference);
    assert.equal(loi.organisationKey, 'example university');
    assert.equal(loi.phone, '+45 12 34 56 78');
    assert.ok(!JSON.stringify(loi.letterText).includes('12 34 56 78'));
    assert.equal(loi.timing, 'within-12-months');
    assert.equal(loi.sharingPermitted, false);
    assert.equal(loi.letterText.details[1]?.value, loi.reference);
    assert.deepEqual(body.letter, loi.letterText);
  });

  it('ignores letter text sent by the browser', async () => {
    const { stored, options } = setup();
    await handleRegisterPost(
      post({ ...validForm(), letterText: { title: 'We promise to buy 1000' } }),
      options,
    );
    assert.match(stored[0]!.letterText.title, /Non-binding Letter of Interest/);
  });

  it('uses the soonest timing when both products are described', async () => {
    const { stored, options } = setup();
    const base = validForm();
    await handleRegisterPost(
      post({
        ...base,
        product: 'both',
        sections: {
          'exhibition-model': {
            ...base.sections['exhibition-model'],
            timing: 'longer-term',
          },
          'research-platform': {
            ...base.sections['research-platform'],
            primaryUse: 'research',
            application: 'Research.',
            timing: 'within-12-months',
          },
        },
      }),
      options,
    );
    assert.equal(stored[0]!.timing, 'within-12-months');
    assert.deepEqual(Object.keys(stored[0]!.sections), [
      'exhibition-model',
      'research-platform',
    ]);
  });

  it('rejects an unconfirmed letter without storing it', async () => {
    const { stored, options } = setup();
    const response = await handleRegisterPost(
      post({ ...validForm(), confirmed: false }),
      options,
    );
    assert.equal(response.status, 422);
    assert.ok((await response.json()).errors.confirmed);
    assert.equal(stored.length, 0);
  });

  it('returns field errors for invalid input', async () => {
    const { stored, options } = setup();
    const response = await handleRegisterPost(
      post({ confirmed: true }),
      options,
    );
    assert.equal(response.status, 422);
    assert.ok((await response.json()).errors.fullName);
    assert.equal(stored.length, 0);
  });

  it('answers a filled honeypot as success but stores nothing', async () => {
    const { stored, options } = setup();
    const response = await handleRegisterPost(
      post({ ...validForm(), website: 'x' }),
      options,
    );
    assert.equal(response.status, 200);
    assert.equal(stored.length, 0);
  });

  it('refuses cross-site, wrong content type, oversize and malformed requests', async () => {
    const { stored, options } = setup();
    assert.equal(
      (
        await handleRegisterPost(
          post(validForm(), { 'sec-fetch-site': 'cross-site' }),
          options,
        )
      ).status,
      403,
    );
    assert.equal(
      (
        await handleRegisterPost(
          post(validForm(), { 'content-type': 'text/plain' }),
          options,
        )
      ).status,
      415,
    );
    assert.equal(
      (
        await handleRegisterPost(
          post(null, {}, 'x'.repeat(maxBodyBytes + 1)),
          options,
        )
      ).status,
      413,
    );
    assert.equal(
      (await handleRegisterPost(post(null, {}, '{nope'), options)).status,
      400,
    );
    assert.equal(stored.length, 0);
  });

  it('rate limits per client', async () => {
    const { options } = setup();
    for (let i = 0; i < 3; i++)
      assert.equal(
        (await handleRegisterPost(post(validForm()), options)).status,
        200,
      );
    assert.equal(
      (await handleRegisterPost(post(validForm()), options)).status,
      429,
    );
  });

  it('reports an honest failure and logs only the error class', async () => {
    const { logs, options } = setup({
      insert: async () => {
        throw new TypeError('connection string with a secret');
      },
    });
    const response = await handleRegisterPost(post(validForm()), options);
    assert.equal(response.status, 500);
    assert.equal((await response.json()).ok, false);
    assert.deepEqual(logs, ['register insert failed: TypeError']);
  });
});

describe('newReference', () => {
  it('produces readable, distinct IDs', () => {
    const ids = new Set(
      Array.from({ length: 50 }, () => newReference(new Date('2026-01-01'))),
    );
    assert.equal(ids.size, 50);
    for (const id of ids) assert.match(id, /^LOI-2026-[A-Z0-9]{6}$/);
  });
});
