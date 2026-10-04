import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ProductFigure from '@/components/ProductFigure';
import TechnicalIcon from '@/components/TechnicalIcon';

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
              Make complex stellarator technology easier to see, explain and
              remember.
            </p>
            <p className="product-intro-copy">
              Physical models designed for organisations that need to
              communicate stellarator technology clearly in exhibitions,
              meetings, visitor facilities and introductory teaching.
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
                  <span>Fusion companies and industry exhibitions</span>
                </li>
                <li>
                  <TechnicalIcon name="communication" />
                  <span>Research institutions and public engagement</span>
                </li>
                <li>
                  <TechnicalIcon name="education" />
                  <span>Universities and introductory teaching</span>
                </li>
              </ul>
            </div>
            <div className="product-list-group">
              <h3>What it enables</h3>
              <ul className="icon-list">
                <li>
                  <TechnicalIcon name="visibility" />
                  <span>Create a memorable focal point at conferences</span>
                </li>
                <li>
                  <TechnicalIcon name="model" />
                  <span>
                    Explain complex three-dimensional geometry physically
                  </span>
                </li>
                <li>
                  <TechnicalIcon name="collaboration" />
                  <span>
                    Support conversations with students, visitors and
                    stakeholders
                  </span>
                </li>
              </ul>
            </div>
            <p className="product-clarification">
              Purpose: communication and teaching, not experimental research
            </p>
            <a
              className="button cta-button"
              href="/contact?interest=exhibition-model"
            >
              Discuss an exhibition model
            </a>
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
              Bring hands-on stellarator experimentation within reach of more
              research teams.
            </p>
            <p className="product-intro-copy">
              Compact experimental systems being developed for universities,
              startups and research teams facing high acquisition and
              infrastructure barriers.
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
                  <TechnicalIcon name="experiment" />
                  <span>University plasma and fusion laboratories</span>
                </li>
                <li>
                  <TechnicalIcon name="research" />
                  <span>Fusion startups and research teams</span>
                </li>
                <li>
                  <TechnicalIcon name="education" />
                  <span>Student projects and researcher training</span>
                </li>
              </ul>
            </div>
            <div className="product-list-group">
              <h3>What it is intended to enable</h3>
              <ul className="icon-list">
                <li>
                  <TechnicalIcon name="access" />
                  <span>More accessible hands-on stellarator experiments</span>
                </li>
                <li>
                  <TechnicalIcon name="training" />
                  <span>
                    Training in diagnostics, controls and plasma research
                  </span>
                </li>
                <li>
                  <TechnicalIcon name="industry" />
                  <span>Research without power-plant-scale infrastructure</span>
                </li>
              </ul>
            </div>
            <p className="product-clarification">
              Current stage: early-stage development through research
              collaboration
            </p>
            <a
              className="button cta-button"
              href="/contact?interest=research-platform"
            >
              Discuss a research partnership
            </a>
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
          <div className="button-row">
            <a
              className="button primary"
              href="/contact?interest=general-enquiry#contact-form"
            >
              Register your interest
            </a>
            <a className="button" href="/contact">
              Contact the team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
