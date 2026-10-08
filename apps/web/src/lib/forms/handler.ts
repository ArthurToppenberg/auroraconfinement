// Server-only request handling shared by the four /api/forms/<key>/ endpoints.
// Kept free of Next.js and database imports so it can be unit-tested directly;
// each route passes in the insert function for its own table.
import {
  formKeyFor,
  isSpam,
  normaliseSubmission,
  validateSubmission,
} from './validation.ts';
import type {
  FieldErrors,
  FormKey,
  InterestSubmission,
  SubmissionType,
} from './validation.ts';

/** The fields every form's insert function receives (all normalised and validated). */
export type ValidSubmission = Omit<
  InterestSubmission,
  'submissionType' | 'source' | 'website'
>;

export interface FormResponseBody {
  ok: boolean;
  message: string;
  errors?: FieldErrors;
}

/** Each route fixes its submission type and source; the request body cannot pick them. */
const formContext: Record<
  FormKey,
  { submissionType: SubmissionType; source: InterestSubmission['source'] }
> = {
  'contact-product-interest': {
    submissionType: 'product-interest',
    source: 'contact',
  },
  'contact-collaboration': {
    submissionType: 'collaboration',
    source: 'contact',
  },
  'contact-general-enquiry': {
    submissionType: 'general-enquiry',
    source: 'contact',
  },
  'nff-interest': {
    submissionType: 'product-interest',
    source: 'nordic-fusion-forum-2026',
  },
};

const successMessages: Record<FormKey, string> = {
  'contact-product-interest':
    'Thank you. We have recorded your non-binding interest and will be in touch.',
  'contact-collaboration':
    'Thank you. We have received your message and will reply by email.',
  'contact-general-enquiry':
    'Thank you. We have received your message and will reply by email.',
  'nff-interest':
    'Thank you. We have recorded your interest and will contact you about the selected product or collaboration.',
};

// Generous for the longest form (all limits together are under 3 KB of text).
export const maxBodyBytes = 16 * 1024;

const acceptedTypes = [
  'application/x-www-form-urlencoded',
  'multipart/form-data',
];

/**
 * Fixed-window counters held in memory only (never persisted or logged).
 * A per-client limit stops one sender flooding a table; a global limit caps the
 * total write rate if many addresses are used at once.
 */
export class RateLimiter {
  private hits = new Map<string, number[]>();
  private readonly perClient: number;
  private readonly global: number;
  private readonly windowMs: number;
  constructor(perClient: number, global: number, windowMs: number) {
    this.perClient = perClient;
    this.global = global;
    this.windowMs = windowMs;
  }

  /** Records an attempt and returns false when either limit is exceeded. */
  allow(client: string, now = Date.now()): boolean {
    const recent = (key: string) =>
      (this.hits.get(key) ?? []).filter((t) => now - t < this.windowMs);
    const mine = recent(client);
    const all = recent('*');
    if (mine.length >= this.perClient || all.length >= this.global) {
      this.hits.set(client, mine);
      return false;
    }
    this.hits.set(client, [...mine, now]);
    this.hits.set('*', [...all, now]);
    // Drop idle clients so the map cannot grow without bound.
    if (this.hits.size > 10_000)
      for (const [key, times] of this.hits)
        if (!times.some((t) => now - t < this.windowMs)) this.hits.delete(key);
    return true;
  }
}

/** Behind Cloudflare and Caddy: Cloudflare's header first, else the last proxy hop. */
export function clientKey(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ??
    headers.get('x-forwarded-for')?.split(',').pop()?.trim() ??
    'unknown'
  );
}

/**
 * Cross-site form posts are "simple" requests that skip CORS preflight, so the
 * origin is checked explicitly. Browsers send Sec-Fetch-Site and Origin on fetch POSTs.
 */
export function isSameOrigin(headers: Headers, siteOrigin?: string): boolean {
  const fetchSite = headers.get('sec-fetch-site');
  if (fetchSite) return fetchSite === 'same-origin';
  const origin = headers.get('origin');
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  return (
    host === headers.get('host') || (!!siteOrigin && origin === siteOrigin)
  );
}

/** Reads at most `limit` bytes; returns null if the body is larger. */
async function readLimited(
  request: Request,
  limit: number,
): Promise<Uint8Array<ArrayBuffer> | null> {
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > limit) return null;
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

export interface HandlerOptions {
  form: FormKey;
  insert: (submission: ValidSubmission) => Promise<void>;
  limiter: RateLimiter;
  siteOrigin?: string | undefined;
  contactEmail: string;
  /** Receives only an error class name, never request contents. */
  logError?: (message: string) => void;
}

function json(status: number, body: FormResponseBody): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function handleFormPost(
  request: Request,
  options: HandlerOptions,
): Promise<Response> {
  const { form, insert, limiter, contactEmail } = options;
  const failure = `We could not send your enquiry. Please try again later or email ${contactEmail}.`;

  if (!isSameOrigin(request.headers, options.siteOrigin))
    return json(403, { ok: false, message: 'Unable to submit this enquiry.' });

  const contentType = (request.headers.get('content-type') ?? '')
    .split(';')[0]!
    .trim()
    .toLowerCase();
  if (!acceptedTypes.includes(contentType))
    return json(415, { ok: false, message: 'Unable to submit this enquiry.' });

  if (!limiter.allow(clientKey(request.headers)))
    return json(429, {
      ok: false,
      message: `Too many submissions. Please wait a few minutes or email ${contactEmail}.`,
    });

  const body = await readLimited(request, maxBodyBytes).catch(() => null);
  if (!body)
    return json(413, { ok: false, message: 'This enquiry is too long.' });

  let formData: FormData;
  try {
    formData = await new Response(body, {
      headers: { 'Content-Type': request.headers.get('content-type')! },
    }).formData();
  } catch {
    return json(400, { ok: false, message: 'Unable to submit this enquiry.' });
  }

  const data: InterestSubmission = {
    ...normaliseSubmission(formData),
    ...formContext[form],
  };

  // Honeypot filled: answer as if it worked so bots learn nothing, store nothing.
  if (isSpam(data))
    return json(200, { ok: true, message: successMessages[form] });

  const errors = validateSubmission(data);
  if (Object.keys(errors).length > 0 || formKeyFor(data) !== form)
    return json(422, {
      ok: false,
      message: 'Please correct the highlighted fields.',
      errors,
    });

  const {
    submissionType: _type,
    source: _source,
    website: _website,
    ...fields
  } = data;
  try {
    await insert(fields);
  } catch (error) {
    (options.logError ?? console.error)(
      `form ${form} insert failed: ${error instanceof Error ? error.name : 'unknown'}`,
    );
    return json(500, { ok: false, message: failure });
  }
  return json(200, { ok: true, message: successMessages[form] });
}
