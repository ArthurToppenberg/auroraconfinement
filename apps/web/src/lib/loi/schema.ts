// Shared by the /register form (browser) and the /api/register endpoint (server).
// Pure TypeScript: no Next.js or database imports, so it is unit-testable directly.
// The server re-normalises and re-validates everything the browser sends.

export const capacities = ['personal', 'team', 'institution'] as const;
export type Capacity = (typeof capacities)[number];

export const procurementRoles = [
  'potential-user',
  'technical-evaluator',
  'recommender',
  'budget-holder',
  'procurement',
  'other',
] as const;
export type ProcurementRole = (typeof procurementRoles)[number];

export const products = [
  'exhibition-model',
  'research-platform',
  'both',
] as const;
export type Product = (typeof products)[number];

/** A product the registrant describes. "both" produces one section for each. */
export const sectionKeys = ['exhibition-model', 'research-platform'] as const;
export type SectionKey = (typeof sectionKeys)[number];

export const interestTypes = [
  'demonstration',
  'pilot-evaluation',
  'rental-event-use',
  'potential-purchase',
  'research-collaboration',
  'exploratory',
] as const;
export type InterestType = (typeof interestTypes)[number];

export const primaryUses = [
  'university-teaching',
  'museum-science-centre',
  'industry-outreach',
  'policy-fusion-event',
  'research',
  'other',
] as const;
export type PrimaryUse = (typeof primaryUses)[number];

export const timings = [
  'when-available',
  'within-12-months',
  'one-to-three-years',
  'longer-term',
  'not-yet-known',
] as const;
export type Timing = (typeof timings)[number];

export const budgetStatuses = [
  'available',
  'requires-internal-approval',
  'external-funding-needed',
  'not-explored',
  'prefer-not-to-say',
] as const;
export type BudgetStatus = (typeof budgetStatuses)[number];

export const budgetBases = [
  'per-unit',
  'pilot',
  'rental-period',
  'total-project',
] as const;
export type BudgetBasis = (typeof budgetBases)[number];

export const currencies = ['DKK', 'EUR', 'USD', 'GBP', 'SEK', 'NOK'] as const;
export type Currency = (typeof currencies)[number];

export const reachPeriods = ['per-year', 'per-event', 'in-total'] as const;
export type ReachPeriod = (typeof reachPeriods)[number];

export const conditionChoices = [
  'performance',
  'safety-documentation',
  'price',
  'funding',
  'institutional-approvals',
  'infrastructure',
  'support',
  'procurement',
  'other',
] as const;
export type ConditionChoice = (typeof conditionChoices)[number];

export const sources = ['register', 'nff2026'] as const;
export type Source = (typeof sources)[number];

/** Human-readable labels, used by the form, the letter and the admin pages. */
export const labels = {
  capacity: {
    personal:
      'I am expressing my personal professional interest, with my affiliation provided for context.',
    team: 'I am expressing interest on behalf of my team or department and am authorised to make this statement.',
    institution:
      'I am authorised to express interest on behalf of my institution or organisation.',
  },
  procurementRole: {
    'potential-user': 'Potential user',
    'technical-evaluator': 'Technical evaluator',
    recommender: 'Recommender',
    'budget-holder': 'Budget holder',
    procurement: 'Procurement',
    other: 'Other',
  },
  product: {
    'exhibition-model': 'Exhibition model',
    'research-platform': 'Research platform',
    both: 'Exhibition model and research platform',
  },
  interestType: {
    demonstration: 'demonstration',
    'pilot-evaluation': 'pilot or evaluation',
    'rental-event-use': 'rental or event use',
    'potential-purchase': 'potential purchase',
    'research-collaboration': 'research collaboration',
    exploratory: 'exploratory discussion',
  },
  primaryUse: {
    'university-teaching': 'University teaching',
    'museum-science-centre': 'Museum or science centre',
    'industry-outreach': 'Industry outreach',
    'policy-fusion-event': 'Policy or fusion event',
    research: 'Research',
    other: 'Other',
  },
  timing: {
    'when-available': 'When available',
    'within-12-months': 'Within 12 months',
    'one-to-three-years': '1–3 years',
    'longer-term': 'Longer term',
    'not-yet-known': 'Not yet known',
  },
  budgetStatus: {
    available: 'Budget available',
    'requires-internal-approval': 'Requires internal approval',
    'external-funding-needed': 'External funding needed',
    'not-explored': 'Not yet explored',
    'prefer-not-to-say': 'Prefer not to say',
  },
  budgetBasis: {
    'per-unit': 'per unit',
    pilot: 'for a pilot',
    'rental-period': 'per rental period',
    'total-project': 'for the total project',
  },
  reachPeriod: {
    'per-year': 'per year',
    'per-event': 'per event',
    'in-total': 'in total',
  },
  condition: {
    performance: 'Performance',
    'safety-documentation': 'Safety documentation',
    price: 'Price',
    funding: 'Funding',
    'institutional-approvals': 'Institutional approvals',
    infrastructure: 'Infrastructure',
    support: 'Support',
    procurement: 'Procurement',
    other: 'Other',
  },
} as const;

