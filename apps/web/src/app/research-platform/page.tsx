import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import ProductFigure from '@/components/ProductFigure';
import InterestDisclaimer from '@/components/InterestDisclaimer';
import { contactHrefs } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Research Platform',
  description:
    'An early-stage, container-sized experimental stellarator platform intended to lower the cost and infrastructure needed for hands-on stellarator research.',
  path: '/research-platform/',
});

export default function Page() {
  return (
    <>
      <PageHero
        field="ice"
        title="Research Platform."
        intro="A container-sized experimental stellarator system, intended to make hands-on stellarator research more accessible."
      />

      <section className="section field-night" id="platform">
        <div className="shell split-section reverse">
          <ProductFigure kind="research" />
          <div className="split-copy">
            <h2>Hands-on research, within reach.</h2>
            <p>
              We are exploring a modular experimental stellarator platform for
              universities, startups, and research teams. It is intended to
              lower the financial and technical barriers to practical
              stellarator experimentation.
            </p>
            <p>
              The platform is being developed through research collaboration, so
              the people who would use it can help shape what it needs to do.
            </p>
            <p className="status-label">
              Current focus · Early-stage development
            </p>
            <div className="button-row">
              <Link
                className="button primary"
                href={contactHrefs.productInterest}
              >
                Register your interest
              </Link>
              <Link className="button" href={contactHrefs.collaboration}>
                Discuss a research partnership
              </Link>
            </div>
            <InterestDisclaimer />
          </div>
        </div>
      </section>

      <section className="section field-deep" id="use">
        <div className="shell">
          <div className="section-heading">
            <h2>Made for the people who do the experiments.</h2>
            <p>
              Access to experimental stellarator hardware is limited. A compact
              platform could complement large facilities, not replace them.
            </p>
          </div>
          <div className="grid-2">
            <article className="card">
              <h3>Designed for</h3>
              <ul className="check-list">
                <li>Academic plasma research labs</li>
                <li>Early-stage fusion startups</li>
                <li>Researcher and student training programmes</li>
              </ul>
            </article>
            <article className="card">
              <h3>What it is intended to enable</h3>
              <ul className="check-list">
                <li>Hands-on experiments without full-scale facility costs</li>
                <li>A fast-turnaround testbed for diagnostic development</li>
                <li>Direct practical training for future fusion engineers</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section tight field-ice" id="status">
        <div className="shell">
          <div className="fact-strip">
            <div>
              <strong>Around 1 March 2027 – 1 August 2028</strong>
              Planned development period.{' '}
              <Link href="/roadmap">See the roadmap</Link>.
            </div>
            <div>
              <strong>Container-sized</strong>
              The scale we are exploring for the platform.
            </div>
            <div>
              <strong>Early-stage</strong>
              No performance, readiness, regulatory, or delivery claims are
              made.
            </div>
          </div>
        </div>
      </section>

      <section className="section tight field-cyan">
        <div className="shell callout">
          <h2>Could a research platform fit your lab?</h2>
          <p>
            Researchers and industry specialists can help us understand
            requirements, experimental use cases, and safety expectations.
          </p>
          <div className="button-row">
            <Link className="button primary" href={contactHrefs.collaboration}>
              Discuss a research partnership
            </Link>
            <Link className="button" href={contactHrefs.generalEnquiry}>
              Contact the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
