import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const sessionCookie = 'admin_session';
export const sessionSeconds = 8 * 60 * 60;

// Read per call so the password comes from the runtime environment, never the build.
const password = () => process.env['ADMIN_KODE'] ?? '';

const sign = (value: string) =>
  createHmac(
    'sha256',
    createHash('sha256').update(`aurora-admin-session:${password()}`).digest(),
  )
    .update(value)
    .digest('hex');

export function safeEqual(a: string, b: string): boolean {
  const left = createHash('sha256').update(a).digest();
  const right = createHash('sha256').update(b).digest();
  return timingSafeEqual(left, right);
}

/** False when ADMIN_KODE is unset, so admin stays closed. */
export const adminConfigured = () => password() !== '';
export const passwordMatches = (attempt: string) =>
  adminConfigured() && safeEqual(attempt, password());

export function createSession(): string {
  const expires = String(Math.floor(Date.now() / 1000) + sessionSeconds);
  return `${expires}.${sign(expires)}`;
}

export function verifySession(value: string | undefined): boolean {
  if (!adminConfigured() || !value) return false;
  const [expires, signature] = value.split('.');
  if (!expires || !signature) return false;
  return (
    safeEqual(signature, sign(expires)) && Number(expires) > Date.now() / 1000
  );
}
