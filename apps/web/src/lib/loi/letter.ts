// Deterministic Letter of Interest template. The /register preview and the snapshot
// stored by the server both come from buildLetter(), so what the registrant reviews
// is what is saved. Answers are quoted as written and never rewritten.
import { activeSections, labels, productQuestions } from './schema.ts';
import type { LoiForm, ProductSection, SectionKey } from './schema.ts';

export const TEMPLATE_VERSION = 'loi-2026-11-a';
export const CONFIRMATION_WORDING_VERSION = 'confirm-2026-11-a';
export const SHARING_WORDING_VERSION = 'sharing-2026-11-a';

export const confirmationStatement =
  'I confirm that this letter accurately reflects my interest and my stated capacity to make this statement. I understand that it is non-binding and creates no obligation to purchase, pay, supply or participate.';

export const sharingStatement =
  "Aurora Confinement may share this letter, including my name, role, organisation and stated interest, confidentially with prospective investors and grant providers for fundraising and due diligence. My email address will be omitted from shared copies. This does not permit public publication or use of our organisation's logo.";

const sharingNotPermitted =
  'No permission given to share identifying details. This letter is kept for Aurora Confinement’s internal purposes only, and only anonymised aggregate figures are reported externally.';

const addedOnConfirmation = 'Added on confirmation';

/** Stand-ins until the registrant confirms. The server supplies the real values. */
export interface LetterMeta {
  /**
   * Live preview while the form is incomplete: unanswered parts show bracketed
   * placeholders. The server never sets this, so stored letters have none.
   */
  preview?: boolean;
  /** ISO timestamp; omit while previewing. */
  confirmedAt?: string;
  /** Public LOI ID; omit while previewing. */
  reference?: string;
  contactEmail: string;
}

export interface LetterField {
  label: string;
  value: string;
  /** Preview only: this value is a prompt, not an answer. */
  placeholder?: boolean;
}

export interface LetterRun {
  text: string;
  strong?: boolean;
  /** Preview only: this run is a prompt, not an answer. */
  placeholder?: boolean;
}

export interface LetterSection {
  /** Shown only when the letter covers both products. */
  heading?: string;
  fields: LetterField[];
}

