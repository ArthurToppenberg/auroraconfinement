import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ProductFigure from '@/components/ProductFigure';
import { homeHero, projectStatus } from '@/content/site';

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
            <div className="button-row">
              <a className="button primary" href={homeHero.primaryHref}>
                {homeHero.primaryLabel}
              </a>
              <a className="button" href={homeHero.secondaryHref}>
                {homeHero.secondaryLabel}
              </a>
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

      <section className="section">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">The barrier</p>
            <h2>
              Hands-on stellarator research requires substantial resources.
            </h2>
          </div>
          <div className="split-copy">
            <p>
              Experimental stellarator work can require substantial capital,
              specialist infrastructure, and engineering resources. These
              barriers limit what many universities, startups, and smaller
              research teams can investigate directly.
            </p>
            <p>
              Aurora Confinement is developing compact experimental platforms
              intended to lower the barrier to hands-on research, alongside
              tabletop models that make stellarator technology easier to
              communicate and teach.
            </p>
          </div>
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
            <article className="card product-card">
              <p className="card-index">01 / Exhibition and communication</p>
              <span className="status-label">
                Current focus · In development
              </span>
              <h3>Tabletop stellarator models</h3>
              <p>
                Physical models designed to help fusion companies, research
                institutions, and universities communicate stellarator
                technology at exhibitions, visitor facilities, and introductory
                lectures.
              </p>
              <ProductFigure kind="tabletop" />
              <a
                className="button cta-button"
                href="/contact?interest=exhibition-model"
              >
                Discuss an exhibition model
              </a>
            </article>
            <article className="card violet product-card">
              <p className="card-index">02 / Experimental research</p>
              <span className="status-label">
                Current focus · Early-stage development
              </span>
              <h3>Experimental stellarator platforms</h3>
              <p>
                Compact experimental systems designed to lower the cost and
                infrastructure barriers to hands-on stellarator research for
                universities, startups, and research teams.
              </p>
              <ProductFigure kind="research" />
              <a
                className="button cta-button"
                href="/contact?interest=research-collaboration"
              >
                Discuss a research partnership
              </a>
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
            <p>
              Thirteen DTU students bring together physics, engineering, product
              development, operations, and communication.
            </p>
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
          <a className="button cta-button" href="/about">
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
          <a className="button primary" href="/contact">
            Start a conversation
          </a>
        </div>
      </section>
    </>
  );
}
