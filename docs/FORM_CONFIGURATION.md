# Register interest (Letter of Interest) configuration

`/register` is the only place a visitor can create a Letter of Interest (LOI). `/contact` is an email-only page: general questions, collaboration and investment enquiries never create an LOI. `/nff` links to `/register?source=nff2026`.

## Behaviour

- One workspace: the form on the left, the letter beside it at all times. The letter is built live from the answers and marked "Draft — not confirmed" until the visitor confirms. On wide screens only part of the A4 page shows; it slides fully into view on hover or keyboard focus. On phones a toggle switches between the answers and the letter.
- The single, initially unchecked confirmation currently includes confidential investor/grant-provider sharing. The server requires both confirmed and sharing flags. The consent/conditionality assessment remains open; see `PRIVACY_REVIEW.md`. Historical permissions are not upgraded.
- Submitting saves the letter with status `CONFIRMED` (the visitor's own confirmation). **Email addresses are not verified**: there is no verification email, receipt email or server-generated PDF delivery. The success screen says so and offers the browser's print/save-as-PDF.
- The phone number is an optional contact detail (7–15 digits, `+`, spaces and `-().` allowed). Like the email it is stored on the record only: it is never printed in the letter, and the investor export omits it. The column is nullable: letters without a phone number store null.
- Unknown answers stay unknown. Quantity, budget and reach are optional and never defaulted.

## Code

- `apps/web/src/lib/loi/schema.ts`: allowlists, limits, normalisation and validation. Used by the browser and the server.
- `apps/web/src/lib/loi/letter.ts`: `buildLetter()`, the deterministic template. The preview and the stored snapshot both come from it; the server rebuilds the letter from validated data and ignores any letter text the browser sends. Template, confirmation and sharing wording carry version strings (`TEMPLATE_VERSION` etc.); change the wording only together with a new version.
- `apps/web/src/lib/loi/handler.ts`: the `/api/register/` handler (same-origin check, JSON only, 48 KiB cap, rate limit, honeypot `website`, validation, insert). `apps/web/src/lib/http.ts` holds the shared rate limiter and request helpers.
- `apps/web/src/components/RegisterFlow.tsx`, `RegisterFields.tsx`, `LetterPreview.tsx`: the UI. `LetterPreview` renders text only and is also used on the admin detail page.
- `packages/db/src/loi.ts`: database access.

## Database

Table `LetterOfInterest` (one row per letter version; the confirmed letter is stored as an immutable JSON snapshot with its template version) and `LetterOfInterestEvent` (audit trail: created, sharing changed, withdrawn, exported, follow-up). The verification columns were intentionally left out.

Migrations: `packages/db/prisma/migrations/` holds a single baseline migration. Apply future changes with `pnpm --filter @aurora/db db:migrate` from a development machine; the runtime image does not contain the Prisma CLI.

## Admin

`/admin` (aggregate counts), `/admin/loi/` (filter and list), `/admin/loi/<id>/` (the exact confirmed letter, record, follow-up, sharing and withdrawal changes, history) and `/admin/loi/export/?scope=internal|investor` (CSV). The investor scope only includes confirmed letters with sharing permitted and never includes the email address or phone number. Exports are recorded in each letter's history.

## Before production

1. Finalise the rewritten privacy notice using the factual decisions and operational/legal review in `PRIVACY_REVIEW.md`. It now covers the LOI flow but is explicitly unfinished pending those facts.
2. Have the confirmation and sharing wording reviewed before launch.
3. Decide whether email verification and PDF output are needed later; the record deliberately does not claim either.
4. Keep personal form content out of analytics, logs and URLs (the handler logs only an error class name).

Never store credentials in a `PUBLIC_` variable. Security headers: static ones are set in `apps/web/next.config.mjs`; the Content-Security-Policy is set per request by `apps/web/src/proxy.ts`. `/register` is prerendered, so its inline scripts are allowed by hash (`dist/csp-hashes.json`).
