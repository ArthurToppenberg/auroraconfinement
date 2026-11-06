'use client';

import {
  activeSections,
  budgetBases,
  budgetStatuses,
  capacities,
  conditionChoices,
  currencies,
  interestTypes,
  labels,
  limits,
  primaryUses,
  procurementRoles,
  productQuestions,
  products,
  reachPeriods,
  timings,
} from '@/lib/loi/schema';
import type {
  FieldErrors,
  LoiForm,
  ProductSection,
  SectionKey,
} from '@/lib/loi/schema';

type Option = { value: string; label: string };

const idFor = (name: string) => `reg-${name.replace(/[^a-z0-9]+/gi, '-')}`;

interface Common {
  name: string;
  label: string;
  required?: boolean | undefined;
  help?: string | undefined;
  errors: FieldErrors;
}

function describedBy(
  id: string,
  help?: string | undefined,
  error?: string | undefined,
) {
  return (
    [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') ||
    undefined
  );
}

function Meta({
  id,
  help,
  error,
}: {
  id: string;
  help?: string | undefined;
  error?: string | undefined;
}) {
  return (
    <>
      {help && (
        <p className="field-help" id={`${id}-help`}>
          {help}
        </p>
      )}
      <p className="field-error" id={`${id}-error`} data-error-for={id}>
        {error}
      </p>
    </>
  );
}

function Label({
  id,
  label,
  required,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
}) {
  return (
    <label htmlFor={id}>
      {label} {required ? <span>(required)</span> : <span>(optional)</span>}
    </label>
  );
}

function TextField({
  name,
  label,
  required,
  help,
  errors,
  value,
  onChange,
  type = 'text',
  maxLength,
  autoComplete,
  inputMode,
}: Common & {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | undefined;
  maxLength?: number | undefined;
  autoComplete?: string | undefined;
  inputMode?: 'decimal' | 'text' | undefined;
}) {
  const id = idFor(name);
  const error = errors[name];
  return (
    <div className="field">
      <Label id={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, help, error)}
        onChange={(event) => onChange(event.target.value)}
      />
      <Meta id={id} help={help} error={error} />
    </div>
  );
}

function AreaField({
  name,
  label,
  required,
  help,
  errors,
  value,
  onChange,
  maxLength,
  rows = 4,
}: Common & {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  rows?: number | undefined;
}) {
  const id = idFor(name);
  const error = errors[name];
  return (
    <div className="field field-wide">
      <Label id={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        maxLength={maxLength}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, help, error)}
        onChange={(event) => onChange(event.target.value)}
      />
      <Meta id={id} help={help} error={error} />
    </div>
  );
}

function SelectField({
  name,
  label,
  required,
  help,
  errors,
  value,
  onChange,
  options,
}: Common & {
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
}) {
  const id = idFor(name);
  const error = errors[name];
  return (
    <div className="field">
      <Label id={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        value={value}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, help, error)}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Choose…</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Meta id={id} help={help} error={error} />
    </div>
  );
}

function RadioGroup({
  name,
  label,
  required,
  help,
  errors,
  value,
  onChange,
  options,
}: Common & {
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
}) {
  const id = idFor(name);
  const error = errors[name];
  return (
    <fieldset
      className="choice-group"
      data-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy(id, help, error)}
    >
      <legend>
        {label} {required ? <span>(required)</span> : <span>(optional)</span>}
      </legend>
      <div className="submission-options">
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <Meta id={id} help={help} error={error} />
    </fieldset>
  );
}

function CheckGroup({
  name,
  label,
  required,
  help,
  errors,
  value,
  onChange,
  options,
}: Common & {
  value: readonly string[];
  onChange: (value: string[]) => void;
  options: readonly Option[];
}) {
  const id = idFor(name);
  const error = errors[name];
  return (
    <fieldset
      className="choice-group"
      data-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy(id, help, error)}
    >
      <legend>
        {label} {required ? <span>(required)</span> : <span>(optional)</span>}
      </legend>
      <div className="submission-options">
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={(event) =>
                onChange(
                  event.target.checked
                    ? [...value, option.value]
                    : value.filter((item) => item !== option.value),
                )
              }
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <Meta id={id} help={help} error={error} />
    </fieldset>
  );
}

const options = <T extends string>(
  values: readonly T[],
  names: Record<T, string>,
): Option[] => values.map((value) => ({ value, label: names[value] }));

const capitalise = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

