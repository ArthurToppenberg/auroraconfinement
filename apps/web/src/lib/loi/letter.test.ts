import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validForm } from './fixtures.ts';
import { buildLetter, letterToPlainText, TEMPLATE_VERSION } from './letter.ts';
import { normaliseForm } from './schema.ts';

const meta = { contactEmail: 'contact@auroraconfinement.com' };
const text = (letter: ReturnType<typeof buildLetter>) => JSON.stringify(letter);

describe('buildLetter', () => {
  it('quotes the registrant’s wording and names the capacity as written', () => {
    const letter = buildLetter(normaliseForm(validForm()), meta);
    assert.equal(
      letter.title,
      'Non-binding Letter of Interest: Exhibition model',
    );
    assert.equal(
      letter.capacity,
      'I am expressing my personal professional interest, with my affiliation provided for context.',
    );
    assert.match(
      text(letter),
      /Teaching plasma physics to first-year students\./,
    );
    assert.equal(letter.templateVersion, TEMPLATE_VERSION);
  });

  it('shows placeholders until confirmed and real values afterwards', () => {
    const form = normaliseForm(validForm());
    const preview = buildLetter(form, meta);
    assert.equal(preview.details[0]?.value, 'Added on confirmation');
    assert.equal(preview.details[1]?.value, 'Added on confirmation');
    const final = buildLetter(form, {
      ...meta,
      reference: 'LOI-2026-ABC234',
      confirmedAt: '2026-11-06T14:03:00.000Z',
    });
    assert.equal(final.details[0]?.value, '2026-11-06 14:03 UTC');
    assert.equal(final.details[1]?.value, 'LOI-2026-ABC234');
  });

  it('is identical before and after confirmation apart from the metadata', () => {
    const form = normaliseForm(validForm());
    const a = buildLetter(form, meta);
    const b = buildLetter(form, {
      ...meta,
      reference: 'X',
      confirmedAt: '2026-11-06T14:03:00Z',
    });
    assert.deepEqual({ ...a, details: [] }, { ...b, details: [] });
    assert.equal(a.details[2]?.value, b.details[2]?.value);
  });

  it('omits quantity, reach and budget when unknown', () => {
    const letter = buildLetter(normaliseForm(validForm()), meta);
    const labels = letter.sections.flatMap((s) => s.fields.map((f) => f.label));
    assert.ok(!labels.includes('Potential scale'));
    assert.ok(!labels.includes('Budget context'));
    assert.ok(!labels.includes('Conditions and requirements'));
  });

  it('includes supplied scale, budget and conditions with their units', () => {
    const base = validForm();
    const form = normaliseForm({
      ...base,
      sections: {
        'exhibition-model': {
          ...base.sections['exhibition-model'],
          quantity: '2',
          quantityUnit: 'models',
          budgetStatus: 'requires-internal-approval',
          budgetAmount: '40,000–60,000',
          currency: 'EUR',
          budgetBasis: 'pilot',
          conditions: ['price', 'funding'],
        },
      },
    });
    const all = text(buildLetter(form, meta));
    assert.match(all, /Quantity: 2 models/);
    assert.match(all, /40,000–60,000 EUR for a pilot/);
    assert.match(all, /not an established Aurora price/);
    assert.match(all, /price and funding/);
  });

  it('writes separate headed sections for both products', () => {
    const base = validForm();
    const form = normaliseForm({
      ...base,
      product: 'both',
      sections: {
        'exhibition-model': base.sections['exhibition-model'],
        'research-platform': {
          ...base.sections['research-platform'],
          primaryUse: 'research',
          application: 'Plasma diagnostics research.',
          timing: 'one-to-three-years',
        },
      },
    });
    const letter = buildLetter(form, meta);
    assert.deepEqual(
      letter.sections.map((s) => s.heading),
      ['Exhibition model', 'Research platform'],
    );
  });

  it('never claims verification, endorsement or stronger permissions', () => {
    const letter = buildLetter(
      normaliseForm(validForm({ sharing: false })),
      meta,
    );
    assert.doesNotMatch(text(letter), /verified/i);
    assert.match(
      letter.disclaimer,
      /not an order, reservation, purchase agreement/,
    );
    assert.match(
      letter.details[2]?.value ?? '',
      /No permission given to share/,
    );
  });

  it('previews the required sharing scope conditionally before confirmation', () => {
    const form = normaliseForm(validForm({ confirmed: false, sharing: false }));
    const draft = buildLetter(form, { ...meta, preview: true });
    const scope = draft.details[2]?.value ?? '';
    assert.match(scope, /^On confirmation and submission:/);
    assert.match(
      scope,
      /confidentially with prospective investors and grant providers/,
    );
    assert.match(scope, /My email address will be omitted/);
    assert.doesNotMatch(scope, /internal purposes only/);
    const historical = buildLetter(form, meta);
    assert.match(
      historical.details[2]?.value ?? '',
      /No permission given to share/,
    );
  });

  it('records the sharing scope only when permitted', () => {
    const letter = buildLetter(
      normaliseForm({ ...validForm(), sharing: true }),
      meta,
    );
    assert.match(
      letter.details[2]?.value ?? '',
      /My email address will be omitted/,
    );
  });

  it('renders plain text for export', () => {
    const plain = letterToPlainText(
      buildLetter(normaliseForm(validForm()), meta),
    );
    assert.match(plain, /^Non-binding Letter of Interest/);
    assert.match(plain, /Confirmed by: Ada Researcher/);
  });
});
