import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { contactHrefs } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Research Platform',
  description:
    'An early-stage experimental stellarator platform exploring broader access to plasma research, diagnostic development and researcher training.',
  path: '/research-platform/',
});

const registrationHref =
  '/contact/?intent=product-interest&interest=research-platform';

const researchDirections = [
  {
    title: 'Explore magnetic confinement',
    text: 'Investigate stellarator fields and plasma behaviour.',
    diagram:
      'M8 32a24 14 0 1 0 48 0 24 14 0 1 0-48 0 M19 32a13 6 0 1 0 26 0 13 6 0 1 0-26 0',
  },
  {
    title: 'Develop diagnostics',
    text: 'Explore plasma measurements and experimental instrumentation.',
    diagram:
      'M8 12h48v36H8Z M14 32h8l5-12 9 23 5-11h9 M24 48v8 M40 48v8 M18 56h28',
  },
  {
    title: 'Build research experience',
    text: 'Connect simulation and theory with practical experiments.',
    diagram: 'M8 12h16q8 0 8 7 0-7 8-7h16v38H40q-8 0-8 6 0-6-8-6H8Z M32 19v37',
  },
] as const;

const audiences = [
  'University research groups',
  'Laboratories and diagnostic teams',
  'Fusion startups and R&D teams',
] as const;

const questions = [
  {
    question: 'What stage is the platform at?',
    answer:
      'Early-stage computational design and magnetic-field modelling. Experimental performance and engineering requirements still need physical validation.',
  },
  {
    question: 'How does it differ from the exhibition model?',
    answer:
      'The exhibition model focuses on teaching and outreach. The research platform is a longer-term direction for experimental plasma research.',
  },
  {
    question: 'Is it a fusion power system?',
    answer:
      'No. We’re exploring a research-scale stellarator system, not a plant for generating fusion electricity.',
  },
  {
    question: 'What should our lab tell you?',
    answer:
      'Share your research questions, diagnostic needs, available infrastructure and likely timing. Quantities are optional and non-binding.',
  },
  {
    question: 'Can we discuss a research collaboration?',
    answer:
      'Yes. Tell us what you want to investigate so we can explore requirements and potential next steps.',
  },
] as const;

export default function Page() {
  return (
    <>
      <section className="exhibition-hero chapter field-ice" id="platform">
        <div className="shell exhibition-hero-grid">
          <div className="exhibition-hero-copy">
            <h1>Bring stellarator research closer.</h1>
            <p>
              An experimental stellarator platform for universities,
              laboratories and fusion R&amp;D teams. An early-stage, longer-term
              direction for making practical plasma research more accessible.
            </p>
            <div className="button-row">
              <Link className="button primary" href={registrationHref}>
                Register interest
              </Link>
              <a className="exhibition-applications-link" href="#applications">
                Explore applications
              </a>
            </div>
          </div>
          <figure className="exhibition-drawing">
            <img
              src="/images/concepts/product_c_visualization.png"
              width="1536"
              height="1024"
              alt="Concept illustration of a research-scale stellarator platform with an enclosed vessel, surrounding coils and adjacent equipment cabinets."
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>
              Concept illustration. Platform in development; final design may
              differ. The magnetic-field configuration shown is illustrative and
              does not represent Aurora Confinement’s technology.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section field-night research-compact">
        <div className="shell">
          <div className="section-heading">
            <h2>More room for experimental questions.</h2>
            <p>A smaller experimental system to complement major facilities.</p>
          </div>
          <div className="exhibition-learning-grid research-directions">
            {researchDirections.map((direction) => (
              <article key={direction.title}>
                <svg
                  viewBox="0 0 64 64"
                  width="64"
                  height="64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={direction.diagram} />
                </svg>
                <h3>{direction.title}</h3>
                <p>{direction.text}</p>
              </article>
            ))}
          </div>
          <p className="research-direction-note">
            Intended capabilities, subject to development and testing.
          </p>
        </div>
      </section>

      <section
        className="section field-deep research-compact"
        id="applications"
      >
        <div className="shell research-collaboration">
          <div className="research-collaboration-copy">
            <h2>Start with your research question.</h2>
            <p>
              What would your team investigate? Share your experimental goals,
              measurement needs and available infrastructure to help shape the
              platform’s requirements.
            </p>
            <Link
              href={`${contactHrefs.collaboration}&interest=research-collaboration`}
            >
              Discuss a research collaboration
            </Link>
          </div>
          <div className="research-audiences">
            <h3>Who we’d like to hear from</h3>
            <ul>
              {audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section tight field-ice" id="status">
        <div className="shell exhibition-questions">
          <h2>Practical questions.</h2>
          <div>
            {questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
            <p className="exhibition-source">
              Specifications, safety requirements, costs and timing are still to
              be established.
            </p>
          </div>
        </div>
      </section>

      <section className="home-closing chapter field-magenta">
        <div className="shell home-closing-inner">
          <div>
            <h2>What could your lab explore?</h2>
            <p>
              Share your requirements for a future research platform.
              Registering interst is free and non-binding. Your interest helps
              us assess demand and support applications for grant funding.
            </p>
          </div>
          <Link className="button primary" href={registrationHref}>
            Register interest
          </Link>
        </div>
      </section>
    </>
  );
}