function SectionFields({
  sectionKey,
  section,
  errors,
  setSection,
}: {
  sectionKey: SectionKey;
  section: ProductSection;
  errors: FieldErrors;
  setSection: (key: SectionKey, patch: Partial<ProductSection>) => void;
}) {
  const n = (field: string) => `${sectionKey}.${field}`;
  const set = (patch: Partial<ProductSection>) => setSection(sectionKey, patch);
  const hasScale = Boolean(
    section.quantity ||
      section.reach ||
      section.budgetAmount ||
      section.budgetStatus,
  );

  return (
    <fieldset
      className="register-card register-product"
      id={`section-product-${sectionKey}`}
    >
      <legend>{labels.product[sectionKey]}</legend>
      <p className="register-card-intro">
        Short answers are enough. Detail can follow in conversation.
      </p>
      <div className="form-grid">
        <SelectField
          name={n('primaryUse')}
          label="Primary use"
          required
          errors={errors}
          value={section.primaryUse}
          onChange={(value) =>
            set({ primaryUse: value as ProductSection['primaryUse'] })
          }
          options={options(primaryUses, labels.primaryUse)}
        />
        <SelectField
          name={n('timing')}
          label="Indicative timing"
          required
          help="Your preference. It is not a delivery commitment by Aurora Confinement."
          errors={errors}
          value={section.timing}
          onChange={(value) =>
            set({ timing: value as ProductSection['timing'] })
          }
          options={options(timings, labels.timing)}
        />
        <AreaField
          name={n('application')}
          label="What would you use it for, and who would benefit?"
          required
          errors={errors}
          value={section.application}
          maxLength={limits.application}
          onChange={(value) => set({ application: value })}
        />
        <AreaField
          name={n('usefulness')}
          label="Why this would be useful"
          help="The unmet need or what you use today. A sentence or two is enough."
          errors={errors}
          value={section.usefulness}
          maxLength={limits.usefulness}
          rows={3}
          onChange={(value) => set({ usefulness: value })}
        />
        <TextField
          name={n('preferredDate')}
          label="Preferred date or relevant event"
          errors={errors}
          value={section.preferredDate}
          maxLength={limits.preferredDate}
          onChange={(value) => set({ preferredDate: value })}
        />
      </div>

      <details className="register-more" open={hasScale || undefined}>
        <summary>Scale, budget and readiness (optional)</summary>
        <p className="field-help">
          None of this is required. Anything you leave blank stays unknown in
          your letter. Aurora has not set a price.
        </p>
        <div className="form-grid">
          <TextField
            name={n('quantity')}
            label="Indicative quantity"
            errors={errors}
            value={section.quantity}
            maxLength={limits.quantity}
            inputMode="decimal"
            onChange={(value) => set({ quantity: value })}
          />
          <TextField
            name={n('quantityUnit')}
            label="Unit"
            help="For example models or installations."
            errors={errors}
            value={section.quantityUnit}
            maxLength={limits.unit}
            onChange={(value) => set({ quantityUnit: value })}
          />
          <TextField
            name={n('reach')}
            label="Expected reach"
            errors={errors}
            value={section.reach}
            maxLength={limits.quantity}
            inputMode="decimal"
            onChange={(value) => set({ reach: value })}
          />
          <TextField
            name={n('reachUnit')}
            label="Reach unit"
            help="For example students, visitors, events or research users."
            errors={errors}
            value={section.reachUnit}
            maxLength={limits.unit}
            onChange={(value) => set({ reachUnit: value })}
          />
          <SelectField
            name={n('reachPeriod')}
            label="Reach period"
            errors={errors}
            value={section.reachPeriod}
            onChange={(value) =>
              set({ reachPeriod: value as ProductSection['reachPeriod'] })
            }
            options={options(reachPeriods, labels.reachPeriod)}
          />
          <SelectField
            name={n('budgetStatus')}
            label="Budget status"
            errors={errors}
            value={section.budgetStatus}
            onChange={(value) =>
              set({ budgetStatus: value as ProductSection['budgetStatus'] })
            }
            options={options(budgetStatuses, labels.budgetStatus)}
          />
          <TextField
            name={n('budgetAmount')}
            label="Indicative budget"
            help="An amount or range, for example 40,000–60,000."
            errors={errors}
            value={section.budgetAmount}
            maxLength={limits.budgetAmount}
            onChange={(value) => set({ budgetAmount: value })}
          />
          <SelectField
            name={n('currency')}
            label="Currency"
            errors={errors}
            value={section.currency}
            onChange={(value) =>
              set({ currency: value as ProductSection['currency'] })
            }
            options={currencies.map((value) => ({ value, label: value }))}
          />
          <SelectField
            name={n('budgetBasis')}
            label="The budget covers"
            errors={errors}
            value={section.budgetBasis}
            onChange={(value) =>
              set({ budgetBasis: value as ProductSection['budgetBasis'] })
            }
            options={options(budgetBases, {
              'per-unit': 'Per unit',
              pilot: 'A pilot',
              'rental-period': 'A rental period',
              'total-project': 'The total project',
            })}
          />
        </div>
        <CheckGroup
          name={n('conditions')}
          label="Conditions for proceeding"
          errors={errors}
          value={section.conditions}
          onChange={(value) =>
            set({ conditions: value as ProductSection['conditions'] })
          }
          options={options(conditionChoices, labels.condition)}
        />
        <div className="form-grid">
          <AreaField
            name={n('conditionsNote')}
            label="Other conditions or requirements"
            errors={errors}
            value={section.conditionsNote}
            maxLength={limits.conditionsNote}
            rows={3}
            onChange={(value) => set({ conditionsNote: value })}
          />
        </div>
      </details>

      <details
        className="register-more"
        open={Object.keys(section.specific).length > 0 || undefined}
      >
        <summary>{labels.product[sectionKey]} questions (optional)</summary>
        <p className="field-help">
          Short answers are enough. We can establish detailed specifications
          later.
        </p>
        <div className="form-grid">
          {productQuestions[sectionKey].map((question) => (
            <AreaField
              key={question.key}
              name={n(`specific.${question.key}`)}
              label={question.label}
              errors={errors}
              value={section.specific[question.key] ?? ''}
              maxLength={limits.specific}
              rows={2}
              onChange={(value) =>
                set({
                  specific: { ...section.specific, [question.key]: value },
                })
              }
            />
          ))}
        </div>
      </details>
    </fieldset>
  );
}

