// Server-side handling of a Letter of Interest submission. Kept free of Next.js and
// database imports so it can be unit-tested; the route passes in the insert function.
import { clientKey, isSameOrigin, readLimited } from '../http.ts';
import type { RateLimiter } from '../http.ts';
import {
  buildLetter,
  CONFIRMATION_WORDING_VERSION,
  SHARING_WORDING_VERSION,
  TEMPLATE_VERSION,
} from './letter.ts';
import type { Letter } from './letter.ts';
import {
  activeSections,
  isSpam,
  normaliseForm,
  organisationKey,
  timings,
  validateSubmission,
} from './schema.ts';
import type { FieldErrors, LoiForm, ProductSection } from './schema.ts';

/** Everything saved for a confirmed letter. The letter is the immutable snapshot. */
export interface StoredLoi {
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  organisation: string;
  organisationKey: string;
  department: string;
  country: string;
  capacity: string;
  procurementRole: string;
  product: string;
  interestTypes: string[];
  /** The soonest timing across the products described. */
  timing: string;
  /** The first budget status given, if any. */
  budgetStatus: string;
  sections: Partial<Record<string, ProductSection>>;
  letterText: Letter;
  templateVersion: string;
  confirmationWordingVersion: string;
  confirmedAt: Date;
  sharingPermitted: boolean;
  sharingWordingVersion: string;
  source: string;
}

export interface RegisterResponseBody {
  ok: boolean;
  message: string;
  reference?: string;
  /** The letter exactly as saved, for the success screen. */
  letter?: Letter;
  errors?: FieldErrors;
}

/** Larger than the old contact forms: two product sections plus long answers. */
export const maxBodyBytes = 48 * 1024;

const referenceAlphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/** "LOI-2026-7K3Q9F": unguessable enough not to be enumerated, easy to read aloud. */
export function newReference(now = new Date()): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const code = Array.from(
    bytes,
    (byte) => referenceAlphabet[byte % referenceAlphabet.length],
  ).join('');
  return `LOI-${now.getUTCFullYear()}-${code}`;
}

export function toStoredLoi(
  form: LoiForm,
  reference: string,
  confirmedAt: Date,
  contactEmail: string,
): StoredLoi {
  const keys = activeSections(form.product);
  const sections: StoredLoi['sections'] = {};
  for (const key of keys) sections[key] = form.sections[key];

  const timing = keys
    .map((key) => form.sections[key].timing)
    .filter((t) => t !== '')
    .sort((a, b) => timings.indexOf(a) - timings.indexOf(b))[0];
  const budgetStatus =
    keys.map((key) => form.sections[key].budgetStatus).find((b) => b !== '') ??
    '';

  return {
    reference,
    fullName: form.fullName,
    email: form.email,
    phone: form.phone,
    role: form.role,
    organisation: form.organisation,
    organisationKey: organisationKey(form.organisation),
    department: form.department,
    country: form.country,
    capacity: form.capacity,
    procurementRole: form.procurementRole,
    product: form.product,
    interestTypes: form.interestTypes,
    timing: timing ?? '',
    budgetStatus,
    sections,
    // Rebuilt here from validated data: letter text sent by the browser is ignored.
    letterText: buildLetter(form, {
      confirmedAt: confirmedAt.toISOString(),
      reference,
      contactEmail,
    }),
    templateVersion: TEMPLATE_VERSION,
    confirmationWordingVersion: CONFIRMATION_WORDING_VERSION,
    confirmedAt,
    sharingPermitted: form.sharing,
    sharingWordingVersion: SHARING_WORDING_VERSION,
    source: form.source,
  };
}

export interface HandlerOptions {
  insert: (loi: StoredLoi) => Promise<void>;
  limiter: RateLimiter;
  siteOrigin?: string | undefined;
  contactEmail: string;
  /** Receives only an error class name, never request contents. */
  logError?: (message: string) => void;
  now?: () => Date;
}

function json(status: number, body: RegisterResponseBody): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function handleRegisterPost(
  request: Request,
  options: HandlerOptions,
): Promise<Response> {
  const { insert, limiter, contactEmail } = options;
  const failure = `We could not save your letter. Please try again later or email ${contactEmail}.`;
  const refused = 'Unable to submit this letter.';

  if (!isSameOrigin(request.headers, options.siteOrigin))
    return json(403, { ok: false, message: refused });

  const contentType = (request.headers.get('content-type') ?? '')
    .split(';')[0]!
    .trim()
    .toLowerCase();
  if (contentType !== 'application/json')
    return json(415, { ok: false, message: refused });

  if (!limiter.allow(clientKey(request.headers)))
    return json(429, {
      ok: false,
      message: `Too many submissions. Please wait a few minutes or email ${contactEmail}.`,
    });

  const body = await readLimited(request, maxBodyBytes).catch(() => null);
  if (!body)
    return json(413, { ok: false, message: 'This letter is too long.' });

  let raw: unknown;
  try {
    raw = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return json(400, { ok: false, message: refused });
  }

  const form = normaliseForm(raw);

  // Honeypot filled: answer as if it worked so bots learn nothing, store nothing.
  if (isSpam(form))
    return json(200, {
      ok: true,
      message: 'Your letter has been saved.',
      reference: newReference(),
    });

  const errors = validateSubmission(form);
  if (Object.keys(errors).length > 0)
    return json(422, {
      ok: false,
      message: 'Please correct the highlighted fields.',
      errors,
    });

  const confirmedAt = (options.now ?? (() => new Date()))();
  const loi = toStoredLoi(
    form,
    newReference(confirmedAt),
    confirmedAt,
    contactEmail,
  );
  try {
    await insert(loi);
  } catch (error) {
    (options.logError ?? console.error)(
      `register insert failed: ${error instanceof Error ? error.name : 'unknown'}`,
    );
    return json(500, { ok: false, message: failure });
  }
  return json(200, {
    ok: true,
    message: 'Your letter has been saved.',
    reference: loi.reference,
    letter: loi.letterText,
  });
}
