import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { handleFormPost, maxBodyBytes, RateLimiter } from './handler.ts';
import type { HandlerOptions, ValidSubmission } from './handler.ts';
import {
  nffInterestAreas,
  normaliseSubmission,
  validateSubmission,
} from './validation.ts';

const nffFields = {
  name: 'Ada Researcher',
  email: 'ada@example.org',
  organisation: 'Example University',
  role: 'Laboratory Director',
  interest: 'research-platform',
  intendedApplication: 'Hands-on stellarator experiments.',
  timeframe: 'within-1-to-3-years',
  message: '',
  website: '',
};

function post(
  fields: Record<string, string>,
  headers: Record<string, string> = {},
): Request {
  return new Request('https://auroraconfinement.com/api/forms/nff-interest/', {
    method: 'POST',
    body: new URLSearchParams(fields),
    headers: {
      host: 'auroraconfinement.com',
      origin: 'https://auroraconfinement.com',
      'sec-fetch-site': 'same-origin',
      'cf-connecting-ip': '203.0.113.7',
      ...headers,
    },
  });
}

function setup(overrides: Partial<HandlerOptions> = {}) {
  const stored: ValidSubmission[] = [];
  const logs: string[] = [];
  const options: HandlerOptions = {
    form: 'nff-interest',
    insert: async (submission) => {
      stored.push(submission);
    },
    limiter: new RateLimiter(5, 60, 60_000),
    contactEmail: 'contact@auroraconfinement.com',
    logError: (message) => logs.push(message),
    ...overrides,
  };
  return { stored, logs, options };
}

describe('form endpoint', () => {
  it('stores a valid submission with fields normalised', async () => {
    const { stored, options } = setup();
    const response = await handleFormPost(
      post({ ...nffFields, email: ' ADA@EXAMPLE.ORG ' }),
      options,
    );
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(stored.length, 1);
    assert.equal(stored[0]!.email, 'ada@example.org');
    assert.equal('website' in stored[0]!, false);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  });

  it('ignores a submission type or source claimed by the body', async () => {
    const { stored, options } = setup({ form: 'contact-general-enquiry' });
    // A general-enquiry endpoint must not accept NFF data posing as another form.
    const response = await handleFormPost(
      post({ ...nffFields, source: 'nordic-fusion-forum-2026' }),
      options,
    );
    assert.equal(response.status, 422);
    assert.equal(stored.length, 0);
  });

  it('rejects cross-site requests', async () => {
    const { stored, options } = setup();
    const crossSite = await handleFormPost(
      post(nffFields, { 'sec-fetch-site': 'cross-site' }),
      options,
    );
    assert.equal(crossSite.status, 403);
    const noOrigin = new Request('https://auroraconfinement.com/', {
      method: 'POST',
      body: new URLSearchParams(nffFields),
      headers: { host: 'auroraconfinement.com' },
    });
    assert.equal((await handleFormPost(noOrigin, options)).status, 403);
    const evilOrigin = new Request('https://auroraconfinement.com/', {
      method: 'POST',
      body: new URLSearchParams(nffFields),
      headers: {
        host: 'auroraconfinement.com',
        origin: 'https://evil.example',
      },
    });
    assert.equal((await handleFormPost(evilOrigin, options)).status, 403);
    assert.equal(stored.length, 0);
  });

  it('rejects unexpected content types and oversized bodies', async () => {
    const { stored, options } = setup();
    const asJson = new Request('https://auroraconfinement.com/', {
      method: 'POST',
      body: JSON.stringify(nffFields),
      headers: {
        'content-type': 'application/json',
        'sec-fetch-site': 'same-origin',
      },
    });
    assert.equal((await handleFormPost(asJson, options)).status, 415);
    const huge = await handleFormPost(
      post({ ...nffFields, message: 'x'.repeat(maxBodyBytes) }),
      options,
    );
    assert.equal(huge.status, 413);
    assert.equal(stored.length, 0);
  });

  it('returns field errors for invalid or non-allowlisted input', async () => {
    const { stored, options } = setup();
    const response = await handleFormPost(
      post({
        ...nffFields,
        interest: 'both-product-directions',
        email: 'nope',
      }),
      options,
    );
    assert.equal(response.status, 422);
    const body = await response.json();
    assert.ok(body.errors.interest);
    assert.ok(body.errors.email);
    assert.equal(stored.length, 0);
  });

  it('answers a filled honeypot with success but stores nothing', async () => {
    const { stored, options } = setup();
    const response = await handleFormPost(
      post({ ...nffFields, website: 'https://spam.example' }),
      options,
    );
    assert.equal(response.status, 200);
    assert.equal(stored.length, 0);
  });

  it('rate limits per client and globally', async () => {
    const { stored, options } = setup({
      limiter: new RateLimiter(2, 3, 60_000),
    });
    const statuses = [];
    for (const ip of ['1', '1', '1', '2', '3']) {
      statuses.push(
        (
          await handleFormPost(
            post(nffFields, { 'cf-connecting-ip': ip }),
            options,
          )
        ).status,
      );
    }
    // Client 1 is capped at 2; then the global cap of 3 blocks client 3.
    assert.deepEqual(statuses, [200, 200, 429, 200, 429]);
    assert.equal(stored.length, 3);
  });

  it('logs only the error class when the database fails, never the body', async () => {
    const { logs, options } = setup({
      insert: async () => {
        throw new TypeError(`boom ${nffFields.email}`);
      },
    });
    const response = await handleFormPost(post(nffFields), options);
    assert.equal(response.status, 500);
    assert.equal((await response.json()).ok, false);
    assert.deepEqual(logs, ['form nff-interest insert failed: TypeError']);
  });
});

describe('NFF interest allowlist', () => {
  it('accepts exactly the NFF options', () => {
    for (const interest of nffInterestAreas) {
      const form = new FormData();
      for (const [key, value] of Object.entries({ ...nffFields, interest }))
        form.set(key, value);
      form.set('submissionType', 'product-interest');
      form.set('source', 'nordic-fusion-forum-2026');
      assert.deepEqual(validateSubmission(normaliseSubmission(form)), {});
    }
  });
});