/** JSON-serialisable: this exact structure is stored as the immutable snapshot. */
export interface Letter {
  templateVersion: string;
  title: string;
  to: string;
  /** Text runs; `strong` runs are rendered in bold. No markup is ever parsed. */
  opening: LetterRun[];
  capacity: string;
  /** Preview only. */
  capacityPlaceholder?: boolean;
  sections: LetterSection[];
  disclaimer: string;
  confirmedBy: string;
  /** Preview only. */
  confirmedByPlaceholder?: boolean;
  details: LetterField[];
  footer: string;
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** "2026-11-06 14:03 UTC": a timestamp with its timezone. */
export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${date.toISOString().slice(0, 16).replace('T', ' ')} UTC`;
}

function sectionFields(
  key: SectionKey,
  section: ProductSection,
): LetterField[] {
  const fields: LetterField[] = [];
  const add = (label: string, value: string) => {
    if (value) fields.push({ label, value });
  };

  if (section.primaryUse)
    add('Primary use', labels.primaryUse[section.primaryUse]);
  add('Intended application', section.application);
  add('Why this would be useful', section.usefulness);

  if (section.timing) {
    const timing = labels.timing[section.timing];
    add(
      'Indicative timing',
      section.preferredDate
        ? `${timing}. Preferred date or event: ${section.preferredDate}.`
        : `${timing}. This is the registrant’s preference, not a delivery commitment by Aurora Confinement.`,
    );
  }

  const scale: string[] = [];
  if (section.quantity)
    scale.push(`Quantity: ${section.quantity} ${section.quantityUnit}`);
  if (section.reach)
    scale.push(
      `Expected reach: ${section.reach} ${section.reachUnit} ${
        section.reachPeriod ? labels.reachPeriod[section.reachPeriod] : ''
      }`.trim(),
    );
  add('Potential scale', scale.join('. '));

  const budget: string[] = [];
  if (section.budgetStatus)
    budget.push(`Status: ${labels.budgetStatus[section.budgetStatus]}`);
  if (section.budgetAmount && section.currency && section.budgetBasis)
    budget.push(
      `Indicative budget: ${section.budgetAmount} ${section.currency} ${
        labels.budgetBasis[section.budgetBasis]
      }. This is not an established Aurora price`,
    );
  add('Budget context', budget.join('. '));

  const conditions: string[] = [];
  if (section.conditions.length > 0)
    conditions.push(
      list(section.conditions.map((c) => labels.condition[c].toLowerCase())),
    );
  if (section.conditionsNote) conditions.push(section.conditionsNote);
  add('Conditions and requirements', conditions.join('. '));

  for (const { key: name, label } of productQuestions[key]) {
    const answer = section.specific[name];
    if (answer) add(label, answer);
  }
  return fields;
}

export function buildLetter(form: LoiForm, meta: LetterMeta): Letter {
  const preview = meta.preview === true;
  const keys = activeSections(form.product);
  const both = keys.length > 1;
  const productLabel = form.product ? labels.product[form.product] : '';
  const interests = list(form.interestTypes.map((t) => labels.interestType[t]));

  // A supplied value, or (preview only) a bracketed prompt in its place.
  const run = (value: string, prompt: string, strong = false): LetterRun =>
    value || !preview
      ? { text: value, ...(strong && { strong }) }
      : { text: `[${prompt}]`, placeholder: true };

  const opening: LetterRun[] = [
    { text: 'I, ' },
    run(form.fullName, 'full name', true),
    { text: ', ' },
    run(form.role, 'role', true),
    { text: ' at ' },
    run(form.organisation, 'organisation', true),
    ...(form.department ? [{ text: ` (${form.department})` }] : []),
    { text: ', express interest in exploring ' },
    run(interests, 'type of interest'),
    { text: ' relating to ' },
    run(productLabel.toLowerCase(), 'product'),
    { text: '.' },
  ];

  const sections: LetterSection[] = keys.map((key) => {
    const fields = sectionFields(key, form.sections[key]);
    if (preview) {
      const section = form.sections[key];
      const prompts: LetterField[] = [];
      if (!section.application)
        prompts.push({
          label: 'Intended application',
          value: '[Describe what you would use it for]',
          placeholder: true,
        });
      if (!section.timing)
        prompts.push({
          label: 'Indicative timing',
          value: '[Choose your indicative timing]',
          placeholder: true,
        });
      // Keep the template's order: prompts take the slot of the missing answer.
      const order = [
        'Primary use',
        'Intended application',
        'Why this would be useful',
        'Indicative timing',
      ];
      fields.push(...prompts);
      fields.sort((x, y) => {
        const ix = order.indexOf(x.label);
        const iy = order.indexOf(y.label);
        return (ix < 0 ? order.length : ix) - (iy < 0 ? order.length : iy);
      });
    }
    return {
      ...(both && { heading: labels.product[key] }),
      fields,
    };
  });
  if (preview && sections.length === 0)
    sections.push({
      fields: [
        {
          label: 'Product details',
          value: '[Choose a product to add its details]',
          placeholder: true,
        },
      ],
    });

  const details: LetterField[] = [
    {
      label: 'Confirmation date',
      value: meta.confirmedAt
        ? formatTimestamp(meta.confirmedAt)
        : addedOnConfirmation,
    },
    { label: 'Reference', value: meta.reference ?? addedOnConfirmation },
    {
      label: 'Sharing permission',
      value: form.sharing ? sharingStatement : sharingNotPermitted,
    },
  ];

  const capacityMissing = preview && !form.capacity;
  return {
    templateVersion: TEMPLATE_VERSION,
    title: `Non-binding Letter of Interest — ${productLabel || 'Aurora Confinement'}`,
    to: 'Aurora Confinement, a student-led initiative in formation (not yet an incorporated company)',
    opening,
    capacity: form.capacity
      ? labels.capacity[form.capacity]
      : capacityMissing
        ? '[Choose the capacity in which you are writing]'
        : '',
    ...(capacityMissing && { capacityPlaceholder: true }),
    sections,
    disclaimer:
      'I understand that the product is in development and that final specifications, pricing and availability have not been established. This letter records non-binding interest only. It is not an order, reservation, purchase agreement, funding commitment or institutional endorsement, and creates no obligation to purchase, pay, supply or participate. Any future participation would require separate discussion and any necessary approvals and agreements.',
    confirmedBy: form.fullName || (preview ? '[Full name]' : ''),
    ...(preview && !form.fullName && { confirmedByPlaceholder: true }),
    details,
    footer: `Aurora Confinement · ${meta.contactEmail} · Template ${TEMPLATE_VERSION}`,
  };
}

/** The letter as plain text, for CSV export. Quotes the registrant's wording as written. */
export function letterToPlainText(letter: Letter): string {
  const lines = [
    letter.title,
    `To: ${letter.to}`,
    letter.opening.map((run) => run.text).join(''),
    `Capacity: ${letter.capacity}`,
  ];
  for (const section of letter.sections) {
    if (section.heading) lines.push('', section.heading);
    for (const field of section.fields)
      lines.push(`${field.label}: ${field.value}`);
  }
  lines.push('', letter.disclaimer, `Confirmed by: ${letter.confirmedBy}`);
  for (const field of letter.details)
    lines.push(`${field.label}: ${field.value}`);
  return lines.join('\n');
}
