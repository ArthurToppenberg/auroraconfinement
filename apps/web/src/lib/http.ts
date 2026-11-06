// Request-handling primitives shared by the API route handlers. Server only; free of
// Next.js and database imports so they can be unit-tested directly.

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
export async function readLimited(
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
