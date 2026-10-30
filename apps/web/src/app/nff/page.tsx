import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import InterestForm from '@/components/InterestForm';
import EventFigure from '@/components/EventFigure';

export const metadata: Metadata = pageMetadata({
  title: 'Nordic Fusion Forum 2026',
  description:
    'Continue your conversation with Aurora Confinement after Nordic Fusion Forum 2026 and register non-binding institutional interest.',
  path: '/nff/',
});

export default function Page() {
  return (
    <>
      <section className="nff-top chapter field-cyan">
        <div className="shell nff-top-grid">
          <div className="nff-intro-copy">
            <h1>Thank you for the conversation.</h1>
            <p className="nff-intro-lead">
              It was a pleasure meeting you at Nordic Fusion Forum 2026. Aurora
              Confinement is developing more accessible stellarator research
              platforms, together with physical models that make the technology
              easier to communicate and teach.
            </p>
            <p>
              If one of these directions could be relevant to your organisation,
              we would be glad to continue the conversation.
            </p>
          </div>
          <div className="nff-form-column" id="interest">
            <div className="nff-form-heading">
              <h2>Continue the conversation</h2>
              <p>
                Tell us how our work could be relevant to your organisation.
              </p>
            </div>
            <InterestForm variant="nff" />
          </div>
        </div>
      </section>

      <section
        className="nff-products chapter field-night"
        aria-labelledby="nff-products-title"
      >
        <div className="shell">
          <h2 id="nff-products-title">What we are building</h2>
          <div className="nff-product-grid">
            <article className="card nff-product-card">
              <p className="status-label">Experimental research</p>
              <h3>Accessible stellarator research platforms</h3>
              <p className="nff-card-intro">
                Compact experimental systems designed for more accessible
                hands-on stellarator research.
              </p>
              <ul className="nff-benefits">
                <li>
                  <span>
                    Designed to reduce infrastructure and acquisition barriers
                  </span>
                </li>
                <li>
                  <span>
                    Intended for experiments, training and student research
                  </span>
                </li>
                <li>
                  <span>
                    Developed for universities, startups and research teams
                  </span>
                </li>
              </ul>
              <p className="nff-card-status">
                Current stage: early-stage development through research
                collaboration
              </p>
            </article>
            <article className="card nff-product-card">
              <p className="status-label">Exhibition and communication</p>
              <h3>Exhibition stellarator models</h3>
              <p className="nff-card-intro">
                Physical models that make complex stellarator technology easier
                to see and explain.
              </p>
              <ul className="nff-benefits">
                <li>
                  <span>
                    Create a focal point at exhibitions and conferences
                  </span>
                </li>
                <li>
                  <span>
                    Support public engagement and technical communication
                  </span>
                </li>
                <li>
                  <span>
                    Provide a visual aid for introductory university teaching
                  </span>
                </li>
              </ul>
              <p className="nff-card-status">
                Purpose: communication and teaching, not experimental research
              </p>
            </article>
          </div>
          <div className="nff-products-cta">
            <a className="button" href="/products">
              Explore our products
            </a>
          </div>
        </div>
      </section>

      <section
        className="section field-deep"
        aria-labelledby="nff-photos-title"
      >
        <div className="shell">
          <div className="section-heading">
            <h2 id="nff-photos-title">From the forum.</h2>
            <p>
              Nordic Fusion Forum 2026 took place in Copenhagen on 19 October.
              Thank you to everyone who stopped to talk.
            </p>
          </div>
          <div className="event-pair">
            <EventFigure
              name="nff-team"
              height={781}
              sizes="(min-width: 52rem) 46vw, 100vw"
              alt="Aurora Confinement members wearing Nordic Fusion Forum 2026 lanyards, standing together in front of the event screen."
              caption="Aurora Confinement at Nordic Fusion Forum 2026, Copenhagen."
            />
            <EventFigure
              name="nff-panel"
              height={1200}
              sizes="(min-width: 52rem) 46vw, 100vw"
              alt="A panel session on the stage of a full hall at Nordic Fusion Forum 2026."
              caption="A panel session in the main hall at Nordic Fusion Forum 2026."
            />
          </div>
        </div>
      </section>
    </>
  );
}
