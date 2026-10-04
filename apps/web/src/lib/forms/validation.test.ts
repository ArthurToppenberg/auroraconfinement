import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  isSpam,
  normaliseSubmission,
  validateSubmission,
} from './validation.ts';

function validFormData() {
  const data = new FormData();
  data.set('submissionType', 'product-interest');
  data.set('name', '  Ada   Researcher ');
  data.set('email', ' ADA@EXAMPLE.ORG ');
  data.set('organisation', ' Example University ');
  data.set('role', ' Laboratory Director ');
  data.set('interest', 'research-collaboration');
  data.set('intendedApplication', ' Hands-on stellarator experiments. ');
  data.set('timeframe', 'within-1-to-3-years');
  data.set('message', '');
  data.set('source', 'nordic-fusion-forum-2026');
  data.set('website', '');
  return data;
}

describe('interest-form validation', () => {
  it('normalises a valid submission', () => {
    const result = normaliseSubmission(validFormData());
    assert.equal(result.name, 'Ada Researcher');
    assert.equal(result.email, 'ada@example.org');
    assert.equal(result.role, 'Laboratory Director');
    assert.equal(result.submissionType, 'product-interest');
    assert.equal(result.source, 'nordic-fusion-forum-2026');
    assert.deepEqual(validateSubmission(result), {});
  });

  it('rejects missing required fields and non-allowlisted choices', () => {
    const form = new FormData();
    form.set('interest', 'buy-now');
    const errors = validateSubmission(normaliseSubmission(form));
    assert.ok(errors.name);
    assert.ok(errors.email);
    assert.ok(errors.submissionType);
    assert.ok(errors.interest);
  });

  it('requires institutional context for Nordic Fusion Forum submissions', () => {
    const form = new FormData();
    form.set('submissionType', 'product-interest');
    form.set('name', 'Ada Researcher');
    form.set('email', 'ada@example.org');
    form.set('interest', 'research-platform');
    form.set('source', 'nordic-fusion-forum-2026');
    const errors = validateSubmission(normaliseSubmission(form));
    assert.ok(errors.organisation);
    assert.ok(errors.role);
    assert.ok(errors.intendedApplication);
    assert.ok(errors.timeframe);
    assert.equal(errors.message, undefined);
  });

  it('requires product context for contact product interest', () => {
    const form = new FormData();
    form.set('submissionType', 'product-interest');
    form.set('name', 'Ada Researcher');
    form.set('email', 'ada@example.org');
    form.set('interest', 'exhibition-model');
    form.set('source', 'contact');
    const errors = validateSubmission(normaliseSubmission(form));
    assert.ok(errors.organisation);
    assert.ok(errors.role);
    assert.ok(errors.intendedApplication);
    assert.ok(errors.timeframe);
    assert.equal(errors.message, undefined);
  });

  it('keeps general enquiries separate from registered product interest', () => {
    const form = new FormData();
    form.set('submissionType', 'general-enquiry');
    form.set('name', 'Ada Researcher');
    form.set('email', 'ada@example.org');
    form.set('interest', 'general-enquiry');
    form.set('message', 'I have a question about the initiative.');
    form.set('source', 'contact');
    const result = normaliseSubmission(form);
    assert.equal(result.submissionType, 'general-enquiry');
    assert.deepEqual(validateSubmission(result), {});
  });

  it('detects a completed honeypot field', () => {
    const form = validFormData();
    form.set('website', 'https://spam.example');
    assert.equal(isSpam(normaliseSubmission(form)), true);
  });
});
