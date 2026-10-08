// Server only: imported solely by the app/api/forms/*/route.ts handlers.
import {
  createContactCollaboration,
  createContactGeneralEnquiry,
  createContactProductInterest,
  createNffInterest,
  prisma,
} from '@aurora/db';
import { contactEmail, siteOrigin } from '@/content/site';
import { handleFormPost, RateLimiter } from '@/lib/forms/handler';
import type { ValidSubmission } from '@/lib/forms/handler';
import type { FormKey } from '@/lib/forms/validation';

const inserts: Record<FormKey, (submission: ValidSubmission) => Promise<void>> =
  {
    'contact-product-interest': (s) => createContactProductInterest(prisma, s),
    'contact-collaboration': (s) => createContactCollaboration(prisma, s),
    'contact-general-enquiry': (s) => createContactGeneralEnquiry(prisma, s),
    'nff-interest': (s) => createNffInterest(prisma, s),
  };

// Shared by all four forms: 5 submissions per client and 60 in total per 10 minutes.
const limiter = new RateLimiter(5, 60, 10 * 60 * 1000);

/** The POST handler for one form's endpoint (app/api/forms/<key>/route.ts). */
export const formRoute =
  (form: FormKey) =>
  (request: Request): Promise<Response> =>
    handleFormPost(request, {
      form,
      insert: inserts[form],
      limiter,
      siteOrigin,
      contactEmail,
    });
