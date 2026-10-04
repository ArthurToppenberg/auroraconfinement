# Form configuration boundary

## Current behaviour

The contact and Nordic Fusion Forum forms run in a clearly labelled local demonstration mode. They normalise and validate fields in the browser, expose errors accessibly, check a hidden honeypot field, and then report that nothing was retained or sent.

The NFF form includes the internal source value `nff2026`. The general form uses `contact`. Neither value creates a cookie or visitor identifier.

## Shared form code

- `apps/web/src/lib/forms/validation.ts` contains field limits, allowlisted values, normalisation, validation, and honeypot detection.
- `apps/web/src/lib/forms/adapter.ts` defines the provider-neutral adapter interface and the non-transmitting demonstration adapter.
- `apps/web/src/components/InterestForm.tsx` (server component) wraps the demonstration notice and email fallback, and `apps/web/src/components/InterestFormFields.tsx` (client component) provides the accessible form interface and submit handling.
- `apps/web/src/lib/forms/validation.test.ts` covers normalisation, required fields, allowlists, and honeypot detection.

## Before production

Do not remove the demonstration notice or imply delivery until all of these are complete:

1. Approve a hosting architecture and form/email delivery provider.
2. Add a same-origin server endpoint; never place provider secrets in browser code.
3. Run the shared normalisation and validation on the server even though the browser also validates.
4. Reject non-allowlisted structured choices and enforce the documented length limits.
5. Add hosting-level or endpoint-level rate limiting without stable visitor profiling.
6. Keep the honeypot and add further spam controls only if demonstrated abuse justifies them.
7. Do not log message bodies, email addresses, or unnecessary user-agent data.
8. Configure the recipient, processor terms, access controls, retention period, and deletion procedure.
9. Add clear success and failure responses and test them with keyboard and assistive technology.
10. Update the privacy notice with the confirmed controller, provider, transfers, logs, and retention facts.

No database is required for the intended initial design.
