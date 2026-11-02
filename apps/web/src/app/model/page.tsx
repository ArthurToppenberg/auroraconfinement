import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import ProductFigure from '@/components/ProductFigure';
import InterestDisclaimer from '@/components/InterestDisclaimer';
import { contactHrefs } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Exhibition Model',
  description:
    'Exhibition stellarator models in development: compact physical models for conferences, visitor facilities, science centres, and introductory university teaching.',
  path: '/model/',
});

export default function Page() {
  return (
    <>
      <PageHero
        field="cyan"
        title="Exhibition Model."
        intro="A physical stellarator model that makes plasma shaping and magnetic fields easier to see, explain, and teach."
      />

      <section className="section field-night" id="model">
        <div className="shell split-section">
          <ProductFigure kind="tabletop" eager />
          <div className="split-copy">
            <h2>Make stellarator physics visible.</h2>
            <p>
              We are developing exhibition stellarator models in a format
              intended to fit on a regular table. They are designed to make
              plasma shaping and magnetic fields intuitive for investors,
              partners, and university educators.
            </p>
            <p>
              Physical models help turn abstract field geometry into something
              people can see and discuss at fusion conferences, in visitor
              facilities, and in the lecture hall.
            </p>
            <p className="status-label">Current focus · In development</p>
            <div className="button-row">
              <Link
                className="button primary"
                href={contactHrefs.productInterest}
              >
                Register your interest
              </Link>
              <Link className="button" href={contactHrefs.collaboration}>
                Discuss an exhibition model
              </Link>
            </div>
            <InterestDisclaimer subject="our exhibition models" />
          </div>
        </div>
      </section>

      <section className="section field-deep" id="use">
        <div className="shell">
          <div className="section-heading">
            <h2>Built to start conversations.</h2>
            <p>
              The model is meant to be the focal point at a stand, a visitor
              facility, or the front of a lecture hall.
            </p>
          </div>
          <div className="grid-2">
            <article className="card">
              <h3>Designed for</h3>
              <ul className="check-list">
                <li>
                  Fusion conferences, industry exhibitions, and investor
                  meetings
                </li>
                <li>Science centres, museums, and public visitor facilities</li>
                <li>Universities and introductory plasma lectures</li>
              </ul>
            </article>
            <article className="card">
              <h3>What it is intended to enable</h3>
              <ul className="check-list">
                <li>Intuitive visualisation of stellarator mechanics</li>
                <li>
                  Accessible demonstrations that fit on a regular desk or table
                </li>
                <li>Clear communication with non-specialist stakeholders</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section tight field-ice" id="status">
        <div className="shell">
          <div className="fact-strip">
            <div>
              <strong>1 January – 1 August 2027</strong>
              Planned development period.{' '}
              <Link href="/roadmap">See the roadmap</Link>.
            </div>
            <div>
              <strong>In development</strong>
              No completed model is offered for immediate sale. Pricing
              discussions are indicative and non-binding.
            </div>
            <div>
              <strong>Communication and teaching</strong>
              Not intended for advanced experimental research.
            </div>
          </div>
        </div>
      </section>

      <section className="section tight field-magenta">
        <div className="shell callout">
          <h2>Could this fit your organisation?</h2>
          <p>
            Tell us what you are exploring, and we will continue the
            conversation from there.
          </p>
          <div className="button-row">
            <Link
              className="button primary"
              href={contactHrefs.productInterest}
            >
              Register your interest
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
