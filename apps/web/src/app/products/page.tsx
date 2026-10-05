import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import ProductFigure from '@/components/ProductFigure';
import TechnicalIcon from '@/components/TechnicalIcon';
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
      <section className="products-intro">
        <div className="focused-shell">
          <p className="eyebrow">OUR PRODUCTS</p>
          <h1>
            Physical tools for communicating and researching stellarators.
          </h1>
          <p>
            We are developing two active product directions: tabletop models
            that make stellarator technology tangible, and experimental
            platforms designed to lower the barriers to hands-on research.
          </p>
        </div>
      </section>

      <section className="product-section" id="tabletop">
        <div className="focused-shell product-layout">
          <header className="product-heading">
            <p className="eyebrow">01 / EXHIBITION AND COMMUNICATION</p>
            <span className="status-label">CURRENT FOCUS · IN DEVELOPMENT</span>
            <h2>Tabletop stellarator models</h2>
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
                  <TechnicalIcon name="industry" />
                  <span>Industry exhibitions &amp; investor meetings</span>
                </li>
                <li>
                  <TechnicalIcon name="communication" />
                  <span>Science centres &amp; public visitor facilities</span>
                </li>
                <li>
                  <TechnicalIcon name="education" />
                  <span>Universities &amp; introductory plasma lectures</span>
                </li>
              </ul>
            </div>
            <div className="product-list-group">
              <h3>What it enables</h3>
              <ul className="icon-list">
                <li>
                  <TechnicalIcon name="visibility" />
                  <span>High-impact display anchor for events</span>
                </li>
                <li>
                  <TechnicalIcon name="model" />
                  <span>Intuitive physical demonstration of 3D geometry</span>
                </li>
                <li>
                  <TechnicalIcon name="collaboration" />
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

      <section className="product-section" id="research">
        <div className="focused-shell product-layout product-layout-reverse">
          <header className="product-heading">
            <p className="eyebrow">02 / EXPERIMENTAL RESEARCH</p>
            <span className="status-label">
              CURRENT FOCUS · EARLY-STAGE DEVELOPMENT
            </span>
            <h2>Experimental stellarator platforms</h2>
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
                  <TechnicalIcon name="research" />
                  <span>Academic plasma research labs</span>
                </li>
                <li>
                  <TechnicalIcon name="industry" />
                  <span>Early-stage fusion startups</span>
                </li>
                <li>
                  <TechnicalIcon name="training" />
                  <span>Researcher &amp; student training programs</span>
                </li>
              </ul>
            </div>
            <div className="product-list-group">
              <h3>What it is intended to enable</h3>
              <ul className="icon-list">
                <li>
                  <TechnicalIcon name="access" />
                  <span>
                    Hands-on experiment without full-scale facility costs
                  </span>
                </li>
                <li>
                  <TechnicalIcon name="experiment" />
                  <span>Fast-turnaround testbed for diagnostic development</span>
                </li>
                <li>
                  <TechnicalIcon name="education" />
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

      <section className="products-final">
        <div className="focused-shell callout">
          <h2>Could one of these directions fit your organisation?</h2>
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
