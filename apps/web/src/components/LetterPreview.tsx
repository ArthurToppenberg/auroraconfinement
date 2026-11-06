import type { Letter, LetterField } from '@/lib/loi/letter';

interface LetterPreviewProps {
  letter: Letter;
  /** Heading level for the letter title; the page's own headings sit above it. */
  as?: 'h2' | 'h3';
  id?: string;
  /** Shows the "DRAFT — NOT CONFIRMED" marking. Never set on a confirmed letter. */
  draft?: boolean;
}

const Value = ({ field }: { field: LetterField }) => (
  <dd className={field.placeholder ? 'letter-placeholder' : undefined}>
    {field.value}
  </dd>
);

/**
 * The complete Letter of Interest as plain, semantic HTML on a letterhead. It
 * renders only text from the structured letter (never markup), so it is safe for
 * stored snapshots. No hooks: usable from server and client components alike.
 */
export default function LetterPreview({
  letter,
  as: Heading = 'h3',
  id = 'letter-title',
  draft = false,
}: LetterPreviewProps) {
  return (
    <article className="letter field-ice" aria-labelledby={id}>
      <header className="letter-head">
        <img src="/images/logo-symbol.png" alt="" width="40" height="40" />
        <p>
          <strong>Aurora Confinement</strong>
          <span>Letter of Interest</span>
        </p>
        {draft && (
          <p className="letter-draft">
            Draft <span>not confirmed</span>
          </p>
        )}
      </header>

      <Heading id={id}>{letter.title}</Heading>
      <p className="letter-to">
        <strong>To:</strong> {letter.to}
      </p>
      <p>
        {letter.opening.map((run, index) =>
          run.strong ? (
            <strong
              key={index}
              className={run.placeholder ? 'letter-placeholder' : undefined}
            >
              {run.text}
            </strong>
          ) : (
            <span
              key={index}
              className={run.placeholder ? 'letter-placeholder' : undefined}
            >
              {run.text}
            </span>
          ),
        )}
      </p>
      <p>
        <strong>Capacity:</strong>{' '}
        <span
          className={
            letter.capacityPlaceholder ? 'letter-placeholder' : undefined
          }
        >
          {letter.capacity}
        </span>
      </p>
      {letter.sections.map((section, index) => (
        <section className="letter-section" key={section.heading ?? index}>
          {section.heading && <h4>{section.heading}</h4>}
          <dl>
            {section.fields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <Value field={field} />
              </div>
            ))}
          </dl>
        </section>
      ))}
      <p>{letter.disclaimer}</p>
      <p className="letter-confirmed">
        <strong>Confirmed by:</strong>{' '}
        <span
          className={
            letter.confirmedByPlaceholder ? 'letter-placeholder' : undefined
          }
        >
          {letter.confirmedBy}
        </span>
      </p>
      <dl className="letter-details">
        {letter.details.map((field) => (
          <div key={field.label}>
            <dt>{field.label}</dt>
            <Value field={field} />
          </div>
        ))}
      </dl>
      <p className="letter-footer">{letter.footer}</p>
    </article>
  );
}
