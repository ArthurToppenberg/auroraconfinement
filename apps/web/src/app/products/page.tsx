import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import ProductFigure from '@/components/ProductFigure';
import InterestDisclaimer from '@/components/InterestDisclaimer';
import { contactHrefs } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Products',
  description:
    'Tabletop stellarator models for exhibition and communication, and compact experimental stellarator platforms for more accessible hands-on research.',
  path: '/products/',
});

export default function Page() {
  return (
    <>
      <section className="products-intro chapter field-cyan">
        <div className="shell">
          <h1>Two product directions.</h1>
          <p className="lede">
            Physical tools for communicating and researching stellarators:
            tabletop models that make the technology tangible, and experimental
            platforms designed to lower the barriers to hands-on research.
          </p>
        </div>
      </section>

      <section className="product-section field-ice" id="tabletop">
        <div className="shell product-layout">
          <header className="product-heading">
            <h2>Tabletop stellarator models</h2>
            <span className="status-label">Current focus: in development</span>
            <p className="product-value">
              Compact physical models engineered to make complex magnetic field
              geometry clear, tangible, and visually compelling.
            </p>
          </header>
          <div className="product-visual">
            <ProductFigure kind="tabletop" eager />
          </div>
          <div className="product-details">
            <div className="product-list-group">
              <h3>Designed for</h3>
              <ul className="icon-list">
                <li>
                  <span>Industry exhibitions &amp; investor meetings</span>
                </li>
                <li>
                  <span>Science centres &amp; public visitor facilities</span>
                </li>
                <li>
                  <span>Universities &amp; introductory plasma lectures</span>
                </li>
              </ul>
            </div>
            <div className="product-list-group">
              <h3>What it enables</h3>
              <ul className="icon-list">
                <li>
                  <span>High-impact display anchor for events</span>
                </li>
                <li>
                  <span>Intuitive physical demonstration of 3D geometry</span>
                </li>
                <li>
                  <span>
                    Clear communication with non-specialist stakeholders
                  </span>
                </li>
              </ul>
            </div>
            <p className="product-clarification">
              Purpose: communication and teaching, not experimental research
            </p>
            <div className="product-interest-actions">
              <div className="product-card-actions">
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
              <InterestDisclaimer />
            </div>
          </div>
        </div>
      </section>

      <section className="product-section field-night" id="research">
        <div className="shell product-layout product-layout-reverse">
          <header className="product-heading">
            <h2>Experimental stellarator platforms</h2>
            <span className="status-label">
              Current focus: early-stage development
            </span>
            <p className="product-value">
              Modular research systems engineered to lower financial and
              technical barriers for hands-on stellarator experimentation.
            </p>
          </header>
          <div className="product-visual">
            <ProductFigure kind="research" />
          </div>
          <div className="product-details">
            <div className="product-list-group">
              <h3>Designed for</h3>
              <ul className="icon-list">
                <li>
                  <span>Academic plasma research labs</span>
                </li>
                <li>
                  <span>Early-stage fusion startups</span>
                </li>
                <li>
                  <span>Researcher &amp; student training programs</span>
                </li>
              </ul>
            </div>
            <div className="product-list-group">
              <h3>What it is intended to enable</h3>
              <ul className="icon-list">
                <li>
                  <span>
                    Hands-on experiment without full-scale facility costs
                  </span>
                </li>
                <li>
                  <span>
                    Fast-turnaround testbed for diagnostic development
                  </span>
                </li>
                <li>
                  <span>
                    Direct practical training for future fusion engineers
                  </span>
                </li>
              </ul>
            </div>
            <p className="product-clarification">
              Current stage: early-stage development through research
              collaboration
            </p>
            <div className="product-interest-actions">
              <div className="product-card-actions">
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
        </div>
      </section>

      <section className="products-final field-magenta">
        <div className="shell callout">
          <h2>Could one fit your organisation?</h2>
          <p>
            Tell us what you are exploring, and we will continue the
            conversation from there.
          </p>
          <div className="products-final-actions">
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
          <InterestDisclaimer />
        </div>
      </section>
    </>
  );
}
