export const interestAreas = [
  'exhibition-model',
  'research-platform',
  'both-product-directions',
  'pilot-demonstration',
  'research-collaboration',
  'investment-partnership',
  'general-enquiry',
] as const;

export type InterestArea = (typeof interestAreas)[number];

/** The "Area of interest" options on /nff. */
export const nffInterestAreas = [
  'exhibition-model',
  'research-platform',
  'pilot-demonstration',
  'research-collaboration',
  'investment-partnership',
] as const satisfies readonly InterestArea[];

export const submissionTypes = [
  'product-interest',
  'collaboration',
  'general-enquiry',
] as const;

export type SubmissionType = (typeof submissionTypes)[number];

export const interestTimeframes = [
  'as-soon-as-available',
  'within-12-months',
  'within-1-to-3-years',
  'exploring-future',
] as const;

export type InterestTimeframe = (typeof interestTimeframes)[number];

export interface InterestSubmission {
  submissionType: SubmissionType | '';
  name: string;
  email: string;
  organisation: string;
  role: string;
  interest: InterestArea | '';
  intendedApplication: string;
  timeframe: InterestTimeframe | '';
  message: string;
  source: 'contact' | 'nordic-fusion-forum-2026';
  website: string;
}

export type FieldErrors = Partial<Record<keyof InterestSubmission, string>>;

const limits = {
  name: 100,
  email: 254,
  organisation: 160,
  role: 120,
  intendedApplication: 600,
  message: 1500,
} as const;

function clean(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

function allowed<T extends readonly string[]>(
  value: string,
  choices: T,
): value is T[number] {
  return choices.includes(value as T[number]);
}

export function normaliseSubmission(formData: FormData): InterestSubmission {
  const submissionType = clean(formData.get('submissionType'));
  const interest = clean(formData.get('interest'));
  const timeframe = clean(formData.get('timeframe'));
  const source = clean(formData.get('source'));

  return {
    submissionType: allowed(submissionType, submissionTypes)
      ? submissionType
      : '',
    name: clean(formData.get('name')),
    email: clean(formData.get('email')).toLowerCase(),
    organisation: clean(formData.get('organisation')),
    role: clean(formData.get('role')),
    interest: allowed(interest, interestAreas) ? interest : '',
    intendedApplication: clean(formData.get('intendedApplication')),
    timeframe: allowed(timeframe, interestTimeframes) ? timeframe : '',
    message: clean(formData.get('message')),
    source:
      source === 'nordic-fusion-forum-2026'
        ? 'nordic-fusion-forum-2026'
        : 'contact',
    website: clean(formData.get('website')),
  };
}

export function validateSubmission(data: InterestSubmission): FieldErrors {
  const errors: FieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name) errors.name = 'Enter your name.';
  else if (data.name.length > limits.name)
    errors.name = `Use ${limits.name} characters or fewer.`;

  if (!data.email) errors.email = 'Enter a work email address.';
  else if (data.email.length > limits.email || !emailPattern.test(data.email))
    errors.email = 'Enter a valid email address.';

  if (data.organisation.length > limits.organisation)
    errors.organisation = `Use ${limits.organisation} characters or fewer.`;
  if (data.role.length > limits.role)
    errors.role = `Use ${limits.role} characters or fewer.`;
  if (!data.submissionType)
    errors.submissionType = 'Choose what you would like to do.';
  if (!data.interest) errors.interest = 'Choose an area of interest.';
  if (data.intendedApplication.length > limits.intendedApplication)
    errors.intendedApplication = `Use ${limits.intendedApplication} characters or fewer.`;
  if (data.message.length > limits.message)
    errors.message = `Use ${limits.message} characters or fewer.`;

  if (data.source === 'nordic-fusion-forum-2026') {
    if (!data.organisation) errors.organisation = 'Enter your organisation.';
    if (!data.role) errors.role = 'Enter your role.';
    if (!data.intendedApplication)
      errors.intendedApplication = 'Describe the intended application.';
    if (!data.timeframe) errors.timeframe = 'Choose an approximate timeframe.';
    if (data.interest && !allowed(data.interest, nffInterestAreas))
      errors.interest = 'Choose an area of interest.';
  } else if (data.submissionType === 'product-interest') {
    if (!data.organisation) errors.organisation = 'Enter your organisation.';
    if (!data.role) errors.role = 'Enter your role.';
    if (
      ![
        'exhibition-model',
        'research-platform',
        'both-product-directions',
      ].includes(data.interest)
    ) {
      errors.interest = 'Choose a product of interest.';
    }
    if (!data.intendedApplication)
      errors.intendedApplication = 'Describe the intended application.';
    if (!data.timeframe) errors.timeframe = 'Choose an approximate timeframe.';
  } else if (data.submissionType === 'collaboration') {
    if (
      !['research-collaboration', 'investment-partnership'].includes(
        data.interest,
      )
    ) {
      errors.interest = 'Choose a collaboration area.';
    }
    if (!data.message)
      errors.message = 'Tell us briefly what you would like to discuss.';
  } else if (data.submissionType === 'general-enquiry') {
    if (data.interest !== 'general-enquiry')
      errors.interest = 'Choose a general enquiry.';
    if (!data.message)
      errors.message = 'Tell us briefly what you would like to discuss.';
  }

  return errors;
}

export function isSpam(data: InterestSubmission): boolean {
  return data.website.length > 0;
}

/** One endpoint per form: /api/forms/<key>/ (keys match the database tables). */
export const formEndpoints = {
  'contact-product-interest': '/api/forms/contact-product-interest/',
  'contact-collaboration': '/api/forms/contact-collaboration/',
  'contact-general-enquiry': '/api/forms/contact-general-enquiry/',
  'nff-interest': '/api/forms/nff-interest/',
} as const;

export type FormKey = keyof typeof formEndpoints;

export function formKeyFor(data: InterestSubmission): FormKey | null {
  if (data.source === 'nordic-fusion-forum-2026') return 'nff-interest';
  switch (data.submissionType) {
    case 'product-interest':
      return 'contact-product-interest';
    case 'collaboration':
      return 'contact-collaboration';
    case 'general-enquiry':
      return 'contact-general-enquiry';
    default:
      return null;
  }
}