/** Short optional prompts per product. Detailed specifications come in follow-up. */
export const productQuestions: Record<
  SectionKey,
  readonly { key: string; label: string }[]
> = {
  'exhibition-model': [
    { key: 'portability', label: 'Portability' },
    { key: 'setting', label: 'Intended setting' },
    { key: 'operator', label: 'Who would operate it' },
    {
      key: 'frequency',
      label: 'Expected demonstration frequency or duration',
    },
    { key: 'teachingMaterials', label: 'Teaching materials' },
    { key: 'installationSupport', label: 'Installation or support needs' },
  ],
  'research-platform': [
    { key: 'researchQuestion', label: 'Research question' },
    { key: 'diagnostics', label: 'Essential diagnostics or measurements' },
    { key: 'infrastructure', label: 'Available infrastructure' },
    { key: 'accessModel', label: 'Desired collaboration or access model' },
    { key: 'technicalRequirements', label: 'Key technical requirements' },
  ],
};

export const limits = {
  fullName: 100,
  email: 254,
  phone: 30,
  role: 120,
  organisation: 160,
  department: 160,
  country: 80,
  application: 600,
  usefulness: 600,
  preferredDate: 120,
  quantity: 12,
  unit: 60,
  budgetAmount: 60,
  conditionsNote: 600,
  specific: 300,
} as const;

/** Everything the registrant answers for one product. Empty string = unknown. */
export interface ProductSection {
  primaryUse: PrimaryUse | '';
  application: string;
  usefulness: string;
  timing: Timing | '';
  preferredDate: string;
  quantity: string;
  quantityUnit: string;
  reach: string;
  reachUnit: string;
  reachPeriod: ReachPeriod | '';
  budgetStatus: BudgetStatus | '';
  budgetAmount: string;
  currency: Currency | '';
  budgetBasis: BudgetBasis | '';
  conditions: ConditionChoice[];
  conditionsNote: string;
  specific: Record<string, string>;
}

export interface LoiForm {
  fullName: string;
  email: string;
  /** Contact detail for follow-up. Never part of the letter. */
  phone: string;
  role: string;
  organisation: string;
  department: string;
  country: string;
  capacity: Capacity | '';
  procurementRole: ProcurementRole | '';
  product: Product | '';
  interestTypes: InterestType[];
  sections: Record<SectionKey, ProductSection>;
  /** Explicit confidential-sharing permission. Required for new LOIs; never defaulted. */
  sharing: boolean;
  /** The required confirmation statement. */
  confirmed: boolean;
  source: Source;
  /** Honeypot: must stay empty. Never stored. */
  website: string;
}

/** Field-level errors. Section fields use "<section>.<field>", e.g. "research-platform.application". */
export type FieldErrors = Record<string, string>;

export const emptySection = (): ProductSection => ({
  primaryUse: '',
  application: '',
  usefulness: '',
  timing: '',
  preferredDate: '',
  quantity: '',
  quantityUnit: '',
  reach: '',
  reachUnit: '',
  reachPeriod: '',
  budgetStatus: '',
  budgetAmount: '',
  currency: '',
  budgetBasis: '',
  conditions: [],
  conditionsNote: '',
  specific: {},
});

export const emptyForm = (): LoiForm => ({
  fullName: '',
  email: '',
  phone: '',
  role: '',
  organisation: '',
  department: '',
  country: '',
  capacity: '',
  procurementRole: '',
  product: '',
  interestTypes: [],
  sections: {
    'exhibition-model': emptySection(),
    'research-platform': emptySection(),
  },
  sharing: false,
  confirmed: false,
  source: 'register',
  website: '',
});

/** The sections the letter covers for a given product choice. */
export function activeSections(product: Product | ''): SectionKey[] {
  if (product === 'both') return [...sectionKeys];
  if (product === 'exhibition-model' || product === 'research-platform')
    return [product];
  return [];
}

