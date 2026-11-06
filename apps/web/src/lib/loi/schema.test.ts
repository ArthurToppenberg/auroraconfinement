import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validForm } from './fixtures.ts';
import {
  isSpam,
  normaliseForm,
  validateDetails,
  validateSubmission,
} from './schema.ts';

describe('normaliseForm', () => {
  it('trims, lower-cases the email and keeps allowlisted choices only', () => {
    const form = normaliseForm({
      ...validForm(),
      fullName: '  Ada   Researcher ',
      email: ' ADA@EXAMPLE.ORG ',
      capacity: 'owner',
      interestTypes: ['demonstration', 'hack', 'demonstration'],
    });
    assert.equal(form.fullName, 'Ada Researcher');
    assert.equal(form.email, 'ada@example.org');
    assert.equal(form.capacity, '');
    assert.deepEqual(form.interestTypes, ['demonstration']);
  });

  it('never throws on junk and defaults nothing', () => {
    for (const junk of [null, 5, 'x', [], { sections: 'no' }]) {
      const form = normaliseForm(junk);
      assert.equal(form.sections['exhibition-model'].quantity, '');
      assert.equal(form.confirmed, false);
    }
  });

  it('drops the section of a product that was not chosen', () => {
    const form = normaliseForm({
      ...validForm(),
      sections: {
        'exhibition-model': validForm().sections['exhibition-model'],
        'research-platform': { application: 'should be dropped' },
      },
    });
    assert.equal(form.sections['research-platform'].application, '');
  });

  it('preserves paragraph breaks in free text', () => {
    const form = normaliseForm({
      ...validForm(),
      sections: {
        'exhibition-model': {
          ...validForm().sections['exhibition-model'],
          application: 'One.\r\n\r\n\r\n\r\nTwo.',
        },
      },
    });
    assert.equal(form.sections['exhibition-model'].application, 'One.\n\nTwo.');
  });

  it('only accepts the nff2026 source value', () => {
    assert.equal(normaliseForm({ source: 'nff2026' }).source, 'nff2026');
    assert.equal(normaliseForm({ source: 'other' }).source, 'register');
  });

  it('detects a filled honeypot', () => {
    assert.equal(isSpam(normaliseForm({ website: 'http://spam' })), true);
    assert.equal(isSpam(normaliseForm({})), false);
  });
});

describe('validation', () => {
  it('accepts a valid form with no quantity, reach or budget', () => {
    assert.deepEqual(validateSubmission(normaliseForm(validForm())), {});
  });

  it('requires the confirmation statement only on submission', () => {
    const form = normaliseForm({ ...validForm(), confirmed: false });
    assert.deepEqual(validateDetails(form), {});
    assert.ok(validateSubmission(form)['confirmed']);
  });

  it('flags every missing required field', () => {
    const errors = validateDetails(normaliseForm({}));
    for (const key of [
      'fullName',
      'email',
      'role',
      'organisation',
      'country',
      'capacity',
      'product',
      'interestTypes',
    ])
      assert.ok(errors[key], key);
  });

  it('validates and normalises the phone number', () => {
    const check = (phone: string) =>
      validateDetails(normaliseForm({ ...validForm(), phone }))['phone'];
    assert.equal(check('+45 12 34 56 78'), undefined);
    assert.equal(check('(020) 7946-0958'), undefined);
    assert.equal(check(''), undefined); // optional
    assert.ok(check('12345'));
    assert.ok(check('call me maybe'));
    assert.ok(check('+1234567890123456'));
    assert.equal(
      normaliseForm({ ...validForm(), phone: '  +45   12 ' }).phone,
      '+45 12',
    );
  });

  it('requires per-product answers for each product when both are chosen', () => {
    const errors = validateDetails(
      normaliseForm({ ...validForm(), product: 'both' }),
    );
    assert.ok(errors['research-platform.application']);
    assert.ok(errors['research-platform.timing']);
    assert.equal(errors['exhibition-model.application'], undefined);
  });

  it('needs a positive quantity with a unit, and never defaults one', () => {
    const base = validForm();
    const set = (patch: object) =>
      validateDetails(
        normaliseForm({
          ...base,
          sections: {
            'exhibition-model': {
              ...base.sections['exhibition-model'],
              ...patch,
            },
          },
        }),
      );
    assert.ok(
      set({ quantity: '0', quantityUnit: 'models' })[
        'exhibition-model.quantity'
      ],
    );
    assert.ok(
      set({ quantity: '-2', quantityUnit: 'models' })[
        'exhibition-model.quantity'
      ],
    );
    assert.ok(set({ quantity: '2' })['exhibition-model.quantityUnit']);
    assert.deepEqual(set({ quantity: '2', quantityUnit: 'models' }), {});
  });

  it('needs currency and basis with a budget amount', () => {
    const base = validForm();
    const errors = validateDetails(
      normaliseForm({
        ...base,
        sections: {
          'exhibition-model': {
            ...base.sections['exhibition-model'],
            budgetAmount: '40,000–60,000',
          },
        },
      }),
    );
    assert.ok(errors['exhibition-model.currency']);
  });
});
