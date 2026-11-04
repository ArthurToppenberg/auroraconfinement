import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import ModelApplications from '@/components/ModelApplications';
import { homeHero } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Exhibition Model',
  description:
    'A tabletop real-plasma model with shaped magnetic fields, in development for introductory university teaching, exhibitions and fusion outreach.',
  path: '/model/',
});

const learningPoints = [
  {
    title: 'Introduce plasma',
    text: 'Give introductory explanations a visible starting point.',
    diagram: 'M8 32c8-24 16 24 24 0s16 24 24 0 M8 42h48',
  },
  {
    title: 'Explain shaped magnetic fields',
    text: 'Relate shaped fields to magnetic confinement concepts.',
    diagram:
      'M8 32a24 14 0 1 0 48 0 24 14 0 1 0-48 0 M19 32a13 6 0 1 0 26 0 13 6 0 1 0-26 0 M18 21l6-2-1 6',
  },
  {
    title: 'Connect to fusion',
    text: 'Explain why plasma and confinement matter in fusion research.',
    diagram: 'M8 22h12l12 10 12-10h12 M8 42h12l12-10 12 10h12 M27 32h10',
  },
] as const;

const evidence = [
  {
    number: '$14.2bn',
    title: 'Backing fusion’s development.',
    text: 'Across 56 companies surveyed in 2026, reported cumulative funding reached $14.24 billion.',
    source: 'Fusion Industry Association, 2026',
    href: 'https://www.fusionindustryassociation.org/fusion-industry-attracts-record-annual-funding-of-4-48bn-raising-total-to-14-24bn/',
  },
  {
    number: '100,000',
    title: 'A new generation of engineers.',
    text: 'An industry estimate cited at Nordic Fusion Forum 2026 puts the need at 100,000 new fusion engineers.',
    source:
      'Industry estimate cited by Tobias Petrini, Business Finland, Nordic Fusion Forum 2026.',
  },
  {
    number: '13 of 52',
    title: 'On-campus equipment identified.',
    text: 'In Aurora’s review of European institutions offering fusion or plasma degrees and courses, on-campus magnetic-confinement devices were identified at 13 of 52 institutions.',
    source: 'Aurora Confinement desk research, October 2026.',
    methodology: true,
  },
  {
    number: '19%',
    title: 'Understanding remains limited.',
    text: '65% of UK adults had heard of fusion, but just 19% said they knew a fair amount or a lot about it.',
    source: 'DESNZ Public Attitudes Tracker, UK, spring 2026',
    href: 'https://www.gov.uk/government/statistics/desnz-public-attitudes-tracker-spring-2026/desnz-public-attitudes-tracker-energy-infrastructure-and-energy-security-spring-2026-uk',
  },
];

const questions = [
  {
    question: 'What stage is the model at?',
    answer:
      'We’re refining the design through simulations, virtual models and institutional feedback. Prototyping and testing are next; safety and operating requirements remain to be established.',
  },
  {
    question: 'Does it produce fusion energy?',
    answer:
      'No. It’s a plasma demonstration model, not a fusion reactor. It will not produce fusion electricity.',
  },
  {
    question: 'What should we tell you?',
    answer:
      'Share your audience, use case, timing and operating needs, plus any interest in purchase, pilot, rental or event exhibition. Quantities are optional and non-binding.',
  },
] as const;

const applicationDescriptions = [
  'A physical reference for introductory lectures and demonstrations on plasma and magnetic confinement.',
  'A visible focal point for guided explanations, visitor questions and discovery.',
  'A way to introduce fusion science at open days, visitor centres and recruitment events.',
  'A tangible reference for discussions about fusion’s potential and challenges.',
] as const;

export default function Page() {
  return (
    <div className="exhibition-page">
      <section className="exhibition-hero chapter field-cyan" id="model">
        <div className="shell exhibition-hero-grid">
          <div className="exhibition-hero-copy">
            <h1>
              Bring plasma into view.
              <br />
              Bring fusion into the conversation.
            </h1>
            <p>
              A tabletop real-plasma model with shaped magnetic fields, being
              developed for introductory university teaching, exhibitions and
              fusion outreach.
            </p>
            <div className="button-row">
              <Link className="button primary" href={homeHero.primaryHref}>
                Register interest
              </Link>
              <a className="exhibition-applications-link" href="#applications">
                Explore applications
              </a>
            </div>
          </div>
          <figure className="exhibition-drawing">
            <img
              src="/images/concepts/product-b-1000.webp"
              srcSet={[360, 560, 760, 1000]
                .map(
                  (width) =>
                    `/images/concepts/product-b-${width}.webp ${width}w`,
                )
                .join(', ')}
              sizes="(min-width: 60rem) 54vw, 100vw"
              width="1000"
              height="1000"
              alt="Concept illustration of a tabletop real-plasma exhibition model in an open case, showing purple plasma within surrounding coils."
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>
              Concept illustration. Model in development; final design may
              differ. The magnetic-field configuration shown is illustrative and
              does not represent Aurora Confinement’s technology.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section field-ice">
        <div className="shell">
          <div className="section-heading">
            <h2>A physical reference for the science.</h2>
          </div>
          <div className="exhibition-learning-grid">
            {learningPoints.map((point) => (
              <article key={point.title}>
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
                  <path d={point.diagram} />
                </svg>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight field-night">
        <div className="shell">
          <h2>
            Fusion needs talent.
            <br />
            And public confidence.
          </h2>
          <div className="exhibition-evidence-grid">
            {evidence.map((item) => (
              <article className="exhibition-evidence-item" key={item.number}>
                <p className="exhibition-evidence-number">{item.number}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <p className="exhibition-source">
                  {item.href ? (
                    <a href={item.href}>{item.source}</a>
                  ) : (
                    item.source
                  )}
                </p>
                {item.methodology && (
                  <details className="exhibition-methodology">
                    <summary>About this research</summary>
                    <p>
                      The wider list covers 72 European institutions. Among 52
                      classified as offering fusion/plasma degrees or courses,
                      13 had identified on-campus toroidal or linear
                      magnetic-confinement devices, four were classified as
                      partner-lab only, and 35 had no device identified in the
                      reviewed sources. The list is not exhaustive; ‘not found’
                      does not mean confirmed absent.
                    </p>
                    <p>
                      The review does not cover all plasma demonstration
                      equipment or establish student access or teaching use.
                    </p>
                  </details>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section field-ice" id="applications">
        <div className="shell">
          <div className="section-heading">
            <h2>Where would you use it?</h2>
          </div>
          <ModelApplications descriptions={applicationDescriptions} />
          <p className="application-development-note">
            Applications shown are illustrative. The model is in development.
          </p>
        </div>
      </section>

      <section className="section tight field-cyan">
        <div className="shell exhibition-questions">
          <h2>Practical questions.</h2>
          <div>
            {questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-closing chapter field-magenta">
        <div className="shell home-closing-inner">
          <div>
            <h2>Bring plasma to your institution.</h2>
            <p>
              Free and non-binding. Your interest helps us assess demand and
              support applications for grant funding.
            </p>
          </div>
          <Link className="button primary" href={homeHero.primaryHref}>
            Register interest
          </Link>
        </div>
      </section>
    </div>
  );
}
