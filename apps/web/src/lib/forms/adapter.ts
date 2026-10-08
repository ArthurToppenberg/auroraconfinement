import type { InterestSubmission } from './validation';

export interface SubmissionResult {
  ok: boolean;
  message: string;
}

export interface SubmissionAdapter {
  submit(submission: InterestSubmission): Promise<SubmissionResult>;
}

export const submissionAdapter: SubmissionAdapter = {
  async submit(_submission) {
    // TODO: Replace this boundary with the approved production form endpoint.
    // Return ok: true only after that endpoint confirms successful delivery.
    return {
      ok: false,
      message:
        'We could not send your enquiry. Please try again later or email contact@auroraconfinement.com.',
    };
  },
};
