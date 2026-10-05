import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import ProductFigure from '@/components/ProductFigure';
import TechnicalIcon from '@/components/TechnicalIcon';
import InterestDisclaimer from '@/components/InterestDisclaimer';
import { contactHrefs, homeHero, projectStatus } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Aurora Confinement',
  description:
    'Aurora Confinement is developing compact experimental stellarator platforms for more accessible hands-on research, together with tabletop models for communication and teaching.',
  path: '/',
});

export default function Page() {
  return (
    <>
      <section className="home-hero">
        <div className="shell home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{homeHero.eyebrow}</p>
            <h1>{homeHero.headline}</h1>
            <p className="hero-supporting">{homeHero.supporting}</p>
            <InterestDisclaimer />
            <div className="button-row">
              <Link className="button primary" href={homeHero.primaryHref}>
                {homeHero.primaryLabel}
              </Link>
              <Link className="button" href={homeHero.secondaryHref}>
                {homeHero.secondaryLabel}
              </Link>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <img
              src="/images/logo-symbol.png"
              alt=""
              width="480"
              height="480"
            />
          </div>
        </div>
      </section>

      <section className="section home-barrier">
        <div className="shell">
          <div className="home-section-heading">
            <p className="eyebrow">The barrier</p>
            <h2>
              Hands-on stellarator research requires substantial resources.
            </h2>
          </div>
          <div className="barrier-grid">
            <article className="barrier-card">
              <TechnicalIcon name="investment" />
              <div>
                <h3>High capital cost</h3>
                <p>Heavy financial investment limits entry.</p>
              </div>
            </article>
            <article className="barrier-card">
              <TechnicalIcon name="industry" />
              <div>
                <h3>Specialist infrastructure</h3>
                <p>Demands complex, specialized facilities.</p>
              </div>
            </article>
            <article className="barrier-card">
              <TechnicalIcon name="access" />
              <div>
                <h3>Restricted access</h3>
                <p>Limits hands-on research to a few large institutions.</p>
              </div>
            </article>
          </div>
          <p className="barrier-bridge">
            Aurora Confinement is developing compact platforms and physical
            models intended to lower these barriers.
          </p>
        </div>
      </section>

      <section className="section" id="products">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Two product directions</p>
              <h2>Research access and technical communication.</h2>
            </div>
            <p>
              Both product directions are active areas of work, with different
              levels of technical maturity.
            </p>
          </div>
          <div className="product-grid">
            <article className="card product-card home-product-card">
              <div className="home-product-content">
                <p className="card-index">01 / Exhibition and communication</p>
                <span className="status-label">
                  Current focus · In development
                </span>
                <h3>Tabletop stellarator models</h3>
                <ul className="home-feature-list">
                  <li>
                    <TechnicalIcon name="visibility" />
                    <div>
                      <strong>Tangible &amp; visible</strong>
                      <span>
                        Makes complex 3D geometry physical and intuitive.
                      </span>
                    </div>
                  </li>
                  <li>
                    <TechnicalIcon name="education" />
                    <div>
                      <strong>Education &amp; outreach</strong>
                      <span>
                        Built for exhibitions, conferences and lectures.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <ProductFigure kind="tabletop" />
              <div className="home-product-footer">
                <InterestDisclaimer />
                <div className="home-card-actions">
                  <Link
                    className="button primary"
                    href={contactHrefs.productInterest}
                  >
                    Register your interest
                  </Link>
                  <Link
                    className="button home-card-secondary"
                    href="/products"
                  >
                    Explore product <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
            <article className="card violet product-card home-product-card">
              <div className="home-product-content">
                <p className="card-index">02 / Experimental research</p>
                <span className="status-label">
                  Current focus · Early-stage development
                </span>
                <h3>Experimental stellarator platforms</h3>
                <ul className="home-feature-list">
                  <li>
                    <TechnicalIcon name="experiment" />
                    <div>
                      <strong>Hands-on research</strong>
                      <span>
                        Enables direct experimentation and training without huge
                        facilities.
                      </span>
                    </div>
                  </li>
                  <li>
                    <TechnicalIcon name="access" />
                    <div>
                      <strong>Lower barriers</strong>
                      <span>
                        Designed to reduce capital and infrastructure costs.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <ProductFigure kind="research" />
              <div className="home-product-footer">
                <InterestDisclaimer />
                <div className="home-card-actions">
                  <Link
                    className="button primary"
                    href={contactHrefs.productInterest}
                  >
                    Register your interest
                  </Link>
                  <Link
                    className="button home-card-secondary"
                    href="/products"
                  >
                    Explore product <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Team and stage</p>
              <h2>A multidisciplinary student team.</h2>
            </div>
          </div>
          <div className="fact-strip" aria-label="Project status">
            <div>
              <strong>13 students</strong>
              <span>Multidisciplinary team</span>
            </div>
            <div>
              <strong>Two active directions</strong>
              <span>Research and communication tools</span>
            </div>
            <div>
              <strong>Early-stage</strong>
              <span>Products remain in development</span>
            </div>
          </div>
          <p className="status-copy">
            {projectStatus} No DTU endorsement or institutional partnership is
            implied.
          </p>
          <a className="button cta-button team-cta" href="/about">
            About the team
          </a>
        </div>
      </section>

      <section className="section">
        <div className="shell callout">
          <p className="eyebrow">Start a useful conversation</p>
          <h2>Where could a physical stellarator tool help?</h2>
          <p>
            We welcome non-binding conversations with research institutions,
            universities, fusion companies, collaborators, and strategic
            partners.
          </p>
          <Link className="button primary" href={contactHrefs.generalEnquiry}>
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
