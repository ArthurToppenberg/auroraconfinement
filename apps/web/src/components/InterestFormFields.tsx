'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { submissionAdapter } from '@/lib/forms/adapter';
import {
  interestAreas,
  isSpam,
  normaliseSubmission,
  submissionTypes,
  validateSubmission,
} from '@/lib/forms/validation';
import type { FieldErrors, SubmissionType } from '@/lib/forms/validation';

interface InterestFormFieldsProps {
  variant: 'contact' | 'nff';
}

interface Status {
  state: 'success' | 'error';
  message: string;
}

const institutionalInterestSuccessMessage =
  'Thank you. We have recorded your interest and will contact you about the selected product or collaboration.';

interface FieldProps {
  prefix: string;
  name: keyof FieldErrors & string;
  label: string;
  requirement: string;
  errors: FieldErrors | null;
  wide?: boolean;
  help?: string;
  children: (props: ControlProps) => ReactNode;
}

interface ControlProps {
  id: string;
  name: string;
  'aria-describedby': string;
  'aria-invalid'?: 'true' | 'false';
}

function Field({
  prefix,
  name,
  label,
  requirement,
  errors,
  wide = false,
  help,
  children,
}: FieldProps) {
  const id = `${prefix}-${name}`;
  const message = errors?.[name] ?? '';
  const describedBy = [help ? `${id}-help` : '', `${id}-error`]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wide ? 'field field-wide' : 'field'}>
      <label htmlFor={id}>
        {label} <span>{`(${requirement})`}</span>
      </label>
      {children({
        id,
        name,
        'aria-describedby': describedBy,
        ...(errors && { 'aria-invalid': message ? 'true' : 'false' }),
      })}
      {help && (
        <p className="field-help" id={`${id}-help`}>
          {help}
        </p>
      )}
      <p className="field-error" id={`${id}-error`} data-error-for={name}>
        {message}
      </p>
    </div>
  );
}

