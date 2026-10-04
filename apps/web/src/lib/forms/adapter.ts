import type { InterestSubmission } from './validation';

export interface SubmissionResult {
  ok: boolean;
  mode: 'demo' | 'configured';
  message: string;
}

export interface SubmissionAdapter {
  submit(submission: InterestSubmission): Promise<SubmissionResult>;
}

export const demonstrationAdapter: SubmissionAdapter = {
  async submit(_submission) {
    return {
      ok: false,
      mode: 'demo',
      message:
        'This form is not connected to a submission service. Your information was not retained or sent.',
    };
  },
};
