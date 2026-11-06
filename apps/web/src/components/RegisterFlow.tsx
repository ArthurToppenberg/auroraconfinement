'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LetterPreview from '@/components/LetterPreview';
import RegisterFields from '@/components/RegisterFields';
import {
  buildLetter,
  confirmationStatement,
  sharingStatement,
} from '@/lib/loi/letter';
import type { Letter } from '@/lib/loi/letter';
import {
  activeSections,
  emptyForm,
  normaliseForm,
  products,
  validateDetails,
  validateSubmission,
} from '@/lib/loi/schema';
import type {
  FieldErrors,
  LoiForm,
  ProductSection,
  SectionKey,
} from '@/lib/loi/schema';
import type { RegisterResponseBody } from '@/lib/loi/handler';

const failure = (email: string) =>
  `We could not save your letter. Please try again later or email ${email}.`;

const detailKeys = [
  'fullName',
  'email',
  'role',
  'organisation',
  'country',
  'capacity',
];

export default function RegisterFlow({
  contactEmail,
}: {
  contactEmail: string;
}) {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<LoiForm>(() => {
    const initial = emptyForm();
    const product = searchParams.get('product');
    if (product && (products as readonly string[]).includes(product))
      initial.product = product as LoiForm['product'];
    if (searchParams.get('source') === 'nff2026') initial.source = 'nff2026';
    return initial;
  });
  const [showErrors, setShowErrors] = useState(false);
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{
    state: 'idle' | 'sending' | 'error';
    message: string;
  }>({
    state: 'idle',
    message: '',
  });
  const [saved, setSaved] = useState<{
    reference: string;
    letter: Letter;
  } | null>(null);
  const [view, setView] = useState<'form' | 'letter'>('form');
  const [open, setOpen] = useState(false);
  const [errorTick, setErrorTick] = useState(0);
  const savedHeading = useRef<HTMLHeadingElement>(null);

  // Exactly what the server will normalise and store; the preview is built from it.
  const normalised = useMemo(() => normaliseForm(form), [form]);
  const previewLetter = useMemo(
    () => buildLetter(normalised, { contactEmail, preview: true }),
    [normalised, contactEmail],
  );

  const issues = useMemo(() => validateDetails(normalised), [normalised]);
  const errors: FieldErrors = {
    ...(showErrors ? validateSubmission(normalised) : {}),
    ...serverErrors,
  };
  const sections = activeSections(normalised.product);
  const progress = [
    {
      label: 'Your details',
      href: '#section-details',
      done: detailKeys.every((key) => !issues[key]),
    },
    {
      label: 'Interest',
      href: '#section-interest',
      done: !issues['product'] && !issues['interestTypes'],
    },
    {
      label: 'Product details',
      href: sections[0]
        ? `#section-product-${sections[0]}`
        : '#section-interest',
      done:
        sections.length > 0 &&
        !Object.keys(issues).some((key) => key.includes('.')),
    },
    { label: 'Confirm', href: '#section-confirm', done: form.confirmed },
  ];

  useEffect(() => {
    if (errorTick === 0) return;
    document
      .querySelector<HTMLElement>(
        '[aria-invalid="true"], fieldset[data-invalid="true"] input',
      )
      ?.focus();
  }, [errorTick]);

  useEffect(() => {
    if (saved) {
      savedHeading.current?.focus();
      document.getElementById('register-workspace')?.scrollIntoView();
    }
  }, [saved]);

  const update = (patch: Partial<LoiForm>) => {
    setServerErrors({});
    setForm((current) => ({ ...current, ...patch }));
  };
  const setSection = (key: SectionKey, patch: Partial<ProductSection>) => {
    setServerErrors({});
    setForm((current) => ({
      ...current,
      sections: {
        ...current.sections,
        [key]: { ...current.sections[key], ...patch },
      },
    }));
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status.state === 'sending') return;
    const found = validateSubmission(normalised);
    if (Object.keys(found).length > 0) {
      setShowErrors(true);
      setView('form');
      setStatus({
        state: 'error',
        message: 'Please correct the highlighted fields.',
      });
      setErrorTick((tick) => tick + 1);
      return;
    }
    setStatus({ state: 'sending', message: 'Saving your letter…' });
    let response: Response;
    try {
      response = await fetch('/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalised),
        credentials: 'same-origin',
        cache: 'no-store',
      });
    } catch {
      setStatus({ state: 'error', message: failure(contactEmail) });
      return;
    }
    const result = (await response
      .json()
      .catch(() => null)) as RegisterResponseBody | null;
    if (response.ok && result?.ok === true && result.reference) {
      setSaved({
        reference: result.reference,
        letter:
          result.letter ??
          buildLetter(normalised, {
            contactEmail,
            reference: result.reference,
            confirmedAt: new Date().toISOString(),
          }),
      });
      setStatus({ state: 'idle', message: '' });
      return;
    }
    if (result?.errors && Object.keys(result.errors).length > 0) {
      setServerErrors(result.errors);
      setShowErrors(true);
      setView('form');
      setErrorTick((tick) => tick + 1);
      setStatus({
        state: 'error',
        message: result.message || 'Please correct the highlighted fields.',
      });
      return;
    }
    setStatus({
      state: 'error',
      message:
        typeof result?.message === 'string' && result.message
          ? result.message
          : failure(contactEmail),
    });
  }

  return (
    <div
      className="register-workspace"
      id="register-workspace"
      data-view={view}
      data-saved={saved ? 'true' : undefined}
    >
      <div className="register-toggle" role="group" aria-label="Show">
        <button
          type="button"
          aria-pressed={view === 'form'}
          onClick={() => setView('form')}
        >
          Your answers
        </button>
        <button
          type="button"
          aria-pressed={view === 'letter'}
          onClick={() => setView('letter')}
        >
          Letter preview
        </button>
      </div>

      <div className="register-form-pane">
        {saved ? (
          <div className="register-card register-saved">
            <h2 ref={savedHeading} tabIndex={-1}>
              Your letter is saved
            </h2>
            <p role="status">
              Thank you. Your non-binding Letter of Interest has been confirmed
              and saved. Your reference is <strong>{saved.reference}</strong>.
              Please keep it for any follow-up.
            </p>
            <p className="field-help">
              Use your browser to print the letter or save it as a PDF. We do
              not email a copy, and your email address has not been verified.
            </p>
            <div className="register-actions">
              <button
                className="button primary"
                type="button"
                onClick={() => window.print()}
              >
                Print or save as PDF
              </button>
            </div>
            <p className="field-help">
              Need your organisation’s own approval or signature process? Email{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and we will
              arrange a follow-up.
            </p>
          </div>
        ) : (
          <form className="register-form" onSubmit={submit} noValidate>
            <ol className="register-progress" aria-label="Progress">
              {progress.map((item) => (
                <li key={item.label} data-done={item.done ? 'true' : undefined}>
                  <a href={item.href}>
                    {item.label}
                    {item.done && <span className="sr-only"> (complete)</span>}
                  </a>
                </li>
              ))}
            </ol>

            <RegisterFields
              form={form}
              errors={errors}
              update={update}
              setSection={setSection}
            />

            <fieldset className="register-card" id="section-confirm">
              <legend>Confirm and save</legend>
              <p className="register-card-intro">
                Check the letter beside this form. It records your stated
                interest and the capacity you selected. When you confirm, we add
                the confirmation date and a reference ID. Nothing else is added
                or changed.
              </p>

              <div className="submission-options">
                <label>
                  <input
                    type="checkbox"
                    checked={form.sharing}
                    aria-describedby="reg-sharing-help"
                    onChange={(event) =>
                      update({ sharing: event.target.checked })
                    }
                  />
                  <span>
                    <strong>Optional.</strong> {sharingStatement}
                  </span>
                </label>
              </div>
              <p className="field-help" id="reg-sharing-help">
                Not a condition of registering interest. You can change or
                withdraw this permission by emailing {contactEmail}; the change
                applies to future sharing, and copies already lawfully shared
                may not be recallable. Without it, your letter is kept
                internally and only anonymised aggregate figures are reported.
                Public testimonials, logos and marketing updates are never
                included.
              </p>

              <div className="submission-options">
                <label>
                  <input
                    id="reg-confirmed"
                    type="checkbox"
                    checked={form.confirmed}
                    aria-required="true"
                    aria-invalid={errors['confirmed'] ? true : undefined}
                    aria-describedby="reg-confirmed-error"
                    onChange={(event) =>
                      update({ confirmed: event.target.checked })
                    }
                  />
                  <span>
                    <strong>Required.</strong> {confirmationStatement}
                  </span>
                </label>
              </div>
              <p className="field-error" id="reg-confirmed-error">
                {errors['confirmed']}
              </p>
              <p className="field-help">
                Confirming with your typed name is a record of your stated
                interest. It is not a qualified electronic signature or proof of
                institutional authority, and your email address is not verified.
              </p>

              <div className="register-actions">
                <button
                  className="button primary"
                  type="submit"
                  disabled={status.state === 'sending'}
                >
                  Confirm and save my letter
                </button>
              </div>
              <p
                className="form-status"
                role="status"
                data-state={status.state === 'error' ? 'error' : undefined}
              >
                {status.message}
              </p>
            </fieldset>
          </form>
        )}
      </div>

      <aside
        className="register-preview"
        aria-label="Letter preview"
        data-open={open ? 'true' : undefined}
      >
        <div className="register-preview-bar">
          <p>
            <strong>Your letter</strong>
            <span>
              {saved ? 'Confirmed and saved' : 'Draft · updates as you type'}
            </span>
          </p>
          <button
            type="button"
            className="register-peek-button"
            aria-expanded={open}
            aria-controls="register-letter"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? 'Collapse letter' : 'Expand letter'}
          </button>
        </div>
        <div
          className="register-preview-scroll"
          id="register-letter"
          role="region"
          aria-label="Letter preview (scrollable)"
          tabIndex={0}
        >
          <LetterPreview
            letter={saved ? saved.letter : previewLetter}
            draft={!saved}
            id="letter-title"
          />
        </div>
      </aside>
    </div>
  );
}