export default function RegisterFields({
  form,
  errors,
  update,
  setSection,
}: {
  form: LoiForm;
  errors: FieldErrors;
  update: (patch: Partial<LoiForm>) => void;
  setSection: (key: SectionKey, patch: Partial<ProductSection>) => void;
}) {
  return (
    <>
      <fieldset className="register-card" id="section-details">
        <legend>Your details</legend>
        <p className="register-card-intro">
          Who is making this statement. Your name, role and organisation are
          attributed in the letter.
        </p>
        <div className="form-grid">
          <TextField
            name="fullName"
            label="Full name"
            required
            errors={errors}
            value={form.fullName}
            maxLength={limits.fullName}
            autoComplete="name"
            help="This is the name attributed to your letter."
            onChange={(value) => update({ fullName: value })}
          />
          <TextField
            name="email"
            label="Work email"
            required
            type="email"
            errors={errors}
            value={form.email}
            maxLength={limits.email}
            autoComplete="email"
            help="Used to contact you about this letter. It is omitted from any copy shared with others."
            onChange={(value) => update({ email: value })}
          />
          <TextField
            name="phone"
            label="Phone number"
            type="tel"
            errors={errors}
            value={form.phone}
            maxLength={limits.phone}
            autoComplete="tel"
            help="Optional. Used to contact you about this letter, with the country code if abroad. It is omitted from any copy shared with others."
            onChange={(value) => update({ phone: value })}
          />
          <TextField
            name="role"
            label="Job title or role"
            required
            errors={errors}
            value={form.role}
            maxLength={limits.role}
            autoComplete="organization-title"
            onChange={(value) => update({ role: value })}
          />
          <TextField
            name="organisation"
            label="Organisation or institution"
            required
            errors={errors}
            value={form.organisation}
            maxLength={limits.organisation}
            autoComplete="organization"
            help="Naming your institution does not mean it endorses this letter."
            onChange={(value) => update({ organisation: value })}
          />
          <TextField
            name="department"
            label="Department or research group"
            errors={errors}
            value={form.department}
            maxLength={limits.department}
            onChange={(value) => update({ department: value })}
          />
          <TextField
            name="country"
            label="Country"
            required
            errors={errors}
            value={form.country}
            maxLength={limits.country}
            autoComplete="country-name"
            help="Where the use would take place or where your institution is based."
            onChange={(value) => update({ country: value })}
          />
        </div>
        <RadioGroup
          name="capacity"
          label="Capacity in making this statement"
          required
          help="These choices do not indicate purchasing authority or procurement approval."
          errors={errors}
          value={form.capacity}
          onChange={(value) =>
            update({ capacity: value as LoiForm['capacity'] })
          }
          options={capacities.map((value) => ({
            value,
            label: labels.capacity[value],
          }))}
        />
        <div className="form-grid">
          <SelectField
            name="procurementRole"
            label="Your role in a purchase decision"
            help="Separate from the authority to make this statement."
            errors={errors}
            value={form.procurementRole}
            onChange={(value) =>
              update({ procurementRole: value as LoiForm['procurementRole'] })
            }
            options={options(procurementRoles, labels.procurementRole)}
          />
        </div>
      </fieldset>

      <fieldset className="register-card" id="section-interest">
        <legend>Product and type of interest</legend>
        <p className="register-card-intro">
          Choose the product and the kind of interest you want to record.
        </p>
        <RadioGroup
          name="product"
          label="Product of interest"
          required
          help="The exhibition model and research platform are in development. Interest in one is not counted as interest in the other."
          errors={errors}
          value={form.product}
          onChange={(value) => update({ product: value as LoiForm['product'] })}
          options={products.map((value) => ({
            value,
            label: labels.product[value],
          }))}
        />
        <CheckGroup
          name="interestTypes"
          label="Type of interest"
          required
          errors={errors}
          value={form.interestTypes}
          onChange={(value) =>
            update({ interestTypes: value as LoiForm['interestTypes'] })
          }
          options={interestTypes.map((value) => ({
            value,
            label: capitalise(labels.interestType[value]),
          }))}
        />
      </fieldset>

      {activeSections(form.product).map((key) => (
        <SectionFields
          key={key}
          sectionKey={key}
          section={form.sections[key]}
          errors={errors}
          setSection={setSection}
        />
      ))}

      <p className="register-confidential">
        Please do not include confidential, sensitive or patent-sensitive
        information.
      </p>

      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => update({ website: event.target.value })}
          />
        </label>
      </div>
    </>
  );
}