export default function InterestFormFields({
  variant,
}: InterestFormFieldsProps) {
  const isNff = variant === 'nff';
  const source = isNff ? 'nordic-fusion-forum-2026' : 'contact';
  const prefix = isNff ? 'nff' : 'contact';

  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  const [errors, setErrors] = useState<FieldErrors | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [submissionType, setSubmissionType] =
    useState<SubmissionType>('product-interest');
  const [requestedInterest, setRequestedInterest] = useState('');

  const isProductInterest = !isNff && submissionType === 'product-interest';
  const isCollaboration = !isNff && submissionType === 'collaboration';
  const isGeneralEnquiry = !isNff && submissionType === 'general-enquiry';

  useEffect(() => {
    const requested = new URL(window.location.href).searchParams.get(
      'interest',
    );
    if (
      !requested ||
      !interestAreas.some((interest) => interest === requested)
    ) {
      return;
    }

    if (!isNff) {
      if (
        requested === 'research-collaboration' ||
        requested === 'investment-partnership'
      ) {
        setSubmissionType('collaboration');
      } else if (requested === 'general-enquiry') {
        setSubmissionType('general-enquiry');
      } else {
        setSubmissionType('product-interest');
      }
    }
    setRequestedInterest(requested);
  }, [isNff]);

  useEffect(() => {
    if (!requestedInterest) return;
    const control = formRef.current?.elements.namedItem('interest');
    if (
      control instanceof HTMLSelectElement &&
      Array.from(control.options).some(
        (option) => option.value === requestedInterest,
      )
    ) {
      control.value = requestedInterest;
    }
  }, [requestedInterest, submissionType]);

  function chooseSubmissionType(value: string) {
    if (!submissionTypes.some((type) => type === value)) return;
    setSubmissionType(value as SubmissionType);
    setRequestedInterest('');
    setErrors(null);
    setStatus(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;

    const data = normaliseSubmission(new FormData(form));
    const found = validateSubmission(data);
    setErrors(found);

    const fields = Object.keys(found) as (keyof FieldErrors)[];
    if (fields.length > 0) {
      setStatus({
        state: 'error',
        message: 'Please correct the highlighted fields.',
      });
      const firstInvalid = Array.from(
        form.querySelectorAll<HTMLElement>('[data-error-for]'),
      )
        .map((element) => element.dataset['errorFor'] as keyof FieldErrors)
        .find((field) => found[field]);
      const control = firstInvalid && form.elements.namedItem(firstInvalid);
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    if (isSpam(data)) {
      setStatus({ state: 'error', message: 'Unable to submit this enquiry.' });
      return;
    }

    submitting.current = true;
    setBusy(true);
    try {
      const result = await submissionAdapter.submit(data);
      setStatus({
        state: result.ok ? 'success' : 'error',
        message:
          result.ok && data.source === 'nordic-fusion-forum-2026'
            ? institutionalInterestSuccessMessage
            : result.message,
      });
    } catch {
      setStatus({
        state: 'error',
        message: 'Unable to submit this enquiry. Please try again later.',
      });
    } finally {
      submitting.current = false;
      setBusy(false);
      statusRef.current?.focus();
    }
  }

  const nameField = (
    <Field
      prefix={prefix}
      errors={errors}
      name="name"
      label="Name"
      requirement="required"
    >
      {(props) => (
        <input
          {...props}
          type="text"
          autoComplete="name"
          maxLength={100}
          required
        />
      )}
    </Field>
  );

  const emailField = (
    <Field
      prefix={prefix}
      errors={errors}
      name="email"
      label="Work email"
      requirement="required"
    >
      {(props) => (
        <input
          {...props}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      )}
    </Field>
  );

  const organisationField = (required: boolean) => (
    <Field
      prefix={prefix}
      errors={errors}
      name="organisation"
      label="Organisation"
      requirement={required ? 'required' : 'optional'}
    >
      {(props) => (
        <input
          {...props}
          type="text"
          autoComplete="organization"
          maxLength={160}
          required={required}
        />
      )}
    </Field>
  );

  const roleField = (required: boolean) => (
    <Field
      prefix={prefix}
      errors={errors}
      name="role"
      label="Role"
      requirement={required ? 'required' : 'optional'}
    >
      {(props) => (
        <input
          {...props}
          type="text"
          autoComplete="organization-title"
          maxLength={120}
          required={required}
        />
      )}
    </Field>
  );

  const intendedApplicationField = (
    <Field
      prefix={prefix}
      errors={errors}
      name="intendedApplication"
      label="Intended application"
      requirement="required"
      wide
      help="Briefly describe how your organisation may use the product or collaboration."
    >
      {(props) => <textarea {...props} rows={4} maxLength={600} required />}
    </Field>
  );

  const timeframeField = (
    <Field
      prefix={prefix}
      errors={errors}
      name="timeframe"
      label="Approximate timeframe"
      requirement="required"
      wide
    >
      {(props) => (
        <select {...props} required defaultValue="">
          <option value="">Choose one</option>
          <option value="as-soon-as-available">As soon as available</option>
          <option value="within-12-months">Within 12 months</option>
          <option value="within-1-to-3-years">Within 1 to 3 years</option>
          <option value="exploring-future">Exploring for the future</option>
        </select>
      )}
    </Field>
  );

  return (
    <form
      ref={formRef}
      className="interest-form"
      data-interest-form
      data-source={source}
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="source" value={source} />
      {isNff ? (
        <input type="hidden" name="submissionType" value="product-interest" />
      ) : (
        <fieldset className="submission-type">
          <legend>What would you like to do?</legend>
          <div className="submission-options">
            <label>
              <input
                type="radio"
                name="submissionType"
                value="product-interest"
                checked={submissionType === 'product-interest'}
                onChange={(event) =>
                  chooseSubmissionType(event.currentTarget.value)
                }
              />
              <span>Register product interest</span>
            </label>
            <label>
              <input
                type="radio"
                name="submissionType"
                value="collaboration"
                checked={submissionType === 'collaboration'}
                onChange={(event) =>
                  chooseSubmissionType(event.currentTarget.value)
                }
              />
              <span>Discuss a collaboration</span>
            </label>
            <label>
              <input
                type="radio"
                name="submissionType"
                value="general-enquiry"
                checked={submissionType === 'general-enquiry'}
                onChange={(event) =>
                  chooseSubmissionType(event.currentTarget.value)
                }
              />
              <span>Send a general enquiry</span>
            </label>
          </div>
          <p
            className="field-error"
            id={`${prefix}-submissionType-error`}
            data-error-for="submissionType"
          >
            {errors?.submissionType ?? ''}
          </p>
        </fieldset>
      )}

      <div className="form-grid">
        {isNff ? (
          <>
            {nameField}
            {emailField}
            {organisationField(true)}
            {roleField(true)}
            <Field
              prefix={prefix}
              errors={errors}
              name="interest"
              label="Area of interest"
              requirement="required"
              wide
            >
              {(props) => (
                <select {...props} required defaultValue="">
                  <option value="">Choose one</option>
                  <option value="exhibition-model">
                    Tabletop exhibition model
                  </option>
                  <option value="research-platform">
                    Experimental research platform
                  </option>
                  <option value="pilot-demonstration">
                    Pilot or demonstration
                  </option>
                  <option value="research-collaboration">
                    Research collaboration
                  </option>
                  <option value="investment-partnership">
                    Investment or strategic partnership
                  </option>
                </select>
              )}
            </Field>
            {intendedApplicationField}
            {timeframeField}
            <Field
              prefix={prefix}
              errors={errors}
              name="message"
              label="What would you like to discuss?"
              requirement="optional"
              wide
              help="Please avoid confidential or patent-sensitive details."
            >
              {(props) => <textarea {...props} rows={4} maxLength={1500} />}
            </Field>
          </>
        ) : (
          <>
            {nameField}
            {(isProductInterest || isCollaboration) &&
              organisationField(isProductInterest)}
            {(isProductInterest || isCollaboration) &&
              roleField(isProductInterest)}
            {emailField}

            {isProductInterest && (
              <>
                <Field
                  prefix={prefix}
                  errors={errors}
                  name="interest"
                  label="Product of interest"
                  requirement="required"
                  wide
                >
                  {(props) => (
                    <select {...props} required defaultValue="">
                      <option value="">Choose one</option>
                      <option value="exhibition-model">
                        Tabletop exhibition model
                      </option>
                      <option value="research-platform">
                        Experimental stellarator platform
                      </option>
                      <option value="both-product-directions">
                        Both product directions
                      </option>
                    </select>
                  )}
                </Field>
                {intendedApplicationField}
                {timeframeField}
                <Field
                  prefix={prefix}
                  errors={errors}
                  name="message"
                  label="Message"
                  requirement="optional"
                  wide
                  help="Please avoid confidential or patent-sensitive details."
                >
                  {(props) => <textarea {...props} rows={4} maxLength={1500} />}
                </Field>
              </>
            )}

            {isCollaboration && (
              <>
                <Field
                  prefix={prefix}
                  errors={errors}
                  name="interest"
                  label="Collaboration area"
                  requirement="required"
                  wide
                >
                  {(props) => (
                    <select {...props} required defaultValue="">
                      <option value="">Choose one</option>
                      <option value="research-collaboration">
                        Research collaboration
                      </option>
                      <option value="investment-partnership">
                        Investment or strategic collaboration
                      </option>
                    </select>
                  )}
                </Field>
                <Field
                  prefix={prefix}
                  errors={errors}
                  name="message"
                  label="What would you like to discuss?"
                  requirement="required"
                  wide
                  help="Please avoid confidential or patent-sensitive details."
                >
                  {(props) => (
                    <textarea {...props} rows={5} maxLength={1500} required />
                  )}
                </Field>
              </>
            )}

            {isGeneralEnquiry && (
              <>
                <input type="hidden" name="interest" value="general-enquiry" />
                <Field
                  prefix={prefix}
                  errors={errors}
                  name="message"
                  label="What would you like to discuss?"
                  requirement="required"
                  wide
                  help="Please avoid confidential or patent-sensitive details."
                >
                  {(props) => (
                    <textarea {...props} rows={5} maxLength={1500} required />
                  )}
                </Field>
              </>
            )}
          </>
        )}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${prefix}-website`}>Website</label>
        <input
          id={`${prefix}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="form-terms">
        {isNff
          ? 'We use your information to respond to your enquiry and evaluate institutional interest. '
          : 'We use your information only to respond to your enquiry and manage any resulting conversation. '}
        See our <a href="/privacy">Privacy Notice</a>.
      </p>
      <button className="button primary" type="submit" disabled={busy}>
        {busy
          ? isNff || isProductInterest
            ? 'Registering…'
            : 'Sending…'
          : isNff || isProductInterest
            ? 'Register your interest'
            : 'Send enquiry'}
      </button>
      {(isNff || isProductInterest) && (
        <p className="form-terms post-submit-note">
          Submitting this form is a non-binding expression of interest and does
          not create an obligation to purchase.
        </p>
      )}
      <div
        ref={statusRef}
        className="form-status"
        role="status"
        aria-live="polite"
        tabIndex={-1}
        data-form-status
        {...(status && { 'data-state': status.state })}
      >
        {status?.message}
      </div>
    </form>
  );
}
