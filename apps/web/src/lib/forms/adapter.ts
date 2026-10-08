import { formEndpoints, formKeyFor } from './validation';
import type { FieldErrors, InterestSubmission } from './validation';

export interface SubmissionResult {
  ok: boolean;
  message: string;
  /** Server-side validation errors, keyed like the form fields. */
  errors?: FieldErrors;
}

export interface SubmissionAdapter {
  submit(submission: InterestSubmission): Promise<SubmissionResult>;
}

const failure =
  'We could not send your enquiry. Please try again later or email contact@auroraconfinement.com.';

export const submissionAdapter: SubmissionAdapter = {
  async submit(submission) {
    const form = formKeyFor(submission);
    if (!form) return { ok: false, message: failure };

    // The server re-normalises and re-validates everything sent here.
    const body = new URLSearchParams();
    for (const [key, value] of Object.entries(submission)) body.set(key, value);

    let response: Response;
    try {
      response = await fetch(formEndpoints[form], {
        method: 'POST',
        body,
        credentials: 'same-origin',
        cache: 'no-store',
      });
    } catch {
      return { ok: false, message: failure };
    }

    const result = (await response.json().catch(() => null)) as
      | (Partial<SubmissionResult> & { message?: unknown })
      | null;
    // ok: true only when the endpoint confirms the submission was stored.
    if (response.ok && result?.ok === true)
      return {
        ok: true,
        message: typeof result.message === 'string' ? result.message : '',
      };
    return {
      ok: false,
      message:
        typeof result?.message === 'string' && result.message
          ? result.message
          : failure,
      ...(result?.errors && { errors: result.errors }),
    };
  },
};
