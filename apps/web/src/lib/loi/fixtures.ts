import { emptyForm } from './schema.ts';
import type { LoiForm } from './schema.ts';

/** A valid single-product form, as the browser would send it. */
export function validForm(overrides: Partial<LoiForm> = {}): LoiForm {
  const form = emptyForm();
  Object.assign(form, {
    fullName: 'Ada Researcher',
    email: 'ada@example.org',
    phone: '+45 12 34 56 78',
    role: 'Laboratory Director',
    organisation: 'Example University',
    country: 'Denmark',
    capacity: 'personal',
    product: 'exhibition-model',
    interestTypes: ['demonstration'],
    confirmed: true,
  });
  Object.assign(form.sections['exhibition-model'], {
    primaryUse: 'university-teaching',
    application: 'Teaching plasma physics to first-year students.',
    timing: 'within-12-months',
  });
  return { ...form, ...overrides };
}