// ---------------------------------------------------------------- normalise

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Single-line text: trimmed, all whitespace collapsed. */
function line(value: unknown): string {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

/** Free text: trimmed, wording preserved, at most one blank line in a row. */
function paragraph(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function choice<T extends readonly string[]>(
  value: unknown,
  allowlist: T,
): T[number] | '' {
  const text = line(value);
  return (allowlist as readonly string[]).includes(text) ? text : '';
}

function choices<T extends readonly string[]>(
  value: unknown,
  allowlist: T,
): T[number][] {
  if (!Array.isArray(value)) return [];
  const picked = new Set<string>();
  for (const item of value) {
    const text = line(item);
    if ((allowlist as readonly string[]).includes(text)) picked.add(text);
  }
  // Keep the allowlist order so the stored value and the letter are deterministic.
  return allowlist.filter((item) => picked.has(item));
}

function normaliseSection(raw: unknown, key: SectionKey): ProductSection {
  const input = isRecord(raw) ? raw : {};
  const specificInput = isRecord(input['specific']) ? input['specific'] : {};
  const specific: Record<string, string> = {};
  for (const { key: name } of productQuestions[key]) {
    const answer = paragraph(specificInput[name]);
    if (answer) specific[name] = answer;
  }
  return {
    primaryUse: choice(input['primaryUse'], primaryUses),
    application: paragraph(input['application']),
    usefulness: paragraph(input['usefulness']),
    timing: choice(input['timing'], timings),
    preferredDate: line(input['preferredDate']),
    quantity: line(input['quantity']),
    quantityUnit: line(input['quantityUnit']),
    reach: line(input['reach']),
    reachUnit: line(input['reachUnit']),
    reachPeriod: choice(input['reachPeriod'], reachPeriods),
    budgetStatus: choice(input['budgetStatus'], budgetStatuses),
    budgetAmount: line(input['budgetAmount']),
    currency: choice(input['currency'], currencies),
    budgetBasis: choice(input['budgetBasis'], budgetBases),
    conditions: choices(input['conditions'], conditionChoices),
    conditionsNote: paragraph(input['conditionsNote']),
    specific,
  };
}

/** Turns untrusted input (parsed JSON) into a well-typed form. Never throws. */
export function normaliseForm(raw: unknown): LoiForm {
  const input = isRecord(raw) ? raw : {};
  const sectionsInput = isRecord(input['sections']) ? input['sections'] : {};
  const product = choice(input['product'], products);
  const wanted = activeSections(product);
  const sections = {
    'exhibition-model': wanted.includes('exhibition-model')
      ? normaliseSection(sectionsInput['exhibition-model'], 'exhibition-model')
      : emptySection(),
    'research-platform': wanted.includes('research-platform')
      ? normaliseSection(
          sectionsInput['research-platform'],
          'research-platform',
        )
      : emptySection(),
  };
  const source = line(input['source']);
  return {
    fullName: line(input['fullName']),
    email: line(input['email']).toLowerCase(),
    phone: line(input['phone']),
    role: line(input['role']),
    organisation: line(input['organisation']),
    department: line(input['department']),
    country: line(input['country']),
    capacity: choice(input['capacity'], capacities),
    procurementRole: choice(input['procurementRole'], procurementRoles),
    product,
    interestTypes: choices(input['interestTypes'], interestTypes),
    sections,
    sharing: input['sharing'] === true,
    confirmed: input['confirmed'] === true,
    source: source === 'nff2026' ? 'nff2026' : 'register',
    website: line(input['website']),
  };
}

/** A filled honeypot means a bot: answer as if it worked and store nothing. */
export const isSpam = (form: LoiForm): boolean => form.website !== '';

// ----------------------------------------------------------------- validate

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Digits plus the usual separators; 7–15 digits (E.164 maximum). */
const phonePattern = /^\+?[\d\s().-]+$/;
const positiveNumber = /^\d{1,9}(\.\d{1,3})?$/;

const tooLong = (max: number) => `Use ${max} characters or fewer.`;

/**
 * Validates the details step only (no confirmation needed). The review step is
 * reached when this returns no errors.
 */
export function validateDetails(form: LoiForm): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.fullName) errors['fullName'] = 'Enter your full name.';
  else if (form.fullName.length > limits.fullName)
    errors['fullName'] = tooLong(limits.fullName);

  if (!form.email) errors['email'] = 'Enter your work email address.';
  else if (form.email.length > limits.email || !emailPattern.test(form.email))
    errors['email'] = 'Enter a valid email address.';

  // Optional: only validated when given.
  if (form.phone) {
    const digits = form.phone.replace(/\D/g, '').length;
    if (
      form.phone.length > limits.phone ||
      !phonePattern.test(form.phone) ||
      digits < 7 ||
      digits > 15
    )
      errors['phone'] =
        'Enter a valid phone number, including the country code if abroad.';
  }

  if (!form.role) errors['role'] = 'Enter your job title or role.';
  else if (form.role.length > limits.role)
    errors['role'] = tooLong(limits.role);

  if (!form.organisation)
    errors['organisation'] = 'Enter your organisation or institution.';
  else if (form.organisation.length > limits.organisation)
    errors['organisation'] = tooLong(limits.organisation);

  if (form.department.length > limits.department)
    errors['department'] = tooLong(limits.department);

  if (!form.country) errors['country'] = 'Enter a country.';
  else if (form.country.length > limits.country)
    errors['country'] = tooLong(limits.country);

  if (!form.capacity)
    errors['capacity'] = 'Choose the capacity in which you are writing.';

  if (!form.product) errors['product'] = 'Choose a product.';

  if (form.interestTypes.length === 0)
    errors['interestTypes'] = 'Choose at least one type of interest.';

  for (const key of activeSections(form.product)) {
    const section = form.sections[key];
    const err = (field: string, message: string) => {
      errors[`${key}.${field}`] = message;
    };

    if (!section.primaryUse) err('primaryUse', 'Choose a primary use.');

    if (!section.application)
      err('application', 'Describe what you would use it for.');
    else if (section.application.length > limits.application)
      err('application', tooLong(limits.application));

    if (section.usefulness.length > limits.usefulness)
      err('usefulness', tooLong(limits.usefulness));

    if (!section.timing) err('timing', 'Choose your indicative timing.');
    if (section.preferredDate.length > limits.preferredDate)
      err('preferredDate', tooLong(limits.preferredDate));

    // Quantity and reach are optional. When given they need a number and a unit;
    // nothing is ever defaulted (no "1").
    if (section.quantity) {
      if (
        !positiveNumber.test(section.quantity) ||
        Number(section.quantity) <= 0
      )
        err('quantity', 'Enter a number greater than zero, or leave blank.');
      else if (!section.quantityUnit)
        err(
          'quantityUnit',
          'Add a unit, for example "models" or "installations".',
        );
    } else if (section.quantityUnit) {
      err('quantity', 'Enter a quantity, or clear the unit.');
    }
    if (section.quantityUnit.length > limits.unit)
      err('quantityUnit', tooLong(limits.unit));

    if (section.reach) {
      if (!positiveNumber.test(section.reach) || Number(section.reach) <= 0)
        err('reach', 'Enter a number greater than zero, or leave blank.');
      else if (!section.reachUnit)
        err('reachUnit', 'Add a unit, for example "students" or "visitors".');
      else if (!section.reachPeriod) err('reachPeriod', 'Choose a period.');
    } else if (section.reachUnit || section.reachPeriod) {
      err('reach', 'Enter a number, or clear the unit and period.');
    }
    if (section.reachUnit.length > limits.unit)
      err('reachUnit', tooLong(limits.unit));

    if (section.budgetAmount) {
      if (
        section.budgetAmount.length > limits.budgetAmount ||
        !/\d/.test(section.budgetAmount)
      )
        err(
          'budgetAmount',
          'Enter an amount or range, for example 40,000–60,000.',
        );
      else if (!section.currency) err('currency', 'Choose a currency.');
      else if (!section.budgetBasis)
        err('budgetBasis', 'Choose what it covers.');
    } else if (section.currency || section.budgetBasis) {
      err('budgetAmount', 'Enter an amount, or clear the currency and basis.');
    }

    if (section.conditionsNote.length > limits.conditionsNote)
      err('conditionsNote', tooLong(limits.conditionsNote));

    for (const [name, answer] of Object.entries(section.specific))
      if (answer.length > limits.specific)
        err(`specific.${name}`, tooLong(limits.specific));
  }

  return errors;
}

/** Full validation for submission: the details plus the confirmation statement. */
export function validateSubmission(form: LoiForm): FieldErrors {
  const errors = validateDetails(form);
  if (!form.confirmed || !form.sharing)
    errors['confirmed'] =
      'Confirm the letter and confidential sharing to submit this LOI, or contact us for a private enquiry.';
  return errors;
}

/** Lower-cased, whitespace-collapsed organisation name, used only for deduplication. */
export const organisationKey = (organisation: string): string =>
  organisation.toLowerCase().replace(/\s+/g, ' ').trim();
